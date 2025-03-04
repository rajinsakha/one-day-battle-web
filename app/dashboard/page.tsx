"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Flame, Award, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const [timeLeft, setTimeLeft] = useState("24:00:00");
  const [progress, setProgress] = useState(0);
  const [quote, setQuote] = useState("");
  const [streak, setStreak] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Load data from localStorage
    const savedStreak = localStorage.getItem("streak");
    if (savedStreak) {
      setStreak(Number.parseInt(savedStreak));
    }

    // Set a random motivational quote
    const quotes = [
      "Every day is a new opportunity to change your life.",
      "Progress is progress, no matter how small.",
      "You don't have to be perfect, just better than yesterday.",
      "The journey of a thousand miles begins with a single step.",
      "Focus on today. Just today. You can do it.",
    ];
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Set up the countdown timer
    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );

      // Calculate progress through the day (from 0 to 100)
      const totalSecondsInDay = 24 * 60 * 60;
      const secondsPassed =
        totalSecondsInDay - (hours * 3600 + minutes * 60 + seconds);
      const newProgress = (secondsPassed / totalSecondsInDay) * 100;
      setProgress(newProgress);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const completeDay = () => {
    const newStreak = streak + 1;
    setStreak(newStreak);
    localStorage.setItem("streak", newStreak.toString());

    // In a real app, we would also save this to the backend
    alert("Congratulations! You've completed today's battle!");
  };

  if (!mounted) return null;

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Today&apos;s Battle</h1>
          <p className="text-muted-foreground">
            Focus on making it through today.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full">
          <CardHeader className="pb-2">
            <CardTitle>Time Remaining Today</CardTitle>
            <CardDescription>Your daily countdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="text-6xl font-bold tabular-nums">{timeLeft}</div>
              <Progress value={progress} className="w-full h-2" />
              <p className="text-sm text-muted-foreground">
                {progress < 50
                  ? "The day is still young. Stay strong!"
                  : "You're more than halfway there. Keep going!"}
              </p>
              <Button onClick={completeDay} className="mt-4">
                Mark Today as Complete
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Flame className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold">{streak} days</div>
                <p className="text-sm text-muted-foreground">Keep it going!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {streak >= 1 && <Badge>First Day</Badge>}
                  {streak >= 7 && <Badge>One Week</Badge>}
                  {streak >= 30 && <Badge>One Month</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {streak < 7
                    ? "Reach 7 days for your next badge!"
                    : streak < 30
                    ? "Reach 30 days for your next badge!"
                    : "You're doing amazing!"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Daily Motivation</CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="border-l-4 border-primary pl-4 italic">
              &quot;{quote}&quot;
            </blockquote>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <div>
                <div className="text-xl font-medium">
                  You&apos;re making progress!
                </div>
                <p className="text-sm text-muted-foreground">
                  {streak === 0
                    ? "Start your journey today."
                    : `You've been battling for ${streak} day${
                        streak === 1 ? "" : "s"
                      }.`}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
