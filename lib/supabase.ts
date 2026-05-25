import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

console.log("URL:", url);
console.log("KEY:", key?.slice(0, 20));

if (!url || !key) {
  throw new Error("Missing Supabase env vars");
}

export const supabase = createClient(url, key);