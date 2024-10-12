import CustomCard from "@/components/Card";
import TableLoans from "@/sections/admin-loans/TableLoans";


export default function LoansPage() {
  return (
    <main className='w-full p-8'>
      <h1 className='mt-0 text-5xl font-bold text-center'>
        Administrar Préstamos
      </h1>
      <CustomCard>
        <TableLoans />
      </CustomCard>
    </main>
  )
}
