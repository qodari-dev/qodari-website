import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { routing, type Locale } from "@/i18n/routing";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  subject: z.string().min(3).max(150),
  message: z.string().min(10).max(2000),
  captchaToken: z.string().min(1),
  locale: z.enum(routing.locales).default(routing.defaultLocale),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);

    if (!json) {
      return NextResponse.json({ code: "INVALID_JSON" }, { status: 400 });
    }

    const parseResult = contactSchema.safeParse(json);

    if (!parseResult.success) {
      console.warn("[contact] invalid payload", parseResult.error.issues);
      return NextResponse.json(
        {
          code: "INVALID_PAYLOAD",
          errors: parseResult.error.issues,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message, captchaToken, locale } =
      parseResult.data;

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error("Missing RECAPTCHA_SECRET_KEY");
      return NextResponse.json({ code: "RECAPTCHA_CONFIG" }, { status: 500 });
    }

    const recaptchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: captchaToken,
        }).toString(),
      },
    );

    const recaptchaJson = (await recaptchaRes.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!recaptchaJson.success) {
      console.warn("[contact] recaptcha failed", recaptchaJson);
      return NextResponse.json({ code: "RECAPTCHA_FAILED" }, { status: 400 });
    }

    // ── Email según idioma (solo cambia el subject/body, el error se mantiene por código)
    const lang: Locale = locale ?? routing.defaultLocale;

    const subjectPrefix = lang === "es" ? "[CONTACTO]" : "[CONTACT]";

    const bodyText =
      lang === "es"
        ? `
Nombre: ${name}
Email: ${email}

Mensaje:
${message}
        `.trim()
        : `
Name: ${name}
Email: ${email}

Message:
${message}
        `.trim();

    const { data, error } = await resend.emails.send({
      from: "qodari <hello@qodari.com>",
      to: "carlos@qodari.com",
      subject: `${subjectPrefix} ${subject}`,
      text: bodyText,
    });

    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json({ code: "EMAIL_FAILED" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ code: "SERVER_ERROR" }, { status: 500 });
  }
}
