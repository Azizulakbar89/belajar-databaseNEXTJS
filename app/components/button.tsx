"use client";

import Link from "next/link";
import { deleteImage } from "../lib/action";

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`edit/${id}`}
      className="py-3 text-sm bg-gray-50 rounded-bl-md w-full hover:bg-gray-100 text-center"
    >
      Edit
    </Link>
  );
};
export const DeleteButton = ({ id }: { id: string }) => {
  const deleteImageWithId = deleteImage.bind(null, id);
  return (
    <form
      action={deleteImageWithId}
      className="py-3 text-sm bg-gray-50 rounded-br-md w-full hover:bg-gray-100 text-center"
    >
      <button type="submit">Delete</button>
    </form>
  );
};
