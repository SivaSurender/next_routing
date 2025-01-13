"use server";

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/users";
import { redirect } from "next/navigation";

export async function signup(prevFormData, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const error = {};
  if (!email.includes("@")) {
    error["email"] = "Please enter a valid email address.";
  }
  if (password.length < 6) {
    error["password"] = "Password must be at least 6 characters.";
  }
  if (Object.keys(error).length > 0) {
    return { error };
  }

  //  if all good store to database
  const hashedPassword = hashUserPassword(password);

  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect("/training");
  } catch (err) {
    if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        error: {
          email: "An account with this email already exists.",
        },
      };
    }
    throw err;
  }
}
