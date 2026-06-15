"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  LogOut, Search, ChevronDown, Wallet, TrendingUp,
  Check, X, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  fetchAllBookings,
  updateBookingStatus,
  type SortField,
} from "@/lib/bookings";
import type { Booking } from "@/types";
import dayjs from "dayjs";

const STATUS_OPTIONS = [
  { value: "confirmed" as const, label: "Закажано" },
  { value: "completed" as const, label: "Завршено" },
  { value: "cancelled" as const, label: "Откажано" },
];

const PAGE_SIZE = 50;

const AdminDashboard = () => {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; ok: boolean } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (!session) {
      router.replace("/admin/login");
      return;
    }
    fetchBookings();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      setBookings(await fetchAllBookings(sortField, sortDir === "asc"));
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const completedBookings = useMemo(
    () => bookings.filter((b) => b.status === "completed"),
    [bookings]
  );

  const totalRevenue = useMemo(
    () => completedBookings.reduce((sum, b) => sum + (b.total_price || 0), 0),
    [completedBookings]
  );

  const monthRevenue = useMemo(() => {
    const now = dayjs();
    return completedBookings
      .filter((b) => dayjs(b.date).isSame(now, "month"))
      .reduce((sum, b) => sum + (b.total_price || 0), 0);
  }, [completedBookings]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    router.push("/admin/login");
  };

  const toggleSort = (field: "date" | "created_at") => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const updateStatus = async (id: string, status: Booking["status"]) => {
    setUpdatingId(id);
    setFeedback(null);
    setOpenDropdown(null);

    try {
      await updateBookingStatus(id, status);
      setFeedback({ id, ok: true });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch {
      setFeedback({ id, ok: false });
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return bookings.filter(
      (b) =>
        b.client_name?.toLowerCase().includes(q) ||
        b.client_phone?.toLowerCase().includes(q) ||
        b.ref?.toLowerCase().includes(q)
    );
  }, [bookings, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const statusBadge = (s: string) => {
    switch (s) {
      case "confirmed": return "bg-copper-400/20 text-copper-400";
      case "completed": return "bg-green-400/20 text-green-400";
      case "cancelled": return "bg-red-400/20 text-red-400";
      default: return "bg-text-400/20 text-text-400";
    }
  };

  const statusLabel = (s: string) => STATUS_OPTIONS.find((o) => o.value === s)?.label || s;

  const formatPrice = (n: number) => n.toLocaleString("mk-MK");

  const handleStatusClick = (id: string, e: React.MouseEvent) => {
    if (openDropdown === id) {
      setOpenDropdown(null);
      return;
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setDropdownPos({ top: rect.bottom + 4, left: rect.right - 144 });
    setOpenDropdown(id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="w-8 h-8 border-2 border-copper-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-4 pb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-100">
          здраво, {sessionStorage.getItem("admin_username") || "admin"}
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-page-700 text-text-400 hover:text-copper-400 hover:bg-page-600 transition-colors text-sm"
        >
          <LogOut size={15} />
          Одјава
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Wallet size={15} className="text-copper-400" />
            <span className="text-xs text-text-400 font-medium">Вкупен приход</span>
          </div>
          <p className="text-xl font-bold text-text-100">{formatPrice(totalRevenue)} ден.</p>
        </div>
        <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={15} className="text-copper-400" />
            <span className="text-xs text-text-400 font-medium">Месечен приход</span>
          </div>
          <p className="text-xl font-bold text-text-100">{formatPrice(monthRevenue)} ден.</p>
        </div>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пребарај по име, телефон или референца..."
          className="w-full bg-page-800 border border-page-500/50 rounded-xl py-3 pl-10 pr-4 text-sm text-text-100 outline-none placeholder:text-text-500"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl bg-page-800 border border-page-500/50">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-page-500/50">
              <th className="text-left py-3 px-4 text-text-400 font-medium">Ref</th>
              <th className="text-left py-3 px-4 text-text-400 font-medium">Име</th>
              <th className="text-left py-3 px-4 text-text-400 font-medium">Телефон</th>
              <th
                className="text-left py-3 px-4 text-text-400 font-medium cursor-pointer hover:text-text-100 select-none"
                onClick={() => toggleSort("date")}
              >
                <span className="flex items-center gap-1">
                  Датум
                  {sortField === "date" && (
                    <ChevronDown size={12} className={`transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`} />
                  )}
                </span>
              </th>
              <th className="text-left py-3 px-4 text-text-400 font-medium">Време</th>
              <th className="text-left py-3 px-4 text-text-400 font-medium">Адреса</th>
              <th className="text-left py-3 px-4 text-text-400 font-medium">Вкупно</th>
              <th className="text-left py-3 px-4 text-text-400 font-medium">Статус</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-text-500">
                  Нема резервации
                </td>
              </tr>
            ) : (
              paginated.map((b) => (
                <tr key={b.id} className="border-b border-page-500/30 hover:bg-page-700/50 transition-colors">
                  <td className="py-3 px-4 text-copper-400 font-mono text-xs">{b.ref}</td>
                  <td className="py-3 px-4 text-text-100 font-medium">{b.client_name}</td>
                  <td className="py-3 px-4 text-text-400">{b.client_phone}</td>
                  <td className="py-3 px-4 text-text-300">
                    {dayjs(b.date).format("DD.MM.YYYY")}
                  </td>
                  <td className="py-3 px-4 text-text-300">{b.time}</td>
                  <td className="py-3 px-4 text-text-400 text-xs max-w-[150px] truncate">
                    {b.address}
                  </td>
                  <td className="py-3 px-4 text-text-100 font-semibold">{b.total_price} ден.</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={(e) => handleStatusClick(b.id, e)}
                      disabled={updatingId === b.id}
                      className={`flex items-center justify-center gap-1 w-24 px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                        updatingId === b.id ? "opacity-50" : ""
                      } ${statusBadge(b.status)}`}
                    >
                      {updatingId === b.id ? (
                        <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : feedback?.id === b.id ? (
                        feedback.ok ? (
                          <Check size={12} className="text-green-400" />
                        ) : (
                          <X size={12} className="text-red-400" />
                        )
                      ) : null}
                      {statusLabel(b.status)}
                      <ChevronDown size={10} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {openDropdown && dropdownPos && createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setOpenDropdown(null)} />
          <div
            ref={dropdownRef}
            className="fixed z-[9999] w-36 bg-page-800 border border-page-500/50 rounded-xl shadow-xl overflow-hidden"
            style={{ top: dropdownPos.top, left: dropdownPos.left }}
          >
            {STATUS_OPTIONS.map((opt) => {
              const booking = bookings.find((b) => b.id === openDropdown);
              return (
                <button
                  key={opt.value}
                  onClick={() => updateStatus(openDropdown, opt.value)}
                  className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:bg-page-700 ${
                    booking?.status === opt.value
                      ? "text-copper-400"
                      : "text-text-300 hover:text-text-100"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </>,
        document.body
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-xs text-text-400">
          <span>
            Страна {page} од {totalPages} ({filtered.length} вкупно)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-page-700 disabled:opacity-30 hover:bg-page-600 transition-colors"
            >
              <ChevronLeft size={14} />
              Претходна
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-page-700 disabled:opacity-30 hover:bg-page-600 transition-colors"
            >
              Следна
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
