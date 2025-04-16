import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MainContent } from "@/components/main-content"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

export const metadata = {
  title: "Field Service Management",
  description: "Modern field service management system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <SidebarProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <div className="flex flex-1 pt-16">
                  <MainContent>{children}</MainContent>
                </div>
              </div>
            </SidebarProvider>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'