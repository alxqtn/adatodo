'use server'

import { auth } from "@/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(_prev: unknown, formData: FormData) {
  try {
    await auth.api.signUpEmail({
      body: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });
  } catch (e) {
    if (e instanceof APIError) return { error: e.message };
    return { error: "Something went wrong" };
  }
  redirect("/");
}

export async function signIn(_prev: unknown, formData: FormData) {
  try {
    await auth.api.signInEmail({
      body: {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      },
    });
  } catch (e) {
    if (e instanceof APIError) return { error: e.message };
    return { error: "Something went wrong" };
  }
  redirect("/");
}

export async function signOut() {
  await auth.api.signOut({ headers: await headers() });
  redirect("/sign-in");
}
