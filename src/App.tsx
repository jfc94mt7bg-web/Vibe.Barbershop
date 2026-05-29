import { useState } from "react";
import { 
  Scissors, Star, MapPin, Phone, Clock, Coffee, Sparkles, 
  ChevronRight, ArrowRight, ShieldCheck, Heart, Navigation,
  HelpCircle, CalendarCheck, MessageSquare, GlassWater, Percent,
  Volume2, Palette
} from "lucide-react";
import { BARBERS, SERVICES } from "./data";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import InteractiveCalculator from "./components/InteractiveCalculator";
import ReviewFeedback from "./components/ReviewFeedback";
import BookingEngine from "./components/BookingEngine";

export default function App() {
  const [currency, setCurrency] = useState<"GEL" | "USD">("GEL");
  
  // Custom preselected booking state (passed from InteractiveCalculator to BookingEngine)
  const [preSelectedCustomService, setPreSelectedCustomService] = useState<{
    name: string;
    priceGEL: number;
    priceUSD: number;
    durationMin: number;
  } | null>(null);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePreSelectCustom = (name: string, priceGEL: number, priceUSD: number, durationMin: number) => {
    setPreSelectedCustomService({
      name,
      priceGEL,
      priceUSD,
      durationMin
    });
    // Smooth scroll down to booking
    scrollToSection("booking-engine-wrapper");
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 bg-stone-950/80 backdrop-blur-md border-b border-stone-900 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-amber-500 text-stone-950 rounded-xl flex items-center justify-center font-bold shadow-lg shadow-amber-500/10">
              <Scissors className="w-5 h-5 shrink-0" />
            </div>
            <div>
              <span className="font-sans font-bold text-base tracking-wider uppercase block">VIBE</span>
              <span className="text-[9px] font-mono text-stone-500 tracking-widest block -mt-1">BARBERSHOP</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-stone-400">
            <button onClick={() => scrollToSection("barbers-section")} className="hover:text-amber-500 transition-all cursor-pointer">Barbers</button>
            <button onClick={() => scrollToSection("services-section")} className="hover:text-amber-500 transition-all cursor-pointer">Menu & Pricing</button>
            <button onClick={() => scrollToSection("before-after-section")} className="hover:text-amber-500 transition-all cursor-pointer">Showroom</button>
            <button onClick={() => scrollToSection("calculator-section")} className="hover:text-amber-500 transition-all cursor-pointer">Estimate Builder</button>
            <button onClick={() => scrollToSection("reviews-section")} className="hover:text-amber-500 transition-all cursor-pointer">Reviews</button>
            <button onClick={() => scrollToSection("faq-section")} className="hover:text-amber-500 transition-all cursor-pointer">FAQ</button>
          </nav>

          {/* Book Now Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("booking-engine-wrapper")}
              className="px-4 py-2 bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold text-xs tracking-wider uppercase rounded-lg transition-all shadow-md shadow-amber-500/5 cursor-pointer"
            >
              Book Seat
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 md:pt-12 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left column hero text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full px-3 py-1.5 text-[11px] font-mono tracking-wide">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            Located in Central Batumi, Georgia
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans tracking-tight font-extrabold leading-none text-stone-100">
            Precision Grooming.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Impeccable Vibe.
            </span>
          </h1>

          <p className="text-sm md:text-base text-stone-400 leading-relaxed font-light max-w-xl">
            Whether you are local or visiting Batumi, experience the peak of modern grooming. Backed by 5-star Google Reviews, our master barbers Vlad, Ilya, and Katerina deliver razor-sharp fades, luxury hot towel shaves, and a chilled-out atmosphere.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => scrollToSection("booking-engine-wrapper")}
              className="py-4 px-6 bg-amber-500 text-stone-950 hover:bg-amber-400 active:bg-amber-600 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              Reserve Appointment Slots <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection("calculator-section")}
              className="py-4 px-6 bg-stone-900 border border-stone-800 text-stone-200 hover:bg-stone-900/80 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              Build Customized Pricing
            </button>
          </div>

          {/* Core Badges Row */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-900 max-w-lg">
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-mono block">Satisfied clients</span>
              <span className="text-amber-500 font-bold text-lg font-mono">1,400+</span>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-mono block">Rating score</span>
              <span className="text-stone-100 font-bold text-lg font-mono flex items-center gap-1">4.9 ★</span>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-mono block">Complimentary beverages</span>
              <span className="text-stone-400 font-mono text-sm leading-relaxed block">Whiskey / Brew</span>
            </div>
          </div>
        </div>

        {/* Right column: Image container */}
        <div className="lg:col-span-5 relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 opacity-20 blur-xl"></div>
          <div className="relative bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl">
            <picture>
              <img
                src="/src/assets/images/vibe_hero_interior_1780053507094.png"
                alt="VIBE Barbershop Interior"
                className="w-full h-[320px] sm:h-[400px] object-cover hover:scale-105 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </picture>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent p-6 pt-16">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block mb-0.5">ESTABLISHED 2023</span>
              <h4 className="text-base font-semibold text-stone-200 leading-tight">Authentic Velvet Sea Barbershop</h4>
              <p className="text-xs text-stone-400 mt-1 max-w-sm font-light">
                Premium modern-industrial leather chairs, warm neon glows, high-fidelity sound, and professional tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE SPECIAL AMENITIES BAR */}
      <section className="w-full bg-stone-900/40 border-t border-b border-stone-900/80 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-500">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">Prestige Hospitality</h4>
              <p className="text-xs text-stone-500 mt-0.5 max-w-xs leading-normal">
                Complimentary cold draft IPAs, fresh espresso, tea, or premium Georgian whiskeys on every appointment.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-500">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">The Ilya & Vlad Standard</h4>
              <p className="text-xs text-stone-500 mt-0.5 max-w-xs leading-normal">
                Each barber holds multiple masterclass accreditations, delivering customized structural consulting for your face shape.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 text-amber-500">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-stone-200">Transparent Pricing</h4>
              <p className="text-xs text-stone-500 mt-0.5 max-w-xs leading-normal">
                Zero hidden fees. We support conversion between Georgian Lari (₾) and USD ($). No online prepay required!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BARBERS TEAM SHOWCASE SECTION */}
      <section id="barbers-section" className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-amber-500 font-mono text-xs tracking-wider uppercase">Master Artisans</span>
          <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-stone-100 tracking-tight">
            Meet Our Accoladed Barbers
          </h2>
          <p className="text-sm text-stone-400">
            VIBE consists of highly skilled specialist staff, each recognized for perfectionism, efficiency, and customized recommendations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BARBERS.map((barber) => {
            // Find a specific testimonial corresponding to this barber to weave in
            let highlightQuote = "";
            let reviewer = "";
            if (barber.id === "ilya") {
              highlightQuote = "hands down one of the best barbers in Batumi. Super precise with the fade.";
              reviewer = "Iaroslav";
            } else if (barber.id === "katerina") {
              highlightQuote = "only one in a hundred barbers can get my beard right... she did an absolute masterpiece.";
              reviewer = "Tauseeq A.";
            } else if (barber.id === "vlad") {
              highlightQuote = "very likeable and efficient barber. Did his job well, fast and offered good suggestions.";
              reviewer = "Oleg S.";
            }

            return (
              <div 
                key={barber.id}
                className="bg-stone-900 border border-stone-800 rounded-2xl p-5 hover:border-stone-700 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Photo / Header info */}
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono flex items-center justify-center font-bold text-sm uppercase">
                        {barber.name.substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="font-sans font-bold text-base text-stone-100 leading-none">{barber.name}</h3>
                        <span className="text-xs text-stone-500 font-mono block mt-1">{barber.role}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono text-xs text-amber-500 font-bold block">★ {barber.rating}</span>
                      <span className="text-[9px] text-stone-500 font-mono block">{barber.reviewsCount} reviews</span>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    {barber.bio}
                  </p>

                  {/* Specialty badge */}
                  <div className="pt-2">
                    <span className="text-[10px] text-stone-500 uppercase font-mono font-bold block mb-1">SPECIALTY SKILLSETS:</span>
                    <span className="text-xs font-semibold text-stone-200 bg-stone-950 rounded px-2 py-1 border border-stone-800/80 block w-fit">
                      {barber.specialty}
                    </span>
                  </div>
                </div>

                {/* Micro-testimonial integration */}
                <div className="bg-stone-950/60 p-3 rounded-lg border border-stone-900/60 text-[11px] leading-relaxed relative italic text-stone-400">
                  "{highlightQuote}"
                  <span className="not-italic text-stone-500 font-mono text-[9px] block mt-1.5 text-right">— {reviewer}, Google Review</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CORE MENU & SERVICES */}
      <section id="services-section" className="bg-stone-900/30 border-t border-b border-stone-900/80 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-amber-500 font-mono text-xs tracking-wider uppercase">Treatment Catalog</span>
              <h2 className="text-3xl md:text-4xl font-sans font-extrabold text-stone-100 tracking-tight mt-1">
                Luxury Services & Pricing
              </h2>
              <p className="text-sm text-stone-400 mt-2 max-w-xl">
                We take styling seriously. Every session is paired with custom consulting, deep washing, face massages, and styled to mirror your desired look.
              </p>
            </div>

            {/* Currency selector inside the static menu */}
            <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 self-start md:self-end">
              <button
                onClick={() => setCurrency("GEL")}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                  currency === "GEL"
                    ? "bg-amber-500 text-stone-950 font-bold"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                Georgian Lari (₾)
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-all ${
                  currency === "USD"
                    ? "bg-amber-500 text-stone-950 font-bold"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                United States Dollar ($)
              </button>
            </div>
          </div>

          {/* Cards Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Visual Header Feature / Photo Box */}
            <div className="md:col-span-1 rounded-2xl overflow-hidden bg-stone-900 border border-stone-800 flex flex-col justify-between">
              <div>
                <picture>
                  <img
                    src="/src/assets/images/vibe_haircut_fade_1780053528305.png"
                    alt="Signature skin fade haircut"
                    className="w-full h-[220px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </picture>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">Ilya's Signature Work</span>
                  <h3 className="font-sans font-bold text-lg text-stone-100 leading-snug">The Pristine Blade Fades</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">
                    Our barbers provide a custom layout study for each head shape, calculating transition blends exactly from skin into length.
                  </p>
                </div>
              </div>
              <div className="p-5 border-t border-stone-800/60 bg-stone-950/20">
                <button
                  onClick={() => scrollToSection("booking-engine-wrapper")}
                  className="w-full py-2 bg-stone-100 text-stone-950 hover:bg-stone-200 rounded-xl font-bold font-sans text-xs tracking-wide transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  Book Haircut Session
                </button>
              </div>
            </div>

            {/* List Services 1-3 */}
            <div className="space-y-4">
              {SERVICES.slice(0, 3).map((serv) => (
                <div 
                  key={serv.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-4.5 flex flex-col justify-between hover:border-stone-700 transition-all gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-sans font-bold text-sm text-stone-100">{serv.name}</h4>
                      <span className="font-mono text-sm text-amber-500 font-extrabold shrink-0">
                        {currency === "GEL" ? `₾${serv.priceGEL}` : `$${serv.priceUSD}`}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {serv.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 pt-1 border-t border-stone-800/40">
                    <span>⏱ {serv.durationMin} minutes duration</span>
                    <button 
                      onClick={() => {
                        setSelectedServiceId(serv.id);
                        scrollToSection("booking-engine-wrapper");
                      }}
                      className="text-amber-500 hover:underline flex items-center gap-0.5"
                    >
                      Reserve <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* List Services 4-6 */}
            <div className="space-y-4">
              {SERVICES.slice(3, 6).map((serv) => (
                <div 
                  key={serv.id}
                  className="bg-stone-900 border border-stone-800 rounded-2xl p-4.5 flex flex-col justify-between hover:border-stone-700 transition-all gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-sans font-bold text-sm text-stone-100">{serv.name}</h4>
                      <span className="font-mono text-sm text-amber-500 font-extrabold shrink-0">
                        {currency === "GEL" ? `₾${serv.priceGEL}` : `$${serv.priceUSD}`}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {serv.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 pt-1 border-t border-stone-800/40">
                    <span>⏱ {serv.durationMin} minutes duration</span>
                    <button 
                      onClick={() => {
                        setSelectedServiceId(serv.id);
                        scrollToSection("booking-engine-wrapper");
                      }}
                      className="text-amber-500 hover:underline flex items-center gap-0.5"
                    >
                      Reserve <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SHAPE SHOWROOM: BEFORE / AFTER TRANSFORMATION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <BeforeAfterSlider />
      </section>

      {/* DETAILED INTERACTIVE COMBINATION PRICING BUILDER */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <InteractiveCalculator onPreSelectCustomBooking={handlePreSelectCustom} />
      </section>

      {/* BOOKING ENGINE RESERVATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <BookingEngine 
          preSelectedCustomService={preSelectedCustomService}
          onClearPreSelected={() => setPreSelectedCustomService(null)} 
        />
      </section>

      {/* SOCIAL PROOF & GOOGLE REVIEWS FEEDBACK */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 bg-stone-900/20 rounded-3xl border border-stone-900">
        <ReviewFeedback />
      </section>

      {/* FAQS & LOCATION DIRECTION */}
      <section id="faq-section" className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FAQS */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <span className="text-amber-500 font-mono text-xs tracking-wider uppercase">Humble Info</span>
            <h3 className="text-2xl md:text-3xl font-sans font-medium text-stone-100 tracking-tight mt-1">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-400 mt-1 max-w-md font-light">
              We want your visit to the VIBE barbershop to be stress-free, luxury-styled, and transparent.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Do you accept walk-ins, or should I book in advance?",
                a: "While we do accept walk-ins depending on immediate seat vacancies, we strongly recommend booking in advance. Our master barbers Ilya, Vlad, and Katerina tend to book out several days ahead."
              },
              {
                q: "What is your cancellation policy?",
                a: "We understand that plans can change. We kindly request that you cancel or reschedule your booking at least 2 hours before your appointment. This allows other clients on our waiting list to take the slot."
              },
              {
                q: "Which currencies do you accept at the barbershop in Batumi?",
                a: "Our register accepts Georgian Lari (₾) cash, as well as electronic card terminal transactions. For travelers, prices are displayed in both GEL (₾) and USD ($) for transparency."
              },
              {
                q: "Is there street parking available outside the location?",
                a: "Yes, free curbside street parking is widely available directly in front of and around VIBE Barbershop on the main city lanes."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-stone-900/40 border border-stone-800/80 rounded-xl p-5 space-y-2">
                <h4 className="text-xs font-mono font-bold text-stone-100 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" /> {faq.q}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed font-sans pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* DIRECTIONS & MAP CARD */}
        <div className="lg:col-span-5">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-mono text-amber-500 uppercase tracking-widest block">DIRECTIONS & TIMES</span>
              <h4 className="text-lg font-sans font-bold text-stone-100 mt-1">VIBE Barbershop Batumi</h4>
              <p className="text-xs text-stone-400 mt-1">Visit us in the heart of the coastal city.</p>
            </div>

            {/* Simulated Address Details */}
            <div className="space-y-4 border-t border-b border-stone-800 py-5 text-xs text-stone-300">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-stone-100 block">Salon Address</span>
                  <p className="text-stone-400 mt-1">K. Gamsakhurdia St, Batumi, Georgia</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-stone-100 block">Opening Hours</span>
                  <p className="text-stone-400 mt-1">Everyday · 10:00 AM — 09:00 PM</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-stone-100 block">Direct Hotline</span>
                  <a href="tel:+995555123456" className="text-amber-500 hover:underline inline-block mt-1">
                    +995 555 12 34 56
                  </a>
                  <span className="text-[10px] text-stone-500 block">Calls and WhatsApp Telegram support</span>
                </div>
              </div>
            </div>

            {/* Stylized Vector Map block representing Batumi sea / grid */}
            <div className="relative h-[220px] rounded-xl overflow-hidden border border-stone-800 bg-stone-950/80 p-4 flex flex-col justify-between">
              {/* Grid abstract background */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              {/* Sea representation */}
              <div className="absolute top-0 right-0 w-[45%] h-[40%] bg-blue-900/10 rounded-bl-3xl border-l border-b border-blue-500/10 flex items-center justify-center font-mono text-[9px] text-blue-500/40">
                BLACK SEA COAST
              </div>

              <div className="relative flex justify-between items-start">
                <span className="text-[9px] font-mono text-stone-600 uppercase bg-stone-900 border border-stone-800 px-2 py-1 rounded">
                  Batumi Center Map Guide
                </span>
                <span className="text-[9px] font-mono text-stone-500">
                  LAT 41.6502 | LON 41.6359
                </span>
              </div>

              {/* Central Pin */}
              <div className="relative self-center flex flex-col items-center gap-1">
                <div className="w-3 h-3 bg-amber-500 rounded-full animate-ping absolute"></div>
                <div className="w-3.5 h-3.5 bg-amber-500 text-stone-950 rounded-full flex items-center justify-center relative shadow-lg"></div>
                <span className="text-[10px] font-bold text-white bg-stone-900/90 border border-amber-500/40 rounded px-2 py-0.5 tracking-wider uppercase font-mono shadow-md whitespace-nowrap">
                  📍 VIBE Barbershop
                </span>
              </div>

              <div className="relative flex justify-between items-center text-[10px] text-stone-500">
                <span>Free Parking Zone</span>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-amber-500 flex items-center gap-1 hover:underline font-bold"
                >
                  <Navigation className="w-3 h-3" /> External Map Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-900 py-12 px-4 md:px-8 mt-auto text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-stone-900 border border-stone-800 text-stone-400 rounded-md flex items-center justify-center">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-stone-400 text-sm tracking-wider uppercase block">VIBE</span>
              <span className="text-[9px] text-stone-500 font-mono tracking-widest block -mt-1">BATUMI GEORGIA</span>
            </div>
          </div>
          
          <p className="font-mono text-[10px] tracking-wide text-center sm:text-right text-stone-500">
            © 2026 VIBE Barbershop Batumi. All rights reserved. Made to attract guest bookings.
          </p>
        </div>
      </footer>

    </div>
  );
}

// Inline fallback for custom service selection to avoid missing key states
function setSelectedServiceId(id: string) {
  const el = document.getElementById("booking-engine-wrapper");
  if (el) {
    const radioEl = document.querySelector(`input[value="${id}"]`) as HTMLInputElement;
    if (radioEl) {
      radioEl.click();
    }
  }
}
