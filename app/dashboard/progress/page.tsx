"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart } from "@/components/ui/chart"
import { Award, Calendar } from "lucide-react"

export default function ProgressPage() {
  const [streak, setStreak] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [journalEntries, setJournalEntries] = useState<Record<string, { text: string; mood: string }>>({})

  useEffect(() => {
    setMounted(true)

    // Load data from localStorage
    const savedStreak = localStorage.getItem("streak")
    if (savedStreak) {
      setStreak(Number.parseInt(savedStreak))
    }

    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Generate mock data for charts
  const generateChartData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const data = days.map((day) => ({
      name: day,
      value: Math.floor(Math.random() * 10) + 1,
    }))
    return data
  }

  const moodData = () => {
    // Count moods from journal entries
    const moodCounts = { good: 0, neutral: 0, bad: 0 }

    Object.values(journalEntries).forEach((entry) => {
      if (entry.mood === "good") moodCounts.good++
      else if (entry.mood === "neutral") moodCounts.neutral++
      else if (entry.mood === "bad") moodCounts.bad++
    })

    return [
      { name: "Good", value: moodCounts.good },
      { name: "Neutral", value: moodCounts.neutral },
      { name: "Bad", value: moodCounts.bad },
    ]
  }

  if (!mounted) return null

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Progress</h1>
          <p className="text-muted-foreground">Track your journey and celebrate your achievements.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
            <CardDescription>Days in a row</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="text-6xl font-bold">{streak}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Your badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {streak >= 1 && (
                <Badge className="px-3 py-1">
                  <Award className="mr-1 h-3 w-3" />
                  First Day
                </Badge>
              )}
              {streak >= 7 && (
                <Badge className="px-3 py-1">
                  <Award className="mr-1 h-3 w-3" />
                  One Week
                </Badge>
              )}
              {streak >= 30 && (
                <Badge className="px-3 py-1">
                  <Award className="mr-1 h-3 w-3" />
                  One Month
                </Badge>
              )}
              {streak >= 90 && (
                <Badge className="px-3 py-1">
                  <Award className="mr-1 h-3 w-3" />
                  Three Months
                </Badge>
              )}
              {Object.keys(journalEntries).length >= 5 && (
                <Badge className="px-3 py-1">
                  <Calendar className="mr-1 h-3 w-3" />
                  Journal Keeper
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Journal Entries</CardTitle>
            <CardDescription>Your reflection count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="text-6xl font-bold">{Object.keys(journalEntries).length}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Visualize your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="weekly">
              <TabsList className="mb-4">
                <TabsTrigger value="weekly">Weekly View</TabsTrigger>
                <TabsTrigger value="mood">Mood Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="weekly" className="space-y-4">
                <div className="h-[300px]">
                  <BarChart
                    data={generateChartData()}
                    index="name"
                    categories={["value"]}
                    colors={["primary"]}
                    valueFormatter={(value:any) => `${value} hours`}
                    yAxisWidth={48}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Weekly progress showing hours dedicated to your goal
                </p>
              </TabsContent>
              <TabsContent value="mood" className="space-y-4">
                <div className="h-[300px]">
                  <BarChart
                    data={moodData()}
                    index="name"
                    categories={["value"]}
                    colors={["primary"]}
                    valueFormatter={(value) => `${value} entries`}
                    yAxisWidth={48}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Distribution of mood entries in your journal
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

