import { revalidatePath } from "next/cache";
import { prisma } from "../lib/prisma";

export const getImages = async () => {
  try {
    const result = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return result;
  } catch (error) {
    throw new Error("gagal");
  }
};

export const getImageById = async (id: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
};
