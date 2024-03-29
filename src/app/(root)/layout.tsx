import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="fixed inset-y-0 mt-16 hidden w-20 max-w-[90vw] md:flex">
        <Sidebar />
      </div>
      {children}
    </>
  );
}
