import { useState, useRef, MouseEvent, TouchEvent } from "react";
import { Scissors, ClipboardCopy } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 to 100)
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) { // Left-click is held down
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div id="before-after-section" className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <span className="text-amber-500 font-mono text-xs tracking-wider uppercase">Precision Showroom</span>
          <h3 className="text-2xl md:text-3xl font-sans font-medium text-stone-100 tracking-tight mt-1">
            Transformative Craftsmanship
          </h3>
          <p className="text-sm text-stone-400 mt-2 max-w-xl">
            Slide the divider left and right to see the difference between a grown-out trim and a razor-sharp high-accuracy skin fade and beard silhouette.
          </p>
        </div>
        <div className="flex gap-3 text-xs font-mono text-stone-400 self-start md:self-end">
          <span className="flex items-center gap-1.5 bg-stone-800 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce"></span> Before: Messy & Blended
          </span>
          <span className="flex items-center gap-1.5 bg-amber-500/10 text-amber-400 px-3 py-1.5 rounded-full border border-amber-500/20">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> After: Ilya's Skin Fade
          </span>
        </div>
      </div>

      {/* Slider Area */}
      <div 
        id="slider-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[320px] md:h-[450px] rounded-xl overflow-hidden cursor-ew-resize select-none border border-stone-800 bg-stone-950 shadow-2xl"
      >
        {/* Before Image (Background) */}
        <picture className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&h=900&q=80"
            alt="Before Haircut"
            className="w-full h-full object-cover grayscale brightness-75"
            referrerPolicy="no-referrer"
          />
        </picture>
        <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md text-stone-200 text-xs font-mono tracking-wider px-3 py-1.5 rounded-md border border-stone-800">
          BEFORE
        </div>

        {/* After Image (Overlapping Div, Clipped view) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="absolute inset-0 w-[100vw] h-full" style={{ width: containerRef.current?.getBoundingClientRect().width || "100%" }}>
            <picture className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&h=900&q=80"
                alt="After Haircut Signature Fade"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </picture>
          </div>
          <div className="absolute top-4 right-4 bg-amber-500 text-stone-950 text-xs font-mono font-bold tracking-wider px-3 py-1.5 rounded-md shadow-lg">
            AFTER
          </div>
        </div>

        {/* Divider Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-amber-500 cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-9 h-9 bg-amber-500 text-stone-950 rounded-full flex items-center justify-center shadow-2xl border-4 border-stone-900 pointer-events-auto transform -translate-x-[16px] transition-transform hover:scale-110 active:scale-95">
            <Scissors className="w-4 h-4" />
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-stone-500">
        <span className="animate-pulse">👈</span> Drag or slide over the photo to compare <span>👉</span>
      </div>
    </div>
  );
}
