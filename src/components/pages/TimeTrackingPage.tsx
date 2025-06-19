
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Pause, Square, Plus, Calendar, Filter } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimeEntry {
  id: string;
  employee: string;
  project: string;
  task: string;
  startTime: string;
  endTime?: string;
  duration: number; // in minutes
  status: "Running" | "Paused" | "Completed";
  date: string;
  description?: string;
}

interface ActiveTimer {
  id: string;
  employee: string;
  project: string;
  task: string;
  startTime: Date;
  pausedTime?: number;
  status: "Running" | "Paused";
}

export function TimeTrackingPage() {
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([
    {
      id: "1",
      employee: "Klaus Bauer",
      project: "Tech Corp Office Renovation",
      task: "Project planning",
      startTime: "08:00",
      endTime: "12:00",
      duration: 240,
      status: "Completed",
      date: "2024-01-20",
      description: "Initial project planning and coordination"
    },
    {
      id: "2",
      employee: "Maria Fischer",
      project: "Tech Corp Office Renovation",
      task: "Electrical work",
      startTime: "09:00",
      endTime: "16:30",
      duration: 450,
      status: "Completed",
      date: "2024-01-20",
      description: "Installing electrical systems on 2nd floor"
    },
    {
      id: "3",
      employee: "Johann Schmidt",
      project: "Kitchen Renovation",
      task: "Plumbing installation",
      startTime: "07:30",
      duration: 120,
      status: "Running",
      date: "2024-01-21"
    }
  ]);

  const [activeTimers, setActiveTimers] = useState<ActiveTimer[]>([
    {
      id: "1",
      employee: "Johann Schmidt",
      project: "Kitchen Renovation",
      task: "Plumbing installation",
      startTime: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
      status: "Running"
    }
  ]);

  const [showNewEntry, setShowNewEntry] = useState(false);
  const [newEntry, setNewEntry] = useState({
    employee: "",
    project: "",
    task: "",
    startTime: "",
    endTime: "",
    description: ""
  });

  const [filterDate, setFilterDate] = useState(new Date().toISOString().split('T')[0]);

  const employees = ["Klaus Bauer", "Maria Fischer", "Johann Schmidt", "Anna Weber", "Thomas Mueller"];
  const projects = ["Tech Corp Office Renovation", "Kitchen Renovation", "Bathroom Renovation", "Garden Landscaping"];
  const taskTypes = ["Planning", "Electrical work", "Plumbing installation", "Carpentry", "Painting", "Cleanup"];

  const startTimer = (employee: string, project: string, task: string) => {
    const newTimer: ActiveTimer = {
      id: Date.now().toString(),
      employee,
      project,
      task,
      startTime: new Date(),
      status: "Running"
    };
    setActiveTimers(prev => [...prev, newTimer]);
  };

  const pauseTimer = (timerId: string) => {
    setActiveTimers(prev => prev.map(timer => 
      timer.id === timerId 
        ? { ...timer, status: "Paused" as const, pausedTime: Date.now() }
        : timer
    ));
  };

  const resumeTimer = (timerId: string) => {
    setActiveTimers(prev => prev.map(timer => 
      timer.id === timerId 
        ? { ...timer, status: "Running" as const, pausedTime: undefined }
        : timer
    ));
  };

  const stopTimer = (timerId: string) => {
    const timer = activeTimers.find(t => t.id === timerId);
    if (!timer) return;

    const duration = Math.floor((Date.now() - timer.startTime.getTime()) / (1000 * 60));
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      employee: timer.employee,
      project: timer.project,
      task: timer.task,
      startTime: timer.startTime.toTimeString().slice(0, 5),
      endTime: new Date().toTimeString().slice(0, 5),
      duration,
      status: "Completed",
      date: new Date().toISOString().split('T')[0]
    };

    setTimeEntries(prev => [...prev, newEntry]);
    setActiveTimers(prev => prev.filter(t => t.id !== timerId));
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const calculateTimerDuration = (timer: ActiveTimer) => {
    const now = timer.status === "Paused" && timer.pausedTime ? timer.pausedTime : Date.now();
    return Math.floor((now - timer.startTime.getTime()) / (1000 * 60));
  };

  const addManualEntry = () => {
    if (!newEntry.employee || !newEntry.project || !newEntry.task || !newEntry.startTime || !newEntry.endTime) return;

    const start = new Date(`2024-01-01 ${newEntry.startTime}`);
    const end = new Date(`2024-01-01 ${newEntry.endTime}`);
    const duration = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));

    const entry: TimeEntry = {
      id: Date.now().toString(),
      employee: newEntry.employee,
      project: newEntry.project,
      task: newEntry.task,
      startTime: newEntry.startTime,
      endTime: newEntry.endTime,
      duration,
      status: "Completed",
      date: filterDate,
      description: newEntry.description
    };

    setTimeEntries(prev => [...prev, entry]);
    setNewEntry({ employee: "", project: "", task: "", startTime: "", endTime: "", description: "" });
    setShowNewEntry(false);
  };

  const filteredEntries = timeEntries.filter(entry => entry.date === filterDate);
  const totalHoursToday = filteredEntries.reduce((sum, entry) => sum + entry.duration, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Time Tracking</h1>
          <p className="text-slate-600">Track work hours and manage timesheets</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowNewEntry(true)}
            variant="outline"
            className="border-[#7bcd40] text-[#7bcd40] hover:bg-[#7bcd40] hover:text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Manual Entry
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#7bcd40] hover:bg-[#6bb635] text-white">
                <Play className="w-4 h-4 mr-2" />
                Start Timer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start New Timer</DialogTitle>
                <DialogDescription>
                  Select project and task to start tracking time
                </DialogDescription>
              </DialogHeader>
              <StartTimerForm onStart={startTimer} employees={employees} projects={projects} taskTypes={taskTypes} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-[#7bcd40]/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#7bcd40]" />
              <div>
                <p className="text-sm text-slate-500">Today's Hours</p>
                <p className="text-2xl font-bold">{formatDuration(totalHoursToday)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-[#7bcd40]/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-slate-500">Active Timers</p>
                <p className="text-2xl font-bold">{activeTimers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#7bcd40]/20">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-slate-500">Entries Today</p>
                <p className="text-2xl font-bold">{filteredEntries.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="active">Active Timers</TabsTrigger>
          <TabsTrigger value="entries">Time Entries</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeTimers.length === 0 ? (
            <Card className="border-[#7bcd40]/20">
              <CardContent className="text-center py-12">
                <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">No Active Timers</h3>
                <p className="text-slate-500 mb-4">Start tracking time for your projects</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {activeTimers.map((timer) => (
                <Card key={timer.id} className="border-[#7bcd40]/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{timer.project}</h3>
                        <p className="text-slate-600">{timer.task} - {timer.employee}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={timer.status === "Running" ? "bg-[#7bcd40] text-white" : "bg-orange-100 text-orange-700"}>
                            {timer.status}
                          </Badge>
                          <span className="text-sm text-slate-500">
                            Started: {timer.startTime.toTimeString().slice(0, 5)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#7bcd40] mb-2">
                          {formatDuration(calculateTimerDuration(timer))}
                        </div>
                        <div className="flex space-x-2">
                          {timer.status === "Running" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => pauseTimer(timer.id)}
                            >
                              <Pause className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => resumeTimer(timer.id)}
                              className="border-[#7bcd40] text-[#7bcd40]"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => stopTimer(timer.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Square className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="entries" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <Label htmlFor="filter-date">Date:</Label>
              <Input
                id="filter-date"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-auto"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="border-[#7bcd40]/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{entry.employee}</h4>
                        <Badge className="bg-slate-100 text-slate-700">{entry.task}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{entry.project}</p>
                      {entry.description && (
                        <p className="text-sm text-slate-500 mt-1">{entry.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-[#7bcd40]">
                        {formatDuration(entry.duration)}
                      </div>
                      <div className="text-sm text-slate-500">
                        {entry.startTime} - {entry.endTime || "Running"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
              <CardDescription>Time tracking summary for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employees.map(employee => {
                  const employeeEntries = timeEntries.filter(e => e.employee === employee);
                  const totalHours = employeeEntries.reduce((sum, e) => sum + e.duration, 0);
                  return (
                    <div key={employee} className="flex justify-between items-center p-3 border rounded">
                      <span className="font-medium">{employee}</span>
                      <span className="text-[#7bcd40] font-semibold">{formatDuration(totalHours)}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Manual Entry Dialog */}
      <Dialog open={showNewEntry} onOpenChange={setShowNewEntry}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Manual Time Entry</DialogTitle>
            <DialogDescription>
              Add a time entry for completed work
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employee">Employee</Label>
                <Select onValueChange={(value) => setNewEntry(prev => ({ ...prev, employee: value }))}>
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
              <div>
                <Label htmlFor="project">Project</Label>
                <Select onValueChange={(value) => setNewEntry(prev => ({ ...prev, project: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map(project => (
                      <SelectItem key={project} value={project}>{project}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="task">Task</Label>
              <Select onValueChange={(value) => setNewEntry(prev => ({ ...prev, task: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select task type" />
                </SelectTrigger>
                <SelectContent>
                  {taskTypes.map(task => (
                    <SelectItem key={task} value={task}>{task}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={newEntry.startTime}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, startTime: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={newEntry.endTime}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, endTime: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={newEntry.description}
                onChange={(e) => setNewEntry(prev => ({ ...prev, description: e.target.value }))}
                placeholder="What was accomplished..."
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewEntry(false)}>
                Cancel
              </Button>
              <Button 
                onClick={addManualEntry}
                className="bg-[#7bcd40] hover:bg-[#6bb635]"
              >
                Add Entry
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Start Timer Form Component
function StartTimerForm({ 
  onStart, 
  employees, 
  projects, 
  taskTypes 
}: { 
  onStart: (employee: string, project: string, task: string) => void;
  employees: string[];
  projects: string[];
  taskTypes: string[];
}) {
  const [employee, setEmployee] = useState("");
  const [project, setProject] = useState("");
  const [task, setTask] = useState("");

  const handleStart = () => {
    if (employee && project && task) {
      onStart(employee, project, task);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="timer-employee">Employee</Label>
        <Select onValueChange={setEmployee}>
          <SelectTrigger>
            <SelectValue placeholder="Select employee" />
          </SelectTrigger>
          <SelectContent>
            {employees.map(emp => (
              <SelectItem key={emp} value={emp}>{emp}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="timer-project">Project</Label>
        <Select onValueChange={setProject}>
          <SelectTrigger>
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map(proj => (
              <SelectItem key={proj} value={proj}>{proj}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="timer-task">Task</Label>
        <Select onValueChange={setTask}>
          <SelectTrigger>
            <SelectValue placeholder="Select task" />
          </SelectTrigger>
          <SelectContent>
            {taskTypes.map(taskType => (
              <SelectItem key={taskType} value={taskType}>{taskType}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button 
        onClick={handleStart}
        disabled={!employee || !project || !task}
        className="w-full bg-[#7bcd40] hover:bg-[#6bb635]"
      >
        <Play className="w-4 h-4 mr-2" />
        Start Timer
      </Button>
    </div>
  );
}
