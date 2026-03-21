"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMemo, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import type { Locale } from "@/i18n/routing";
import { getColorClasses } from "@/sanity/lib/colorOptions";
import { ContactUsSection } from "@/sanity/types";
import { cn } from "@/utils/cn";
import { sendGAEvent } from "@next/third-parties/google";

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
  whatsappText,
  whatsappUrl,
}: ContactUsSection & { locale: Locale }) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("", bg, text)}>
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="max-w-xl">
            {eyebrow ? (
              <div className="section-eyebrow">
                <span />
                <p>{eyebrow}</p>
              </div>
            ) : null}

            <h2 className="section-heading text-(--text-primary)">{title}</h2>

            <p className="section-content max-w-lg">{content}</p>

            <div className="mt-8 space-y-5 rounded-[1.8rem] border border-black/6 bg-white/92 p-6 shadow-[0_14px_32px_rgba(16,24,40,0.05)]">
              {detailsTitle || detailsContent ? (
                <div>
                  {detailsTitle ? (
                    <h3 className="text-lg font-semibold text-(--text-primary)">
                      {detailsTitle}
                    </h3>
                  ) : null}
                  {detailsContent ? (
                    <p className="mt-3 text-[15px] leading-7 text-(--text-body)">
                      {detailsContent}
                    </p>
                  ) : null}
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                {contactEmail ? (
                  <div className="rounded-[1.25rem] border border-black/6 bg-(--surface-alt) p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-muted)">
                      Email
                    </p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="mt-2 inline-block text-sm font-medium text-(--text-primary) transition-colors hover:text-(--brand-primary)"
                    >
                      {contactEmail}
                    </a>
                  </div>
                ) : null}

                {responseTime ? (
                  <div className="rounded-[1.25rem] border border-black/6 bg-(--surface-alt) p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-(--text-muted)">
                      Response time
                    </p>
                    <p className="mt-2 text-sm font-medium text-(--text-primary)">
                      {responseTime}
                    </p>
                  </div>
                ) : null}
              </div>

              {whatsappText && whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-black/6 bg-white px-4 py-3.5 text-sm font-medium text-(--text-body) transition-colors hover:border-green-300 hover:text-green-700"
                  onClick={() =>
                    sendGAEvent("event", "whatsapp_click", {
                      location: "contact_left_panel",
                    })
                  }
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 shrink-0 text-green-500"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>{whatsappText}</span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="ml-auto h-4 w-4 shrink-0 text-(--text-muted)"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              ) : null}

              {highlights && highlights.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {highlights.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-black/6 bg-white px-4 py-2 text-sm font-medium text-(--text-body)"
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

const SUBJECT_OPTIONS = [
  "custom-software",
  "integrations",
  "websites-cms",
  "ongoing-support",
  "not-sure",
] as const;

type ContactFormInput = {
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
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Schema de Zod que usa mensajes traducidos
  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .trim()
          .min(2, t("errors.nameRequired"))
          .max(100, t("errors.nameTooLong")),
        email: z.email(t("errors.emailInvalid")).trim(),
        subject: z.enum(SUBJECT_OPTIONS, {
          error: t("errors.subjectRequired"),
        }),
        message: z
          .string()
          .trim()
          .min(10, t("errors.messageTooShort"))
          .max(2000, t("errors.messageTooLong")),
      }),
    [t],
  );

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormInput) => {
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
      sendGAEvent("event", "contact_form_submit", {
        form_name: "contact_form",
      });
      setSuccessMessage(t("messages.success"));
      reset();
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (err) {
      console.error(err);
      setServerError(t("messages.networkError"));
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
      className="space-y-6 text-black"
    >
      <div className="border-b border-black/6 pb-5">
        <div className="inline-flex items-center gap-3">
          <span className="h-px w-8 bg-(--brand-secondary)" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--brand-primary)">
            {formEyebrow}
          </p>
        </div>
        <p className="mt-3 max-w-lg text-sm leading-7 text-(--text-body)">
          {t("messages.formIntro")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-(--text-body)">
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
          <label className="block text-sm font-medium text-(--text-body)">
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

      <Controller
        control={control}
        name="subject"
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium text-(--text-body)">
              {t("labels.subject")}
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUBJECT_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => field.onChange(option)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                    field.value === option
                      ? "border-(--brand-primary) bg-(--brand-primary) text-white shadow-sm"
                      : "border-black/10 bg-white text-(--text-body) hover:border-(--brand-primary)/30 hover:text-(--text-muted)",
                  )}
                >
                  {t(`subjectOptions.${option}`)}
                </button>
              ))}
            </div>
            {errors.subject && (
              <p className="mt-2 text-xs text-red-600">
                {errors.subject.message}
              </p>
            )}
          </div>
        )}
      />

      <div>
        <label className="block text-sm font-medium text-(--text-body)">
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
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          onChange={(token) => {
            setCaptchaToken(token);
            setServerError(null);
          }}
          onExpired={() => {
            setCaptchaToken(null);
          }}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer brand-button-primary inline-flex items-center justify-center px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
      </button>
    </form>
  );
}
