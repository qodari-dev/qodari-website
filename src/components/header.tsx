"use client";

import Link from "next/link";
import { SITE_SETTINGS_QUERYResult } from "@/sanity/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { resolveLink } from "@/sanity/lib/resolve-link";

export function Header({ settings }: { settings: SITE_SETTINGS_QUERYResult }) {
  const { siteName, logo, headerNav } = settings || {};

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
              return (
                <Link
                  key={link?.href}
                  href={link?.href ?? ""}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {link?.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
