
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, DollarSign, Clock, Users, TrendingUp, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function Dashboard() {
  const stats = [
    {
      title: "Active Projects",
      value: "12",
      change: "+2 this month",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Revenue This Month",
      value: "€245,600",
      change: "+18% from last month",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Hours Tracked",
      value: "1,240",
      change: "This week",
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Active Employees",
      value: "28",
      change: "+3 new hires",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  const recentProjects = [
    { id: 1, name: "Office Building Renovation", status: "In Progress", progress: 65, client: "Tech Corp" },
    { id: 2, name: "Residential Complex", status: "Planning", progress: 15, client: "City Development" },
    { id: 3, name: "Warehouse Extension", status: "Nearly Complete", progress: 90, client: "Logistics Inc" },
    { id: 4, name: "School Modernization", status: "In Progress", progress: 45, client: "Education Board" },
  ];

  const alerts = [
    { type: "warning", message: "Material delivery delayed for Office Building project", time: "2 hours ago" },
    { type: "success", message: "Warehouse Extension inspection completed successfully", time: "1 day ago" },
    { type: "info", message: "New quote request from Metro Construction", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening with your projects.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-orange-200 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-600" />
              Recent Projects
            </CardTitle>
            <CardDescription>Your most active construction projects</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-800">{project.name}</h4>
                    <p className="text-sm text-slate-500">{project.client}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                    project.status === "Planning" ? "bg-yellow-100 text-yellow-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {project.status}
                  </span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <p className="text-xs text-slate-500">{project.progress}% complete</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 border-orange-200 text-orange-600 hover:bg-orange-50">
              View All Projects
            </Button>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Recent Alerts
            </CardTitle>
            <CardDescription>Important updates and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50">
                {alert.type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />}
                {alert.type === "success" && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />}
                {alert.type === "info" && <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5" />}
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{alert.message}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 border-orange-200 text-orange-600 hover:bg-orange-50">
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-16 bg-orange-500 hover:bg-orange-600 flex flex-col gap-1">
              <Building2 className="w-5 h-5" />
              <span>New Project</span>
            </Button>
            <Button variant="outline" className="h-16 border-orange-200 text-orange-600 hover:bg-orange-50 flex flex-col gap-1">
              <FileText className="w-5 h-5" />
              <span>Create Quote</span>
            </Button>
            <Button variant="outline" className="h-16 border-orange-200 text-orange-600 hover:bg-orange-50 flex flex-col gap-1">
              <Clock className="w-5 h-5" />
              <span>Track Time</span>
            </Button>
            <Button variant="outline" className="h-16 border-orange-200 text-orange-600 hover:bg-orange-50 flex flex-col gap-1">
              <Users className="w-5 h-5" />
              <span>Add Customer</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
