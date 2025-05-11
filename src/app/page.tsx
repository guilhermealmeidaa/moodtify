"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MoodTicker } from "@/components/moodTicker";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FaSpotify } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Header />
      <div className="flex flex-1 items-center justify-center w-full px-6 text-center">
        <div className="w-full max-w-screen-md">
          <h1 className="text-3xl md:text-5xl font-bold text-[#5147CF] tracking-tight font-sans">
            Turn your mood into the perfect playlist
          </h1>

          <p className="text-base md:text-lg text-[#2C296F] tracking-tight font-sans mt-4">
            Describe how you&apos;re feeling and let the AI create the
            soundtrack of your life on Spotify.
          </p>

          <p className="text-sm md:text-base text-[#2C296F] tracking-tight font-sans mt-2">
            Track your mood and get personalized insights.
          </p>

          <div className="flex items-center justify-center mt-6">
            <Button
              onClick={() => signIn("spotify", { callbackUrl: "/generate" })}
            >
              <FaSpotify size={20} className="mr-2" />
              Sign in with Spotify
            </Button>
          </div>
          <MoodTicker />
        </div>
      </div>

      <Footer />
    </div>
  );
}
