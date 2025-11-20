import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  subject: z.string().min(3).max(150),
  message: z.string().min(10).max(2000),
  captchaToken: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);

    if (!json) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 },
      );
    }

    const parseResult = contactSchema.safeParse(json);

    if (!parseResult.success) {
      console.warn("[contact] invalid payload", parseResult.error.issues);
      return NextResponse.json(
        {
          message: "Invalid payload",
          errors: parseResult.error.issues,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message, captchaToken } = parseResult.data;

    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      console.error("Missing RECAPTCHA_SECRET_KEY");
      return NextResponse.json(
        { message: "Error de configuración del servidor" },
        { status: 500 },
      );
    }

    const recaptchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret,
          response: captchaToken,
          //remoteip: req.ip ?? "",
        }).toString(),
      },
    );

    const recaptchaJson = (await recaptchaRes.json()) as {
      success: boolean;
      "error-codes"?: string[];
    };

    if (!recaptchaJson.success) {
      console.warn("[contact] recaptcha failed", recaptchaJson);
      return NextResponse.json(
        {
          message: "Fallo la verificación de reCAPTCHA.",
        },
        { status: 400 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "qodari <hello@qodari.com>",
      to: "carlos@qodari.com",
      subject: `[CONTACTO] ${subject}`,
      text: `
        Nombre: ${name}
        Email: ${email}

        Mensaje:
        ${message}
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error procesando el formulario" },
      { status: 500 },
    );
  }
}
