"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MoodInputListProps {
  moods: string[];
  setMoods: (moods: string[]) => void;
}

export function MoodInputList({ moods, setMoods }: MoodInputListProps) {
  const updateMood = (index: number, value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const newMoods = [...moods];
    newMoods[index] = cleaned;
    setMoods(newMoods);
  };

  const addInput = () => {
    setMoods([...moods, ""]);
  };

  const removeInput = (index: number) => {
    if (moods.length === 1) return;
    const newMoods = [...moods];
    newMoods.splice(index, 1);
    setMoods(newMoods);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      {moods.map((mood, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            maxLength={20}
            value={mood}
            onChange={(e) => updateMood(index, e.target.value)}
            placeholder={`Mood ${index + 1}`}
            className="flex-1 border border-[#CBD5E1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-sm"
          />
          {moods.length > 1 && (
            <button
              type="button"
              onClick={() => removeInput(index)}
              className="text-[#7C3AED] hover:text-[#6D28D9] transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addInput}
        className="text-sm border-dashed border-2 border-[#CBD5E1] text-[#5147CF]"
      >
        + Add another mood
      </Button>
    </div>
  );
}
