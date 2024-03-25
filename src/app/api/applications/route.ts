import { applicationsData } from "@/lib/constants";

export async function GET() {
  const data = applicationsData;

  return Response.json({ data });
}
