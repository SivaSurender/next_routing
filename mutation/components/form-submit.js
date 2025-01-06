"use client";
import React from "react";
import { useFormStatus } from "react-dom";

export default function FormSubmit({ children, toShow }) {
  const { pending } = useFormStatus();
  return <>{pending ? <p>{toShow}</p> : children}</>;
}
