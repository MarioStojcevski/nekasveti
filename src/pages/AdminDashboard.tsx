import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Search, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabase";
import type { Booking } from "../types";
import dayjs from "dayjs";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"date" | "created_at">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const session = sessionStorage.getItem("admin_session");
    if (!session) {
      navigate("/admin/login", { replace: true });
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order(sortField, { ascending: sortDir === "asc" });

    if (!error && data) {
      setBookings(data as unknown as Booking[]);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    navigate("/admin/login");
  };

  const toggleSort = (field: "date" | "created_at") => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("bookings").update({ status }).eq("id", id);
    fetchBookings();
  };

  const filtered = bookings.filter((b) => {
    const q = search.toLowerCase();
    return (
      b.client_name?.toLowerCase().includes(q) ||
      b.client_phone?.toLowerCase().includes(q) ||
      b.ref?.toLowerCase().includes(q)
    );
  });

  const statusColor = (s: string) => {
    switch (s) {
      case "confirmed": return "bg-copper-400/20 text-copper-400";
      case "completed": return "bg-green-400/20 text-green-400";
      case "cancelled": return "bg-red-400/20 text-red-400";
      default: return "bg-text-400/20 text-text-400";
    }
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
        <h1 className="text-2xl font-bold text-text-100">Резервации</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-page-700 text-text-400 hover:text-copper-400 hover:bg-page-600 transition-colors text-sm"
        >
          <LogOut size={15} />
          Одјава
        </button>
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10 text-text-500">
                  Нема резервации
                </td>
              </tr>
            ) : (
              filtered.map((b) => (
                <tr key={b.id} className="border-b border-page-500/30 hover:bg-page-700/50 transition-colors">
                  <td className="py-3 px-4 text-copper-400 font-mono text-xs">{b.ref}</td>
                  <td className="py-3 px-4 text-text-100 font-medium">{b.client_name}</td>
                  <td className="py-3 px-4 text-text-400">{b.client_phone}</td>
                  <td className="py-3 px-4 text-text-300">
                    {dayjs(b.date).format("DD.MM.YYYY")}
                  </td>
                  <td className="py-3 px-4 text-text-300">{b.time?.slice(0, 5)}</td>
                  <td className="py-3 px-4 text-text-400 text-xs max-w-[150px] truncate">
                    {b.address}
                  </td>
                  <td className="py-3 px-4 text-text-100 font-semibold">{b.total_price} ден.</td>
                  <td className="py-3 px-4">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg border-none outline-none cursor-pointer ${statusColor(b.status)}`}
                    >
                      <option value="confirmed" className="bg-page-800 text-text-300">Закажано</option>
                      <option value="completed" className="bg-page-800 text-text-300">Завршено</option>
                      <option value="cancelled" className="bg-page-800 text-text-300">Откажано</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
