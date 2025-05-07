import React from 'react';

const FilterSelect: React.FC = () => {
  return (
    <div>
        {/* <Select
          value={(roleColumn?.getFilterValue() as string) ?? ""}
          onValueChange={(value) => roleColumn?.setFilterValue(value)}
        > */}
          {/* <SelectTrigger>
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
          </SelectContent>
        </Select> */}
    </div>
  );
};

export default FilterSelect;