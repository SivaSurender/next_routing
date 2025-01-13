"use server";

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/users";
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

export async function login(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // dont need to validate as we will check for the users from existing records eventually

  const existingUser = getUserByEmail(email);
  if (!existingUser) {
    return {
      error: {
        email: "Could not authenticate the user, please check your credentials",
      },
    };
  }

  // if email correct , and incorrect pwd
  const isValidPwd = verifyPassword(existingUser.password, password);

  if (!isValidPwd) {
    return {
      error: {
        email: "Could not authenticate the user, please check your credentials",
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(mode, prevState, formData) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}
