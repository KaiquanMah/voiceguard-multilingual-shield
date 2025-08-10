import { useState } from "react";
import { LiveMonitor } from "@/components/dashboard/live-monitor";
import { AlertSystem } from "@/components/dashboard/alert-system";
import { LanguageSelector } from "@/components/dashboard/language-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Phone, Globe, Settings, BarChart3, History } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"monitor" | "history" | "settings">("monitor");

  const stats = [
    { label: "Calls Protected", value: "1,247", icon: Shield, color: "safe" },
    { label: "Scams Blocked", value: "89", icon: Phone, color: "danger" },
    { label: "Languages Supported", value: "5", icon: Globe, color: "primary" },
    { label: "Success Rate", value: "94.2%", icon: BarChart3, color: "safe" },
  ];

  return (
    <div className="min-h-screen bg-gradient-cyber">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary shadow-cyber">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Voice Scam Shield</h1>
                <p className="text-sm text-muted-foreground">Multilingual AI Call Protection</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="default" className="bg-safe/20 text-safe border-safe/30">
                <div className="w-2 h-2 rounded-full bg-safe mr-2 animate-pulse" />
                Protected
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-lg ${
                      stat.color === "safe" ? "bg-safe/20 text-safe" :
                      stat.color === "danger" ? "bg-danger/20 text-danger" :
                      "bg-primary/20 text-primary"
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "monitor" ? "default" : "outline"}
            onClick={() => setActiveTab("monitor")}
            className="gap-2"
          >
            <Shield className="h-4 w-4" />
            Live Monitor
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            onClick={() => setActiveTab("history")}
            className="gap-2"
          >
            <History className="h-4 w-4" />
            Call History
          </Button>
          <Button
            variant={activeTab === "settings" ? "default" : "outline"}
            onClick={() => setActiveTab("settings")}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>

        {/* Main Content */}
        {activeTab === "monitor" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <LiveMonitor />
            </div>
            <div className="space-y-6">
              <AlertSystem />
              <LanguageSelector />
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Call History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Call History Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  View detailed reports of all protected calls and threat analysis.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "settings" && (
          <Card className="bg-card/30 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Settings & Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Advanced Settings Coming Soon</h3>
                <p className="text-sm text-muted-foreground">
                  Configure detection sensitivity, notifications, and integration settings.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
