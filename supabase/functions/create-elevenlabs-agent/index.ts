import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get ElevenLabs API key from environment
    const elevenLabsApiKey = Deno.env.get('ELEVENLABS_API_KEY');
    if (!elevenLabsApiKey) {
      throw new Error('ElevenLabs API key not configured');
    }

    console.log('Creating ElevenLabs conversation agent...');
    
    // Create a simple conversational agent for transcription
    // First, we need to create or use an existing agent
    // For this demo, we'll use a simple agent configuration
    const agentConfig = {
      name: "Voice Transcription Agent",
      prompt: "You are a transcription assistant. Listen to the user's speech and respond with exactly what they said. Keep responses minimal and focused on accuracy.",
      language: "en",
      voice_id: "EXAVITQu4vr4xnSDxMaL" // Sarah voice
    };

    // Create agent (this would typically be done once and reused)
    const agentResponse = await fetch('https://api.elevenlabs.io/v1/convai/agents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${elevenLabsApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(agentConfig),
    });

    let agentId;
    if (agentResponse.ok) {
      const agentData = await agentResponse.json();
      agentId = agentData.agent_id;
      console.log('Created new agent:', agentId);
    } else {
      // Use a default agent ID if creation fails
      // In production, you'd have a pre-created agent
      agentId = "default-transcription-agent";
      console.log('Using default agent ID');
    }

    // Generate signed URL for the conversation
    const signedUrlResponse = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${elevenLabsApiKey}`,
        },
      }
    );

    if (!signedUrlResponse.ok) {
      const errorText = await signedUrlResponse.text();
      console.error('ElevenLabs signed URL error:', errorText);
      throw new Error(`ElevenLabs API error: ${signedUrlResponse.status} - ${errorText}`);
    }

    const urlData = await signedUrlResponse.json();
    console.log('Generated signed URL successfully');

    return new Response(
      JSON.stringify({ 
        signedUrl: urlData.signed_url,
        agentId: agentId
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('ElevenLabs agent creation error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Make sure ElevenLabs API key is configured'
      }),
      {
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      }
    );
  }
});