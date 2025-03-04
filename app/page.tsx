import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link href="/" className="flex items-center justify-center">
          <Clock className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">One Day Battle</span>
        </Link>
        <div className="ml-auto flex gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Overcome Addictions One Day at a Time
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Focus on daily progress with our reverse countdown timer,
                    journaling, and progress tracking to help you break unwanted
                    habits.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button className="px-8">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="outline" className="px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] rounded-full border-8 border-primary flex items-center justify-center">
                  <div className="text-4xl font-bold">24:00:00</div>
                  <div className="absolute inset-0 rounded-full border-t-8 border-primary/30 rotate-[45deg]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Core Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tools designed to help you overcome addictions and build
                  healthier habits.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <Clock className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Countdown Timer</h3>
                <p className="text-sm text-center text-muted-foreground">
                  A reverse-running timer to visualize your daily progress
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-primary"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <h3 className="text-xl font-bold">Daily Motivation</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Inspirational quotes and messages to keep you going
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-primary"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <h3 className="text-xl font-bold">Journal</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Log your daily reflections, moods, and challenges
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 bg-background">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-primary"
                >
                  <path d="M12 20v-6" />
                  <path d="M6 20v-6" />
                  <path d="M18 20v-6" />
                  <path d="M6 14v-4" />
                  <path d="M18 14v-4" />
                  <path d="M12 14v-4" />
                  <path d="M12 10V4" />
                  <path d="M6 4v4" />
                  <path d="M18 4v4" />
                </svg>
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Visual indicators of your streaks and achievements
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Our Philosophy
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  One day at a time. That&apos;s all it takes.
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  We believe that overcoming addiction is about focusing on
                  today. Not worrying about tomorrow or regretting yesterday.
                  Just making it through today.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Join Us
                </div>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Join thousands of others who are taking control of their lives
                  one day at a time. Our supportive community and powerful tools
                  are here to help you succeed.
                </p>
                <Link href="/signup">
                  <Button>Start Your Journey</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} One Day Battle. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/terms"
            className="text-xs hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-xs hover:underline underline-offset-4"
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
