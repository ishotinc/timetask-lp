"use server";

import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (email === "test@mail.com" && password === "test") {
    redirect("/project");
  }

  return { error: "Invalid credentials" };
}
