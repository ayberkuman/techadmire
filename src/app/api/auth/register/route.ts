export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  //ensure email and password are provided and encrypt password and save to database

  if (email && password) {
    return Response.json("Success");
  }
}
