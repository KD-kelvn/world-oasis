import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://knnvcajnplyxwwiwrfoy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtubnZjYWpucGx5eHd3aXdyZm95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkwMjAwNTMsImV4cCI6MjAxNDU5NjA1M30.CQeHMmG2ELKHwf3ktkuhMfepnza6Oyi7ExmIEV_cNW0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
