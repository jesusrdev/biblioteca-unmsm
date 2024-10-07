import CustomCard from '@/components/Card'
import TableAuthors from '@/sections/admin-authors/TableAuthors'

export default function AdminAuthorsPage() {
  return (
    <main className="w-full p-8">
      <h1 className="mt-0 text-5xl font-bold text-center">
        Administrar autores
      </h1>
      <CustomCard className="w-full">
        <TableAuthors />
      </CustomCard>
    </main>
  )
}
