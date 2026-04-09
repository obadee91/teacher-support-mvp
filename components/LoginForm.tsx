"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("classsupport_teacher", name.trim());
      router.push("/dashboard");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Your Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ms. Johnson"
          className="w-full px-4 py-3 rounded-lg border border-border text-foreground placeholder:text-gray-mid focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-accent text-white font-medium text-lg hover:bg-accent-hover transition-colors"
      >
        Get Started
      </button>
    </form>
  );
}
