"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, Grid2X2 } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Application } from "@/lib/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { filters, sortOptions } from "@/lib/constants";

export default function Hero({ data }: { data: Application[] }) {
  const [checked, setChecked] = useState<Number[]>([]);

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();

  const handleSortBy = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("sortBy", term);
    } else {
      params.delete("sortBy");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>

          <div className="flex items-center">
            <DropdownMenu>
              <div className="relative inline-block text-left">
                <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent>
                {sortOptions.map((option) => (
                  <DropdownMenuCheckboxItem
                    checked={checked.includes(option.id)}
                    onCheckedChange={(isChecked) => {
                      handleSortBy(option.value);
                      setChecked((prev) =>
                        isChecked
                          ? [...prev, option.id]
                          : prev.filter((id) => id !== option.id)
                      );
                    }}
                    className="pl-6 pr-4 py-2"
                    key={option.name}
                  >
                    <div>{option.name}</div>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              <Grid2X2 className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <div className="sr-only">Categories</div>
              <Accordion type="multiple">
                {filters.map((section) => (
                  <AccordionItem
                    value={section.id}
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    <>
                      <div className="-my-3 flow-root">
                        <AccordionTrigger className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                        </AccordionTrigger>
                      </div>
                      <AccordionContent className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div
                              key={option.value}
                              className="flex items-center"
                            >
                              <Input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                className="h-4 w-4 rounded"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </>
                  </AccordionItem>
                ))}
              </Accordion>
            </form>

            <div className="grid grid-cols-2 gap-2 col-span-3">
              {data.map((app) => (
                <Card key={app.id}>
                  <CardHeader>{app.name}</CardHeader>
                  <CardContent>
                    <p>{app.university}</p>
                    <p>{app.cost}</p>
                    <p>{app.deadline}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
