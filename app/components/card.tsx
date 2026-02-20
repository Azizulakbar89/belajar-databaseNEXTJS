import Image from "next/image";
import React from "react";
import { DeleteButton, EditButton } from "./button";
import { User } from "@prisma/client";

// menangkap prop dari data.ts
const Card = ({ data }: { data: User }) => {
  return (
    <div className="max-w-sm border border-gray-200 rounded-md shadow">
      <div className="relative w-full h-64">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="rounded-t-md object-cover"
        />
      </div>

      <div className="p-5">
        <h1 className="text-2xl font-bold text-gray-900 truncate">
          {data.name}
        </h1>
      </div>
      <div className="flex items-center justify-between">
        <EditButton id={data.id} />
        <DeleteButton id={data.id} />
      </div>
    </div>
  );
};

export default Card;
