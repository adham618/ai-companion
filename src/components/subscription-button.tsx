"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Sparkles } from "lucide-react";
import * as React from "react";

type SubscriptionButtonProps = {
  isPro: boolean;
};
export default function SubscriptionButton({
  isPro = false,
}: SubscriptionButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (e) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      size={"sm"}
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="ml-2 h-3 w-3 fill-white" />}
    </Button>
  );
}
