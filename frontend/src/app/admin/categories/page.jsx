import CustomCard from "@/components/Card";
import TableCategories from "@/sections/admin-categories/TableCategories";

export default function page() {
  return (
    <main className="w-full p-8">
      <h1 className="mt-0 text-5xl font-bold text-center">
        Administrar categorías
      </h1>
      <CustomCard className="w-full">
        <TableCategories />
      </CustomCard>
    </main>
  )
}
