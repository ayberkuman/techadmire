import { User2Icon } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { Application } from "@/lib/types";

export default function ApplicationCard({
  id,
  name,
  university,
  country,
  duration,
  cost,
  deadline,
  language,
}: Application) {
  return (
    <Card key={id}>
      <CardHeader className="p-0">
        <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
          <User2Icon className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
          <div className="text-sm font-medium leading-6 text-gray-900">
            {name}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">University</dt>
            <dd className="text-gray-700">
              <div>{university}</div>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Deadline</dt>
            <dd className="text-gray-700">
              <div>{deadline}</div>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Cost</dt>
            <dd className="flex items-start gap-x-2">
              <div className="font-medium text-gray-900">{cost}$</div>
            </dd>
          </div>
          <div className="flex justify-between gap-x-4 py-3">
            <dt className="text-gray-500">Language</dt>
            <dd className="flex items-start gap-x-2">
              <div className="font-medium text-gray-900">{language}</div>
            </dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="flex items-center justify-around">
        <div className="flex justify-between gap-x-4 py-3">
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">{country}</div>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">
              {duration === 1 ? `${duration} year` : `${duration} years`}
            </div>
          </dd>
        </div>
      </CardFooter>
    </Card>
  );
}
