'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowUpRight,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  Edit,
  FileText,
  MoreHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { OpportunityProgress } from "@/components/opportunity-progress";
import { Progress } from "@/components/ui/progress";

// Mock data - in a real app, this would come from an API
const opportunityData = {
  id: "opp-001",
  title: "Enterprise Software Implementation",
  company: "Acme Corp",
  value: 150000,
  stage: "proposal" as const,
  probability: 60,
  expectedCloseDate: "2024-04-15",
  owner: "John Smith",
  lastActivity: "2024-03-20",
  nextStep: "Technical review meeting",
  customer: {
    name: "Acme Corp",
    industry: "Technology",
    size: "Enterprise",
    relationship: "5+ years"
  },
  timeline: [
    {
      date: "2024-03-01",
      event: "Initial Contact",
      details: "First meeting with client team"
    },
    {
      date: "2024-03-10",
      event: "Requirements Gathered",
      details: "Detailed technical requirements documented"
    },
    {
      date: "2024-03-20",
      event: "Proposal Sent",
      details: "Comprehensive proposal delivered"
    }
  ],
  aiInsights: {
    winProbability: 75,
    similarDeals: 12,
    avgClosingTime: "45 days",
    keyFactors: [
      "Strong executive sponsorship",
      "Budget approved",
      "Technical requirements aligned"
    ]
  }
};

const pipelineStages = [
  { id: "lead", name: "Lead", description: "Initial contact" },
  { id: "discovery", name: "Discovery", description: "Needs assessment" },
  { id: "proposal", name: "Proposal", description: "Solution presented" },
  { id: "negotiation", name: "Negotiation", description: "Terms discussion" },
  { id: "closed", name: "Closed Won", description: "Deal completed" },
]

interface TimelineEvent {
  date: string
  event: string
  details: string
}

export default function OpportunityDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview");
  
  const getStageColor = (stage: string) => {
    const colors = {
      lead: "bg-gray-500",
      discovery: "bg-blue-500",
      proposal: "bg-yellow-500",
      negotiation: "bg-orange-500",
      closed: "bg-green-500"
    };
    return colors[stage as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold">{opportunityData.title}</h1>
            <Badge className={getStageColor(opportunityData.stage)}>
              {opportunityData.stage.charAt(0).toUpperCase() + opportunityData.stage.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              {opportunityData.company}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              ${opportunityData.value.toLocaleString()}
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              {opportunityData.probability}% Probability
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button>
            <ChevronRight className="h-4 w-4 mr-2" />
            Next Stage
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <OpportunityProgress
          currentStage={opportunityData.stage}
          stages={pipelineStages}
        />
      </div>

      <div className="grid gap-6 grid-cols-3">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>Smart analysis based on historical data and similar opportunities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 grid-cols-3">
                <div className="flex flex-col gap-1 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    Win Probability
                  </div>
                  <div className="text-2xl font-bold">{opportunityData.aiInsights.winProbability}%</div>
                  <div className="text-sm text-green-600">Based on {opportunityData.aiInsights.similarDeals} similar deals</div>
                </div>
                <div className="flex flex-col gap-1 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Avg. Closing Time
                  </div>
                  <div className="text-2xl font-bold">{opportunityData.aiInsights.avgClosingTime}</div>
                  <div className="text-sm text-muted-foreground">In current stage</div>
                </div>
                <div className="flex flex-col gap-1 p-4 border rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    Next Best Action
                  </div>
                  <div className="text-lg font-medium line-clamp-1">{opportunityData.aiInsights.keyFactors[0]}</div>
                  <div className="text-sm text-blue-600 cursor-pointer">View all factors</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>History of changes and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunityData.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      {index !== opportunityData.timeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{event.event}</div>
                        <div className="text-sm text-muted-foreground">{event.date}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{event.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Company Name</div>
                  <div className="text-sm text-muted-foreground">{opportunityData.company}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Industry</div>
                  <div className="text-sm text-muted-foreground">{opportunityData.customer.industry}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Company Size</div>
                  <div className="text-sm text-muted-foreground">{opportunityData.customer.size}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">Relationship</div>
                  <div className="text-sm text-muted-foreground">{opportunityData.customer.relationship}</div>
                </div>
                <Separator />
                <Link href={`/customers/${opportunityData.company}`}>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    View Customer Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Proposal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Share Opportunity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 