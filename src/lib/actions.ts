"use server";
import { z } from "zod";

const validate = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function registerAction(values: {
  email: string;
  password: string;
}) {
  //after client side validation, also validate here to ensure security
  if (validate.safeParse(values).success) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: formData,
    });
    if (response.status === 200) {
      return { message: "Success" };
    } else if (response.status === 409) {
      return { message: "User Already Exists" };
    }
  } else {
    throw new Error("Invalid form data");
  }
}

export async function loginAction(values: { email: string; password: string }) {
  if (validate.safeParse(values).success) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: formData,
    });
    if (response.status === 200) {
      return { message: "Success" };
    }
  } else {
    throw new Error("Invalid form data");
  }
}
