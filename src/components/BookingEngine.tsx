import { useState, useEffect, FormEvent } from "react";
import { Calendar as CalendarIcon, Clock, UserCheck, CheckCircle2, Ticket, Sparkles, Navigation, Phone, CalendarDays, Archive, Trash2, XCircle } from "lucide-react";
import { Booking, BarberId, Service, ServiceCategory } from "../types";
import { BARBERS, SERVICES } from "../data";

interface BookingEngineProps {
  preSelectedCustomService: {
    name: string;
    priceGEL: number;
    priceUSD: number;
    durationMin: number;
  } | null;
  onClearPreSelected: () => void;
}

const TIME_SLOTS = [
  "10:00 AM", "10:45 AM", "11:30 AM", "12:15 PM", 
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", 
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
];

export default function BookingEngine({ preSelectedCustomService, onClearPreSelected }: BookingEngineProps) {
  // Local storage appointments
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  
  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [selectedBarberId, setSelectedBarberId] = useState<BarberId>(BarberId.Any);
  
  // Custom preselected overrider state
  const [useCustomService, setUseCustomService] = useState<boolean>(false);

  // Generate next 14 calendar dates
  const [datesList, setDatesList] = useState<{ dayName: string; dateStr: string; dayNum: number; fullDate: string }[]>([]);
  const [selectedDateStr, setSelectedDateStr] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [justBooked, setJustBooked] = useState<Booking | null>(null);
  const [showNotification, setShowNotification] = useState<string>("");

  // Populate Dates
  useEffect(() => {
    const list = [];
    const date = new Date(); // starts today: 2026-05-29
    
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    for (let i = 0; i < 14; i++) {
      const tempDate = new Date(date);
      tempDate.setDate(date.getDate() + i);
      
      const dayName = daysOfWeek[tempDate.getDay()];
      const dayNum = tempDate.getDate();
      const monthName = tempDate.toLocaleString("en-US", { month: "short" });
      const fullDate = `${monthName} ${dayNum}, ${tempDate.getFullYear()}`;
      const dateStr = tempDate.toISOString().split("T")[0];

      list.push({
        dayName,
        dateStr,
        dayNum,
        fullDate
      });
    }
    setDatesList(list);
    setSelectedDateStr(list[0].dateStr); // Default to today
    setSelectedTimeSlot(TIME_SLOTS[2]); // Default to 11:30 AM
  }, []);

  // Listen to preselected custom service
  useEffect(() => {
    if (preSelectedCustomService) {
      setUseCustomService(true);
    }
  }, [preSelectedCustomService]);

  // Read bookings from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("vibe_bookings");
    if (stored) {
      try {
        setActiveBookings(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse bookings", e);
      }
    }
  }, []);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) return;

    let finalServiceName = "";
    let finalPriceGEL = 0;
    let finalPriceUSD = 0;

    if (useCustomService && preSelectedCustomService) {
      finalServiceName = preSelectedCustomService.name;
      finalPriceGEL = preSelectedCustomService.priceGEL;
      finalPriceUSD = preSelectedCustomService.priceUSD;
    } else {
      const serv = SERVICES.find(s => s.id === selectedServiceId);
      if (serv) {
        finalServiceName = serv.name;
        finalPriceGEL = serv.priceGEL;
        finalPriceUSD = serv.priceUSD;
      }
    }

    const barberObj = BARBERS.find(b => b.id === selectedBarberId);
    const finalBarberName = barberObj ? barberObj.name : "First Available Barber";

    const newBooking: Booking = {
      id: `VIBE-${Math.floor(100000 + Math.random() * 900000)}`,
      serviceId: useCustomService ? "custom" : selectedServiceId,
      serviceName: finalServiceName,
      barberId: selectedBarberId,
      barberName: finalBarberName,
      priceGEL: finalPriceGEL,
      priceUSD: finalPriceUSD,
      date: selectedDateStr,
      timeSlot: selectedTimeSlot,
      customerName,
      customerEmail,
      customerPhone,
      notes,
      status: "confirmed",
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...activeBookings];
    setActiveBookings(updated);
    localStorage.setItem("vibe_bookings", JSON.stringify(updated));

    setJustBooked(newBooking);
    
    // Reset fields
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setNotes("");
    setUseCustomService(false);
    onClearPreSelected();

    setShowNotification("Appointment successfully reserved! Details below.");
    setTimeout(() => {
      setShowNotification("");
    }, 5500);
  };

  const cancelBooking = (id: string) => {
    const updated = activeBookings.map(b => 
      b.id === id ? { ...b, status: "cancelled" as const } : b
    );
    setActiveBookings(updated);
    localStorage.setItem("vibe_bookings", JSON.stringify(updated));
    
    if (justBooked?.id === id) {
      setJustBooked(prev => prev ? { ...prev, status: "cancelled" } : null);
    }
  };

  // Find currently selected core service details (to show description)
  const activeCoreService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  return (
    <div id="booking-engine-wrapper" className="space-y-12">
      {/* Visual notification bubble */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-stone-900 border border-amber-500 rounded-xl p-4 shadow-2xl animate-fade-in flex gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-500">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-sans font-bold text-sm text-stone-100 block">Reservation Success!</span>
            <p className="text-xs text-stone-400 mt-1">{showNotification}</p>
          </div>
        </div>
      )}

      {/* Main Reservation Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8">
        <div className="lg:col-span-8">
          <div className="mb-8">
            <span className="text-amber-500 font-mono text-xs tracking-wider uppercase">Online Concierge</span>
            <h3 className="text-2xl md:text-3xl font-sans font-medium text-stone-100 tracking-tight mt-1">
              Reserve Your Salon Velvet Sea
            </h3>
            <p className="text-sm text-stone-400 mt-2">
              Book real slots with Ilya, Vlad, or Katerina. Fill your information and lock your seat in our Batumi barbershop.
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-6">
            {/* Step 1: Services */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block">
                  1. Choose Service Package
                </span>
                {useCustomService && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setUseCustomService(false);
                      onClearPreSelected();
                    }}
                    className="text-[11px] font-mono text-amber-400 hover:underline"
                  >
                    Reset to core list
                  </button>
                )}
              </div>

              {useCustomService && preSelectedCustomService ? (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[11px] font-mono bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 block w-fit mb-1 font-bold uppercase">
                        Active Custom Built Combination
                      </span>
                      <h4 className="text-sm font-bold text-stone-100">{preSelectedCustomService.name}</h4>
                      <p className="text-xs text-stone-400 mt-1">
                        Upgraded with multiple luxury treatments selected from the live value-builder calculator.
                      </p>
                    </div>
                    <div className="text-right pl-4">
                      <span className="font-mono text-lg font-bold text-amber-500 block">
                        ₾{preSelectedCustomService.priceGEL}
                      </span>
                      <span className="font-mono text-xs text-stone-500 block">
                        ${preSelectedCustomService.priceUSD} · {preSelectedCustomService.durationMin}m
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {SERVICES.map((serv) => {
                    const isSelected = selectedServiceId === serv.id;
                    return (
                      <button
                        type="button"
                        key={serv.id}
                        onClick={() => setSelectedServiceId(serv.id)}
                        className={`text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-amber-500/10 border-amber-500 text-stone-100 shadow-md shadow-amber-500/5"
                            : "bg-stone-950/40 border-stone-800/80 text-stone-400 hover:bg-stone-950/90 hover:border-stone-700"
                        }`}
                      >
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-semibold text-sm text-stone-200 line-clamp-1">{serv.name}</span>
                          <span className="font-mono text-xs font-bold text-amber-500 ml-4 shrink-0">
                            ₾{serv.priceGEL}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 line-clamp-1 leading-normal mb-2">
                          {serv.description}
                        </p>
                        <div className="flex justify-between items-center text-[10px] font-mono text-stone-500">
                          <span>⏱ {serv.durationMin} mins duration</span>
                          {isSelected && <span className="text-amber-500 font-bold uppercase text-[9px]">● Selected</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 2: Barber selection */}
            <div>
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-3">
                2. Designate Master Barber
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Any */}
                <button
                  type="button"
                  onClick={() => setSelectedBarberId(BarberId.Any)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                    selectedBarberId === BarberId.Any
                      ? "bg-amber-500/10 border-amber-500 text-stone-100"
                      : "bg-stone-950/40 border-stone-800/80 text-stone-400 hover:bg-stone-950/90 hover:border-stone-700"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-stone-300 text-xs font-semibold mb-2">
                    ?
                  </div>
                  <span className="text-xs font-bold block">First Available</span>
                  <span className="text-[10px] text-stone-500 font-mono mt-0.5">Speedy check-in</span>
                </button>

                {BARBERS.map((barber) => {
                  const isSelected = selectedBarberId === barber.id;
                  return (
                    <button
                      type="button"
                      key={barber.id}
                      onClick={() => setSelectedBarberId(barber.id)}
                      className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500 text-stone-100 shadow-md shadow-amber-500/5"
                          : "bg-stone-950/40 border-stone-800/80 text-stone-400 hover:bg-stone-950/90 hover:border-stone-700"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-mono font-bold mb-2">
                        {barber.name.substring(0, 2)}
                      </div>
                      <span className="text-xs font-bold block line-clamp-1">{barber.name}</span>
                      <span className="text-[10px] text-amber-400/80 mt-0.5 font-mono">★ {barber.rating}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Date Picker */}
            <div>
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-3">
                3. Choose Date
              </span>
              <div className="flex gap-2 p-1 overflow-x-auto pb-3 -mx-2 px-2 scrollbar-thin scrollbar-thumb-stone-800">
                {datesList.map((dt) => {
                  const isSelected = selectedDateStr === dt.dateStr;
                  return (
                    <button
                      type="button"
                      key={dt.dateStr}
                      onClick={() => setSelectedDateStr(dt.dateStr)}
                      className={`py-3 px-4 rounded-xl border text-center shrink-0 transition-all min-w-[70px] ${
                        isSelected
                          ? "bg-amber-500 text-stone-950 border-amber-500 font-bold"
                          : "bg-stone-950/40 border-stone-800/80 text-stone-400 hover:bg-stone-950/90 hover:border-stone-700 hover:text-stone-200"
                      }`}
                    >
                      <span className={`text-[10px] tracking-wider uppercase block ${isSelected ? "text-stone-900" : "text-stone-500"}`}>
                        {dt.dayName}
                      </span>
                      <span className="text-lg font-mono tracking-tighter block mt-0.5">
                        {dt.dayNum}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Time Slot Picker */}
            <div>
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-3">
                4. Select Time Session
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 rounded-lg border text-center text-xs font-mono transition-all ${
                        isSelected
                          ? "bg-amber-500/10 border-amber-500 text-amber-400 font-bold"
                          : "bg-stone-950/40 border-stone-800/80 text-stone-400 hover:bg-stone-950/90 hover:border-stone-700"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Customer Details */}
            <div className="pt-2 border-t border-stone-800">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-4">
                5. Enter Appointment Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] text-stone-500 font-mono tracking-wider block mb-1">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-200 placeholder-stone-700 focus:outline-none focus:border-amber-500 transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-stone-500 font-mono tracking-wider block mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="john@vibe.ge"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-200 placeholder-stone-700 focus:outline-none focus:border-amber-500 transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-stone-500 font-mono tracking-wider block mb-1">PHONE NUMBER (WHATSAPP) *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+995 5xx xx xx xx"
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-xs text-stone-200 placeholder-stone-700 focus:outline-none focus:border-amber-500 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="text-[10px] text-stone-500 font-mono tracking-wider block mb-1">ADDITIONAL NOTES (OPTIONAL)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us if you prefer a style, have skin allergies, or want a specific beverage (Espresso, Brew, Georgian Whiskey)..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder-stone-700 focus:outline-none focus:border-amber-500 transition-all font-sans resize-none"
                />
              </div>
            </div>

            {/* Submit Reservation */}
            <button
              type="submit"
              className="w-full py-4.5 bg-amber-500 text-stone-950 hover:bg-amber-400 active:bg-amber-600 rounded-xl font-bold font-sans text-sm tracking-wide shadow-md shadow-amber-500/10 cursor-pointer"
            >
              Confirm Reservation Securely ₾
            </button>
          </form>
        </div>

        {/* Sidebar Status / active bookings */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-stone-800 lg:pl-8 pt-8 lg:pt-0">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <Ticket className="w-4 h-4 text-amber-500" /> Active Tickets
              </h4>
              <p className="text-xs text-stone-500 leading-normal">
                Any bookings made in this browser session are persisted here. You can cancel them at any point online.
              </p>
            </div>

            <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
              {/* If we just booked, show it highlight */}
              {justBooked && (
                <div className="bg-stone-950 rounded-xl border-2 border-amber-500 p-4.5 space-y-3 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-amber-500 text-stone-950 text-[9px] font-mono font-bold px-2 py-0.5 rounded-bl uppercase">
                    New Just Now
                  </div>
                  
                  <div className="flex gap-2 items-center text-xs text-amber-500 font-mono tracking-wider">
                    <span>ID: {justBooked.id}</span>
                  </div>

                  <div className="border-t border-b border-stone-900 py-3 space-y-2">
                    <div>
                      <span className="text-[10px] text-stone-500 block uppercase font-mono">Service package</span>
                      <span className="text-stone-200 font-bold text-sm block leading-normal">{justBooked.serviceName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] text-stone-500 block uppercase font-mono">Barber</span>
                        <span className="text-stone-300 font-semibold text-xs">{justBooked.barberName}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 block uppercase font-mono">Date & Time</span>
                        <span className="text-stone-300 font-semibold text-[11px] block text-amber-500/90">
                          {datesList.find(d => d.dateStr === justBooked.date)?.fullDate || justBooked.date} <br/>
                          at {justBooked.timeSlot}
                        </span>
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <span className="text-[10px] text-stone-500 block uppercase font-mono">Total direct-charge</span>
                      <span className="text-stone-100 font-bold font-mono text-sm">
                        ₾{justBooked.priceGEL} / ${justBooked.priceUSD}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                      ● {justBooked.status === "confirmed" ? "CONFIRMED" : "CANCELLED"}
                    </span>
                    {justBooked.status === "confirmed" && (
                      <button
                        onClick={() => cancelBooking(justBooked.id)}
                        className="text-stone-400 hover:text-rose-400 font-mono text-[10px] flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancel Ticket
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Rest of bookings */}
              {activeBookings
                .filter(b => b.id !== justBooked?.id)
                .map((b) => (
                  <div key={b.id} className="bg-stone-950/40 rounded-xl border border-stone-800 p-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono text-[10px] text-stone-400 font-bold">ID: {b.id}</span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="border-t border-stone-900/60 pt-2 pb-1.5 space-y-1.5">
                      <span className="text-stone-300 font-medium text-xs block leading-tight">{b.serviceName}</span>
                      <div className="flex justify-between items-center text-[10px] text-stone-500">
                        <span>💈 {b.barberName}</span>
                        <span>⏱ {b.timeSlot}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-1.5 border-t border-stone-900/60">
                      <span className={`text-[10px] font-mono font-semibold ${
                        b.status === "confirmed" ? "text-emerald-500/80" : "text-stone-600 line-through"
                      }`}>
                        ● {b.status.toUpperCase()}
                      </span>
                      {b.status === "confirmed" && (
                        <button
                          onClick={() => cancelBooking(b.id)}
                          className="text-stone-500 hover:text-rose-400 text-[10px] font-mono flex items-center gap-1 cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}

              {activeBookings.length === 0 && !justBooked && (
                <div className="text-center py-10 border border-dashed border-stone-800 rounded-xl bg-stone-950/10">
                  <Archive className="w-8 h-8 text-stone-700 mx-auto mb-2" />
                  <span className="text-xs text-stone-500 italic block font-mono">No bookings submitted yet</span>
                  <p className="text-[10px] text-stone-600 max-w-[160px] mx-auto mt-1 leading-normal">
                    Reservations made on this platform will register in real-time here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
