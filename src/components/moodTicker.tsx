"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

const moods = [
  "🌧 Sad",
  "💤 Relaxed",
  "🏋️ Energetic",
  "🎨 Creative",
  "❤️ Romantic",
  "🔥 Confident",
  "📚 Focused",
  "🌅 Nostalgic",
  "💔 Heartbroken",
  "🌪 Angry",
];

export const MoodTicker = () => {
  const autoplay = useRef(
    Autoplay({ delay: 0, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      duration: 10000,
    },
    [autoplay.current]
  );

  return (
    <div className="w-[100%] mx-auto mt-20 relative group">
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />

      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

      <div className="overflow-hidden">
        <div className="flex embla" ref={emblaRef}>
          <div className="flex embla__container gap-6 select-none">
            {[...moods].map((mood, index) => (
              <div
                key={index}
                className={`px-4 py-2 bg-[#EBFFDB] rounded-full text-[#2C296F] text-sm font-medium shrink-0 ${
                  // Aplica margem direita extra ao último item original
                  index === moods.length - 1 ? "!mr-5" : ""
                } ${
                  // Aplica margem esquerda extra ao primeiro item clonado
                  index === moods.length ? "!ml-5" : ""
                }`}
              >
                {mood}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
