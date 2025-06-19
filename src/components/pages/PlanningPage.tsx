
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

export function PlanningPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Planning & Scheduling</h1>
          <p className="text-slate-600">Visual project planning and resource management</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          New Schedule
        </Button>
      </div>

      <Card className="border-orange-200">
        <CardContent className="text-center py-12">
          <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-2">Planning Board Coming Soon</h3>
          <p className="text-slate-500 mb-4">Gantt charts, Kanban boards, and resource scheduling</p>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Create Schedule
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
