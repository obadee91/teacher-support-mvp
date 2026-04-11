"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      localStorage.setItem("classsupport_isLoggedIn", "true");
      localStorage.setItem("classsupport_teacher", email.trim());
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@school.edu"
          className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-border text-base text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-shadow"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter any password"
          className="w-full min-h-[44px] px-4 py-3 rounded-lg border border-border text-base text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-shadow"
        />
      </div>
      <button
        type="submit"
        className="w-full min-h-[48px] py-3 rounded-lg bg-accent text-white font-medium text-lg hover:bg-accent-hover active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        Log In
      </button>
    </form>
  );
}
