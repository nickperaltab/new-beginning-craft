'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, DollarSign, Mail } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Customer {
  id: string;
  name: string;
  email: string;
  invoiceAmount: number;
  daysOverdue: number;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "accounts@acme.com",
    invoiceAmount: 12500,
    daysOverdue: 15,
  },
  {
    id: "2",
    name: "TechSolutions Inc",
    email: "billing@techsolutions.com",
    invoiceAmount: 8750,
    daysOverdue: 10,
  },
  {
    id: "3",
    name: "City Hospital",
    email: "finance@cityhospital.org",
    invoiceAmount: 15000,
    daysOverdue: 7,
  },
];

interface InvoiceRemindersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceRemindersModal({ open, onOpenChange }: InvoiceRemindersModalProps) {
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(
    new Set(mockCustomers.map(c => c.id))
  );

  const handleCheckboxChange = (customerId: string) => {
    const newSelected = new Set(selectedCustomers);
    if (newSelected.has(customerId)) {
      newSelected.delete(customerId);
    } else {
      newSelected.add(customerId);
    }
    setSelectedCustomers(newSelected);
  };

  const handleSendReminders = () => {
    // In a real app, this would send the actual reminders
    toast({
      title: "Reminders Sent",
      description: `Sent reminders to ${selectedCustomers.size} customers`,
    });
    onOpenChange(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Invoice Reminders</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {mockCustomers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-start space-x-4 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                id={`customer-${customer.id}`}
                checked={selectedCustomers.has(customer.id)}
                onCheckedChange={() => handleCheckboxChange(customer.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`customer-${customer.id}`}
                    className="font-medium cursor-pointer"
                  >
                    {customer.name}
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {customer.daysOverdue} days overdue
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {formatCurrency(customer.invoiceAmount)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {customer.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="flex justify-between items-center space-x-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
          <Button onClick={handleSendReminders}>
            Send Reminders
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 