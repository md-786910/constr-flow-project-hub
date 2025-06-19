
import {
  Building2,
  Users,
  Wrench,
  FolderOpen,
  FileText,
  Calendar,
  Clock,
  Camera,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: BarChart3 },
    ],
  },
  {
    title: "Master Data",
    items: [
      { title: "Customers", url: "/customers", icon: Building2 },
      { title: "Services", url: "/services", icon: Wrench },
      { title: "Employees", url: "/employees", icon: Users },
    ],
  },
  {
    title: "Project Management",
    items: [
      { title: "Projects", url: "/projects", icon: FolderOpen },
      { title: "Quoting", url: "/quoting", icon: FileText },
      { title: "Planning", url: "/planning", icon: Calendar },
    ],
  },
  {
    title: "Operations",
    items: [
      { title: "Time Tracking", url: "/time-tracking", icon: Clock },
      { title: "Site Documentation", url: "/site-docs", icon: Camera },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-orange-200">
      <SidebarHeader className="border-b border-orange-100 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">ConstructPro</h2>
            <p className="text-xs text-slate-500">Management System</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-slate-600 font-medium">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "w-full justify-start text-slate-700 hover:bg-orange-50 hover:text-orange-700",
                        location.pathname === item.url && "bg-orange-100 text-orange-700 border-r-2 border-orange-500"
                      )}
                    >
                      <Link to={item.url} className="flex items-center space-x-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      
      <SidebarFooter className="border-t border-orange-100 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start text-slate-700 hover:bg-orange-50">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full justify-start text-slate-700 hover:bg-red-50 hover:text-red-700">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
