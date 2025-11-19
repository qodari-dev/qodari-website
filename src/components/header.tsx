import Link from "next/link";

export function Header() {
  return (
    <div className="from-blue-50 to-white bg-linear-to-b p-6">
      <header className="bg-white/80 shadow-md flex items-center justify-between p-6 rounded-lg container mx-auto shadow-blue-50">
        <Link
          className="text-blue-700 md:text-xl font-bold tracking-tight"
          href="/"
        >
          qodari
        </Link>
        <ul className="flex items-center gap-4 font-semibold text-slate-700">
          <li>
            <Link
              className="hover:text-pink-500 transition-colors"
              href="/blog"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-pink-500 transition-colors"
              href="/test"
            >
              Test
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
