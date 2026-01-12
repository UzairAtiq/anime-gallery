"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const supabase = createClient();

      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        // Auto login after signup
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
      }

      startTransition(() => {
        router.push("/dashboard");
        router.refresh();
      });
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#E11D48]/5 via-[#0F0F14] to-[#F43F5E]/5 p-4">
      <Card className="w-full max-w-md shadow-[0_0_50px_rgba(225,29,72,0.1)] border-[#322D3C] bg-[#16141C] rounded-2xl animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#FAF5FF] via-[#E11D48] to-[#F43F5E] bg-clip-text text-transparent">
            Waifu Gallery 💖
          </CardTitle>
          <CardDescription className="text-[#948CA5]">
            {mode === "login"
              ? "Welcome back! Your waifus are waiting ✨"
              : "Create an account to start your collection"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#FAF5FF]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="bg-[#0F0F14] border-[#322D3C] text-[#FAF5FF] placeholder:text-[#948CA5] focus:border-[#E11D48] rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#FAF5FF]">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className="bg-[#0F0F14] border-[#322D3C] text-[#FAF5FF] placeholder:text-[#948CA5] focus:border-[#E11D48] rounded-xl"
              />
            </div>

            {error && (
              <div className="bg-[#E11D48]/10 text-[#E11D48] text-sm p-3 rounded-xl border border-[#E11D48]/20">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isPending}
            >
              {isPending ? "Loading..." : mode === "login" ? "Enter Gallery 💖" : "Join Now ✨"}
            </Button>

            <div className="text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setError("");
                }}
                className="text-[#E11D48] hover:underline hover:text-[#F43F5E] transition-colors"
              >
                {mode === "login"
                  ? "Don't have an account? Join now"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
