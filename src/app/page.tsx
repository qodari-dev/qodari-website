import { Title } from "@/components/blog/title";
import Link from "next/link";

export default function Home() {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>Home Page</Title>
      <hr />
      <Link href="/blog">Blog index &rarr;</Link>
    </section>
  );
}
