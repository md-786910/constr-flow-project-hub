
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Trash2, Download, Send, Calculator } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface Quote {
  id: string;
  quoteNumber: string;
  customer: string;
  project: string;
  date: string;
  validUntil: string;
  status: "Draft" | "Sent" | "Accepted" | "Rejected";
  items: QuoteItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
}

export function QuotingPage() {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: "1",
      quoteNumber: "QUO-2024-001",
      customer: "Tech Corporation Ltd.",
      project: "Office Renovation",
      date: "2024-01-15",
      validUntil: "2024-02-15",
      status: "Sent",
      items: [
        { id: "1", description: "Electrical Installation", quantity: 1, unit: "project", unitPrice: 15000, total: 15000 },
        { id: "2", description: "Plumbing Work", quantity: 80, unit: "hours", unitPrice: 65, total: 5200 }
      ],
      subtotal: 20200,
      tax: 3838,
      total: 24038,
      notes: "Valid for 30 days. 50% deposit required."
    },
    {
      id: "2",
      quoteNumber: "QUO-2024-002",
      customer: "Home Solutions GmbH",
      project: "Kitchen Renovation",
      date: "2024-01-18",
      validUntil: "2024-02-18",
      status: "Draft",
      items: [
        { id: "1", description: "Kitchen Installation", quantity: 1, unit: "project", unitPrice: 8500, total: 8500 }
      ],
      subtotal: 8500,
      tax: 1615,
      total: 10115,
      notes: "Including all materials and labor."
    }
  ]);

  const [showNewQuote, setShowNewQuote] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [newQuote, setNewQuote] = useState<Partial<Quote>>({
    customer: "",
    project: "",
    items: [],
    notes: ""
  });

  const customers = ["Tech Corporation Ltd.", "Home Solutions GmbH", "Green Energy Co.", "Modern Spaces Inc."];
  const services = [
    { name: "Electrical Installation", unit: "project", price: 15000 },
    { name: "Plumbing Work", unit: "hours", price: 65 },
    { name: "Kitchen Installation", unit: "project", price: 8500 },
    { name: "Bathroom Renovation", unit: "project", price: 12000 },
    { name: "Flooring Installation", unit: "m²", price: 35 }
  ];

  const addQuoteItem = () => {
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unit: "hours",
      unitPrice: 0,
      total: 0
    };
    setNewQuote(prev => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  };

  const updateQuoteItem = (itemId: string, field: keyof QuoteItem, value: any) => {
    setNewQuote(prev => ({
      ...prev,
      items: prev.items?.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'unitPrice') {
            updatedItem.total = updatedItem.quantity * updatedItem.unitPrice;
          }
          return updatedItem;
        }
        return item;
      })
    }));
  };

  const removeQuoteItem = (itemId: string) => {
    setNewQuote(prev => ({
      ...prev,
      items: prev.items?.filter(item => item.id !== itemId)
    }));
  };

  const calculateQuoteTotals = (items: QuoteItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.19; // 19% VAT
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const saveQuote = () => {
    if (!newQuote.customer || !newQuote.project || !newQuote.items?.length) return;

    const { subtotal, tax, total } = calculateQuoteTotals(newQuote.items);
    const quote: Quote = {
      id: Date.now().toString(),
      quoteNumber: `QUO-2024-${String(quotes.length + 1).padStart(3, '0')}`,
      customer: newQuote.customer,
      project: newQuote.project,
      date: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: "Draft",
      items: newQuote.items,
      subtotal,
      tax,
      total,
      notes: newQuote.notes || ""
    };

    setQuotes(prev => [...prev, quote]);
    setNewQuote({ customer: "", project: "", items: [], notes: "" });
    setShowNewQuote(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft": return "bg-gray-100 text-gray-700";
      case "Sent": return "bg-blue-100 text-blue-700";
      case "Accepted": return "bg-green-100 text-[#7bcd40]";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Quoting System</h1>
          <p className="text-slate-600">Create and manage construction quotes</p>
        </div>
        <Button 
          onClick={() => setShowNewQuote(true)}
          className="bg-[#7bcd40] hover:bg-[#6bb635] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Quote
        </Button>
      </div>

      {/* Quotes List */}
      <div className="grid gap-4">
        {quotes.map((quote) => (
          <Card key={quote.id} className="border-[#7bcd40]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{quote.quoteNumber}</h3>
                  <p className="text-slate-600">{quote.customer} - {quote.project}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(quote.status)}>
                    {quote.status}
                  </Badge>
                  <span className="text-lg font-bold text-[#7bcd40]">
                    €{quote.total.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <span>Created: {new Date(quote.date).toLocaleDateString()}</span>
                <span>Valid until: {new Date(quote.validUntil).toLocaleDateString()}</span>
              </div>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedQuote(quote)}
                  className="border-[#7bcd40] text-[#7bcd40] hover:bg-[#7bcd40] hover:text-white"
                >
                  <FileText className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  PDF
                </Button>
                <Button variant="outline" size="sm">
                  <Send className="w-4 h-4 mr-1" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* New Quote Dialog */}
      <Dialog open={showNewQuote} onOpenChange={setShowNewQuote}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Quote</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new quote
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer">Customer</Label>
                <Select onValueChange={(value) => setNewQuote(prev => ({ ...prev, customer: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer} value={customer}>{customer}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="project">Project Name</Label>
                <Input
                  value={newQuote.project || ""}
                  onChange={(e) => setNewQuote(prev => ({ ...prev, project: e.target.value }))}
                  placeholder="Enter project name"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Quote Items</h3>
                <Button 
                  onClick={addQuoteItem}
                  size="sm"
                  className="bg-[#7bcd40] hover:bg-[#6bb635]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Item
                </Button>
              </div>

              <div className="space-y-3">
                {newQuote.items?.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-end p-3 border rounded-lg">
                    <div className="col-span-4">
                      <Label>Description</Label>
                      <Select onValueChange={(value) => {
                        const service = services.find(s => s.name === value);
                        if (service) {
                          updateQuoteItem(item.id, 'description', value);
                          updateQuoteItem(item.id, 'unit', service.unit);
                          updateQuoteItem(item.id, 'unitPrice', service.price);
                        }
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map(service => (
                            <SelectItem key={service.name} value={service.name}>{service.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuoteItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label>Unit</Label>
                      <Input value={item.unit} readOnly />
                    </div>
                    <div className="col-span-2">
                      <Label>Unit Price</Label>
                      <Input
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => updateQuoteItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                    <div className="col-span-1">
                      <Label>Total</Label>
                      <div className="text-sm font-medium">€{item.total.toFixed(2)}</div>
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuoteItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {newQuote.items && newQuote.items.length > 0 && (
                <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>€{calculateQuoteTotals(newQuote.items).subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (19%):</span>
                      <span>€{calculateQuoteTotals(newQuote.items).tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-[#7bcd40]">€{calculateQuoteTotals(newQuote.items).total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                value={newQuote.notes || ""}
                onChange={(e) => setNewQuote(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Additional notes or terms..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewQuote(false)}>
                Cancel
              </Button>
              <Button 
                onClick={saveQuote}
                className="bg-[#7bcd40] hover:bg-[#6bb635]"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Create Quote
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quote Detail Dialog */}
      {selectedQuote && (
        <Dialog open={!!selectedQuote} onOpenChange={() => setSelectedQuote(null)}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedQuote.quoteNumber}</DialogTitle>
              <DialogDescription>
                Quote details for {selectedQuote.customer}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Customer</h4>
                  <p>{selectedQuote.customer}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Project</h4>
                  <p>{selectedQuote.project}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Date</h4>
                  <p>{new Date(selectedQuote.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Valid Until</h4>
                  <p>{new Date(selectedQuote.validUntil).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Items</h4>
                <div className="space-y-2">
                  {selectedQuote.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-sm text-slate-500">{item.quantity} {item.unit} × €{item.unitPrice}</p>
                      </div>
                      <span className="font-medium">€{item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>€{selectedQuote.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (19%):</span>
                    <span>€{selectedQuote.tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-[#7bcd40]">€{selectedQuote.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {selectedQuote.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-slate-600">{selectedQuote.notes}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
