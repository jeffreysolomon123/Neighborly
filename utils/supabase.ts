
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://blgvcevpuozeouhaeiuv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsZ3ZjZXZwdW96ZW91aGFlaXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NDc5NzcsImV4cCI6MjA2MDEyMzk3N30.WHJQgZAnqQb6zV1hz4lNXcnAqshL0xUnyt4-LQU1PyM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
