"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, DollarSign, Building2, Calendar, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { AddOpportunityModal } from "@/components/opportunities/add-opportunity-modal"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation'

// Define the pipeline stages
const pipelineStages = [
  { id: "lead", name: "Lead", color: "bg-gray-100" },
  { id: "discovery", name: "Discovery", color: "bg-blue-50" },
  { id: "proposal", name: "Proposal", color: "bg-yellow-50" },
  { id: "negotiation", name: "Negotiation", color: "bg-orange-50" },
  { id: "closed", name: "Closed Won", color: "bg-green-50" },
]

// Mock data for dropdowns
const mockCustomers = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "TechSolutions Inc" },
  { id: "3", name: "City Hospital" },
]

const mockTeamMembers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Jane Doe" },
  { id: "3", name: "Bob Johnson" },
]

// Mock opportunities data
const initialOpportunities = [
  {
    id: "opp-1",
    title: "HVAC System Upgrade",
    company: "Acme Corp",
    value: 24500,
    expectedCloseDate: "2024-04-15",
    stage: "lead",
    probability: 20,
  },
  {
    id: "opp-2",
    title: "Annual Maintenance Contract",
    company: "TechSolutions Inc",
    value: 18750,
    expectedCloseDate: "2024-04-20",
    stage: "discovery",
    probability: 40,
  },
  {
    id: "opp-3",
    title: "Office Expansion Project",
    company: "City Hospital",
    value: 65000,
    expectedCloseDate: "2024-05-01",
    stage: "proposal",
    probability: 60,
  },
  {
    id: "opp-4",
    title: "Equipment Upgrade",
    company: "Downtown Office Tower",
    value: 28000,
    expectedCloseDate: "2024-04-10",
    stage: "negotiation",
    probability: 80,
  },
  {
    id: "opp-5",
    title: "New Building Setup",
    company: "Riverside Apartments",
    value: 32000,
    expectedCloseDate: "2024-03-30",
    stage: "closed",
    probability: 100,
  },
]

interface Opportunity {
  id: string
  title: string
  company: string
  value: number
  expectedCloseDate: string
  stage: string
  probability: number
}

export default function OpportunitiesPage() {
  const router = useRouter()
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities)
  const [showAddModal, setShowAddModal] = useState(false)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const sourceStage = result.source.droppableId
    const destinationStage = result.destination.droppableId
    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    // Create a new array to avoid mutating state
    const newOpportunities = [...opportunities]

    // Find the actual indices in the full array for source and destination
    const sourceItems = newOpportunities.filter(opp => opp.stage === sourceStage)
    const itemToMove = sourceItems[sourceIndex]
    
    // Remove the item from its original position
    const itemIndex = newOpportunities.findIndex(opp => opp.id === itemToMove.id)
    newOpportunities.splice(itemIndex, 1)

    // Find where to insert in the destination column
    const destinationItems = newOpportunities.filter(opp => opp.stage === destinationStage)
    const insertAtIndex = destinationItems.length === 0 
      ? newOpportunities.length // If destination is empty, append to the end
      : destinationIndex === 0 
        ? newOpportunities.findIndex(opp => opp.stage === destinationStage) // If inserting at start of destination
        : destinationIndex >= destinationItems.length 
          ? newOpportunities.findIndex(opp => opp.stage !== destinationStage && opp.stage > destinationStage) // If inserting at end of destination
          : newOpportunities.findIndex(opp => opp.id === destinationItems[destinationIndex].id) // If inserting in middle

    // Update the item's stage
    itemToMove.stage = destinationStage

    // Insert the item at the correct position
    newOpportunities.splice(
      insertAtIndex === -1 ? newOpportunities.length : insertAtIndex, 
      0, 
      itemToMove
    )

    setOpportunities(newOpportunities)
  }

  const handleAddOpportunity = async (values: any, createAnother: boolean) => {
    try {
      // In a real app, you would make an API call here
      const newOpportunity = {
        id: `opp-${opportunities.length + 1}`,
        title: values.name,
        company: mockCustomers.find(c => c.id === values.customer)?.name || "",
        value: parseFloat(values.amount) || 0,
        expectedCloseDate: values.expectedCloseDate,
        stage: values.stage || "lead",
        probability: parseInt(values.probability) || 0,
      };
      
      setOpportunities([...opportunities, newOpportunity]);
      
      toast({
        title: "Success",
        description: "Opportunity created successfully",
      });
    } catch (error) {
      console.error("Error creating opportunity:", error);
      toast({
        title: "Error",
        description: "Failed to create opportunity",
        variant: "destructive",
      });
    }
  };

  const handleOpportunityClick = (oppId: string) => {
    router.push(`/opportunity-details/${oppId}`)
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-start p-6 border-b">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Opportunities</h1>
          <p className="text-muted-foreground">Manage and track your sales pipeline</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Opportunity
        </Button>
      </div>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-5 gap-4 h-full">
          <DragDropContext onDragEnd={handleDragEnd}>
            {pipelineStages.map((stage) => (
              <div key={stage.id}>
                <Card className="h-full">
                  <CardHeader className="pb-1 px-2 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-sm font-semibold">{stage.name}</CardTitle>
                        <span className="text-sm text-muted-foreground">
                          ({opportunities.filter(opp => opp.stage === stage.id).length})
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowAddModal(true);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-1 px-2">
                    <Droppable droppableId={stage.id}>
                      {(provided: DroppableProvided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className={cn("rounded-md p-1 h-[calc(100vh-220px)] overflow-y-auto", stage.color)}
                        >
                          {opportunities
                            .filter(opp => opp.stage === stage.id)
                            .map((opp, index) => (
                              <Draggable key={opp.id} draggableId={opp.id} index={index}>
                                {(provided: DraggableProvided) => (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mb-2 cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => handleOpportunityClick(opp.id)}
                                  >
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-medium line-clamp-2">{opp.title}</h3>
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button 
                                              variant="ghost" 
                                              size="icon" 
                                              className="h-8 w-8 shrink-0"
                                              onClick={(e) => e.stopPropagation()}
                                            >
                                              <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Delete</DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                      <div className="flex flex-col gap-2 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <Building2 className="h-4 w-4 shrink-0" />
                                          <span className="truncate">{opp.company}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <DollarSign className="h-4 w-4 shrink-0" />
                                          {formatCurrency(opp.value)}
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                          <Calendar className="h-4 w-4 shrink-0" />
                                          {formatDate(opp.expectedCloseDate)}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </div>
            ))}
          </DragDropContext>
        </div>
      </div>

      <AddOpportunityModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddOpportunity}
        customers={mockCustomers}
        pipelines={[{ id: "default", name: "Default Pipeline" }]}
        stages={pipelineStages}
        teamMembers={mockTeamMembers}
      />
    </div>
  )
} 