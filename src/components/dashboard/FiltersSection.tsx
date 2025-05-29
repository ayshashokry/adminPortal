import React, { memo } from "react";
import Select from "react-select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface FilterColumn {
  columns: {
    id: string;
    getFilterValue: () => string;
    setFilterValue: (val: string) => void;
  };
  values: [];
  type: string;
  placeholder: string;
  paramName: string;
  paramWithID?: boolean;
}
interface Props {
  filtersData: FilterColumn[];
  onClickFilter?: (isReset: boolean) => void;
  tempFilters: {
    [key: string]: {
      value: string;
      keyName: string;
      id: string;
      keyType: string;
    };
  };
  setTempFilters: React.Dispatch<
    React.SetStateAction<{
      [key: string]: {
        value: string;
        keyName: string;
        id: string;
        keyType: string;
      };
    }>
  >;
}

const FiltersSectionComponent: React.FC<Props> = ({
  filtersData,
  onClickFilter,
  tempFilters,
  setTempFilters,
}: Props) => {
  return (
    <>
      <h6 className="text-black3 font-semibold">Filter</h6>
      <div className="border border-gray10 bg-white rounded-md my-2 p-6 flex flex-wrap gap-4">
        <div className="basis-3/4 flex flex-wrap gap-4">
          {filtersData?.map((col, index: number) => {
            if (col?.type == "array") {
              const allOptions = col.values.map((val: any) => ({
                value: col?.paramName?.includes("Role") ? val?.role : val?.name,
                id: val?.id,
                label: col?.paramName?.includes("Role") ? val?.role : val?.name,
              }));

              const optionsWithAll = [
                {
                  value: "__all__",
                  label: "All",
                  id: "__all__",
                },
                ...allOptions,
              ];

              const selectedValues = tempFilters[col.columns.id]
                ? tempFilters[col.columns.id].value.split(",")
                : [];

              const allSelected = selectedValues.length === allOptions.length;

              const selectedOptions = allSelected
                ? optionsWithAll
                : allOptions.filter((val: any) =>
                    selectedValues.includes(String(val.id))
                  );

              return (
                <div className="min-w-[200px] flex-1" key={index}>
                  <Select
                    key={index}
                    isMulti
                    options={optionsWithAll}
                    value={selectedOptions}
                    onChange={(selectedOptions) => {
                      if (!selectedOptions || selectedOptions.length === 0) {
                        setTempFilters((prev) => {
                          const updated = { ...prev };
                          delete updated[col.columns.id];
                          return updated;
                        });
                        return;
                      }

                      const isAllSelected = selectedOptions.some(
                        (opt: any) => opt.id === "__all__"
                      );

                      const newValues = isAllSelected
                        ? allOptions.map((opt) => opt.id)
                        : selectedOptions.map((opt: any) => opt.id);

                      setTempFilters((prev) => ({
                        ...prev,
                        [col.columns.id]: {
                          value: newValues.join(","),
                          keyName: col?.paramName,
                          id: col.columns.id,
                          keyType: col.type,
                        },
                      }));
                    }}
                    placeholder={col.placeholder}
                  />
                </div>
              );
            } else if (col?.type == "date") {
              return (
                <div className="min-w-[200px] flex-1" key={index}>
                  <Input
                    type="date"
                    placeholder={col.placeholder}
                    value={
                      tempFilters[col.paramName || col.columns.id]?.value || ""
                    }
                    onChange={(e) => {
                      const val = e.target.value;
                      setTempFilters((prev) => ({
                        ...prev,
                        [col.paramName || col.columns.id]: {
                          value: val,
                          keyName: col.paramName,
                          id: col.paramName || col.columns.id,
                          keyType: col.type,
                        },
                      }));
                    }}
                  />
                </div>
              );
            }
          })}
        </div>
        <div className="flex items-start justify-end gap-2 ml-auto">
          <Button
            className=" bg-white text-gray13 hover:text-white"
            onClick={() => {
              setTempFilters({});
              onClickFilter?.(true);
            }}
          >
            Reset
          </Button>
          <Button onClick={() => onClickFilter?.(false)}>Confirm</Button>
        </div>
      </div>
    </>
  );
};
const FiltersSection = memo(FiltersSectionComponent);
export default FiltersSection;
