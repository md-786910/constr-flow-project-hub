
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Plus, Search, Mail, Phone, Edit, Trash2, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const employees = [
    {
      id: 1,
      name: "Klaus Bauer",
      role: "Project Manager",
      email: "klaus.bauer@company.com",
      phone: "+49 30 12345678",
      hourlyRate: 65,
      skills: ["Leadership", "Planning", "AutoCAD"],
      status: "Active",
      joinDate: "2020-03-15"
    },
    {
      id: 2,
      name: "Maria Fischer",
      role: "Electrical Engineer",
      email: "maria.fischer@company.com",
      phone: "+49 30 87654321",
      hourlyRate: 55,
      skills: ["Electrical", "Installation", "Safety"],
      status: "Active",
      joinDate: "2021-07-20"
    },
    {
      id: 3,
      name: "Johann Schmidt",
      role: "Mason",
      email: "johann.schmidt@company.com",
      phone: "+49 30 55667788",
      hourlyRate: 42,
      skills: ["Masonry", "Concrete", "Stonework"],
      status: "Active",
      joinDate: "2019-11-08"
    },
    {
      id: 4,
      name: "Anna Weber",
      role: "Carpenter",
      email: "anna.weber@company.com",
      phone: "+49 30 44332211",
      hourlyRate: 48,
      skills: ["Woodwork", "Framing", "Finishing"],
      status: "Active",
      joinDate: "2022-01-12"
    },
    {
      id: 5,
      name: "Stefan Müller",
      role: "Foreman",
      email: "stefan.mueller@company.com",
      phone: "+49 30 99887766",
      hourlyRate: 58,
      skills: ["Supervision", "Quality Control", "Safety"],
      status: "On Leave",
      joinDate: "2018-05-30"
    },
    {
      id: 6,
      name: "Lisa Hoffmann",
      role: "Architect",
      email: "lisa.hoffmann@company.com",
      phone: "+49 30 66554433",
      hourlyRate: 75,
      skills: ["Design", "CAD", "3D Modeling"],
      status: "Active",
      joinDate: "2021-09-14"
    }
  ];

  const roles = ["all", "Project Manager", "Electrical Engineer", "Mason", "Carpenter", "Foreman", "Architect"];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || employee.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    const colors = {
      "Project Manager": "bg-blue-100 text-blue-700",
      "Electrical Engineer": "bg-yellow-100 text-yellow-700",
      "Mason": "bg-stone-100 text-stone-700",
      "Carpenter": "bg-amber-100 text-amber-700",
      "Foreman": "bg-purple-100 text-purple-700",
      "Architect": "bg-green-100 text-green-700"
    };
    return colors[role] || "bg-slate-100 text-slate-700";
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Employees</h1>
          <p className="text-slate-600">Manage your team members and their roles</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>Add a new team member to your construction company.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Full Name</Label>
                  <Input id="employeeName" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project-manager">Project Manager</SelectItem>
                      <SelectItem value="engineer">Engineer</SelectItem>
                      <SelectItem value="foreman">Foreman</SelectItem>
                      <SelectItem value="carpenter">Carpenter</SelectItem>
                      <SelectItem value="electrician">Electrician</SelectItem>
                      <SelectItem value="mason">Mason</SelectItem>
                      <SelectItem value="laborer">Laborer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="employee@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+49 30 12345678" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (€)</Label>
                  <Input id="hourlyRate" type="number" placeholder="45.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joinDate">Join Date</Label>
                  <Input id="joinDate" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input id="skills" placeholder="e.g., Electrical, Safety, Installation" />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Save Employee
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
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map(role => (
                  <SelectItem key={role} value={role}>
                    {role === "all" ? "All Roles" : role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white font-semibold">
                      {getInitials(employee.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{employee.name}</CardTitle>
                    <Badge className={getRoleColor(employee.role)} variant="secondary">
                      {employee.role}
                    </Badge>
                  </div>
                </div>
                <Badge 
                  variant={employee.status === "Active" ? "default" : "outline"}
                  className={employee.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                >
                  {employee.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Hourly Rate:</span>
                  <span className="text-lg font-bold text-green-600">€{employee.hourlyRate}</span>
                </div>
                
                <div>
                  <span className="text-sm text-slate-500 block mb-1">Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {employee.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {employee.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{employee.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-3">
                <Button variant="outline" size="sm" className="flex-1 border-orange-200 text-orange-600 hover:bg-orange-50">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="border-orange-200">
          <CardContent className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No employees found</h3>
            <p className="text-slate-500 mb-4">Add team members to get started</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
