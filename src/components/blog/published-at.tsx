import { POST_QUERYResult } from "@/sanity/types";
import { format } from "date-fns";

type PublishedAtProps = {
  publishedAt: NonNullable<POST_QUERYResult>["publishedAt"];
};

export function PublishedAt({ publishedAt }: PublishedAtProps) {
  return publishedAt ? (
    <p className="text-base text-slate-700">
      {format(new Date(publishedAt), "d MMMM yyyy")}
    </p>
  ) : null;
}
