"use client";

import { useMemo, useState } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslations } from "next-intl";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { ContactUsSection } from "@/sanity/types";
import { cn } from "@/utils/cn";
import type { Locale } from "@/i18n/routing";

export function ContactUs({
  title,
  content,
  backgroundColor,
  locale,
}: ContactUsSection & { locale: Locale }) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("py-16 px-4", bg, text)}>
      <h2 className="mb-6 text-4xl font-bold">{title}</h2>
      <p className="mb-8 text-lg leading-relaxed">{content}</p>
      <div>
        <ContactForm locale={locale} />
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

function ContactForm({ locale }: { locale: Locale }) {
  const t = useTranslations("ContactForm");

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

  const onError: SubmitErrorHandler<ContactFormValues> = (formErrors) =>
    console.log("Contact form validation errors:", formErrors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 text-black shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("labels.name")}
          </label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder={t("placeholders.name")}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {t("labels.email")}
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder={t("placeholders.email")}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("labels.subject")}
        </label>
        <input
          type="text"
          {...register("subject")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          placeholder={t("placeholders.subject")}
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          {t("labels.message")}
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
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
        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
      </button>
    </form>
  );
}
