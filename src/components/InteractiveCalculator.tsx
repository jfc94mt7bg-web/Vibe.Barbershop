import { useState } from "react";
import { Check, Plus, ShoppingBag, Landmark, DollarSign, Sparkles } from "lucide-react";
import { Service, ServiceCategory } from "../types";
import { SERVICES } from "../data";

interface AddOn {
  id: string;
  name: string;
  priceGEL: number;
  priceUSD: number;
  durationMin: number;
  description: string;
}

const ADD_ONS: AddOn[] = [
  {
    id: "hair-wash",
    name: "Luxury Wash & Conditioning Therapy",
    priceGEL: 15,
    priceUSD: 6,
    durationMin: 10,
    description: "Mint-infused refreshing shampoo with hair repair mask and hot water towel rinse."
  },
  {
    id: "massage",
    name: "Signature Deep Scalp Massage",
    priceGEL: 20,
    priceUSD: 8,
    durationMin: 15,
    description: "Invigorating finger pressure scalp massage with premium organic essential hair oils."
  },
  {
    id: "razor",
    name: "Straight-Razor Beard Alignment",
    priceGEL: 15,
    priceUSD: 6,
    durationMin: 10,
    description: "Super crisp outlines using classic straight razor, safety shave gel, and cool towels."
  },
  {
    id: "black-mask",
    name: "Charcoal Peel-off Face Cleansing Mask",
    priceGEL: 25,
    priceUSD: 10,
    durationMin: 20,
    description: "Removes deep pores, dirt, and impurities from your cheeks and nose for healthy skin."
  },
  {
    id: "nose-ear-wax",
    name: "Traditional Nose & Ear Waxing",
    priceGEL: 10,
    priceUSD: 4,
    durationMin: 5,
    description: "Fast, painless organic hot wax extraction of stubborn nose and ear stray hairs."
  }
];

interface InteractiveCalculatorProps {
  onPreSelectCustomBooking: (serviceName: string, totalPriceGEL: number, totalPriceUSD: number, totalDuration: number) => void;
}

export default function InteractiveCalculator({ onPreSelectCustomBooking }: InteractiveCalculatorProps) {
  const [selectedService, setSelectedService] = useState<Service>(SERVICES[0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [currency, setCurrency] = useState<"GEL" | "USD">("GEL");

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const getSelectedAddOnsData = () => ADD_ONS.filter(add => selectedAddOns.includes(add.id));
  
  const totalGEL = selectedService.priceGEL + getSelectedAddOnsData().reduce((acc, curr) => acc + curr.priceGEL, 0);
  const totalUSD = selectedService.priceUSD + getSelectedAddOnsData().reduce((acc, curr) => acc + curr.priceUSD, 0);
  const totalDuration = selectedService.durationMin + getSelectedAddOnsData().reduce((acc, curr) => acc + curr.durationMin, 0);

  const handleBookSelected = () => {
    const customName = `${selectedService.name} + ${selectedAddOns.length} Add-on${selectedAddOns.length !== 1 ? "s" : ""}`;
    onPreSelectCustomBooking(customName, totalGEL, totalUSD, totalDuration);
  };

  return (
    <div id="calculator-section" className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-amber-500 font-mono text-xs tracking-wider uppercase">Value Builder</span>
          <h3 className="text-2xl md:text-3xl font-sans font-medium text-stone-100 tracking-tight mt-1">
            Build Your Perfect Visit
          </h3>
          <p className="text-sm text-stone-400 mt-2 max-w-xl">
            Mix and match high-quality haircut packages and premium luxury extras to watch your total estimate update live.
          </p>
        </div>
        
        {/* Currency Switcher */}
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 self-start md:self-end">
          <button
            onClick={() => setCurrency("GEL")}
            className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
              currency === "GEL"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            GEL (₾)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
              currency === "USD"
                ? "bg-amber-500 text-stone-950 font-bold"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Part 1: Main Service Selection */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h4 className="text-xs font-mono text-amber-500/80 uppercase tracking-widest mb-3">1. Select Core Grooming Package</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((serv) => {
                const isSelected = selectedService.id === serv.id;
                return (
                  <button
                    key={serv.id}
                    onClick={() => setSelectedService(serv)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-amber-500/10 border-amber-500 text-stone-100 shadow-lg shadow-amber-500/5"
                        : "bg-stone-950/40 border-stone-800/80 text-stone-300 hover:bg-stone-950/80 hover:border-stone-700"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-sm line-clamp-1">{serv.name}</span>
                      <span className="font-mono text-xs text-amber-500 font-bold ml-2">
                        {currency === "GEL" ? `₾${serv.priceGEL}` : `$${serv.priceUSD}`}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
                      {serv.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] font-mono text-stone-500">
                      <span>⏱ {serv.durationMin} mins</span>
                      {isSelected && (
                        <span className="text-amber-500 flex items-center gap-1 font-bold">
                          <Check className="w-3.5 h-3.5" /> Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Part 2: Luxury Add-ons Selection */}
          <div>
            <h4 className="text-xs font-mono text-amber-500/80 uppercase tracking-widest mb-3">2. Elevate with Premium Add-ons</h4>
            <div className="space-y-2.5">
              {ADD_ONS.map((add) => {
                const isSelected = selectedAddOns.includes(add.id);
                return (
                  <button
                    key={add.id}
                    onClick={() => toggleAddOn(add.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? "bg-stone-950 border-amber-500 text-stone-100"
                        : "bg-stone-950/30 border-stone-800 text-stone-400 hover:bg-stone-950/60 hover:text-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        isSelected 
                          ? "bg-amber-500 border-amber-500 text-stone-950" 
                          : "border-stone-700 bg-stone-950 text-transparent"
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      </div>
                      <div>
                        <span className={`text-sm font-medium ${isSelected ? "text-stone-100" : "text-stone-300"}`}>
                          {add.name}
                        </span>
                        <p className="text-xs text-stone-500 mt-0.5 max-w-md line-clamp-1">
                          {add.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs font-bold text-amber-500 block">
                        +{currency === "GEL" ? `₾${add.priceGEL}` : `$${add.priceUSD}`}
                      </span>
                      <span className="font-mono text-[10px] text-stone-500 block">
                        +{add.durationMin}m
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Part 3: Live Calculation Summary Card */}
        <div className="lg:col-span-5">
          <div className="bg-stone-950 border border-stone-800 rounded-xl p-5 sticky top-4 shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-stone-800/80">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-sans font-medium text-stone-200 text-sm">Invoice Estimate</h5>
                <span className="text-[10px] text-stone-500 font-mono">VIBE BEAUTY WORKSHOP</span>
              </div>
            </div>

            {/* Selected Items Breakdown List */}
            <div className="space-y-3 mb-6 max-h-[180px] overflow-y-auto pr-1">
              {/* Base */}
              <div className="flex justify-between items-start text-xs text-stone-400">
                <div className="max-w-[70%]">
                  <span className="font-semibold text-stone-200 block">{selectedService.name}</span>
                  <span className="text-stone-500 font-mono text-[10px]">{selectedService.durationMin} mins · Base tier</span>
                </div>
                <span className="font-mono text-stone-300">
                  {currency === "GEL" ? `₾${selectedService.priceGEL}` : `$${selectedService.priceUSD}`}
                </span>
              </div>

              {/* Extras */}
              {getSelectedAddOnsData().map(add => (
                <div key={add.id} className="flex justify-between items-start text-xs text-stone-400 border-t border-stone-900 pt-2">
                  <div className="max-w-[70%]">
                    <span className="text-stone-300 block">{add.name}</span>
                    <span className="text-stone-500 font-mono text-[10px]">{add.durationMin} mins · Extra</span>
                  </div>
                  <span className="font-mono text-amber-500/80">
                    +{currency === "GEL" ? `₾${add.priceGEL}` : `$${add.priceUSD}`}
                  </span>
                </div>
              ))}

              {selectedAddOns.length === 0 && (
                <p className="text-[11px] text-stone-500 italic py-2 border-t border-stone-900">
                  No additional luxury upgrades added yet. Treat yourself!
                </p>
              )}
            </div>

            {/* Total Math Block */}
            <div className="bg-stone-900/60 rounded-lg p-3.5 space-y-2 mb-6 border border-stone-900">
              <div className="flex justify-between text-xs text-stone-400">
                <span>Estimated Time:</span>
                <span className="font-mono text-stone-200 font-bold">{totalDuration} minutes</span>
              </div>
              <div className="flex justify-between text-xs text-stone-400">
                <span>Subtotal ({currency}):</span>
                <span>
                  {currency === "GEL" ? `₾${totalGEL}` : `$${totalUSD}`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-stone-800 text-stone-100">
                <span className="font-bold text-sm">Total Price:</span>
                <span className="font-mono text-xl text-amber-500 font-bold flex items-center">
                  {currency === "GEL" ? (
                    <>₾{totalGEL}</>
                  ) : (
                    <>${totalUSD}</>
                  )}
                </span>
              </div>
            </div>

            {/* Confirm & Trigger Booking button */}
            <button
              onClick={handleBookSelected}
              className="w-full py-3 bg-amber-500 text-stone-950 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-amber-400 active:bg-amber-600 transition-all shadow-md shadow-amber-500/10 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-stone-950" />
              Book Custom Combination
            </button>
            <p className="text-[10px] text-stone-500 text-center mt-3 leading-relaxed">
              *Real-time estimate. Dynamic billing occurs directly in the salon based in Batumi. No advance payment required online!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
