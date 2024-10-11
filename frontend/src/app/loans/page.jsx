import CustomCard from "@/components/Card";
import MyLoansTable from "@/sections/loans/MyLoansTable";

export default function LoansPage() {
  return (
    <main className="w-full p-8">
      <h1 className="mt-0 text-5xl font-bold text-center">
        Mis Préstamos
      </h1>
      <CustomCard className="">
        <MyLoansTable />
      </CustomCard>
    </main>
  );
}
