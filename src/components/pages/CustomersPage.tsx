
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building2, Plus, Search, Phone, Mail, MapPin, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const customers = [
    {
      id: 1,
      name: "Tech Corporation Ltd.",
      contact: "Sarah Johnson",
      email: "sarah@techcorp.com",
      phone: "+49 30 12345678",
      address: "Berliner Str. 123, 10115 Berlin",
      projects: 3,
      status: "Active",
      totalValue: "€450,000"
    },
    {
      id: 2,
      name: "City Development GmbH",
      contact: "Michael Schmidt",
      email: "m.schmidt@citydev.de",
      phone: "+49 89 87654321",
      address: "Maximilianstr. 45, 80539 München",
      projects: 5,
      status: "Active",
      totalValue: "€1,200,000"
    },
    {
      id: 3,
      name: "Metro Construction",
      contact: "Anna Weber",
      email: "anna@metro-const.de",
      phone: "+49 40 55667788",
      address: "Hafenstr. 67, 20359 Hamburg",
      projects: 1,
      status: "Lead",
      totalValue: "€85,000"
    },
    {
      id: 4,
      name: "Industrial Solutions AG",
      contact: "Thomas Müller",
      email: "t.mueller@industrial.de",
      phone: "+49 69 44332211",
      address: "Industrieweg 89, 60486 Frankfurt",
      projects: 2,
      status: "Inactive",
      totalValue: "€320,000"
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Customers</h1>
          <p className="text-slate-600">Manage your client relationships and contacts</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Create a new customer profile for your construction business.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Enter company name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input id="contact" placeholder="Enter contact name" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="contact@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+49 30 12345678" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter full address" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID</Label>
                  <Input id="taxId" placeholder="DE123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="net30">Net 30 days</SelectItem>
                      <SelectItem value="net14">Net 14 days</SelectItem>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Save Customer
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
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <CardDescription>{customer.contact}</CardDescription>
                  </div>
                </div>
                <Badge 
                  variant={customer.status === "Active" ? "default" : customer.status === "Lead" ? "secondary" : "outline"}
                  className={customer.status === "Active" ? "bg-green-100 text-green-700" : ""}
                >
                  {customer.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span className="text-xs">{customer.address}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Projects:</span>
                  <span className="font-medium">{customer.projects}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Value:</span>
                  <span className="font-medium text-green-600">{customer.totalValue}</span>
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

      {filteredCustomers.length === 0 && (
        <Card className="border-orange-200">
          <CardContent className="text-center py-12">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No customers found</h3>
            <p className="text-slate-500 mb-4">Get started by adding your first customer</p>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
