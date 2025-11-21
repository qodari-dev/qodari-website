"use client";

import { urlFor } from "@/sanity/lib/image";
import { resolveLink } from "@/sanity/lib/resolve-link";
import { SITE_SETTINGS_QUERYResult } from "@/sanity/types";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./language-switcher";

export function Header({ settings }: { settings: SITE_SETTINGS_QUERYResult }) {
  const { siteName, logo, headerNav } = settings || {};
  const pathname = usePathname() || "/";

  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          {logo ? (
            <Image
              src={urlFor(logo).width(200).height(100).auto("format").url()}
              alt={siteName || "Logo"}
              width={200}
              height={100}
              className="h-8 w-auto"
            />
          ) : (
            <span className="text-lg font-semibold">
              {siteName || "My Site"}
            </span>
          )}
        </Link>

        {headerNav && headerNav.length > 0 && (
          <nav className="hidden items-center gap-6 md:flex">
            {headerNav.map((item) => {
              const link = resolveLink(item);
              const isActive = pathname === link?.href;

              const linkClasses = cn(
                "text-sm font-medium transition-colors",
                isActive
                  ? "text-green-500"
                  : "text-gray-700 hover:text-gray-900",
              );
              return (
                <Link
                  key={link?.href}
                  href={link?.href ?? ""}
                  className={linkClasses}
                >
                  {link?.label}
                </Link>
              );
            })}
            <LanguageSwitcher />
          </nav>
        )}
      </div>
    </header>
  );
}
