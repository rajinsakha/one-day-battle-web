"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Save, Smile, Meh, Frown } from "lucide-react"

export default function JournalPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [entry, setEntry] = useState("")
  const [mood, setMood] = useState<"good" | "neutral" | "bad" | null>(null)
  const [entries, setEntries] = useState<Record<string, { text: string; mood: string }>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Load journal entries from localStorage
    const savedEntries = localStorage.getItem("journalEntries")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }

    // Load entry for current date if it exists
    const formattedDate = format(date, "yyyy-MM-dd")
    if (savedEntries) {
      const parsedEntries = JSON.parse(savedEntries)
      if (parsedEntries[formattedDate]) {
        setEntry(parsedEntries[formattedDate].text || "")
        setMood((parsedEntries[formattedDate].mood as "good" | "neutral" | "bad") || null)
      } else {
        setEntry("")
        setMood(null)
      }
    }
  }, [date])

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
    }
  }

  const handleSave = () => {
    const formattedDate = format(date, "yyyy-MM-dd")
    const updatedEntries = {
      ...entries,
      [formattedDate]: {
        text: entry,
        mood: mood || "neutral",
      },
    }

    setEntries(updatedEntries)
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries))

    alert("Journal entry saved!")
  }

  const getEntryDates = () => {
    return Object.keys(entries).map((dateStr) => new Date(dateStr))
  }

  if (!mounted) return null

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Journal</h1>
          <p className="text-muted-foreground">Record your thoughts and track your journey.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view or create an entry</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              className="rounded-md border"
              modifiers={{
                booked: getEntryDates(),
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                },
              }}
            />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">Selected date: {format(date, "MMMM d, yyyy")}</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Journal Entry</CardTitle>
            <CardDescription>{format(date, "MMMM d, yyyy")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center space-x-4">
              <Button variant={mood === "good" ? "default" : "outline"} size="icon" onClick={() => setMood("good")}>
                <Smile className="h-6 w-6" />
                <span className="sr-only">Good mood</span>
              </Button>
              <Button
                variant={mood === "neutral" ? "default" : "outline"}
                size="icon"
                onClick={() => setMood("neutral")}
              >
                <Meh className="h-6 w-6" />
                <span className="sr-only">Neutral mood</span>
              </Button>
              <Button variant={mood === "bad" ? "default" : "outline"} size="icon" onClick={() => setMood("bad")}>
                <Frown className="h-6 w-6" />
                <span className="sr-only">Bad mood</span>
              </Button>
            </div>
            <Textarea
              placeholder="How was your day? What challenges did you face? What victories did you achieve?"
              className="min-h-[200px]"
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Entry
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

