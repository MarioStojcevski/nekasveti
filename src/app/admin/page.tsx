"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  LogOut, Search, ChevronDown, Wallet, TrendingUp,
  ChevronLeft, ChevronRight,
  Clock, CheckCircle, XCircle, LoaderCircle,
} from "lucide-react";
import {
  fetchAllBookings,
  updateBookingStatus,
  type SortField,
} from "@/lib/bookings";
import type { Booking } from "@/types";
import dayjs from "dayjs";

const STATUS_OPTIONS = [
  { value: "confirmed" as const, label: "Закажано", icon: Clock },
  { value: "completed" as const, label: "Завршено", icon: CheckCircle },
  { value: "cancelled" as const, label: "Откажано", icon: XCircle },
] as const;

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
  const [refreshing, setRefreshing] = useState(false);
  const [addressTip, setAddressTip] = useState<{ top: number; left: number; text: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (!session) {
      router.replace("/admin/login");
      return;
    }
    let active = true;
    void (async () => {
      try {
        const data = await fetchAllBookings(sortField, sortDir === "asc");
        if (active) setBookings(data);
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      } finally {
        if (active) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [router, sortField, sortDir]);

  const [prevSearch, setPrevSearch] = useState(search);
  if (prevSearch !== search) {
    setPrevSearch(search);
    setPage(1);
  }

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
    if (refreshing) return;
    setRefreshing(true);
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(1);
  };

  const updateStatus = async (id: string, status: Booking["status"]) => {
    setUpdatingId(id);
    setOpenDropdown(null);

    try {
      await updateBookingStatus(id, status);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
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
      case "confirmed": return "bg-amber-400/20 text-amber-800";
      case "completed": return "bg-green-400/20 text-green-800";
      case "cancelled": return "bg-red-400/20 text-red-800";
      default: return "bg-text-400/20 text-text-100";
    }
  };

  const statusLabel = (s: string) => STATUS_OPTIONS.find((o) => o.value === s)?.label || s;
  const statusIcon = (s: string) => {
    const opt = STATUS_OPTIONS.find((o) => o.value === s);
    return opt?.icon || null;
  };

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

      <div className="relative overflow-x-auto rounded-2xl bg-page-800 border border-page-500/50 scrollbar-visible">
        <table className={`w-full text-sm transition-opacity ${refreshing ? "opacity-40" : ""}`}>
          <thead>
            <tr className="border-b border-page-500/50">
              <th className="text-left py-3 px-4 text-text-400 font-medium whitespace-nowrap">Ref</th>
              <th className="text-left py-3 px-4 text-text-400 font-medium">Име</th>
              <th className="text-left py-3 px-4 text-text-400 font-medium whitespace-nowrap">Телефон</th>              <th
                className="text-left py-3 px-4 text-text-400 font-medium cursor-pointer hover:text-text-100 select-none whitespace-nowrap"
                onClick={() => toggleSort("date")}
              >
                <span className="flex items-center gap-1">
                  Датум
                  {sortField === "date" && (
                    <ChevronDown size={12} className={`transition-transform ${sortDir === "asc" ? "rotate-180" : ""}`} />
                  )}
                </span>
              </th>
              <th className="text-left py-3 px-4 text-text-400 font-medium whitespace-nowrap">Време</th>
              <th className="text-left py-3 px-4 text-text-400 font-medium">Адреса</th>
              <th className="text-left py-3 px-4 text-text-400 font-medium whitespace-nowrap">Вкупно</th>
              <th className="sticky right-0 z-10 text-left py-3 px-4 text-text-400 font-medium bg-page-800 border-l border-page-500/50 shadow-[-8px_0_12px_-8px_rgba(26,26,26,0.08)]">Статус</th>
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
                  <td className="py-3 px-4 text-copper-400 font-mono text-xs whitespace-nowrap">{b.ref}</td>
                  <td className="py-3 px-4 text-text-100 font-medium">{b.client_name}</td>
                  <td className="py-3 px-4 text-text-400 whitespace-nowrap">{b.client_phone}</td>
                  <td className="py-3 px-4 text-text-300 whitespace-nowrap">
                    {dayjs(b.date).format("DD.MM.YYYY")}
                  </td>
                  <td className="py-3 px-4 text-text-300 whitespace-nowrap">{b.time}</td>
                  <td
                    className="py-3 px-4 text-text-400 text-xs max-w-[200px] truncate cursor-default"
                    onMouseEnter={(e) => {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      setAddressTip({ top: rect.top - 8, left: Math.min(rect.left, window.innerWidth - 260), text: b.address || "" });
                    }}
                    onMouseLeave={() => setAddressTip(null)}
                  >
                    {b.address}
                  </td>
                  <td className="py-3 px-4 text-text-100 font-semibold whitespace-nowrap">{b.total_price} ден.</td>
                  <td className="sticky right-0 z-10 py-3 px-4 bg-page-800 border-l border-page-500/50 shadow-[-8px_0_12px_-8px_rgba(26,26,26,0.08)]">
                    <button
                      onClick={(e) => handleStatusClick(b.id, e)}
                      disabled={updatingId === b.id}
                      className={`flex items-center justify-center gap-1.5 w-28 px-2 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                        updatingId === b.id ? "opacity-60" : ""
                      } ${statusBadge(b.status)}`}
                    >
                      {updatingId === b.id ? (
                        <LoaderCircle size={14} className="animate-spin" />
                      ) : statusIcon(b.status) ? (() => {
                        const Icon = statusIcon(b.status)!;
                        return <Icon size={14} />;
                      })() : null}
                      {statusLabel(b.status)}
                      <ChevronDown size={10} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {refreshing && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-page-800/50">
            <LoaderCircle size={28} className="text-copper-400 animate-spin" />
          </div>
        )}
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
              const Icon = opt.icon;
              return (
                <button
                  key={opt.value}
                  onClick={() => updateStatus(openDropdown, opt.value)}
                  className={`w-full text-left px-3 py-2 text-xs font-medium transition-colors hover:bg-page-700 flex items-center gap-2 ${
                    booking?.status === opt.value
                      ? "text-copper-400"
                      : "text-text-300 hover:text-text-100"
                  }`}
                >
                  <Icon size={14} />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </>,
        document.body
      )}

      {addressTip && createPortal(
        <div
          className="fixed z-[9999] max-w-[260px] px-3 py-2 text-xs text-page-100 bg-page-800 border border-page-500/50 rounded-lg shadow-xl pointer-events-none"
          style={{ top: addressTip.top, left: addressTip.left, transform: "translateY(-100%)" }}
        >
          {addressTip.text}
        </div>,
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
