"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginClient() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [msg, setMsg] = useState("");

  const router = useRouter();
  const params = useSearchParams();
  const nextPath = params.get("next") || "/admin";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMsg("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatus("error");
      setMsg(data?.error || "Login failed");
      return;
    }

    router.push(nextPath);
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-md mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
        <p className="text-gray-600 mt-2">
          Enter the admin password to access the dashboard.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
        >
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-gray-200 bg-white text-gray-900 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Enter admin password"
          />

          {msg && (
            <div className="mt-4 bg-red-50 text-red-700 border border-red-200 rounded-md px-4 py-3 text-sm">
              {msg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-6 w-full bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium hover:bg-blue-700 disabled:opacity-60"
          >
            {status === "loading" ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}
