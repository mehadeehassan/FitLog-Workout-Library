"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#1c1c1c",
          color: "#f5f5f5",
          border: "1px solid #2a2a2a",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#ccff00",
            secondary: "#0a0a0a",
          },
        },
      }}
    />
  );
}
