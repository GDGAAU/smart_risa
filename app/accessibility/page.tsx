import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Eye, VolumeX, Volume2, Moon, Sun, ZoomIn } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
          <h1 className="font-semibold">Accessibility Settings</h1>
        </div>
      </header>

      <main className="flex-1">
        <section className="container py-6">
          <div className="space-y-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Visual Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">High Contrast Mode</p>
                      <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                    </div>
                  </div>
                  <Switch id="high-contrast" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ZoomIn className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Text Size</p>
                      <p className="text-sm text-muted-foreground">Adjust the size of text</p>
                    </div>
                  </div>
                  <div className="w-32">
                    <Slider defaultValue={[50]} max={100} step={10} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    <Switch id="dark-mode" />
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Audio & Haptic Feedback</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Voice Announcements</p>
                      <p className="text-sm text-muted-foreground">Announce stops and arrivals</p>
                    </div>
                  </div>
                  <Switch id="voice-announcements" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <VolumeX className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Quiet Mode</p>
                      <p className="text-sm text-muted-foreground">Disable all sounds</p>
                    </div>
                  </div>
                  <Switch id="quiet-mode" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Navigation & Controls</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Screen Reader Support</p>
                    <p className="text-sm text-muted-foreground">Optimize for screen readers</p>
                  </div>
                  <Switch id="screen-reader" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Simplified Navigation</p>
                    <p className="text-sm text-muted-foreground">Reduce UI complexity</p>
                  </div>
                  <Switch id="simplified-nav" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-4">
          <Button className="w-full">Save Preferences</Button>
        </section>
      </main>
    </div>
  )
}

