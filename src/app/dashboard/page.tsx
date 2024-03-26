import Hero from "@/components/hero";
import { Application } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: {
    sortBy?: string;
  };
}) {
  const sortQuery = searchParams?.sortBy || "";

  //this page is fully server side rendered with a React Server Component and next.js will
  //automatically cache the data so you probably won't see the loader
  const response = await fetch(
    `http://localhost:3000/api/applications?sortBy=${sortQuery}`
  );
  const data: {
    data: Application[];
  } = await response.json();

  return (
    <>
      <Suspense fallback={<Loader2 className="mx-auto mt-8 animate-spin" />}>
        <Hero data={data.data} />
      </Suspense>
    </>
  );
}
