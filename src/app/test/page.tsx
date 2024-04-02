import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon, ChevronDown, ChevronUp, UserIcon } from "lucide-react";

const mockData = [
  {
    id: 1,
    title: "Total Student",
    num: 8.323,
    rate: 300,
  },
  {
    id: 2,
    title: "Offer Sent",
    num: 8.323,
    rate: 300,
  },
  {
    id: 3,
    title: "Accepted",
    num: 8.323,
    rate: -30,
  },
  {
    id: 4,
    title: "Registered",
    num: 8.323,
    rate: -30,
    selected: true,
  },
];
const tabsDAta = ["Student", "Agency", "Counselor", "Mentor"];
const mockData2 = [
  {
    id: 1,
    title: "New Announcement",
    owner: "Antalya Bilim Uni",
  },
  {
    id: 2,
    title: "Tast Updated",
    owner: "Name Surname",
  },
  {
    id: 3,
    title: "Tast Updated",
    owner: "Name Surname",
  },
  {
    id: 4,
    title: "New Announcement",
    owner: "Antalya Bilim Uni",
  },
  {
    id: 5,
    title: "Tast Updated",
    owner: "Name Surname",
  },
  {
    id: 6,
    title: "Tast Updated",
    owner: "Name Surname",
  },
];

export default function Page() {
  return (
    <main className="bg-[#F4F4F4] space-y-4 p-4">
      <section className="p-6 bg-white rounded-lg">
        <div className="flex justify-between items-center py-9">
          <div className="flex gap-1 md:gap-4 relative">
            {tabsDAta.map((tab, index) => (
              <>
                <div
                  key={tab}
                  className={cn(
                    index === 0
                      ? "text-[#51BAE7] font-semibold after:content-none relative"
                      : "text-[#7D8393]"
                  )}
                >
                  {tab}
                </div>
                {index === 1 && (
                  <div className="bg-[#51BAE7] absolute w-1/5 rounded-md h-[5px] -bottom-1"></div>
                )}
              </>
            ))}
          </div>
          <Button className="bg-[#51BAE7] px-3 hover:bg-[#A6DCF3]" size="lg">
            <CalendarIcon className="mr-2" size={15} /> Date Range
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {mockData.map((item) => (
            <Card
              className={cn(
                item.selected ? "bg-[#51BAE7] text-white" : "",
                " grow relative"
              )}
              key={item.id}
            >
              <SvgComponent />
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div>
                  <span className="text-[25px] font-medium">{item.num}</span>
                  <div className="text-xs font-normal flex items-center gap-2">
                    Weekly <Badge num={item.rate} />
                  </div>
                </div>
                <div className="">
                  <UserIcon size={32} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section className="rounded-lg flex gap-4">
        <Announcements />
        <LatestApplications />
      </section>
    </main>
  );
}

const Badge = ({ num }: { num: number }) => {
  return (
    <div
      className={cn(
        num < 0 ? "bg-[#F6CFD0] text-[#FF5353]" : "bg-[#DBF4DE] text-[#5CBF54]",
        "flex w-min py-[3px] px-[6px] rounded-md"
      )}
    >
      {num < 0 ? (
        <ChevronDown className="mr-[2px]" size={14} />
      ) : (
        <ChevronUp className="mr-[2px]" size={14} />
      )}
      <div>%{num}</div>
    </div>
  );
};

const SvgComponent = () => (
  <svg
    className="absolute bottom-0 right-0"
    xmlns="http://www.w3.org/2000/svg"
    width={187}
    height={150}
    fill="none"
  >
    <path
      fill="#F4F4F4"
      d="M66.5 108C55.7 135.6 17.667 147.5 0 150v4.5h203.5l4-156H162c-5.667 6.5-24.9 23.4-56.5 39C66 57 80 73.5 66.5 108Z"
      opacity={0.4}
    />
  </svg>
);

const Announcements = () => {
  return (
    <div className="w-[600px] px-[22px] py-8 space-y-6 bg-white rounded-lg">
      <p>Announcements</p>
      <div className="flex flex-col gap-4">
        {mockData2.map((item, index) => (
          <div key={item.id}>
            <div className="flex gap-4 items-center">
              <div
                className={cn(
                  index % 2 === 0 ? "bg-[#51BAE7]" : "bg-[#23255C]",
                  "w-8 h-8 rounded-full grid text-white place-items-center"
                )}
              >
                <UserIcon size={16} />
              </div>
              <div>
                <p className="text-sm">{item.title}</p>
                <p className="text-[11px]">{item.owner}</p>
              </div>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LatestApplications = () => {
  return <div className="bg-white w-full rounded-lg">-</div>;
};
