"use client"
import { useParams } from "next/navigation";
import React from "react";


const AddItem: React.FC= () => {
  const params = useParams();
  console.log("searchParams",params?.id)
  return <div>add new</div>;
};

export default AddItem;
