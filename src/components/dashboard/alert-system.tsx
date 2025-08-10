import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, X, Volume2, Shield, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: "scam" | "synthetic" | "suspicious";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  message: string;
  timestamp: Date;
  dismissed: boolean;
  autoSpoken?: boolean;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "synthetic",
      severity: "high",
      title: "Synthetic Voice Detected",
      message: "AI-generated voice patterns identified. Caller may be using voice cloning technology.",
      timestamp: new Date(Date.now() - 5000),
      dismissed: false,
    },
    {
      id: "2", 
      type: "scam",
      severity: "critical",
      title: "Bank Impersonation Scam",
      message: "Caller claims to be from bank security but requesting sensitive information. Do not share account details.",
      timestamp: new Date(Date.now() - 15000),
      dismissed: false,
    },
  ]);

  const [isVoiceAlertsEnabled, setIsVoiceAlertsEnabled] = useState(true);

  // Simulate text-to-speech alerts
  const speakAlert = (alert: Alert) => {
    if (!isVoiceAlertsEnabled || alert.autoSpoken) return;
    
    const utterance = new SpeechSynthesisUtterance(
      `Security alert: ${alert.title}. ${alert.message}`
    );
    utterance.rate = 0.9;
    utterance.volume = 0.7;
    speechSynthesis.speak(utterance);
    
    setAlerts(prev => prev.map(a => 
      a.id === alert.id ? { ...a, autoSpoken: true } : a
    ));
  };

  // Auto-speak critical alerts
  useEffect(() => {
    const criticalAlerts = alerts.filter(
      alert => alert.severity === "critical" && !alert.dismissed && !alert.autoSpoken
    );
    
    criticalAlerts.forEach(alert => {
      setTimeout(() => speakAlert(alert), 1000);
    });
  }, [alerts, isVoiceAlertsEnabled]);

  const dismissAlert = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "danger";
      case "high": return "warning";
      case "medium": return "warning";
      case "low": return "safe";
      default: return "muted";
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "scam": return Phone;
      case "synthetic": return AlertTriangle;
      case "suspicious": return Shield;
      default: return AlertTriangle;
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  return (
    <div className="space-y-4">
      {/* Alert Control Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Security Alerts</h3>
        <Button
          variant={isVoiceAlertsEnabled ? "default" : "secondary"}
          size="sm"
          onClick={() => setIsVoiceAlertsEnabled(!isVoiceAlertsEnabled)}
          className="gap-2"
        >
          <Volume2 className="h-4 w-4" />
          Voice Alerts {isVoiceAlertsEnabled ? "On" : "Off"}
        </Button>
      </div>

      {/* Active Alerts */}
      {activeAlerts.length === 0 ? (
        <Card className="bg-safe/10 border-safe/20">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-safe mx-auto mb-3" />
            <h4 className="font-medium text-safe mb-2">All Clear</h4>
            <p className="text-sm text-muted-foreground">
              No security threats detected. Your calls are protected.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {activeAlerts.map((alert) => {
            const severityColor = getSeverityColor(alert.severity);
            const IconComponent = getSeverityIcon(alert.type);
            
            return (
              <Card
                key={alert.id}
                className={cn(
                  "border-l-4 transition-all duration-300",
                  severityColor === "danger" && "border-l-danger bg-danger/5 border-danger/20",
                  severityColor === "warning" && "border-l-warning bg-warning/5 border-warning/20", 
                  severityColor === "safe" && "border-l-safe bg-safe/5 border-safe/20",
                  alert.severity === "critical" && "animate-pulse-danger"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={cn(
                        "p-2 rounded-lg",
                        severityColor === "danger" && "bg-danger/20 text-danger",
                        severityColor === "warning" && "bg-warning/20 text-warning",
                        severityColor === "safe" && "bg-safe/20 text-safe"
                      )}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">{alert.title}</h4>
                          <Badge 
                            variant="secondary"
                            className={cn(
                              "text-xs",
                              severityColor === "danger" && "bg-danger/20 text-danger border-danger/30",
                              severityColor === "warning" && "bg-warning/20 text-warning border-warning/30"
                            )}
                          >
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {alert.message}
                        </p>
                        
                        <div className="text-xs text-muted-foreground">
                          {alert.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speakAlert(alert)}
                        className="h-8 w-8 p-0"
                        disabled={!isVoiceAlertsEnabled}
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissAlert(alert.id)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { AlertSystem };