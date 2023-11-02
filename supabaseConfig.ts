import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { Database } from "./store/databaseModel";

const supabaseUrl = 'https://iowsptmtquyysmhzrqst.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlvd3NwdG10cXV5eXNtaHpycXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3Njc3NzAsImV4cCI6MjAxNDM0Mzc3MH0.HmbeIt6jzb6jgpBqSsXMtKwlangCWhSCWLvQQlA6RBA'

export const supabase = createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
)