import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <section className="relative overflow-hidden bg-white text-(--text-primary)">
      <div className="gradient-glow" />

      <div className="site-container relative flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="section-eyebrow">
          <span />
          <p>{t("eyebrow")}</p>
          <span />
        </div>

        <h1 className="mt-4 text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-(--text-primary) sm:text-6xl lg:text-7xl">
          {t("title")}
        </h1>

        <p className="mt-6 max-w-lg text-lg leading-8 text-(--text-body)">
          {t("content")}
        </p>

        <Link
          href="/"
          className="brand-button-primary mt-10 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("button")}
        </Link>
      </div>
    </section>
  );
}
