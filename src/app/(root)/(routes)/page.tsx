import Categories from "@/components/categories";
import SearchInput from "@/components/search-input";
import prisma from "@/lib/prismadb";

export default async function Home() {
  const categories = await prisma.category.findMany();
  return (
    <div className="space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
    </div>
  );
}
