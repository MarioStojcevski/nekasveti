import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, ArrowRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const ClientInfo = () => {
  const navigate = useNavigate();
  const { clientInfo, setClientInfo } = useAppContext();
  const [name, setName] = useState(clientInfo?.name || "");
  const [phone, setPhone] = useState(clientInfo?.phone || "");
  const [email, setEmail] = useState(clientInfo?.email || "");

  const isNameValid = name.trim().length >= 2;
  const isPhoneValid = /^(\+389|0)[0-9\s\-/]{7,15}$/.test(phone.trim());
  const isValid = isNameValid && isPhoneValid;

  const handleSubmit = () => {
    if (!isValid) return;
    setClientInfo({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
    });
    navigate("/summary");
  };

  return (
    <div className="flex flex-col min-h-full pt-2 pb-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="font-display text-2xl sm:text-3xl text-white mb-1">
          Твои Податоци
        </h1>
        <p className="text-sm text-slate-400">
          Внесете ги вашите контакт информации
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 flex-1">
        {/* Name */}
        <div className="rounded-2xl bg-dark-800 border border-dark-600/50 p-4">
          <label className="flex items-center gap-2 mb-2">
            <User size={14} className="text-gold-400" />
            <span className="text-xs font-medium text-slate-400">Име и презиме *</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="пр. Марио Стојчевски"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-600"
            autoComplete="name"
          />
          {name.length > 0 && !isNameValid && (
            <p className="text-xs text-red-400/70 mt-1">Внесете најмалку 2 карактери</p>
          )}
        </div>

        {/* Phone */}
        <div className="rounded-2xl bg-dark-800 border border-dark-600/50 p-4">
          <label className="flex items-center gap-2 mb-2">
            <Phone size={14} className="text-gold-400" />
            <span className="text-xs font-medium text-slate-400">Телефон *</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="пр. 070 123 456"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-600"
            autoComplete="tel"
          />
          {phone.length > 0 && !isPhoneValid && (
            <p className="text-xs text-red-400/70 mt-1">Внесете валиден македонски телефон</p>
          )}
        </div>

        {/* Email (optional) */}
        <div className="rounded-2xl bg-dark-800 border border-dark-600/50 p-4">
          <label className="flex items-center gap-2 mb-2">
            <Mail size={14} className="text-slate-500" />
            <span className="text-xs font-medium text-slate-400">Email (опционално)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="primer@email.com"
            className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-600"
            autoComplete="email"
          />
        </div>

        {/* Hint */}
        <p className="text-xs text-slate-500 text-center px-4">
          Ќе ве контактираме на овој број за потврда на резервацијата
        </p>
      </div>

      {/* Submit button */}
      <div className="pt-4 pb-4">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-400 text-dark-900 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Продолжи кон преглед
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ClientInfo;
