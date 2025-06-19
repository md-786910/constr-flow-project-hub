
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Plus } from "lucide-react";

export function SiteDocumentationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Site Documentation</h1>
          <p className="text-slate-600">Capture and manage site photos and documentation</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Photo
        </Button>
      </div>

      <Card className="border-orange-200">
        <CardContent className="text-center py-12">
          <Camera className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-800 mb-2">Site Documentation Coming Soon</h3>
          <p className="text-slate-500 mb-4">Photo capture with geotagging and progress tracking</p>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Capture Photo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
