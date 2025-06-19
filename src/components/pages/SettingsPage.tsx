
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  User, 
  Building, 
  Bell, 
  Shield, 
  Palette, 
  FileText, 
  Mail,
  Save,
  Upload,
  Download,
  Trash2
} from "lucide-react";

interface CompanySettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  taxId: string;
  logo?: string;
  currency: string;
  taxRate: number;
}

interface UserSettings {
  name: string;
  email: string;
  role: string;
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

interface SystemSettings {
  theme: string;
  dateFormat: string;
  timeFormat: string;
  defaultView: string;
  autoBackup: boolean;
  sessionTimeout: number;
}

export function SettingsPage() {
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    name: "ConstructPro GmbH",
    address: "Musterstraße 123, 12345 Berlin",
    phone: "+49 30 12345678",
    email: "info@constructpro.de",
    website: "www.constructpro.de",
    taxId: "DE123456789",
    currency: "EUR",
    taxRate: 19
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    name: "Klaus Bauer",
    email: "klaus.bauer@constructpro.de",
    role: "Administrator",
    language: "de",
    timezone: "Europe/Berlin",
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    theme: "light",
    dateFormat: "DD.MM.YYYY",
    timeFormat: "24h",
    defaultView: "dashboard",
    autoBackup: true,
    sessionTimeout: 30
  });

  const [activeTab, setActiveTab] = useState("company");
  const [hasChanges, setHasChanges] = useState(false);

  const saveSettings = () => {
    // Here you would typically save to your backend
    console.log("Saving settings...", { companySettings, userSettings, systemSettings });
    setHasChanges(false);
    // Show success message
  };

  const exportSettings = () => {
    const settings = { companySettings, userSettings, systemSettings };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'constructpro-settings.json';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-600">Manage your application preferences and configuration</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={exportSettings}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            onClick={saveSettings}
            disabled={!hasChanges}
            className="bg-[#7bcd40] hover:bg-[#6bb635]"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="company" className="flex items-center space-x-2">
            <Building className="w-4 h-4" />
            <span>Company</span>
          </TabsTrigger>
          <TabsTrigger value="user" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>User</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="w-4 h-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>System</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Company Information
              </CardTitle>
              <CardDescription>
                Basic company details used in quotes, invoices, and reports
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    value={companySettings.name}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, name: e.target.value }));
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="tax-id">Tax ID</Label>
                  <Input
                    id="tax-id"
                    value={companySettings.taxId}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, taxId: e.target.value }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company-address">Address</Label>
                <Textarea
                  id="company-address"
                  value={companySettings.address}
                  onChange={(e) => {
                    setCompanySettings(prev => ({ ...prev, address: e.target.value }));
                    setHasChanges(true);
                  }}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-phone">Phone</Label>
                  <Input
                    id="company-phone"
                    value={companySettings.phone}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, phone: e.target.value }));
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="company-email">Email</Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={companySettings.email}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, email: e.target.value }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company-website">Website</Label>
                <Input
                  id="company-website"
                  value={companySettings.website}
                  onChange={(e) => {
                    setCompanySettings(prev => ({ ...prev, website: e.target.value }));
                    setHasChanges(true);
                  }}
                />
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select 
                    value={companySettings.currency}
                    onValueChange={(value) => {
                      setCompanySettings(prev => ({ ...prev, currency: value }));
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                      <SelectItem value="CHF">Swiss Franc (CHF)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                  <Input
                    id="tax-rate"
                    type="number"
                    value={companySettings.taxRate}
                    onChange={(e) => {
                      setCompanySettings(prev => ({ ...prev, taxRate: parseFloat(e.target.value) }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              <div>
                <Label>Company Logo</Label>
                <div className="mt-2 flex items-center space-x-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-lg flex items-center justify-center">
                    <Building className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-sm text-slate-500">
                      Recommended: 200x200px, PNG or JPG
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Profile
              </CardTitle>
              <CardDescription>
                Personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    value={userSettings.name}
                    onChange={(e) => {
                      setUserSettings(prev => ({ ...prev, name: e.target.value }));
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor="user-email">Email Address</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={userSettings.email}
                    onChange={(e) => {
                      setUserSettings(prev => ({ ...prev, email: e.target.value }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="user-role">Role</Label>
                  <Select 
                    value={userSettings.role}
                    onValueChange={(value) => {
                      setUserSettings(prev => ({ ...prev, role: value }));
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                      <SelectItem value="Project Manager">Project Manager</SelectItem>
                      <SelectItem value="Worker">Worker</SelectItem>
                      <SelectItem value="Client">Client</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="user-language">Language</Label>
                  <Select 
                    value={userSettings.language}
                    onValueChange={(value) => {
                      setUserSettings(prev => ({ ...prev, language: value }));
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="user-timezone">Timezone</Label>
                <Select 
                  value={userSettings.timezone}
                  onValueChange={(value) => {
                    setUserSettings(prev => ({ ...prev, timezone: value }));
                    setHasChanges(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                    <SelectItem value="Europe/London">Europe/London</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                    <SelectItem value="America/Los_Angeles">America/Los_Angeles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Change password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Enable Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-slate-500">Receive updates via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={userSettings.notifications.email}
                    onCheckedChange={(checked) => {
                      setUserSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, email: checked }
                      }));
                      setHasChanges(true);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-slate-500">Browser push notifications</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={userSettings.notifications.push}
                    onCheckedChange={(checked) => {
                      setUserSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, push: checked }
                      }));
                      setHasChanges(true);
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-slate-500">Text message alerts</p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={userSettings.notifications.sms}
                    onCheckedChange={(checked) => {
                      setUserSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, sms: checked }
                      }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Types</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Project Updates</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Time Tracking Reminders</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Invoice Payments</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Schedule Changes</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Theme & Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select 
                  value={systemSettings.theme}
                  onValueChange={(value) => {
                    setSystemSettings(prev => ({ ...prev, theme: value }));
                    setHasChanges(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="auto">Auto (System)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select 
                    value={systemSettings.dateFormat}
                    onValueChange={(value) => {
                      setSystemSettings(prev => ({ ...prev, dateFormat: value }));
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select 
                    value={systemSettings.timeFormat}
                    onValueChange={(value) => {
                      setSystemSettings(prev => ({ ...prev, timeFormat: value }));
                      setHasChanges(true);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 Hour</SelectItem>
                      <SelectItem value="24h">24 Hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="default-view">Default Landing Page</Label>
                <Select 
                  value={systemSettings.defaultView}
                  onValueChange={(value) => {
                    setSystemSettings(prev => ({ ...prev, defaultView: value }));
                    setHasChanges(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="projects">Projects</SelectItem>
                    <SelectItem value="calendar">Calendar</SelectItem>
                    <SelectItem value="time-tracking">Time Tracking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={systemSettings.sessionTimeout}
                  onChange={(e) => {
                    setSystemSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }));
                    setHasChanges(true);
                  }}
                />
                <p className="text-sm text-slate-500 mt-1">
                  Automatically log out users after this period of inactivity
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Password Requirements</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <span className="text-sm">Minimum 8 characters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <span className="text-sm">Require uppercase letters</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <span className="text-sm">Require numbers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <span className="text-sm">Require special characters</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">2FA Status</p>
                    <Badge className="bg-red-100 text-red-700">Disabled</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <Card className="border-[#7bcd40]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                System Configuration
              </CardTitle>
              <CardDescription>
                System-wide settings and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-backup">Automatic Backups</Label>
                  <p className="text-sm text-slate-500">Daily automatic data backups</p>
                </div>
                <Switch
                  id="auto-backup"
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) => {
                    setSystemSettings(prev => ({ ...prev, autoBackup: checked }));
                    setHasChanges(true);
                  }}
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">Data Management</h4>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Import Data
                  </Button>
                  <Button variant="outline" size="sm">
                    Create Backup
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium">System Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-500">Version:</span>
                    <span className="ml-2 font-medium">v2.1.0</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Last Updated:</span>
                    <span className="ml-2 font-medium">2024-01-20</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Database Size:</span>
                    <span className="ml-2 font-medium">2.4 GB</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Active Users:</span>
                    <span className="ml-2 font-medium">8</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-medium text-red-600">Danger Zone</h4>
                <div className="p-4 border border-red-200 rounded-lg">
                  <h5 className="font-medium text-red-800 mb-2">Reset Application</h5>
                  <p className="text-sm text-red-600 mb-3">
                    This will delete all data and reset the application to factory settings. This action cannot be undone.
                  </p>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Reset Application
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {hasChanges && (
        <div className="fixed bottom-4 right-4">
          <Card className="border-[#7bcd40]">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#7bcd40] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">You have unsaved changes</span>
                <Button 
                  size="sm"
                  onClick={saveSettings}
                  className="bg-[#7bcd40] hover:bg-[#6bb635]"
                >
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
