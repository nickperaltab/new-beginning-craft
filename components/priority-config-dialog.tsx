'use client';

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Wrench } from "lucide-react";

interface PriorityConfigDialogProps {
  children?: ReactNode;
}

export function PriorityConfigDialog({ children }: PriorityConfigDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Wrench className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Configure priority criteria</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Priority Configuration</DialogTitle>
          <DialogDescription>
            Configure how customer priority is calculated based on various criteria
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="revenue-threshold">Revenue Threshold</Label>
            <Input
              id="revenue-threshold"
              placeholder="Enter amount..."
              defaultValue="50000"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="response-time">Response Time</Label>
            <Select defaultValue="4">
              <SelectTrigger id="response-time">
                <SelectValue placeholder="Select hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">2 hours</SelectItem>
                <SelectItem value="4">4 hours</SelectItem>
                <SelectItem value="8">8 hours</SelectItem>
                <SelectItem value="24">24 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contract-type">Contract Type Weight</Label>
            <Select defaultValue="premium">
              <SelectTrigger id="contract-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (x1)</SelectItem>
                <SelectItem value="premium">Premium (x2)</SelectItem>
                <SelectItem value="enterprise">Enterprise (x3)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 