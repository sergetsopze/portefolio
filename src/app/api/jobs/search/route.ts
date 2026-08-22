import { NextRequest } from "next/server";
import { parseSearchQuery, searchJobs } from "@/lib/jobs/search";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = parseSearchQuery({
    keywords: searchParams.get("q"),
    location: searchParams.get("where"),
    contract: searchParams.get("contract"),
    since: searchParams.get("since"),
  });

  const result = await searchJobs(query);
  return Response.json(result);
}
