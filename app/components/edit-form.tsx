"use client";

import React from "react";
import { updateImage } from "../lib/action";
import { useActionState } from "react";
import type { User } from "@prisma/client";

const EditForm = ({ data }: { data: User }) => {
  const [state, formAction] = useActionState(
    // updateImage.bind(null, data.id),
    updateImage.bind(null, String(data.id)),
    null,
  );
  return (
    <form action={formAction}>
      <div className="mb-4 pt-2">
        <input
          type="text"
          name="name"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="namamu"
          // defaultValue={data.name}
          defaultValue={data.name ?? ""}
        />
        {/* menampilkan validasi error */}
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.name}</p>
        </div>
      </div>
      <div className="mb-4 pt-2">
        <input
          type="file"
          name="image"
          className="file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300
          file:cursor-pointer border border-gray-400 w-full"
        />
        {/* menampilkan validasi error */}
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm text-red-500 mt-2">{state?.error?.image}</p>
        </div>
      </div>
      <div className="mb-4 pt-4">
        <button className="bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600">
          Update
        </button>
      </div>
    </form>
  );
};

export default EditForm;
