import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Building,
  Calendar,
  DollarSign,
  FileText,
  Mail,
  MapPin,
  MoreHorizontal,
  Package,
  Phone,
  Truck,
  Users,
} from "lucide-react"
import Link from "next/link"

export function ContactCard({ contact }) {
  // Get contact type badge
  const getContactTypeBadge = (types) => {
    if (types.includes("customer") && types.includes("vendor")) {
      return <Badge className="bg-purple-500">Customer & Vendor</Badge>
    } else if (types.includes("customer")) {
      return <Badge className="bg-blue-500">Customer</Badge>
    } else if (types.includes("vendor")) {
      return <Badge className="bg-green-500">Vendor</Badge>
    } else if (types.includes("subcontractor")) {
      return <Badge className="bg-orange-500">Subcontractor</Badge>
    }
    return null
  }

  // Get contact type icon
  const getContactTypeIcon = (types) => {
    if (types.includes("customer")) {
      return <Building className="h-5 w-5" />
    } else if (types.includes("vendor")) {
      return <Truck className="h-5 w-5" />
    } else if (types.includes("subcontractor")) {
      return <Users className="h-5 w-5" />
    }
    return <Building className="h-5 w-5" />
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            {getContactTypeBadge(contact.type)}
            <Badge
              variant="outline"
              className={cn(
                contact.status === "active"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : "bg-gray-100 text-gray-800 border-gray-200",
              )}
            >
              {contact.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              {getContactTypeIcon(contact.type)}
            </div>
            <div>
              <h3 className="font-medium text-lg">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">{contact.contactPerson}</p>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{contact.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">
                {contact.city}, {contact.state}
              </span>
            </div>
          </div>

          {contact.type.includes("customer") && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Jobs:</span>{" "}
                <span className="font-medium">
                  {contact.openJobs} open / {contact.totalJobs} total
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Spend:</span>{" "}
                <span className="font-medium">${contact.totalSpend.toLocaleString()}</span>
              </div>
            </div>
          )}

          {contact.type.includes("vendor") && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Orders:</span>{" "}
                <span className="font-medium">
                  {contact.openOrders} open / {contact.totalOrders} total
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Purchases:</span>{" "}
                <span className="font-medium">${contact.totalPurchases?.toLocaleString() || 0}</span>
              </div>
            </div>
          )}

          {contact.type.includes("subcontractor") && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Jobs:</span>{" "}
                <span className="font-medium">
                  {contact.openJobs} open / {contact.totalJobs} total
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Paid:</span>{" "}
                <span className="font-medium">${contact.totalPaid?.toLocaleString() || 0}</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-muted/20 px-4 py-3 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Last contact: {contact.lastContact}</div>
          <div className="flex items-center gap-2">
            <Link href={`/contacts/${contact.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {contact.type.includes("customer") && (
                  <>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Visit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Create Job
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Create Invoice
                    </DropdownMenuItem>
                  </>
                )}
                {contact.type.includes("vendor") && (
                  <DropdownMenuItem>
                    <Package className="h-4 w-4 mr-2" />
                    Create Purchase Order
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

