import CustomCard from "@/components/Card";
import TableEditorials from "@/sections/admin-editorials/TableEditorials";

export default function AdminEditorialsPage() {
  return (
    <main className="w-full p-8">
      <h1 className="mt-0 text-5xl font-bold text-center">
        Administrar editoriales
      </h1>
      <CustomCard className="w-full">
        <TableEditorials />
      </CustomCard>
    </main>
  );
}