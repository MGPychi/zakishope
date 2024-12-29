import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface Props {
  text: string;
  value: string;
  icon: React.ReactNode;
}
const StatusCard = ({ text, value, icon }: Props) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <CardTitle className="text-sm font-medium">{text}</CardTitle>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold">{value}</div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
