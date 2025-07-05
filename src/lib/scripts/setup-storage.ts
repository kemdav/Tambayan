// scripts/setup-storage.ts
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config'; // To load environment variables

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// IMPORTANT: Use the SERVICE_ROLE_KEY for admin tasks like creating buckets
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  console.log("Creating 'avatars' bucket...");
  const { data, error } = await supabaseAdmin.storage.createBucket('avatars', {
    public: true, // or false depending on your needs
  });

  if (error && error.message !== 'Bucket already exists') {
    console.error("Error creating bucket:", error.message);
    return;
  }
  console.log("'avatars' bucket created or already exists.");

}

setupStorage();