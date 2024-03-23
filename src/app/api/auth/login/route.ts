import { user } from "@/lib/constants";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  if (email && password) {
    if (email === user.email && password === user.password) {
      return new Response("Success", {
        status: 200,
      });
    }
  } else {
    return new Response("Wrong email or password", {
      status: 400,
    });
  }
  return new Response("Invalid form data", {
    status: 400,
  });
}
