import React from "react";

export default function RootModal({ children, modal }) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
