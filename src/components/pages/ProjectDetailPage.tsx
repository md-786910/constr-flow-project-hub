
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, Euro, Users, FileText, Clock, Camera, MessageSquare } from "lucide-react";

export function ProjectDetailPage() {
  const { id } = useParams();
  
  // Mock project data
  const project = {
    id: 1,
    name: "Tech Corp Office Renovation",
    description: "Complete renovation of 5-story office building including electrical, plumbing, and interior design",
    client: "Tech Corporation Ltd.",
    status: "In Progress",
    progress: 65,
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: 450000,
    spent: 292500,
    teamSize: 8,
    manager: "Klaus Bauer"
  };

  const timeEntries = [
    { date: "2024-01-20", employee: "Klaus Bauer", hours: 8, task: "Project planning and coordination" },
    { date: "2024-01-20", employee: "Maria Fischer", hours: 7.5, task: "Electrical system design" },
    { date: "2024-01-19", employee: "Johann Schmidt", hours: 8, task: "Foundation work" },
    { date: "2024-01-19", employee: "Anna Weber", hours: 6, task: "Interior planning" }
  ];

  const documents = [
    { name: "Initial Quote.pdf", type: "Quote", date: "2024-01-10", size: "2.4 MB" },
    { name: "Building Permit.pdf", type: "Legal", date: "2024-01-12", size: "1.8 MB" },
    { name: "Progress Report Week 3.pdf", type: "Report", date: "2024-02-05", size: "4.2 MB" },
    { name: "Material Invoice #001.pdf", type: "Invoice", date: "2024-02-08", size: "856 KB" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/projects">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800">{project.name}</h1>
          <p className="text-slate-600">{project.client}</p>
        </div>
        <Badge className="bg-blue-100 text-blue-700">
          {project.status}
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-sm text-slate-500">Timeline</p>
                <p className="font-medium">{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Euro className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-sm text-slate-500">Budget</p>
                <p className="font-medium">€{project.budget.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Team Size</p>
                <p className="font-medium">{project.teamSize} members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200">
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-slate-500 mb-2">Progress</p>
              <Progress value={project.progress} className="h-2" />
              <p className="text-sm font-medium mt-1">{project.progress}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
          <TabsTrigger value="photos">Site Photos</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-slate-800">Description</h4>
                  <p className="text-sm text-slate-600">{project.description}</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Project Manager</h4>
                  <p className="text-sm text-slate-600">{project.manager}</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800">Client</h4>
                  <p className="text-sm text-slate-600">{project.client}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Electrical inspection completed</p>
                  <p className="text-slate-500">2 hours ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Material delivery confirmed</p>
                  <p className="text-slate-500">1 day ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Progress report submitted</p>
                  <p className="text-slate-500">3 days ago</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Project Documents
              </CardTitle>
              <CardDescription>All quotes, invoices, contracts, and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-slate-500">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">{doc.date}</p>
                      <Button variant="outline" size="sm" className="mt-1">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Time Tracking
              </CardTitle>
              <CardDescription>Hours logged by team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timeEntries.map((entry, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="font-medium">{entry.employee}</p>
                        <p className="text-sm text-slate-500">{entry.task}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{entry.hours}h</p>
                      <p className="text-sm text-slate-500">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Site Documentation
              </CardTitle>
              <CardDescription>Progress photos and site documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-slate-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Budget Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Budget</span>
                  <span className="font-medium">€{project.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Spent</span>
                  <span className="font-medium text-red-600">€{project.spent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Remaining</span>
                  <span className="font-medium text-green-600">€{(project.budget - project.spent).toLocaleString()}</span>
                </div>
                <Progress value={(project.spent / project.budget) * 100} className="h-2" />
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Materials</span>
                  <span className="font-medium">€180,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Labor</span>
                  <span className="font-medium">€85,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Equipment</span>
                  <span className="font-medium">€27,500</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Project Communication
              </CardTitle>
              <CardDescription>Messages and updates related to this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">Klaus Bauer</span>
                    <span className="text-sm text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-600">Electrical inspection completed successfully. Moving to next phase tomorrow.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">Maria Fischer</span>
                    <span className="text-sm text-slate-500">1 day ago</span>
                  </div>
                  <p className="text-sm text-slate-600">Material delivery confirmed for Thursday morning. Please ensure site access.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
