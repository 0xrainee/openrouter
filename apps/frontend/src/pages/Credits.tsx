import { DashboardLayout } from "@/components/DashboardLayout";
import { useElysiaClient } from "@/providers/Eden"
import { useQuery } from "@tanstack/react-query";

export function Dashboard() {
  const elysiaClient = useElysiaClient();

  const apiKeysQuery = useQuery({
    queryKey: ["api-keys"],
    queryFn: async () => {
      const response = await elysiaClient["api-keys"].get();
      if (response.error) throw new Error("Failed to fetch API keys");
      return response.data;
    }
  });

  const modelQuery = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const response = await elysiaClient.models.get();
      if (response.error) throw new Error("Failed to fetch models");
      return response.data;
    }
  });

  const apiKeys = apiKeysQuery.data?.apiKeys ?? []
  const activeKeys = apiKeys.filter((k) => !k.disabled);
  const totalCreditsUsed = apiKeys.reduce(
    (sum, k) => sum + (k.creditsConsumed ?? 0),
    0
  );

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>
      </div>
    </DashboardLayout>
  )
}
