"use client";

import { resolveLink } from "@/sanity/lib/resolve-link";
import { SITE_SETTINGS_QUERYResult } from "@/sanity/types";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import Link from "next/link";

export function Footer({ settings }: { settings: SITE_SETTINGS_QUERYResult }) {
  const { footerColumns, footerBottomText, socialLinks } = settings || {};

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        {footerColumns && footerColumns.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {footerColumns.map((col, idx) => (
              <div key={idx}>
                {col.title && (
                  <h4 className="mb-3 text-sm font-semibold text-gray-900">
                    {col.title}
                  </h4>
                )}
                <ul className="space-y-2 text-sm text-gray-700">
                  {col.links?.map((item, i) => {
                    const link = resolveLink(item);
                    return (
                      <li key={i}>
                        <Link href={link?.href ?? ""}>{link?.label}</Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 text-sm text-gray-600 md:flex-row">
          {footerBottomText && <p>{footerBottomText}</p>}

          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-4">
              {socialLinks.map((social, idx) =>
                social.url ? (
                  <Link
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                  >
                    {social.icon && (
                      <DynamicIcon
                        name={social.icon as IconName}
                        className="h-5 w-5"
                      />
                    )}
                    {social.label && (
                      <span className="text-sm sr-only">{social.label}</span>
                    )}
                  </Link>
                ) : null,
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
