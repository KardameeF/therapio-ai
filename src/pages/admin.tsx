import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useTranslation } from "react-i18next";
import { Users, BarChart3, Settings, Shield } from "lucide-react";

export function AdminPage() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleExportData = async () => {
    setLoading(true);
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    alert("Data export completed!");
  };

  const handleSystemMaintenance = async () => {
    setLoading(true);
    // Simulate maintenance
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    alert("System maintenance completed!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8" />
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">Manage your Therapio AI application</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">456</div>
            <p className="text-xs text-muted-foreground">
              +8% from last hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mood Entries</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,912</div>
            <p className="text-xs text-muted-foreground">
              +23% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-muted-foreground">
              Uptime this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                View All Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                User Permissions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                User Analytics
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Operations</CardTitle>
            <CardDescription>System maintenance and data management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleExportData}
                disabled={loading}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                {loading ? "Exporting..." : "Export All Data"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleSystemMaintenance}
                disabled={loading}
              >
                <Settings className="mr-2 h-4 w-4" />
                {loading ? "Running..." : "System Maintenance"}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4" />
                Security Audit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 rounded border">
              <span className="text-sm">New user registration</span>
              <span className="text-xs text-muted-foreground">2 minutes ago</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded border">
              <span className="text-sm">System backup completed</span>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded border">
              <span className="text-sm">Database optimization</span>
              <span className="text-xs text-muted-foreground">3 hours ago</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded border">
              <span className="text-sm">Security scan completed</span>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
