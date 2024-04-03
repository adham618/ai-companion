import prisma from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import CompanionForm from "./components/companion-form";

type CompanionIdPagePROPS = {
  params: { companionId: string };
};

export default async function CompanionIdPage({
  params,
}: CompanionIdPagePROPS) {
  // TODO: check subscription
  const { companionId } = params;
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }
  const companion = await prisma.companion.findUnique({
    where: {
      id: companionId,
      userId,
    },
  });
  const categories = await prisma.category.findMany();

  return <CompanionForm companion={companion} categories={categories} />;
}
