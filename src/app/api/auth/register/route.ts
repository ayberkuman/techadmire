import { user } from "@/lib/constants";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  //ensure email and password are provided and encrypt password and save to database

  if (email && password) {
    if (email === user.email) {
      return new Response("User with Email Already Exists", {
        status: 401,
      });
    } else {
      return new Response("Success", {
        status: 200,
      });
    }
  } else {
    return new Response("Wrong email or password", {
      status: 400,
    });
  }
}
