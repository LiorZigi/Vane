
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vfwmqhguwdezqhgaderl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmd21xaGd1d2RlenFoZ2FkZXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODY2MjQsImV4cCI6MjA2MTc2MjYyNH0.JVUxoWKFNMZhxGcrj9R6e4owAKgCBBtZ4_6MF8hC-e0';
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
export default supabase;