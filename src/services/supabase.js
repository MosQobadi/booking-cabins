import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kcoknoqshvlvmphpqvov.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtjb2tub3FzaHZsdm1waHBxdm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjM0MjYsImV4cCI6MjA2MTIzOTQyNn0._ZxZGze8AZLkhC0vMONUbQ05sWl0feR4_VACbqYk2SY";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
