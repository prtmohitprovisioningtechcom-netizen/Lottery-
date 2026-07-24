"use client";

import { FormEvent, useState } from "react";
import { useResultStore } from "@/store/resultStore";

export default function CheckResultForm() {
  const [mobile, setMobile] = useState("");
  const { loading, error, setLoading, setResult, setError, checked } =
    useResultStore();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/check-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "No result found");
        setLoading(false);
        return;
      }

      setResult(data.winner, data.prizeTickets);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-4 w-full max-w-md rounded-2xl bg-white p-5 shadow-xl sm:p-6">
      <div className="mb-5 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow sm:text-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
          </span>
          LIVE RESULT
        </span>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={mobile}
          onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
          placeholder="Enter Mobile Number"
          className="w-full rounded-lg border-2 border-amber-400 px-4 py-3 text-center text-base text-gray-800 outline-none placeholder:text-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
          required
        />

        <button
          type="submit"
          disabled={loading || mobile.length < 10}
          className="w-full rounded-lg bg-green-700 py-3.5 text-base font-bold uppercase tracking-wide text-white shadow transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Checking..." : "CHECK RESULT"}
        </button>
      </form>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-center text-sm font-medium text-red-600">
          {error}
        </p>
      )}

      {checked && !error && (
        <p className="mt-3 text-center text-xs text-gray-400">
          Scroll down to view certificate & prize list
        </p>
      )}
    </div>
  );
}
