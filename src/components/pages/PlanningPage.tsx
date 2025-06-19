
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, Users, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ScheduleEvent {
  id: string;
  title: string;
  project: string;
  employee: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  location?: string;
  description?: string;
  color: string;
}

interface Project {
  id: string;
  name: string;
  customer: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
}

export function PlanningPage() {
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([
    {
      id: "1",
      title: "Site Inspection",
      project: "Tech Corp Office Renovation",
      employee: "Klaus Bauer",
      startDate: "2024-01-22",
      endDate: "2024-01-22",
      startTime: "09:00",
      endTime: "11:00",
      status: "Scheduled",
      location: "Tech Corp Building, Floor 2",
      description: "Initial site inspection and measurements",
      color: "#7bcd40"
    },
    {
      id: "2",
      title: "Electrical Installation",
      project: "Tech Corp Office Renovation",
      employee: "Maria Fischer",
      startDate: "2024-01-23",
      endDate: "2024-01-25",
      startTime: "08:00",
      endTime: "16:00",
      status: "Scheduled",
      location: "Tech Corp Building",
      description: "Installing electrical systems for floors 2-3",
      color: "#3b82f6"
    },
    {
      id: "3",
      title: "Plumbing Work",
      project: "Kitchen Renovation",
      employee: "Johann Schmidt",
      startDate: "2024-01-22",
      endDate: "2024-01-24",
      startTime: "07:30",
      endTime: "15:30",
      status: "In Progress",
      location: "Residential Property",
      description: "Kitchen plumbing installation and testing",
      color: "#f59e0b"
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "Tech Corp Office Renovation",
      customer: "Tech Corporation Ltd.",
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      progress: 65,
      status: "In Progress"
    },
    {
      id: "2",
      name: "Kitchen Renovation",
      customer: "Home Solutions GmbH",
      startDate: "2024-01-20",
      endDate: "2024-03-15",
      progress: 30,
      status: "In Progress"
    }
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    project: "",
    employee: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    description: ""
  });

  const employees = ["Klaus Bauer", "Maria Fischer", "Johann Schmidt", "Anna Weber", "Thomas Mueller"];
  const projectNames = projects.map(p => p.name);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Scheduled": return "bg-blue-100 text-blue-700";
      case "In Progress": return "bg-[#7bcd40]/20 text-[#7bcd40]";
      case "Completed": return "bg-green-100 text-green-700";
      case "Cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const addScheduleEvent = () => {
    if (!newEvent.title || !newEvent.project || !newEvent.employee || !newEvent.startDate) return;

    const event: ScheduleEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      project: newEvent.project,
      employee: newEvent.employee,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate || newEvent.startDate,
      startTime: newEvent.startTime || "09:00",
      endTime: newEvent.endTime || "17:00",
      status: "Scheduled",
      location: newEvent.location,
      description: newEvent.description,
      color: "#7bcd40"
    };

    setScheduleEvents(prev => [...prev, event]);
    setNewEvent({
      title: "",
      project: "",
      employee: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
      description: ""
    });
    setShowNewEvent(false);
  };

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return scheduleEvents.filter(event => 
      event.startDate <= dateString && event.endDate >= dateString
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Planning & Scheduling</h1>
          <p className="text-slate-600">Visual project planning and resource management</p>
        </div>
        <Button 
          onClick={() => setShowNewEvent(true)}
          className="bg-[#7bcd40] hover:bg-[#6bb635] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Schedule
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-[#7bcd40]/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-[#7bcd40]" />
              <div>
                <p className="text-sm text-slate-500">Today's Events</p>
                <p className="text-2xl font-bold">{getEventsForDate(new Date()).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-[#7bcd40]/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Active Projects</p>
                <p className="text-2xl font-bold">{projects.filter(p => p.status === "In Progress").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#7bcd40]/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-slate-500">This Week</p>
                <p className="text-2xl font-bold">{scheduleEvents.filter(e => {
                  const eventDate = new Date(e.startDate);
                  const weekStart = new Date(currentDate);
                  weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);
                  const weekEnd = new Date(weekStart);
                  weekEnd.setDate(weekStart.getDate() + 6);
                  return eventDate >= weekStart && eventDate <= weekEnd;
                }).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#7bcd40]/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-slate-500">Locations</p>
                <p className="text-2xl font-bold">{new Set(scheduleEvents.map(e => e.location).filter(Boolean)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="projects">Project Gantt</TabsTrigger>
          <TabsTrigger value="resources">Resource Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CardTitle>
                    {viewMode === "week" 
                      ? `Week of ${currentDate.toLocaleDateString()}`
                      : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                    }
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMode("week")}
                      className={viewMode === "week" ? "bg-[#7bcd40] text-white" : ""}
                    >
                      Week
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewMode("month")}
                      className={viewMode === "month" ? "bg-[#7bcd40] text-white" : ""}
                    >
                      Month
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewMode === "week" ? navigateWeek("prev") : navigateMonth("prev")}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewMode === "week" ? navigateWeek("next") : navigateMonth("next")}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "week" ? (
                <div className="grid grid-cols-7 gap-2">
                  {getWeekDays(currentDate).map((day, index) => (
                    <div key={index} className="min-h-[200px] border rounded p-2">
                      <div className="font-medium text-center mb-2">
                        {day.toLocaleDateString('en-US', { weekday: 'short' })}
                        <br />
                        <span className="text-sm">{day.getDate()}</span>
                      </div>
                      <div className="space-y-1">
                        {getEventsForDate(day).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-2 rounded text-white"
                            style={{ backgroundColor: event.color }}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div>{event.startTime} - {event.endTime}</div>
                            <div>{event.employee}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Month view coming soon</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>Gantt chart view of all active projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-slate-500">{project.customer}</p>
                      </div>
                      <Badge className={project.status === "In Progress" ? "bg-[#7bcd40] text-white" : "bg-gray-100 text-gray-700"}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>{new Date(project.startDate).toLocaleDateString()}</span>
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-[#7bcd40] h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span>{new Date(project.endDate).toLocaleDateString()}</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle>Resource Allocation</CardTitle>
              <CardDescription>Employee workload and availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map((employee) => {
                  const employeeEvents = scheduleEvents.filter(e => e.employee === employee);
                  const thisWeekEvents = employeeEvents.filter(e => {
                    const eventDate = new Date(e.startDate);
                    const weekStart = new Date(currentDate);
                    weekStart.setDate(currentDate.getDate() - currentDate.getDay() + 1);
                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 6);
                    return eventDate >= weekStart && eventDate <= weekEnd;
                  });
                  const workload = Math.min(100, (thisWeekEvents.length / 5) * 100);

                  return (
                    <div key={employee} className="border rounded p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{employee}</h4>
                        <Badge className={workload > 80 ? "bg-red-100 text-red-700" : workload > 50 ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}>
                          {workload.toFixed(0)}% loaded
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {thisWeekEvents.slice(0, 3).map((event) => (
                          <div key={event.id} className="flex items-center justify-between text-sm">
                            <span>{event.title}</span>
                            <span className="text-slate-500">{event.startDate}</span>
                          </div>
                        ))}
                        {thisWeekEvents.length > 3 && (
                          <div className="text-sm text-slate-500">
                            +{thisWeekEvents.length - 3} more events
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Event Dialog */}
      <Dialog open={showNewEvent} onOpenChange={setShowNewEvent}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Schedule</DialogTitle>
            <DialogDescription>
              Schedule a new task or appointment
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="event-title">Title</Label>
                <Input
                  id="event-title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Event title"
                />
              </div>
              <div>
                <Label htmlFor="event-project">Project</Label>
                <Select onValueChange={(value) => setNewEvent(prev => ({ ...prev, project: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectNames.map(project => (
                      <SelectItem key={project} value={project}>{project}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="event-employee">Assigned Employee</Label>
              <Select onValueChange={(value) => setNewEvent(prev => ({ ...prev, employee: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(employee => (
                    <SelectItem key={employee} value={employee}>{employee}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={newEvent.startDate}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={newEvent.endDate}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEvent.location}
                onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Work location or address"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newEvent.description}
                onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Task description or notes"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewEvent(false)}>
                Cancel
              </Button>
              <Button 
                onClick={addScheduleEvent}
                className="bg-[#7bcd40] hover:bg-[#6bb635]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Create Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
