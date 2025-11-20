"use client";

import { getColorClasses } from "@/sanity/lib/colorOptions";
import { ContactUsSection } from "@/sanity/types";
import { cn } from "@/utils/cn";

import { useState } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";

export function ContactUs({
  title,
  content,
  backgroundColor,
}: ContactUsSection) {
  const { bg, text } = getColorClasses(backgroundColor);

  return (
    <section className={cn("py-16 px-4 ", bg, text)}>
      <h2 className="text-4xl font-bold mb-6">{title}</h2>
      <p className="text-lg mb-8 leading-relaxed">{content}</p>
      <div>
        <ContactForm />
      </div>
    </section>
  );
}

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre es obligatorio")
    .max(100, "Nombre demasiado largo"),
  email: z.email("Email inválido"),
  subject: z
    .string()
    .min(3, "El asunto es obligatorio")
    .max(150, "Asunto demasiado largo"),
  message: z
    .string()
    .min(10, "El mensaje es muy corto")
    .max(2000, "El mensaje es demasiado largo"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
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
      setServerError("Por favor completa el reCAPTCHA.");
      return;
    }

    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          captchaToken,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setServerError(
          body?.message || "Ocurrió un error al enviar el mensaje.",
        );
        return;
      }

      setSuccessMessage("¡Mensaje enviado! Te responderé pronto.");
      reset();
      setCaptchaToken(null);
    } catch (err) {
      console.error(err);
      setServerError("Ocurrió un error de red. Intenta de nuevo.");
    }
  };

  const onError: SubmitErrorHandler<ContactFormValues> = (errors) =>
    console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm text-black"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Asunto
        </label>
        <input
          type="text"
          {...register("subject")}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          placeholder="Sobre qué quieres hablar"
        />
        {errors.subject && (
          <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mensaje
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          placeholder="Cuéntame un poco más sobre tu proyecto..."
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
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>
    </form>
  );
}
