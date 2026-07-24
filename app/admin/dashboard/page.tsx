"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { PRIZE_TIERS, getPrizeTier, generateFillerTickets } from "@/lib/prizes";
import type { Winner } from "@/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { token, name, ready, isAuthenticated, logout } = useAuth();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    position: "5",
    ticketNumber: "KL50001",
    date: "", // HTML date input: YYYY-MM-DD
  });

  function formatDisplayDate(iso: string) {
    if (!iso) return "";
    const [y, m, d] = iso.split("-");
    return `${d}/${m}/${y}`;
  }
  const [winners, setWinners] = useState<Winner[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [ready, isAuthenticated, router]);

  useEffect(() => {
    if (token) loadWinners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function loadWinners() {
    if (!token) return;
    const res = await fetch("/api/admin/winners", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setWinners(data.winners);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/admin/winners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          date: formatDisplayDate(form.date),
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Failed to save");
        return;
      }
      setMessage("Winner registered successfully!");
      setForm({
        name: "",
        mobile: "",
        position: "5",
        ticketNumber: "KL50001",
        date: "",
      });
      await loadWinners();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(id: string) {
    if (!token || !confirm("Delete this winner?")) return;
    await fetch(`/api/admin/winners?id=${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await loadWinners();
  }

  if (!ready || !isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-white/60">Welcome, {name}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20"
          >
            View Site
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="rounded-lg bg-red-600/80 px-3 py-2 text-sm text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-xl sm:p-6">
        <h2 className="text-lg font-bold text-green-800">
          Register Winner
        </h2>

        <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="SATYA BHAWANI"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              value={form.mobile}
              onChange={(e) =>
                setForm({
                  ...form,
                  mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                })
              }
              placeholder="9876543210"
              maxLength={10}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Position (Prize)
            </label>
            <select
              value={form.position}
              onChange={(e) => {
                const newPos = e.target.value;
                const tier = getPrizeTier(Number(newPos));
                const tickets = tier ? generateFillerTickets(tier.rank, tier.ticketCount) : [];
                setForm({ ...form, position: newPos, ticketNumber: tickets[0] || "" });
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
              required
            >
              {PRIZE_TIERS.map((t) => (
                <option key={t.rank} value={t.rank}>
                  {t.label} — {t.amount}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Ticket Number
            </label>
            <select
              value={form.ticketNumber}
              onChange={(e) => setForm({ ...form, ticketNumber: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 font-mono outline-none focus:border-green-600"
              required
            >
              {(() => {
                const tier = getPrizeTier(Number(form.position));
                const tickets = tier ? generateFillerTickets(tier.rank, tier.ticketCount) : [];
                return tickets.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ));
              })()}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-green-600"
              required
            />
            {form.date && (
              <p className="mt-1 text-xs text-gray-500">
                Saved as: {formatDisplayDate(form.date)}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            {error && (
              <p className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}
            {message && (
              <p className="mb-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                {message}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-700 py-3 font-bold text-white hover:bg-green-800 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Winner"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="text-lg font-bold text-gray-800">
          Registered Winners ({winners.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="py-2 pr-2">Name</th>
                <th className="py-2 pr-2">Mobile</th>
                <th className="py-2 pr-2">Pos</th>
                <th className="py-2 pr-2">Ticket</th>
                <th className="py-2 pr-2">Date</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((w) => (
                <tr key={String(w._id)} className="border-b border-gray-100">
                  <td className="py-2.5 pr-2 font-semibold">{w.name}</td>
                  <td className="py-2.5 pr-2">{w.mobile}</td>
                  <td className="py-2.5 pr-2">{w.position}</td>
                  <td className="py-2.5 pr-2 font-mono">{w.ticketNumber}</td>
                  <td className="py-2.5 pr-2">{w.date}</td>
                  <td className="py-2.5">
                    <button
                      type="button"
                      onClick={() => onDelete(String(w._id))}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {winners.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    No winners registered yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
