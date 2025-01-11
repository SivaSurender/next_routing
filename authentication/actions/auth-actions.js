"use server";
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
}
