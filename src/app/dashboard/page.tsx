import Hero from "@/components/hero";
import { Application } from "@/lib/types";

export default async function Dashboard() {
  const response = await fetch("http://localhost:3000/api/applications");
  const data: { data: Application[] } = await response.json();

  return (
    <>
      <Hero data={data.data} />
    </>
  );
}
