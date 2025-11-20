import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";

type WebhookPayload = {
  _type?: string;
  slug?: string;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return NextResponse.json(
        { message: "Missing SANITY_REVALIDATE_SECRET" },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }
    if (!body) {
      return NextResponse.json({ message: "Invalid body" }, { status: 401 });
    }

    const { slug, _type } = body;

    if (!_type) {
      return NextResponse.json(
        { message: "Missing _type in body" },
        { status: 400 },
      );
    }

    if (_type === "siteSettings") {
      revalidateTag("site-settings", "max");
      return NextResponse.json({ revalidated: true, ...body });
    }

    if (!slug) {
      return NextResponse.json({ message: "No slug in body" }, { status: 400 });
    }

    revalidateTag(`${_type}:${slug}`, "max");
    revalidateTag(`${_type}-index`, "max");
    revalidateTag("sitemap", "max");
    return NextResponse.json({ revalidated: true, ...body });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
