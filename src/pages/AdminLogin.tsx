import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, ArrowRight } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const adminUser = import.meta.env.VITE_ADMIN_USERNAME || "admin";
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD || "admin";

    if (username === adminUser && password === adminPass) {
      sessionStorage.setItem("admin_session", "true");
      sessionStorage.setItem("admin_username", username);
      navigate("/admin");
    } else {
      setError("Погрешно корисничко име или лозинка");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-page-700 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-copper-400" />
          </div>
          <h1 className="text-2xl font-bold text-text-100 mb-1">Админ</h1>
          <p className="text-sm text-text-400">Внесете ги податоците за најава</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
            <label className="flex items-center gap-2 mb-2">
              <User size={14} className="text-copper-400" />
              <span className="text-xs font-medium text-text-400">Корисничко име</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent text-base text-text-100 outline-none placeholder:text-text-500"
              autoComplete="username"
            />
          </div>

          <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
            <label className="flex items-center gap-2 mb-2">
              <Lock size={14} className="text-copper-400" />
              <span className="text-xs font-medium text-text-400">Лозинка</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-base text-text-100 outline-none placeholder:text-text-500"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Најави се
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
