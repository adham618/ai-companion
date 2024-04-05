import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { checkSubscription } from "@/lib/subscription";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPro = await checkSubscription();
  return (
    <>
      <Header isPro={isPro} />
      <div className="fixed inset-y-0 mt-16 hidden w-20 max-w-[90vw] md:flex">
        <Sidebar isPro={isPro} />
      </div>
      <main className="md:pl-20">{children}</main>
    </>
  );
}
