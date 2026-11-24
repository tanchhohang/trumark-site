// These become ordinary .css files in out/opening/ during static export.
import { openingStyles } from "../../../features/hero/opening-styles";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return openingStyles.map(({ filename }) => ({ sheet: filename }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sheet: string }> },
) {
  const { sheet } = await params;
  const style = openingStyles.find((s) => s.filename === sheet);
  return style
    ? new Response(style.css, {
        headers: { "Content-Type": "text/css; charset=utf-8" },
      })
    : new Response(null, { status: 404 });
}
