"use client";

import React from "react";
import { uploadImage } from "../lib/action";
import { useActionState } from "react";

const CreateForm = () => {
  const [state, formAction] = useActionState(uploadImage, null);
  return (
    <form action={formAction}>
      <div className="mb-4 pt-2">
        <input
          type="text"
          name="name"
          className="py-2 px-4 rounded-sm border border-gray-400 w-full"
          placeholder="namamu"
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
          upload
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
