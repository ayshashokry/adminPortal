"use client";

import {
  camelCaseToSpace,
  capitalizeString,
  convertDateFormat,
} from "@/utils/helpers";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { dataKeys, statusInfo } from "@/data/MenuItemDetailsKeys";
import { useQuery } from "@tanstack/react-query";
import { FetchDetails } from "@/api/fetchDetails";
import useAuthStore from "@/store/authStore";
import Loading from "@/components/layout/Loading";
import HeaderLinks from "@/components/dashboard/HeaderLinks";

export default function DashboardDetails() {
  const { token } = useAuthStore();
  const params = useParams();
  const endPoint = dataKeys.find(
    (det) => det.detailsType === params.menuItem
  )?.detailsEndPoint;
  const { data, isLoading } = useQuery({
    queryKey: ["details", endPoint, params.id],
    queryFn: () =>
      FetchDetails({
        endPoint: endPoint as string,
        token,
        id: params.id as string,
      }),
    enabled: !!params.id && !!token,
  });

  const matchedStatus = statusInfo.find(
    (status) =>
      status.name.toLowerCase() == data?.data?.data?.status?.toLowerCase()
  );
  const [isLoad, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return isLoading || isLoad ? (
    <Loading />
  ) : (
    <>
      <HeaderLinks details={data?.data} />
      <div className="rounded-lg border-[1px] bg-white border-gray2 p-5 mt-5">
        {dataKeys
          ?.filter((det) => det.detailsType === params.menuItem)
          .map((d) =>
            d?.detailsKeys?.map((section, indx) => (
              <div
                key={indx}
                className={`${
                  section.title ? "border-[1px] border-gray2" : ""
                } rounded-md p-5 mt-5`}
              >
                <div className="flex items-center">
                  {section.title && (
                    <h4 className="text-black1 text-[18px] font-semibold flex items-center">
                      <Menu className="mr-3 text-gray11 w-[24px] h-[24px]" />
                      {section.title}
                    </h4>
                  )}
                  {section.keys.some((k) => k?.accessor?.includes("status")) &&
                    matchedStatus && (
                      <h5
                        className="ml-auto text-sm px-2 py-1 font-semibold"
                        style={{
                          backgroundColor: matchedStatus.bg,
                          color: matchedStatus.color,
                          border: `1px solid ${matchedStatus.border}`,
                          borderRadius: "15px",
                        }}
                      >
                        {capitalizeString(matchedStatus?.name)}
                      </h5>
                    )}
                </div>

                {section.keys.some(
                  (k) =>
                    k?.accessor.includes("Image") || k?.accessor.includes("url")
                ) &&
                  (data?.data?.data?.fileUrl || data?.data?.data?.url) && (
                    <div className="flex mt-3 mb-2 mx-9">
                      <Image
                        src={
                          section.keys.some((k) => k?.accessor.includes("url"))
                            ? data?.data?.data?.url
                            : data?.data?.data?.fileUrl
                        }
                        alt="Profile"
                        width={119}
                        height={116}
                        className="mt-2 mb-4 rounded-[16px] border border-[#B1B3B5] object-cover"
                      />
                    </div>
                  )}

                {section.keys.some((k) => !k?.accessor.includes("status")) && (
                  <div className="grid grid-cols-2 mx-9 mt-3">
                    {section.keys
                      .filter(
                        (key) =>
                          !key?.accessor.includes("Image") &&
                          !key?.accessor.includes("status") &&
                          !key?.accessor.includes("url")
                      )
                      .map((key, index) => (
                        <p key={index} className="text-sm my-3">
                          <span className="text-black1 font-bold">
                            {camelCaseToSpace(key?.title)}:{" "}
                          </span>
                          {key?.accessor.includes("date") ||
                          key?.accessor.includes("createdAt") ||
                          key?.accessor.includes("RequestedAt")
                            ? convertDateFormat(
                                String(data?.data?.data?.[key?.accessor])
                              )
                            : String(data?.data?.data?.[key?.accessor] ?? "-")}
                        </p>
                      ))}
                  </div>
                )}

                {d?.detailsKeys?.length &&
                  indx !== d?.detailsKeys?.length - 1 &&
                  !section.title && <div className="my-2 h-px bg-gray2"></div>}
              </div>
            ))
          )}
      </div>
    </>
  );
}
