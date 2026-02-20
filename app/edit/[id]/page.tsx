import { notFound } from "next/navigation";
import { getImageById } from "@/app/lib/data";
import EditForm from "@/app/components/edit-form";

const EditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params; // ✅ unwrap Promise

  const data = await getImageById(id); // ✅ pakai id, bukan params.id

  if (!data) return notFound();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white rounded-sm shadow p-8">
        <h1 className="text-2xl font-bold mb-5">Update Photo</h1>
        <EditForm data={data} />
      </div>
    </div>
  );
};

export default EditPage;
