import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ymljkhdpuaieivqcwrum.supabase.co";
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY || "key_not_foundr";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
