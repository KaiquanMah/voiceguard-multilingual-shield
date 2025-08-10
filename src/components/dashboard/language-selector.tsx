import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Language {
  code: string;
  name: string;
  flag: string;
  supported: boolean;
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸", supported: true },
  { code: "es", name: "Español", flag: "🇪🇸", supported: true },
  { code: "fr", name: "Français", flag: "🇫🇷", supported: true },
  { code: "de", name: "Deutsch", flag: "🇩🇪", supported: true },
  { code: "pt", name: "Português", flag: "🇧🇷", supported: true },
  { code: "it", name: "Italiano", flag: "🇮🇹", supported: false },
  { code: "zh", name: "中文", flag: "🇨🇳", supported: false },
  { code: "ja", name: "日本語", flag: "🇯🇵", supported: false },
];

const LanguageSelector = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en", "es", "fr"]);
  const [detectedLanguage, setDetectedLanguage] = useState<string>("en");

  const toggleLanguage = (code: string) => {
    if (!languages.find(l => l.code === code)?.supported) return;
    
    setSelectedLanguages(prev => 
      prev.includes(code) 
        ? prev.filter(lang => lang !== code)
        : [...prev, code]
    );
  };

  const getLanguageName = (code: string) => {
    return languages.find(l => l.code === code)?.name || code;
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Language Detection & Support
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Currently Detected */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Detected Language</span>
            <Badge variant="default" className="gap-1">
              {languages.find(l => l.code === detectedLanguage)?.flag}
              {getLanguageName(detectedLanguage)}
            </Badge>
          </div>
        </div>

        {/* Supported Languages Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Supported Languages</span>
            <span className="text-xs text-muted-foreground">
              {selectedLanguages.length} active
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant={selectedLanguages.includes(language.code) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleLanguage(language.code)}
                disabled={!language.supported}
                className={cn(
                  "justify-start gap-2 h-auto p-2",
                  !language.supported && "opacity-50 cursor-not-allowed",
                  selectedLanguages.includes(language.code) && language.supported && "bg-gradient-primary"
                )}
              >
                <span className="text-base">{language.flag}</span>
                <span className="text-xs">{language.name}</span>
                {selectedLanguages.includes(language.code) && language.supported && (
                  <Check className="h-3 w-3 ml-auto" />
                )}
                {!language.supported && (
                  <Badge variant="secondary" className="ml-auto text-xs px-1 py-0">
                    Soon
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedLanguages(languages.filter(l => l.supported).map(l => l.code))}
            className="flex-1"
          >
            Enable All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedLanguages(["en"])}
            className="flex-1"
          >
            English Only
          </Button>
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
          <strong>Tip:</strong> Enable multiple languages for better scam detection across different caller origins.
        </div>
      </CardContent>
    </Card>
  );
};

export { LanguageSelector };