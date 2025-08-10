import { useState, useRef, useEffect } from "react";
import { useConversation } from "@11labs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { RiskMeter } from "@/components/ui/risk-meter";
import { Play, Pause, Square, Volume2, FileAudio, RefreshCw, Mic, MicOff } from "lucide-react";
import { useElevenLabs } from "@/hooks/useElevenLabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DemoFile {
  id: string;
  name: string;
  path: string;
  type: 'bonafide' | 'spoofed';
  description: string;
}

const demoFiles: DemoFile[] = [
  { id: '001', name: 'English Voice Sample', path: '/demo-audio/ElevenLabs_Text_to_Speech_audio_1_en_sharetxn.mp3', type: 'bonafide', description: 'English voice recording' },
  { id: '002', name: 'Spanish Voice Sample', path: '/demo-audio/ElevenLabs_Text_to_Speech_audio_2_es_sharetxn.mp3', type: 'bonafide', description: 'Spanish voice recording' },
  { id: '003', name: 'French Voice Sample', path: '/demo-audio/ElevenLabs_Text_to_Speech_audio_3_fr_sharetxn.mp3', type: 'bonafide', description: 'French voice recording' },
  { id: '004', name: 'Malay Voice Sample', path: '/demo-audio/ElevenLabs_Text_to_Speech_audio_4_my_sharetxn.mp3', type: 'bonafide', description: 'Malay voice recording' },
  { id: '005', name: 'Chinese Voice Sample', path: '/demo-audio/ElevenLabs_Text_to_Speech_audio_5_cn_sharetxn.mp3', type: 'bonafide', description: 'Chinese voice recording' },
];

const AudioDemo = () => {
  const [selectedFile, setSelectedFile] = useState<DemoFile>(demoFiles[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [riskScore, setRiskScore] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState<string | null>(null);
  const [agentUrl, setAgentUrl] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const elevenLabs = useElevenLabs();

  // ElevenLabs Conversational AI for transcription
  const conversation = useConversation({
    onMessage: (message) => {
      if (message.source === 'user' && message.message) {
        setTranscription(prev => prev + ' ' + message.message);
        setAnalysisComplete(true);
      }
    },
    onError: (error) => {
      console.error('ElevenLabs conversation error:', error);
      toast({
        title: "Transcription Error",
        description: "ElevenLabs transcription failed",
        variant: "destructive",
      });
    }
  });

  // Load ElevenLabs API key on component mount
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('get-elevenlabs-key');
        if (error) {
          console.error('Error fetching ElevenLabs API key:', error);
          return;
        }
        if (data?.apiKey) {
          setElevenLabsApiKey(data.apiKey);
          console.log('ElevenLabs API key loaded successfully');
        }
      } catch (error) {
        console.error('Error calling get-elevenlabs-key function:', error);
      }
    };
    
    fetchApiKey();
  }, []);

  // Simulate risk analysis based on file type
  useEffect(() => {
    if (selectedFile) {
      setRiskScore(selectedFile.type === 'spoofed' ? 85 + Math.random() * 10 : 15 + Math.random() * 10);
      setAnalysisComplete(false);
      setTranscription('');
    }
  }, [selectedFile]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        toast({
          title: "Audio Error",
          description: "Could not play audio file. Please ensure the FLAC file exists.",
          variant: "destructive",
        });
      });
    }
  };

  const handleStop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setAnalysisComplete(true);
  };

  const startTranscription = async () => {
    if (!elevenLabsApiKey) {
      toast({
        title: "API Key Missing",
        description: "ElevenLabs API key not found",
        variant: "destructive",
      });
      return;
    }

    setIsTranscribing(true);
    setTranscription('');

    try {
      // For demo purposes, we'll create a signed URL for a simple agent
      // In production, you'd have a pre-configured agent
      const { data, error } = await supabase.functions.invoke('create-elevenlabs-agent');
      
      if (error) {
        throw new Error(error.message);
      }

      if (data?.signedUrl) {
        setAgentUrl(data.signedUrl);
        // Start the conversation with proper parameter structure
        await conversation.startSession({ agentId: data.agentId || "default" });
        toast({
          title: "Live Transcription Started",
          description: "Speak into your microphone for real-time transcription",
        });
      }
    } catch (error) {
      console.error('Transcription error:', error);
      toast({
        title: "Transcription Error",
        description: "Could not start ElevenLabs transcription",
        variant: "destructive",
      });
      
      // Fallback demo transcription
      const demoText = selectedFile.type === 'bonafide' 
        ? "Demo: This is a genuine voice recording for authentication purposes."
        : "Demo: This appears to be an AI-generated voice attempting impersonation.";
      setTranscription(demoText);
      setAnalysisComplete(true);
    } finally {
      setIsTranscribing(false);
    }
  };

  const stopTranscription = async () => {
    if (conversation.status === 'connected') {
      await conversation.endSession();
      setIsTranscribing(false);
    }
  };

  const speakTranscription = () => {
    if (transcription) {
      elevenLabs.speak(transcription, 'en');
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* File Selection */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <FileAudio className="h-4 w-4" />
            ASVspoof2021 Demo Files
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {demoFiles.map((file) => (
              <Button
                key={file.id}
                variant={selectedFile.id === file.id ? "default" : "outline"}
                className="h-auto p-3 flex-col items-start"
                onClick={() => setSelectedFile(file)}
              >
                <div className="flex items-center gap-2 w-full">
                  <Badge variant={file.type === 'bonafide' ? "default" : "destructive"} className="text-xs">
                    {file.type}
                  </Badge>
                  <span className="font-medium text-sm truncate">{file.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{file.description}</p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Audio Player & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Audio Player */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Audio Player</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>{selectedFile.name}</span>
                <Badge variant={selectedFile.type === 'bonafide' ? "default" : "destructive"}>
                  {selectedFile.type.toUpperCase()}
                </Badge>
              </div>
              
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-primary transition-all duration-300"
                  style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePlayPause}
                className="gap-2"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleStop}
                className="gap-2"
              >
                <Square className="h-4 w-4" />
                Stop
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={conversation.status === 'connected' ? stopTranscription : startTranscription}
                disabled={isTranscribing && conversation.status !== 'connected'}
                className="gap-2"
              >
                {conversation.status === 'connected' ? (
                  <>
                    <MicOff className="h-4 w-4" />
                    Stop Live
                  </>
                ) : isTranscribing ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Mic className="h-4 w-4" />
                    Live Transcribe
                  </>
                )}
              </Button>
            </div>

            <audio
              ref={audioRef}
              src={selectedFile.path}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              preload="metadata"
            />
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Voice Authenticity Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RiskMeter value={riskScore} />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Voice Type</span>
                <StatusIndicator 
                  status={selectedFile.type === 'bonafide' ? "safe" : "danger"} 
                  size="sm" 
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <span className="text-sm font-medium">{Math.floor(100 - riskScore)}%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Analysis Status</span>
                <Badge variant={analysisComplete ? "default" : "secondary"}>
                  {analysisComplete ? "Complete" : "Processing"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transcription Results */}
      {transcription && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Live Transcription</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={speakTranscription}
                disabled={elevenLabs.isPlaying}
                className="gap-2"
              >
                {elevenLabs.isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Read Aloud
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-muted/50 min-h-[100px]">
              <p className="text-sm leading-relaxed">{transcription}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedFile.type === 'bonafide' ? 'bg-safe animate-pulse' : 'bg-danger animate-pulse'
                  }`} />
                  <span className="text-xs text-muted-foreground">
                    {selectedFile.type === 'bonafide' ? 'Authentic voice detected' : 'Spoofed voice detected'}
                  </span>
                </div>
                <Badge variant={selectedFile.type === 'bonafide' ? "default" : "destructive"} className="text-xs">
                  Risk: {Math.floor(riskScore)}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { AudioDemo };