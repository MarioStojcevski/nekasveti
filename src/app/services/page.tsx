"use client";

import { useRouter } from "next/navigation";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import PageBg from "@/components/PageBg";
import { useAppContext } from "@/context/AppContext";
import { getTotalItems, getTotalPrice } from "@/utils/pricing";
import allServices from "@/utils/allServices";

const serviceImages: Record<string, string> = {
  s1: "/assets/services/fotelja.jpg",
  s2: "/assets/services/dvosed.jpg",
  s3: "/assets/services/trosed.jpg",
  s4: "/assets/services/petosed.jpg",
  s5: "/assets/services/sestosed.jpg",
  s6: "/assets/services/sedmosed.jpg",
  s7: "/assets/services/stol.jpg",
  s8: "/assets/services/taburetka.jpg",
  s9: "/assets/services/kancelariski.jpg",
  s10: "/assets/services/dusek.jpg",
  s11: "/assets/services/dusek.jpg",
};

const Services = () => {
  const router = useRouter();
  const { services, setServices } = useAppContext();

  const updateQuantity = (serviceId: string, increment: boolean) => {
    const svc = allServices.find((s) => s.id === serviceId);
    if (!svc) return;
    const existing = services.find((s) => s.id === serviceId);

    if (existing) {
      if (increment) {
        setServices(
          services.map((s) =>
            s.id === serviceId ? { ...s, quantity: (s.quantity || 0) + 1 } : s
          )
        );
      } else {
        if (existing.quantity && existing.quantity > 1) {
          setServices(
            services.map((s) =>
              s.id === serviceId ? { ...s, quantity: (s.quantity || 1) - 1 } : s
            )
          );
        } else {
          setServices(services.filter((s) => s.id !== serviceId));
        }
      }
    } else if (increment) {
      setServices([...services, { ...svc, quantity: 1 }]);
    }
  };

  const totalItems = getTotalItems(services);
  const totalPrice = getTotalPrice(services);

  return (
    <PageBg image="carpet">
    <div className="flex flex-col min-h-full pt-2 pb-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl sm:text-3xl text-text-100 mb-1 font-bold">
          Избери Услуги
        </h1>
        <p className="text-sm text-text-400">
          Изберете услуги за хемиско чистење
        </p>
      </div>

      <div className="flex-1 space-y-3 pb-24">
        {allServices.map((service) => {
          const selected = services.find((s) => s.id === service.id);
          const qty = selected?.quantity || 0;

          return (
            <div
              key={service.id}
              className={`rounded-2xl overflow-hidden border transition-all duration-200 ${
                qty > 0
                  ? "border-copper-400/50 bg-page-700 shadow-lg shadow-copper-400/10"
                  : "border-page-500/50 bg-page-800"
              }`}
            >
              <div className="flex gap-3 p-3">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-page-600">
                  <img
                    src={serviceImages[service.id]}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-text-100 leading-tight break-words">
                      {service.name}
                    </h3>
                    <span className="text-base font-bold text-copper-400 whitespace-nowrap">
                      {service.price} ден.
                    </span>
                  </div>

                  <div className="mt-auto pt-2">
                    {qty > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(service.id, false)}
                          className="w-8 h-8 rounded-lg bg-page-600 text-text-400 hover:text-copper-400 flex items-center justify-center transition-colors active:scale-90"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-semibold text-text-100 w-6 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(service.id, true)}
                          className="w-8 h-8 rounded-lg bg-page-600 text-text-400 hover:text-copper-400 flex items-center justify-center transition-colors active:scale-90"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => updateQuantity(service.id, true)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-copper-400/50 text-copper-400 text-xs font-semibold hover:bg-copper-400/10 transition-colors active:scale-95 w-fit"
                      >
                        <Plus size={14} />
                        Додади
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-16 left-0 right-0 z-40 px-4 pb-2 max-w-lg mx-auto">
        <div className="bg-page-800/95 backdrop-blur-xl border border-page-500/50 rounded-2xl p-3 shadow-xl">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <ShoppingBag size={16} className="text-copper-400" />
              <span className="text-sm text-text-400">
                {totalItems} {totalItems === 1 ? "услуга" : "услуги"}
              </span>
            </div>
            <span className="text-base font-bold text-copper-400">
              {totalPrice} ден.
            </span>
          </div>
          <button
            onClick={() => router.push("/schedule")}
            disabled={services.length === 0}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-copper-500 to-copper-400 text-text-100 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Продолжи со избор на датум →
          </button>
        </div>
      </div>
    </div>
    </PageBg>
  );
};

export default Services;
