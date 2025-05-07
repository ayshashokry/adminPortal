import React, { memo } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "../ui/button";
interface FilterColumn {
  columns: {
    id: string;
    getFilterValue: () => string;
    setFilterValue: (val: string) => void;
  };
  values: string[];
}
interface Props {
  filtersData: FilterColumn[][];
}

const FiltersSectionComponent: React.FC<Props> = ({ filtersData }: Props) => {
  filtersData.map((x) => x.map((hh: any) => console.log(hh)));
  return (
    <>
      <h6 className="text-black3 font-semibold">Filter</h6>
      <div className="border border-gray10 bg-white rounded-md my-2 p-6 flex gap-2">
        {filtersData?.map((col) =>
          col?.map((data: any, index: number) => (
            <Select
              key={index}
              value={(data?.columns?.getFilterValue() as string) ?? ""}
              onValueChange={(value: string) =>
                data?.columns?.setFilterValue(value == "all" ? "" : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={`Filter by ${data?.columns?.id}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {data?.values?.map((d: any, index: number) => (
                  <SelectItem key={index} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))
        )}
        <Button className=" bg-white text-gray13 hover:text-white">
          Reset
        </Button>
        <Button>Confirm</Button>
      </div>
    </>
  );
};
const FiltersSection=memo(FiltersSectionComponent)
export default FiltersSection;
