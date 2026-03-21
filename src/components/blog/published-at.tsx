import { POST_QUERY_RESULT } from "@/sanity/types";
import { format } from "date-fns";

type PublishedAtProps = {
  publishedAt: NonNullable<POST_QUERY_RESULT>["publishedAt"];
};

export function PublishedAt({ publishedAt }: PublishedAtProps) {
  return publishedAt ? (
    <p className="text-base text-(--text-body)">
      {format(new Date(publishedAt), "d MMMM yyyy")}
    </p>
  ) : null;
}
