import React, { ReactNode } from "react";
import { Badge } from "./ui/badge";

const SectionsBadge = ({ children }: { children: ReactNode }) => {
  return (
    <Badge className="px-6 bg-primary/10 py-2 text-sm font-medium text-primary rounded-full ">
      {children}
    </Badge>
  );
};

export default SectionsBadge;
