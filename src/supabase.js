// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cslncheskygzocwqqyor.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzbG5jaGVza3lnem9jd3FxeW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0ODQ3OTksImV4cCI6MjA2NDA2MDc5OX0.Al7EsetOgfVnB0IlXMzw9Z31T1kxP6ru4BG3WZDSqPM';
export const supabase = createClient(supabaseUrl, supabaseKey);