"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

interface ReportChartProps {
  type: "bar" | "line" | "pie" | "doughnut"
  data: {
    labels: string[]
    datasets: {
      label?: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string | string[]
      borderWidth?: number
      fill?: boolean
    }[]
  }
  options?: any
}

export function ReportChart({ type, data, options = {} }: ReportChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create new chart
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    const defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            boxWidth: 12,
            padding: 15,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: 10,
          cornerRadius: 4,
          boxPadding: 3,
        },
      },
    }

    // Merge default options with provided options
    const mergedOptions = { ...defaultOptions, ...options }

    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options: mergedOptions,
    })

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [type, data, options])

  return <canvas ref={chartRef} />
}

