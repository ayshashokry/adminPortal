import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronRight,ChevronLeft, Home, PenSquare } from "lucide-react";
import {
  camelCaseToSpace,
  cleanURL,
  convertURLToArray,
  convertWordToSingular,
} from "@/utils/helpers";
import _ from "lodash";
import { useTranslation } from "react-i18next";

const HeaderLinks: React.FC = () => {
  const pathname = usePathname();
  const pathSegments = convertURLToArray(pathname);
  const pathItem = pathSegments[1]
    ? convertWordToSingular(pathSegments[1])
    : "";
  const router = useRouter();
  const pathSegmentsSliced =( pathname?.includes("details")&&!pathname.includes("edit"))
    ? [...pathSegments].slice(0, -1) // Copy and slice
    :pathname.includes('edit')?[...pathSegments].slice(0, -3).concat(pathSegments.slice(-1)): pathSegments;

  let headerTitle;
  if (pathname.includes("add")) {
    headerTitle = `Add ${convertWordToSingular(pathSegments[1])}`;
  } else if (pathname.includes("edit")) {
    headerTitle = `Edit ${convertWordToSingular(pathSegments[1])}`;
  } else if (pathname.includes("details")) {
    headerTitle = `${camelCaseToSpace(
      convertWordToSingular(pathSegments[1])
    )} Details`;
  } else {
    headerTitle = `${camelCaseToSpace(pathSegments[1])} List`;
  }
const{i18n}=useTranslation('')
  return (
    <div className="rounded-md border-[1px] bg-white border-gray2 p-5">
      <div className="header flex">
        <div>
          <div className="flex gap-2">
            <Home className="text-gray3" />
            {pathSegmentsSliced
              ?.slice(1)
              ?.map((segment: string, index: number) => (
                <div key={index} className="flex">
                 {i18n.language=='ar'?<ChevronLeft className="text-gray6" />: <ChevronRight className="text-gray6" />}
                  <span
                    onClick={() =>
                      pathSegmentsSliced.at(-1) == segment
                        ? ""
                        : router.push(
                            `/dashboard/${pathSegmentsSliced
                              .slice(1, index + 2)
                              .join("/")} ${
                              segment.includes("details")
                                ? "/" + pathSegments.at(-1)
                                : " "
                            }`
                          )
                    }
                    className={` text-[14px] text-black2 font-semibold mx-2 cursor-pointer ${
                      pathSegmentsSliced.at(-1) == segment
                        ? "bg-gray5 p-1 rounded-md"
                        : " p-1"
                    }`}
                  >
                    {camelCaseToSpace(decodeURIComponent(segment))}
                  </span>
                </div>
              ))}
          </div>
          <h4 className="text-black3 text-lg font-semibold pt-4">
            {headerTitle}
          </h4>
        </div>
        {pathSegments.length > 2 ? (
          pathname.includes("details")&&!pathname.includes("edit") ? (
            <Button
              className="ml-auto mt-auto bg-gray12 text-gray13 hover:text-white"
              onClick={() => router.push(`${pathname}/edit`)}
            >
              <PenSquare /> Edit
            </Button>
          ) : null
        ) : (
          <Button
            className="ml-auto mt-auto"
            onClick={() => {
              if (pathname.includes("add")) {
                router.push(`${pathname}/`);
              } else {
                router.push(`${pathname}/add${cleanURL(pathItem)}`);
              }
            }}
          >
            Add {_.capitalize(pathItem)}
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderLinks;
