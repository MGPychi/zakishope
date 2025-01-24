"use client";
import { getOrders } from "@/app/data/orders-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
// import { useToast } from "@/hooks/use-toast";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { deleteOrder } from "../actions";
import { useRouter } from "next/navigation";
import OrderDetailsModal from "@/components/modals/OrderDetailsModal";

// import { deleteEmailAction } from "../actions";

interface Props {
  data: Awaited<ReturnType<typeof getOrders>>["data"];
  count: number;
  currentPage: number;
  searchTerm: string;
}

export default function AdminOrdersTable({
  data,
  count,
  currentPage,
  searchTerm,
}: Props) {
  const [selectedOrder, setSelectedOrder] = useState<(typeof data)[0] | null>(null)
  const openModal = (order: (typeof data)[0]) => {
    setSelectedOrder(order)
  }

  const closeModal = () => {
    setSelectedOrder(null)
  }

  const router = useRouter();
  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Handle search with debounce
  const handleSearch = (value: string) => {
    setSearchInput(value);

    // Clear previous timeout if order keeps typing
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to wait for 500ms before executing search
    const timeout = setTimeout(() => {
      router.push(`/admin/dashboard/orders?search=${value}&page=${currentPage}`);
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between space-x-6">
          <CardTitle>Orders Dashboard</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="min-h-[calc(100vh-328px)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search orders..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="md:w-1/3"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Wilaya</TableHead>
              <TableHead>address</TableHead>
              <TableHead>status</TableHead>
              <TableHead>Registred at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.wilaya}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.createdAt?.toLocaleDateString()}</TableCell>
                <TableCell>
                  <OrderActionsMenu orderId={item.id} />
                </TableCell>
                  <TableCell>
                <Button onClick={() => openModal(item)}>View Details</Button>
              </TableCell>
              </TableRow>
            ))}
              {selectedOrder && <OrderDetailsModal order={selectedOrder} open={!!selectedOrder} closeModal={closeModal} />}

          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <span className="text-sm text-muted-foreground">{count} orders</span>
      </CardFooter>
    </Card>
  );
}

interface OrderActionsMenuProps {
  orderId: string;
}

export const OrderActionsMenu = ({ orderId }: OrderActionsMenuProps) => {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem>
          <Button
            className="w-full"
            variant="destructive"
            size="sm"
            onClick={async () => {
              const result = await deleteOrder({
                id: orderId,
              });
              if (result?.data?.success) {
                toast({
                  title: "Order deleted",
                });
              } else {
                toast({
                  title: "Failed to delete order",
                  variant: "destructive",
                });
              }
            }}
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
