
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <header className="border-b border-[#7bcd40]/20 bg-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-slate-600 hover:text-[#7bcd40]" />
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search projects, customers..."
              className="pl-10 bg-slate-50 border-slate-200 focus:border-[#7bcd40]/50"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="relative text-slate-600 hover:text-[#7bcd40]">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#7bcd40] rounded-full"></span>
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-600 hover:text-[#7bcd40]">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </header>
      
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </main>
  );
}
