import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";

export default async function SettingsPage() {
  const isPro = await checkSubscription();
  return (
    <div className="h-full space-y-2 p-4">
      <h2 className="text-lg font-medium">Settings</h2>
      <p className="text-sm text-muted-foreground">
        {isPro
          ? "You are currently on the Pro plan."
          : "You are currently on the Free plan."}
      </p>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
}
