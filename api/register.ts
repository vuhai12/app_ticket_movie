// api/register.ts
import { createClient } from "@supabase/supabase-js";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { email, password, name } = req.body;

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name },
  });

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (error) {
    if (error.message.includes("already")) {
      return res.status(409).json({
        code: "EMAIL_EXISTS",
        message: "Email đã tồn tại",
      });
    }

    return res.status(400).json({ error });
  }
  return res.status(200).json({ data });
}
