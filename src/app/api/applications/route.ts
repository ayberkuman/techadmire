import { applicationsData } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "date-fns";
/*  {
    id: "fa5824c6-a8fe-4988-8166-e06c9d672b94",
    name: "VAPRISOL DEXTROSE IN PLASTIC CONTAINER",
    university: "Central Mindanao University",
    country: "Philippines",
    duration: 6,
    cost: 1764,
    deadline: "06/09/2030",
    language: "Turkish",
  }, */

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sortBy = searchParams.get("sortBy");
  let data = [...applicationsData];

  if (sortBy === "deadlineearly") {
  } else if (sortBy === "deadlinelate") {
  } else if (sortBy === "pricelow") {
    data.sort((a, b) => a.cost - b.cost);
  } else if (sortBy === "pricehigh") {
    data.sort((a, b) => b.cost - a.cost);
  }

  return NextResponse.json({ data });
}
