import React from "react";
import { Truck, Lock, Headset, DollarSign } from "lucide-react";
import { VALUE_PROPS_ITEMS } from "@/data/homeContent";
import { ValuePropItem } from "@/types";

function renderPerkIcon(iconName: ValuePropItem["iconName"]) {
  switch (iconName) {
    case "truck":
      return <Truck className="w-6 h-6 text-gray-800" strokeWidth={1.8} />;
    case "lock":
      return <Lock className="w-6 h-6 text-gray-800" strokeWidth={1.8} />;
    case "headset":
      return <Headset className="w-6 h-6 text-gray-800" strokeWidth={1.8} />;
    case "dollar":
      return <DollarSign className="w-6 h-6 text-gray-800" strokeWidth={2.2} />;
  }
}

/**
 * 1:1 Elonky Değer Önerileri & Güven Rozetleri (Server Component - RSC)
 */
export function ValueProps() {
  return (
    <section className="w-full py-10 sm:py-14 bg-white" aria-label="Value Propositions">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {VALUE_PROPS_ITEMS.map((perk) => (
            <div
              key={perk.id}
              className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-[#F0F2F2] border border-[#E3E6E6] hover:border-gray-300 transition-all shadow-none group"
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                {renderPerkIcon(perk.iconName)}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                {perk.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed max-w-[200px]">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
