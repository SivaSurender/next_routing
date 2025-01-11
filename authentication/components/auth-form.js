"use client";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signup } from "@/actions/auth-actions.js";

export default function AuthForm() {
  const [formState, formHandle] = useFormState(signup, {});
  return (
    <form id="auth-form" action={formHandle}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.error && (
        <ul id="form-errors">
          {Object.keys(formState.error).map((item) => (
            <li key={item}>{formState.error[item]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">Create Account</button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
