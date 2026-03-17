"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Locale } from "@/i18n/routing";
import { getColorClasses } from "@/sanity/lib/colorOptions";
import { ContactUsSection } from "@/sanity/types";
import { cn } from "@/utils/cn";

export function ContactUs({
  backgroundColor,
  contactEmail,
  content,
  detailsContent,
  detailsTitle,
  eyebrow,
  formEyebrow,
  highlights,
  locale,
  responseTime,
  title,
}: ContactUsSection & { locale: Locale }) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("", bg, text)}>
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="max-w-xl">
            {eyebrow ? (
              <div className="mb-5 inline-flex items-center gap-3">
                <span className="h-px w-10 bg-(--brand-secondary)" />
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--brand-primary)">
                  {eyebrow}
                </p>
              </div>
            ) : null}

            <h2 className="max-w-[14ch] text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-balance text-slate-950 sm:text-5xl">
              {title}
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-8 text-(--text-secondary)">
              {content}
            </p>

            <div className="mt-8 space-y-5 rounded-[1.8rem] border border-black/6 bg-white/92 p-6 shadow-[0_14px_32px_rgba(16,24,40,0.05)]">
              {detailsTitle || detailsContent ? (
                <div>
                  {detailsTitle ? (
                    <h3 className="text-lg font-semibold text-slate-950">
                      {detailsTitle}
                    </h3>
                  ) : null}
                  {detailsContent ? (
                    <p className="mt-3 text-[15px] leading-7 text-(--text-secondary)">
                      {detailsContent}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                {contactEmail ? (
                  <div className="rounded-[1.25rem] border border-black/6 bg-(--surface-alt) p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-secondary)">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="mt-2 inline-block text-sm font-medium text-slate-900 transition-colors hover:text-(--brand-primary)"
                    >
                      {contactEmail}
                    </a>
                  </div>
                ) : null}

                {responseTime ? (
                  <div className="rounded-[1.25rem] border border-black/6 bg-(--surface-alt) p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-secondary)">
                      Response time
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {responseTime}
                    </p>
                  </div>
                ) : null}
              </div>

              {highlights && highlights.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/6 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="brand-panel rounded-4xl p-6 lg:p-8">
            <ContactForm locale={locale} eyebrow={formEyebrow} />
          </div>
        </div>
      </div>
    </section>
  );
}

// Podemos tipar el form sin depender del schema directamente
type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function ContactForm({
  locale,
  eyebrow,
}: {
  locale: Locale;
  eyebrow?: string | null;
}) {
  const t = useTranslations("ContactForm");
  const formEyebrow = eyebrow || "Contact form";

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Schema de Zod que usa mensajes traducidos
  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(2, t("errors.nameRequired"))
          .max(100, t("errors.nameTooLong")),
        email: z.email(t("errors.emailInvalid")),
        subject: z
          .string()
          .min(3, t("errors.subjectRequired"))
          .max(150, t("errors.subjectTooLong")),
        message: z
          .string()
          .min(10, t("errors.messageTooShort"))
          .max(2000, t("errors.messageTooLong")),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setServerError(null);
    setSuccessMessage(null);

    if (!captchaToken) {
      setServerError(t("messages.recaptchaRequired"));
      return;
    }

    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          captchaToken,
          locale,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const code = body?.code as string | undefined;

        const apiErrorMessages: Record<string, string> = {
          INVALID_JSON: t("apiErrors.INVALID_JSON"),
          INVALID_PAYLOAD: t("apiErrors.INVALID_PAYLOAD"),
          RECAPTCHA_CONFIG: t("apiErrors.RECAPTCHA_CONFIG"),
          RECAPTCHA_FAILED: t("apiErrors.RECAPTCHA_FAILED"),
          EMAIL_FAILED: t("apiErrors.EMAIL_FAILED"),
          SERVER_ERROR: t("apiErrors.SERVER_ERROR"),
        };

        const msg = code ? apiErrorMessages[code] : undefined;

        setServerError(msg ?? t("messages.genericError"));
        return;
      }

      setSuccessMessage(t("messages.success"));
      reset();
      setCaptchaToken(null);
    } catch (err) {
      console.error(err);
      setServerError(t("messages.networkError"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <div className="border-b border-black/6 pb-5">
        <div className="inline-flex items-center gap-3">
          <span className="h-px w-8 bg-(--brand-secondary)" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--brand-primary)">
            {formEyebrow}
          </p>
        </div>
        <p className="mt-3 max-w-lg text-sm leading-7 text-(--text-secondary)">
          {t("messages.formIntro")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-800">
            {t("labels.name")}
          </label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm shadow-sm transition-colors focus:border-(--brand-primary) focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/12"
            placeholder={t("placeholders.name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800">
            {t("labels.email")}
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm shadow-sm transition-colors focus:border-(--brand-primary) focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/12"
            placeholder={t("placeholders.email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">
          {t("labels.subject")}
        </label>
        <input
          type="text"
          {...register("subject")}
          className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm shadow-sm transition-colors focus:border-(--brand-primary) focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/12"
          placeholder={t("placeholders.subject")}
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800">
          {t("labels.message")}
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="mt-1 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm shadow-sm transition-colors focus:border-(--brand-primary) focus:outline-none focus:ring-2 focus:ring-(--brand-primary)/12"
          placeholder={t("placeholders.message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}

      <div>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={(token) => {
            setCaptchaToken(token);
            setServerError(null);
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="brand-button-primary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
      </button>
    </form>
  );
}
