
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FolderOpen, Plus, Search, Calendar, Users, Euro, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

export function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const projects = [
    {
      id: 1,
      name: "Tech Corp Office Renovation",
      description: "Complete renovation of 5-story office building including electrical, plumbing, and interior design",
      client: "Tech Corporation Ltd.",
      status: "In Progress",
      progress: 65,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      budget: 450000,
      teamSize: 8,
      manager: "Klaus Bauer"
    },
    {
      id: 2,
      name: "Residential Complex Phase 1",
      description: "Construction of 24-unit residential complex with underground parking",
      client: "City Development GmbH",
      status: "Planning",
      progress: 15,
      startDate: "2024-03-01",
      endDate: "2024-12-15",
      budget: 1200000,
      teamSize: 12,
      manager: "Maria Fischer"
    },
    {
      id: 3,
      name: "Industrial Warehouse Extension",
      description: "20,000 sqm warehouse extension with loading docks and office space",
      client: "Logistics Inc.",
      status: "Nearly Complete",
      progress: 90,
      startDate: "2023-08-20",
      endDate: "2024-02-28",
      budget: 850000,
      teamSize: 15,
      manager: "Stefan Müller"
    },
    {
      id: 4,
      name: "School Modernization Project",
      description: "Modernization of elementary school including new classrooms and playground",
      client: "Education Board",
      status: "In Progress",
      progress: 45,
      startDate: "2024-02-01",
      endDate: "2024-08-30",
      budget: 320000,
      teamSize: 6,
      manager: "Johann Schmidt"
    },
    {
      id: 5,
      name: "Medical Center Construction",
      description: "New medical center with specialized equipment installation",
      client: "Healthcare Group",
      status: "On Hold",
      progress: 30,
      startDate: "2024-01-10",
      endDate: "2024-09-15",
      budget: 680000,
      teamSize: 10,
      manager: "Anna Weber"
    }
  ];

  const statuses = ["all", "Planning", "In Progress", "Nearly Complete", "On Hold", "Completed"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      "Planning": "bg-yellow-100 text-yellow-700",
      "In Progress": "bg-blue-100 text-blue-700",
      "Nearly Complete": "bg-green-100 text-green-700",
      "On Hold": "bg-red-100 text-red-700",
      "Completed": "bg-slate-100 text-slate-700"
    };
    return colors[status] || "bg-slate-100 text-slate-700";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Projects</h1>
          <p className="text-slate-600">Manage your construction projects and track progress</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Set up a new construction project with timeline and budget.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name</Label>
                <Input id="projectName" placeholder="Enter project name" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the project scope and objectives" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech-corp">Tech Corporation Ltd.</SelectItem>
                      <SelectItem value="city-dev">City Development GmbH</SelectItem>
                      <SelectItem value="logistics">Logistics Inc.</SelectItem>
                      <SelectItem value="education">Education Board</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manager">Project Manager</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select manager" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="klaus">Klaus Bauer</SelectItem>
                      <SelectItem value="maria">Maria Fischer</SelectItem>
                      <SelectItem value="stefan">Stefan Müller</SelectItem>
                      <SelectItem value="johann">Johann Schmidt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget (€)</Label>
                  <Input id="budget" type="number" placeholder="450000" />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Create Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card className="border-orange-200">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Status" : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="text-sm">{project.client}</CardDescription>
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{project.description}</p>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Start:</span>
                    <span className="font-medium">{formatDate(project.startDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">End:</span>
                    <span className="font-medium">{formatDate(project.endDate)}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Euro className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Budget:</span>
                    <span className="font-medium text-green-600">{formatCurrency(project.budget)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-500">Team:</span>
                    <span className="font-medium">{project.teamSize} members</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-slate-500">Project Manager:</span>
                    <p className="font-medium">{project.manager}</p>
                  </div>
                  <Link to={`/projects/${project.id}`}>
                    <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="border-orange-200">
          <CardContent className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No projects found</h3>
            <p className="text-slate-500 mb-4">Create your first project to get started</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
