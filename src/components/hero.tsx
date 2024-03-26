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
import { filters, sortOptions } from "@/lib/constants";
import { Application } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ChevronDownIcon,
  FilterIcon,
  Ghost,
  Grid2X2,
  ListIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ApplicationCard from "./application-card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Hero({ data }: { data: Application[] }) {
  const [checked, setChecked] = useState<Number[]>([]);
  const [display, setDisplay] = useState<"grid" | "list">("grid");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({
    countries: [],
    languages: [],
    universities: [],
    duration: [],
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  //this function filters the data on the client side i didn't want to overcrowd the url params
  const filteredData = data.filter((app) => {
    const country = selectedFilters.countries.length
      ? selectedFilters.countries.includes(app.country)
      : true;
    const language = selectedFilters.languages.length
      ? selectedFilters.languages.includes(app.language)
      : true;
    const university = selectedFilters.universities.length
      ? selectedFilters.universities.includes(app.university)
      : true;
    const duration = selectedFilters.duration.length
      ? selectedFilters.duration.includes(
          app.duration === 1 ? "1 year" : `${app.duration} years`
        )
      : true;
    return country && language && university && duration;
  });

  //this function writes the sort by query parameter to the url so i can get the sorted data
  const handleSortBy = (term: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (isChecked) {
      params.set("sortBy", term);
    } else {
      params.delete("sortBy");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Applications
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
                {sortOptions.map((option, index) => (
                  <DropdownMenuCheckboxItem
                    checked={checked.includes(option.id)}
                    onCheckedChange={(isChecked) => {
                      handleSortBy(option.value, isChecked);
                      setChecked((prev) =>
                        isChecked
                          ? [...prev, option.id]
                          : prev.filter((id) => id !== option.id)
                      );
                    }}
                    className="pl-6 pr-4 py-2"
                    key={option.name}
                    disabled={index === 0 || index === 1}
                  >
                    <div>{option.name}</div>
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="link"
              onClick={() => setDisplay(display === "grid" ? "list" : "grid")}
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">Change grid display</span>
              {display === "grid" ? (
                <Grid2X2 className="h-5 w-5" aria-hidden="true" />
              ) : (
                <ListIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger className="lg:hidden">
                <FilterIcon className="h-5 w-5 ml-5 text-gray-400 hover:text-gray-500" />
              </SheetTrigger>
              <SheetContent>
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                </div>

                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>

                  <Accordion type="multiple">
                    {filters.map((section) => (
                      <AccordionItem
                        value={section.id}
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <AccordionTrigger className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                            </AccordionTrigger>
                          </h3>
                          <AccordionContent className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <Input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    onChange={(e) => {
                                      setSelectedFilters((prev) => ({
                                        ...prev,
                                        [section.id]: e.target.checked
                                          ? [...prev[section.id], option.label]
                                          : prev[section.id].filter(
                                              (val) => val !== option.label
                                            ),
                                      }));
                                    }}
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
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
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <section className="pb-24 pt-6">
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
                                onChange={(e) => {
                                  setSelectedFilters((prev) => ({
                                    ...prev,
                                    [section.id]: e.target.checked
                                      ? [...prev[section.id], option.label]
                                      : prev[section.id].filter(
                                          (val) => val !== option.label
                                        ),
                                  }));
                                }}
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
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-2 col-span-3 max-h-dvh overflow-scroll",
                display === "grid" ? "md:grid-cols-2" : "md:grid-cols-1"
              )}
            >
              {filteredData && filteredData.length !== 0 ? (
                filteredData.map((app) => (
                  <ApplicationCard key={app.id} {...app} />
                ))
              ) : (
                <div className="mt-16 flex flex-col items-center gap-2 col-span-2">
                  <Ghost />
                  <div className="font-semibold text-xl">
                    No applications found
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
