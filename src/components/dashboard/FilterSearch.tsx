import React, { memo, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import FiltersSection from "./FiltersSection";

interface Props {
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  filtersData: any[];
}

const FilterSearchComponent: React.FC<Props> = ({
  globalFilter,
  setGlobalFilter,
  filtersData,
}: Props) => {
  const [isFiltersOpened, setIsFiltersOpened] = useState(false);
  return (
    <>
      <div className="grid grid-cols-12 gap-2">
        <div className="relative mb-3 col-span-10">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray"
            size={18}
          />
          <input
            type="text"
            placeholder="Search for..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <Button
          className="col-span-1"
          onClick={() => setIsFiltersOpened(!isFiltersOpened)}
        >
          Filters
        </Button>
        <Button className="col-span-1">Export</Button>
      </div>
      {isFiltersOpened ? <FiltersSection filtersData={filtersData} /> : null}
    </>
  );
};
const FilterSearch=memo(FilterSearchComponent)
export default FilterSearch;
