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
import { ChevronDownIcon, Ghost, Grid2X2, User2Icon } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Application } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { filters, sortOptions } from "@/lib/constants";

export default function Hero({ data }: { data: Application[] }) {
  const [checked, setChecked] = useState<Number[]>([]);
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

  const handleSortBy = (term: string, isChecked: boolean) => {
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 col-span-3">
              {filteredData && filteredData.length !== 0 ? (
                filteredData.map((app) => (
                  <Card key={app.id}>
                    <CardHeader className="p-0">
                      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                        <User2Icon className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
                        <div className="text-sm font-medium leading-6 text-gray-900">
                          {app.name}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                        <div className="flex justify-between gap-x-4 py-3">
                          <dt className="text-gray-500">University</dt>
                          <dd className="text-gray-700">
                            <div>{app.university}</div>
                          </dd>
                        </div>
                        <div className="flex justify-between gap-x-4 py-3">
                          <dt className="text-gray-500">Deadline</dt>
                          <dd className="text-gray-700">
                            <div>{app.deadline}</div>
                          </dd>
                        </div>
                        <div className="flex justify-between gap-x-4 py-3">
                          <dt className="text-gray-500">Cost</dt>
                          <dd className="flex items-start gap-x-2">
                            <div className="font-medium text-gray-900">
                              {app.cost}$
                            </div>
                          </dd>
                        </div>
                        <div className="flex justify-between gap-x-4 py-3">
                          <dt className="text-gray-500">Language</dt>
                          <dd className="flex items-start gap-x-2">
                            <div className="font-medium text-gray-900">
                              {app.language}
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                    <CardFooter className="flex items-center justify-around">
                      <div className="flex justify-between gap-x-4 py-3">
                        <dd className="flex items-start gap-x-2">
                          <div className="font-medium text-gray-900">
                            {app.country}
                          </div>
                        </dd>
                      </div>
                      <div className="flex justify-between gap-x-4 py-3">
                        <dd className="flex items-start gap-x-2">
                          <div className="font-medium text-gray-900">
                            {app.duration === 1
                              ? `${app.duration} year`
                              : `${app.duration} years`}
                          </div>
                        </dd>
                      </div>
                    </CardFooter>
                  </Card>
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
    </div>
  );
}
