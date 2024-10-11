import CustomCard from "@/components/Card";
import TableCopyBooks from "@/sections/admin-copybooks/TableCopyBooks";

export default function CopyBooksPage() {
  return (
    <main className="w-full p-8">
      <h1 className="mt-0 text-5xl font-bold text-center">
        Ejemplares
      </h1>
      <CustomCard className="w-full px-5 py-5">
        <TableCopyBooks />
      </CustomCard>
    </main>
  );
}