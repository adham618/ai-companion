import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

export default function MobileSidebar({ isPro }: { isPro: boolean }) {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-32 bg-secondary p-0 pt-10">
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
}
