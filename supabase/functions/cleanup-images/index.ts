// One-shot cleanup: removes oversized leftover image files from the product-images bucket.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FILES_TO_DELETE = [
  "1774780577695.png",
  "1774780939916.png",
  "1774784744004.jpg",
  "1774883005345.jpg",
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  const { data, error } = await supabase.storage
    .from("product-images")
    .remove(FILES_TO_DELETE);

  return new Response(JSON.stringify({ data, error }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: error ? 500 : 200,
  });
});
