"use client"

import * as React from "react"
import { Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"

interface InsightItem {
  id: string
  title: string
  icon: string
  description: string
}

const defaultInsights: InsightItem[] = [
  {
    id: "invoice-reminders",
    title: "Sending invoice reminders",
    icon: "1",
    description: ""
  },
  {
    id: "customer-followup",
    title: "Following up with customers",
    icon: "2",
    description: ""
  },
  {
    id: "overdue-tasks",
    title: "Reviewing overdue tasks",
    icon: "3",
    description: ""
  },
  {
    id: "schedule-maintenance",
    title: "Scheduling maintenance visits",
    icon: "4",
    description: ""
  },
  {
    id: "inventory-alerts",
    title: "Checking inventory alerts",
    icon: "5",
    description: ""
  }
]

export function InsightsConfigDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [aiEnabled, setAiEnabled] = React.useState(false)
  const [activeInsights, setActiveInsights] = React.useState<InsightItem[]>(defaultInsights.slice(0, 3))
  const [excludedInsights, setExcludedInsights] = React.useState<InsightItem[]>(defaultInsights.slice(3))

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(activeInsights)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update numbers after reordering
    const updatedItems = items.map((item, index) => ({
      ...item,
      icon: (index + 1).toString()
    }))

    setActiveInsights(updatedItems)
  }

  const handleExclude = (index: number) => {
    const items = Array.from(activeInsights)
    const [excludedItem] = items.splice(index, 1)
    
    // Renumber remaining active items
    const updatedActiveItems = items.map((item, idx) => ({
      ...item,
      icon: (idx + 1).toString()
    }))
    
    setActiveInsights(updatedActiveItems)
    setExcludedInsights([...excludedInsights, { ...excludedItem, icon: "" }])
  }

  const handleInclude = (index: number) => {
    const items = Array.from(excludedInsights)
    const [includedItem] = items.splice(index, 1)
    
    const newActiveItems = [...activeInsights, { ...includedItem, icon: (activeInsights.length + 1).toString() }]
    
    setExcludedInsights(items)
    setActiveInsights(newActiveItems)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{children}</div>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configure Insights</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 py-4 border-b">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <div className="flex-1">Let AI change my priorities based on my usage of Method</div>
          <Switch
            checked={aiEnabled}
            onCheckedChange={setAiEnabled}
            aria-label="Toggle AI priorities"
          />
        </div>

        <div className="space-y-6 pt-4 min-h-[400px]">
          <div>
            <h3 className="font-medium mb-3">My company priorities</h3>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="priorities">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {activeInsights.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center gap-3 p-3 bg-white border rounded-lg cursor-grab active:cursor-grabbing"
                            style={{
                              ...provided.draggableProps.style,
                              left: 'auto',
                              top: 'auto',
                            }}
                          >
                            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-medium text-sm">
                              {item.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{item.title}</div>
                            </div>
                            <button
                              onClick={() => handleExclude(index)}
                              className="text-sm text-muted-foreground hover:text-foreground"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>

          {excludedInsights.length > 0 && (
            <div>
              <h3 className="font-medium mb-3 text-muted-foreground">Excluded</h3>
              <div className="space-y-2">
                {excludedInsights.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-muted/50 border border-muted rounded-lg"
                  >
                    <div className="w-6 h-6" />
                    <div className="flex-1">
                      <div className="font-medium text-muted-foreground">{item.title}</div>
                    </div>
                    <button
                      onClick={() => handleInclude(index)}
                      className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-6 pt-6 mt-6 border-t">
          <button
            onClick={() => setOpen(false)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </button>
          <Button
            onClick={() => setOpen(false)}
            className="px-8"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 