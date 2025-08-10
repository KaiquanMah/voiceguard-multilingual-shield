import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to get ElevenLabs API key from Edge Function
export const getElevenLabsApiKey = async (): Promise<string | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('get-elevenlabs-key')
    
    if (error) {
      console.error('Error fetching ElevenLabs API key:', error)
      return null
    }
    
    return data?.apiKey || null
  } catch (error) {
    console.error('Error calling get-elevenlabs-key function:', error)
    return null
  }
}