
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";

export function TimeTrackingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Time Tracking</h1>
          <p className="text-slate-600">Track work hours and manage timesheets</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Start Timer
        </Button>
      </div>

      <Card className="border-orange-200">
        <CardContent className="text-center py-12">
          <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-2">Time Tracking Coming Soon</h3>
          <p className="text-slate-500 mb-4">Mobile-optimized time tracking with project integration</p>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Start Tracking
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
