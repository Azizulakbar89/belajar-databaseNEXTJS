"use server";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { put, del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getImageById } from "./data";

const UploadSchema = z.object({
  name: z.string().min(1),
  image: z
    //   validasi
    .instanceof(File)
    .refine((file) => file.size > 0, { message: "Image is required" })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "minimal bertipe gambar",
    })
    .refine((file) => file.size < 2000000, { message: "maksimal 2MB" }),
});

const EditSchema = z.object({
  name: z.string().min(1),
  image: z
    //   validasi
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "minimal bertipe gambar",
    })
    .refine((file) => file.size < 2000000, { message: "maksimal 2MB" })
    .optional(),
});

export const uploadImage = async (prevState: unknown, formData: FormData) => {
  const validatedFields = UploadSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, image } = validatedFields.data;
  const { url } = await put(image.name, image, {
    access: "public",
    multipart: true,
  });

  //   simapn di db
  try {
    await prisma.user.create({
      data: {
        name,
        image: url,
      },
    });
  } catch (error) {
    return { message: "gagal" };
  }

  //   revalidate dan redirect
  revalidatePath("/");
  redirect("/");
};

// update data
export const updateImage = async (
  id: string,
  prevState: unknown,
  formData: FormData,
) => {
  const validatedFields = EditSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = await getImageById(id);
  if (!data) return { message: "no data" };

  const { name, image } = validatedFields.data;
  let imagePath;
  if (!image || image.size <= 0) {
    imagePath = data.image;
  } else {
    await del(data.image);
    const { url } = await put(image.name, image, {
      access: "public",
      multipart: true,
    });
    imagePath = url;
  }

  try {
    await prisma.user.update({
      data: {
        name,
        image: imagePath,
      },
      where: { id: Number(id) },
    });
  } catch (error) {
    return { message: "gagal" };
  }

  //   revalidate dan redirect
  revalidatePath("/");
  redirect("/");
};

// hapus data
export const deleteImage = async (id: string): Promise<void> => {
  const data = await getImageById(id);

  if (!data) {
    return;
  }

  await del(data.image);

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    console.error("Delete failed:", error);
    return;
  }

  revalidatePath("/");
};
