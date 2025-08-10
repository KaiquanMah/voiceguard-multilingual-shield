import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { RiskMeter } from "@/components/ui/risk-meter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Volume2, VolumeX, Shield, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallData {
  isActive: boolean;
  duration: number;
  riskScore: number;
  callerInfo: {
    number: string;
    location?: string;
    verified: boolean;
  };
  voiceAnalysis: {
    isAuthentic: boolean;
    confidence: number;
  };
  transcript: string;
  detectedLanguage: string;
}

const LiveMonitor = () => {
  const [callData, setCallData] = useState<CallData>({
    isActive: false,
    duration: 0,
    riskScore: 15,
    callerInfo: {
      number: "+1 (555) 123-4567",
      location: "New York, NY",
      verified: false,
    },
    voiceAnalysis: {
      isAuthentic: true,
      confidence: 87,
    },
    transcript: "Hello, this is Sarah from your bank's security department. We've detected some unusual activity on your account...",
    detectedLanguage: "English",
  });

  const [isListening, setIsListening] = useState(true);

  // Simulate live call data updates
  useEffect(() => {
    if (!callData.isActive || !isListening) return;

    const interval = setInterval(() => {
      setCallData(prev => ({
        ...prev,
        duration: prev.duration + 1,
        riskScore: Math.min(95, prev.riskScore + Math.random() * 5),
        voiceAnalysis: {
          ...prev.voiceAnalysis,
          confidence: Math.max(20, prev.voiceAnalysis.confidence - Math.random() * 10),
        },
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [callData.isActive, isListening]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    
    // Provide audio feedback
    const utterance = new SpeechSynthesisUtterance(
      isListening ? "Monitoring paused" : "Monitoring resumed"
    );
    utterance.rate = 0.9;
    utterance.volume = 0.7;
    speechSynthesis.speak(utterance);
  };

  const startCall = () => {
    setCallData(prev => ({ ...prev, isActive: true, duration: 0 }));
    
    // Play demo audio announcement
    const utterance = new SpeechSynthesisUtterance(
      "Demo call started. Voice Scam Shield is now monitoring for threats."
    );
    utterance.rate = 0.9;
    utterance.volume = 0.7;
    speechSynthesis.speak(utterance);
  };

  const endCall = () => {
    setCallData(prev => ({ ...prev, isActive: false, duration: 0 }));
    
    // Play call end audio
    const utterance = new SpeechSynthesisUtterance("Call ended. Voice Scam Shield monitoring stopped.");
    utterance.rate = 0.9;
    utterance.volume = 0.7;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6">
      {/* Call Status Header */}
      <Card className="bg-gradient-cyber border-border/50 shadow-cyber">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StatusIndicator 
                status={callData.isActive ? (callData.riskScore > 70 ? "danger" : callData.riskScore > 30 ? "warning" : "safe") : "inactive"} 
                size="lg" 
              />
              <div>
                <CardTitle className="text-lg">Voice Scam Shield</CardTitle>
                <p className="text-sm text-muted-foreground">Real-time call protection</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={isListening ? "default" : "secondary"}
                size="sm"
                onClick={toggleListening}
                className="gap-2"
              >
                {isListening ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                {isListening ? "Listening" : "Muted"}
              </Button>
              {callData.isActive ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={endCall}
                  className="gap-2"
                >
                  <PhoneOff className="h-4 w-4" />
                  End Call
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={startCall}
                  className="gap-2 bg-gradient-primary"
                >
                  <Phone className="h-4 w-4" />
                  Start Demo
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Active Call Monitor */}
      {callData.isActive && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Call Info */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Duration</span>
                <span className="font-mono text-lg">{formatDuration(callData.duration)}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Caller</span>
                  <div className="text-right">
                    <div className="font-medium">{callData.callerInfo.number}</div>
                    {callData.callerInfo.location && (
                      <div className="text-xs text-muted-foreground">{callData.callerInfo.location}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Verification</span>
                  <Badge variant={callData.callerInfo.verified ? "default" : "secondary"}>
                    {callData.callerInfo.verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Language</span>
                  <span className="text-sm">{callData.detectedLanguage}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Analysis */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Risk Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RiskMeter value={callData.riskScore} />
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Voice Authenticity</span>
                  <div className="flex items-center gap-2">
                    <StatusIndicator 
                      status={callData.voiceAnalysis.isAuthentic ? "safe" : "danger"} 
                      size="sm" 
                    />
                    <span className="text-sm">{callData.voiceAnalysis.confidence}%</span>
                  </div>
                </div>
                
                {callData.riskScore > 50 && (
                  <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-warning">Potential Scam Detected</p>
                        <p className="text-xs text-muted-foreground">
                          Multiple suspicious patterns identified. Exercise caution.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Live Transcript */}
      {callData.isActive && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Live Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-muted/50 min-h-[120px]">
              <p className="text-sm leading-relaxed">{callData.transcript}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  callData.riskScore > 70 ? "bg-danger" : callData.riskScore > 30 ? "bg-warning" : "bg-safe"
                )} />
                <span className="text-xs text-muted-foreground">AI analyzing...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { LiveMonitor };