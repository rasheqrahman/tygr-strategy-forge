
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mmszeuoqdoeshkligcyn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tc3pldW9xZG9lc2hrbGlnY3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzcxMjcsImV4cCI6MjA2NDc1MzEyN30.wn8j0m_S6uqJm-2otDj1vTCEYd0x2bBttZVTNZMXses'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
