'use client'

import { useActionState } from "react";
import { signUp } from "@/app/_actions/auth";
import Link from "next/link";

export default function SignUpPage() {
  const [state, action, pending] = useActionState(signUp, null);
  return (
    <form
      action={action}
      className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-4"
    >
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Create account</h1>
      {state?.error && (
        <p className="text-red-600 dark:text-red-400 text-sm">{state.error}</p>
      )}
      <input
        name="name"
        type="text"
        placeholder="Name"
        required
        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium py-2 transition-colors"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-600 dark:text-blue-400 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
