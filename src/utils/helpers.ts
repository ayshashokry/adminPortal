import { api } from "@/lib/utils";
import { startCase } from "lodash";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const maskEmail = (email: string): string => {
  const [emailBase, domain] = email.split("@");
  if (!domain) return email;
  if (emailBase.length <= 3) {
    return `${emailBase}***@${domain}`;
  }

  return `${emailBase.slice(0, 3)}***@${domain}`;
};

export const getInitialsChars = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("");
};

export const camelCaseToSpace = (str: string) => {
  return startCase(str?.replace(/([a-z])([A-Z])/g, "$1 $2")?.toLowerCase());
};

export const convertURLToArray = (pathname: string) => {
  return pathname.split("/").filter(Boolean);
};

export const convertWordToSingular = (word: string) => {
  return startCase(word.endsWith("s") ? word.slice(0, -1) : word);
};

export const cleanURL = (url: string) => {
  // Optionally replace spaces with dashes or underscores for a cleaner URL
  return url.replace(/\s+/g, ""); // Replaces spaces with dashes
};

export const getUniqueValuesFromArray = async (
  obj: { name: string; endPoint?: string; data?: string[] },
  token: string | null
) => {
  if (obj?.endPoint) {
    try {
      const res = await api.get(`${obj?.endPoint}`, {
        headers: {
          "Accept-Language": "en",
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      if (res) {
        return res?.data?.data?.result?.map((item: any) => item);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return obj?.data;
  }
  //   }
  // data.forEach((element) => {
  //   if (element[key] !== null) {
  //     set.add(element[key] as string | number | boolean);
  //   }
  // });
};

export const convertDateFormat = (
  dateStr: string | null | undefined
): string => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "-";

  return dateStr ? date?.toISOString().split("T")[0] : "";
};

export const capitalizeString = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const exportToExcel = (data: any[], fileName = "table_data") => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, `${fileName}.xlsx`);
};


export const exportToPDF = (
  data: any[],
  columns: { header: string; accessorKey: string }[],
  fileName = "table_data"
) => {
  const doc = new jsPDF();

  const tableColumnTitles = columns.map(col => col.header);
  const tableRows = data.map(row =>
    columns.map(col => String(row[col.accessorKey] ?? ""))
  );

  autoTable(doc, {
    head: [tableColumnTitles],
    body: tableRows,
  });

  doc.save(`${fileName}.pdf`);
};
