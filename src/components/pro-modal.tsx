"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
export default function ProModal() {
  const proModal = useProModal();
  const { toast } = useToast();

  const [loading, setLoading] = React.useState(false);
  const [mounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubscribe = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    }
  };
  if (!mounted) return null;
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.close}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">Upgrade to Pro</DialogTitle>
          <DialogDescription className="space-y-2 text-center">
            Create{" "}
            <span className="mx-1 font-medium text-sky-500">Custom AI</span>{" "}
            Companion!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex items-center justify-between">
          <p>
            $9 <span className="text-sm font-normal">.99/month</span>
          </p>
          <Button disabled={loading} onClick={onSubscribe} variant={"premium"}>
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
