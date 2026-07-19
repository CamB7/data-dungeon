"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export type AuthFormState = {
  error?: string;
  success?: string;
} | null;

export type OAuthDestination = "home" | "dungeon";

export async function signInWithGoogleAction(destination: OAuthDestination = "home") {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host") ?? "localhost:3000";
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";
  const callbackURL = `${protocol}://${host}/auth/oauth-callback/${destination}`;

  const { data, error } = await auth.signIn.social({
    provider: "google",
    callbackURL,
  });

  if (error) {
    throw new Error(error.message ?? "Sign-in failed");
  }

  if (data?.url) {
    redirect(data.url);
  }

  throw new Error("Sign-in did not return a redirect URL.");
}

export async function signUpWithEmailAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !username || !password) {
    return { error: "Email, username, and password are required." };
  }

  if (username.length < 3) {
    return { error: "Username must be at least 3 characters." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const { error } = await auth.signUp.email({
    email,
    password,
    name: username,
  });

  if (error) {
    return { error: error.message || "Could not create account." };
  }

  redirect("/dungeon");
}

export async function signInWithEmailAction(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const { error } = await auth.signIn.email({
    email,
    password,
  });

  if (error) {
    return { error: error.message || "Invalid email or password." };
  }

  redirect("/dungeon");
}
