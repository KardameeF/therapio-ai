import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { EmptyState } from "../components/empty-state";
import { useTranslation } from "react-i18next";
import { TrendingUp, Heart, Target, Calendar, Plus, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

export function DashboardPage() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // setHasData(false); // Uncomment to test empty state
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="flex justify-between items-center p-2 rounded border">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t("nav.app")}</h1>
          <p className="text-foreground-muted">Welcome back! Here's your wellness overview.</p>
        </div>
        
        <EmptyState
          icon={<BarChart3 className="h-6 w-6" />}
          title="No data yet"
          description="Start tracking your mood, sleep, and goals to see your wellness overview here."
          action={{
            label: "Add your first entry",
            onClick: () => console.log("Navigate to mood tracking")
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("nav.app")}</h1>
        <p className="text-foreground-muted">Welcome back! Here's your wellness overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2</div>
            <p className="text-xs text-muted-foreground">
              +0.5 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep Hours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.8h</div>
            <p className="text-xs text-muted-foreground">
              +0.3h from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stress Level</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.1</div>
            <p className="text-xs text-muted-foreground">
              -0.8 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Mood Entries</CardTitle>
            <CardDescription>Your latest mood tracking data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 rounded border">
                <span>Today</span>
                <span className="text-lg">😊 8/10</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded border">
                <span>Yesterday</span>
                <span className="text-lg">😐 6/10</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded border">
                <span>2 days ago</span>
                <span className="text-lg">😔 4/10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Goals</CardTitle>
            <CardDescription>Your current wellness goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 rounded border">
                <span>Daily meditation</span>
                <span className="text-sm text-muted-foreground">In progress</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded border">
                <span>Exercise 3x/week</span>
                <span className="text-sm text-muted-foreground">In progress</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded border">
                <span>Sleep 8 hours</span>
                <span className="text-sm text-green-600">Completed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
