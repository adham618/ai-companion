import Categories from "@/components/categories";
import Companions from "@/components/companions";
import SearchInput from "@/components/search-input";
import prisma from "@/lib/prismadb";

type HomePROPS = {
  searchParams: {
    categoryId: string;
    name: string;
  };
};

export default async function Home({ searchParams }: HomePROPS) {
  const { categoryId, name } = searchParams;
  const data = await prisma.companion.findMany({
    where: {
      categoryId: categoryId,
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: { messages: true },
      },
    },
  });
  const categories = await prisma.category.findMany();
  return (
    <div className="space-y-2 p-4">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
}
