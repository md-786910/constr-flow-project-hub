
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Wrench, Plus, Search, Euro, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const services = [
    {
      id: 1,
      name: "Electrical Installation",
      description: "Complete electrical wiring and installation services",
      category: "Electrical",
      unit: "per point",
      basePrice: 85,
      sku: "ELE-001"
    },
    {
      id: 2,
      name: "Plumbing - Water Line Installation",
      description: "Installation of water supply lines",
      category: "Plumbing",
      unit: "per meter",
      basePrice: 45,
      sku: "PLU-002"
    },
    {
      id: 3,
      name: "Concrete Foundation Work",
      description: "Foundation laying and concrete work",
      category: "Foundation",
      unit: "per m²",
      basePrice: 120,
      sku: "CON-003"
    },
    {
      id: 4,
      name: "Roofing - Tile Installation",
      description: "Clay tile roof installation and repair",
      category: "Roofing",
      unit: "per m²",
      basePrice: 75,
      sku: "ROO-004"
    },
    {
      id: 5,
      name: "Interior Painting",
      description: "Professional interior wall painting",
      category: "Painting",
      unit: "per m²",
      basePrice: 25,
      sku: "PAI-005"
    },
    {
      id: 6,
      name: "HVAC System Installation",
      description: "Heating, ventilation and AC installation",
      category: "HVAC",
      unit: "per unit",
      basePrice: 2500,
      sku: "HVA-006"
    }
  ];

  const categories = ["all", "Electrical", "Plumbing", "Foundation", "Roofing", "Painting", "HVAC"];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      Electrical: "bg-yellow-100 text-yellow-700",
      Plumbing: "bg-blue-100 text-blue-700",
      Foundation: "bg-stone-100 text-stone-700",
      Roofing: "bg-red-100 text-red-700",
      Painting: "bg-purple-100 text-purple-700",
      HVAC: "bg-green-100 text-green-700"
    };
    return colors[category] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Services & Materials</h1>
          <p className="text-slate-600">Manage your service catalog and pricing</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Create a new service or material for your catalog.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input id="serviceName" placeholder="Enter service name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="ELE-001" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the service or material" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="painting">Painting</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per-hour">per hour</SelectItem>
                      <SelectItem value="per-m2">per m²</SelectItem>
                      <SelectItem value="per-meter">per meter</SelectItem>
                      <SelectItem value="per-unit">per unit</SelectItem>
                      <SelectItem value="per-point">per point</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price (€)</Label>
                  <Input id="basePrice" type="number" placeholder="0.00" />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Save Service
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
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <CardDescription className="text-sm">{service.sku}</CardDescription>
                  </div>
                </div>
                <Badge className={getCategoryColor(service.category)}>
                  {service.category}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <p className="text-sm text-slate-600">{service.description}</p>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Unit:</span>
                  <span className="text-sm font-medium">{service.unit}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-slate-500">Base Price:</span>
                  <div className="flex items-center space-x-1">
                    <Euro className="w-3 h-3 text-green-600" />
                    <span className="text-lg font-bold text-green-600">{service.basePrice}</span>
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

      {filteredServices.length === 0 && (
        <Card className="border-orange-200">
          <CardContent className="text-center py-12">
            <Wrench className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No services found</h3>
            <p className="text-slate-500 mb-4">Add services to your catalog to get started</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
