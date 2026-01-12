import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.formData();
  const email = data.get("email");
  const password = data.get("password");

  // Validate user manually
  const valid = email === "chukwunebumsimeon@gmail.com" && password === "Clement2000";

  if (!valid) {
    return Response.json({ success: false, message: "Invalid credentials" });
  }

  // ✅ Setting cookie here works
  cookies().set("token", "abc123", { httpOnly: true });

  return Response.json({ success: true });
}
