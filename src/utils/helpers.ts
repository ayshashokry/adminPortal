import _ from "lodash";
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
  return _.startCase(str?.replace(/([a-z])([A-Z])/g, "$1 $2")?.toLowerCase());
};

export const convertURLToArray = (pathname: string) => {
  return pathname.split("/").filter(Boolean);
};

export const convertWordToSingular = (word: string) => {
  return _.startCase(word.endsWith("s") ? word.slice(0, -1) : word);
};

export const cleanURL = (url: string) => {
  // Optionally replace spaces with dashes or underscores for a cleaner URL
  return url.replace(/\s+/g, ""); // Replaces spaces with dashes
};

export const getUniqueValuesFromArray = <TData>(
  data: TData[],
  key: keyof TData
): (string | number | boolean)[] => {
  const set = new Set<string | number | boolean>();
  data.forEach((element) => {
    if (element[key] !== null) {
      set.add(element[key] as string | number | boolean);
    }
  });

  return Array.from(set);
};
