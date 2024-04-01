import prisma from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";

type CompanionIdPagePROPS = {
  params: { companionId: string };
};

export default async function CompanionIdPage({
  params,
}: CompanionIdPagePROPS) {
  // TODO: check subscription
  const { companionId } = params;
  const companion = await prisma.companion.findUnique({
    where: {
      id: companionId,
    },
  });
  const categories = await prisma.category.findMany();

  return <CompanionForm companion={companion} categories={categories} />;
}
