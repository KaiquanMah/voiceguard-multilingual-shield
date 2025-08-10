# VoiceGuard Multilingual Scam Shield
* By: Kaiquan Mah
* Submission to: Hack-Nation Global AI Hackathon 2025 (MIT Sloan AI Club), 9 to 10 August 2025
* Challenge 3 Voice Scam Shield (Track: VC Big Bets - Cybersecurity)


**Multilingual AI for Real-Time Call Scam Detection**

VoiceGuard is an advanced AI-powered system designed to detect and prevent phone scams in real-time across multiple languages. Using cutting-edge voice analysis, risk assessment, and multilingual processing capabilities, VoiceGuard helps protect users from fraudulent calls by analyzing voice authenticity, detecting suspicious patterns, and providing real-time alerts.

## 🚀 Key Features

### 🔊 Real-Time Voice Analysis
- **Live Call Monitoring**: Monitor ongoing calls with real-time risk assessment
- **Voice Authenticity Detection**: Advanced AI algorithms analyze voice patterns to detect spoofed or synthetic voices
- **Risk Scoring**: Dynamic risk assessment with visual indicators and alerts

### 🌍 Multilingual Support
- **5+ Languages**: Support for English, Spanish, French, Malay, Chinese, and more
- **Automatic Language Detection**: Automatically identifies the language being spoken
- **Real-Time Transcription**: Live transcription of calls in multiple languages

### 🛡️ Scam Detection
- **Pattern Recognition**: AI-powered detection of common scam tactics and phrases
- **Caller Analysis**: Real-time analysis of caller behavior and voice characteristics
- **Alert System**: Immediate notifications when suspicious activity is detected

### 🎧 Audio Processing
- **High-Quality Transcription**: Powered by OpenAI Whisper for accurate speech-to-text
- **Text-to-Speech**: ElevenLabs integration for multilingual voice synthesis
- **Audio Demos**: Built-in demo system with sample recordings for testing

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Backend**: Supabase (Database, Authentication, Edge Functions)
- **AI Services**: 
  - ElevenLabs (Text-to-Speech, Voice Analysis)
  - OpenAI Whisper (Speech-to-Text)
- **Audio Processing**: Web Audio API, MediaRecorder API

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- ElevenLabs API key
- OpenAI API key (for transcription)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd voiceguard-scam-shield
npm install
```

### 2. Environment Setup

Create your Supabase project and configure the following environment variables:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys (configured in Supabase Edge Functions)
ELEVENLABS_API_KEY=your_elevenlabs_api_key
OPENAI_API_KEY=your_openai_api_key
```

### 3. Supabase Setup

Deploy the included edge functions:

```bash
# Deploy ElevenLabs key management
supabase functions deploy get-elevenlabs-key

# Deploy audio transcription
supabase functions deploy transcribe-audio

# Deploy agent creation (if using conversational AI)
supabase functions deploy create-elevenlabs-agent
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎮 Usage

### Live Call Monitoring
1. Navigate to the main dashboard
2. Click "Start Listening" to begin monitoring
3. Make or receive calls while the system analyzes in real-time
4. Monitor risk scores and receive alerts for suspicious activity

### Audio Demo & Testing
1. Go to the "Audio Demo" tab
2. Select from 5 sample recordings in different languages
3. Test voice authenticity analysis
4. Review transcription accuracy and risk assessment

### Language Support
- Use the language selector to switch between supported languages
- The system automatically detects the primary language being spoken
- All UI elements and alerts are localized

## 🏗️ Project Structure

```
src/
├── components/
│   ├── dashboard/          # Main dashboard components
│   │   ├── alert-system.tsx
│   │   ├── language-selector.tsx
│   │   └── live-monitor.tsx
│   ├── demo/              # Audio demo components
│   │   └── audio-demo.tsx
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
│   ├── useElevenLabs.ts
│   └── use-toast.ts
├── integrations/          # External service integrations
│   └── supabase/
├── pages/                 # Application pages
└── utils/                 # Utility functions

supabase/
└── functions/             # Edge functions
    ├── get-elevenlabs-key/
    ├── transcribe-audio/
    └── create-elevenlabs-agent/
```

## 🔧 Configuration

### ElevenLabs Integration
- Configure your API key in Supabase environment variables
- Select from available voices and models
- Customize voice analysis parameters

### Audio Settings
- Adjust sample rates and quality settings
- Configure language detection sensitivity
- Set risk scoring thresholds

## 🚀 Deployment

### Lovable Platform
1. Visit your [Lovable Project](https://lovable.dev/projects/d025603c-fdf7-41ca-84b7-a7439c7f8cce)
2. Click Share → Publish
3. Configure custom domain if needed

### Manual Deployment
```bash
npm run build
# Deploy dist/ folder to your hosting platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Lovable Project**: https://lovable.dev/projects/d025603c-fdf7-41ca-84b7-a7439c7f8cce
- **Documentation**: [Lovable Docs](https://docs.lovable.dev/)
- **Support**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
