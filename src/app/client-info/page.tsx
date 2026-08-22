"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Phone, Mail, ArrowRight } from "lucide-react";
import PageBg from "@/components/PageBg";
import { useAppContext } from "@/context/AppContext";

const ClientInfo = () => {
  const router = useRouter();
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
    router.push("/summary");
  };

  return (
    <PageBg image="caffee">
    <div className="flex flex-col min-h-full pt-6 sm:pt-8 pb-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl text-text-100 mb-1 font-bold">
          Твои Податоци
        </h1>
        <p className="text-sm text-text-400">
          Внесете ги вашите контакт информации
        </p>
      </div>

      <div className="space-y-4 flex-1">
        <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
          <label className="flex items-center gap-2 mb-2">
            <User size={14} className="text-copper-400" />
            <span className="text-xs font-medium text-text-400">Име и презиме *</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="пр. Марио Стојчевски"
            className="w-full bg-transparent text-base text-text-100 outline-none placeholder:text-text-500"
            autoComplete="name"
          />
          {name.length > 0 && !isNameValid && (
            <p className="text-xs font-medium text-red-600 mt-1">Внесете најмалку 2 карактери</p>
          )}
        </div>

        <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
          <label className="flex items-center gap-2 mb-2">
            <Phone size={14} className="text-copper-400" />
            <span className="text-xs font-medium text-text-400">Телефон *</span>
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="пр. 070 123 456"
            className="w-full bg-transparent text-base text-text-100 outline-none placeholder:text-text-500"
            autoComplete="tel"
          />
          {phone.length > 0 && !isPhoneValid && (
            <p className="text-xs font-medium text-red-600 mt-1">Внесете валиден македонски телефон</p>
          )}
        </div>

        <div className="rounded-2xl bg-page-800 border border-page-500/50 p-4">
          <label className="flex items-center gap-2 mb-2">
            <Mail size={14} className="text-text-500" />
            <span className="text-xs font-medium text-text-400">Email (опционално)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="primer@email.com"
            className="w-full bg-transparent text-base text-text-100 outline-none placeholder:text-text-500"
            autoComplete="email"
          />
        </div>

        <p className="text-xs text-text-500 text-center px-4">
          Ќе ве контактираме на овој број за потврда на резервацијата
        </p>
      </div>

      <div className="pt-4 pb-4">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Продолжи кон преглед
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
    </PageBg>
  );
};

export default ClientInfo;
