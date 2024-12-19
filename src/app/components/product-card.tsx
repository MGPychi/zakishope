import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBasket  } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

export function ProductCard({ name, price, image }: ProductCardProps) {
  const [isInMenu, setIsInMenu] = useState(false);


  const toggleMenu = () => {
    setIsInMenu(!isInMenu);
    alert(isInMenu ? `Removed ${name} from menu` : `Added ${name} to menu`);
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={image}
            alt={name}
            width={300}
            height={300}
            className="w-full h-48 object-cover"
          />
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "absolute top-2 right-2 rounded-full transition-colors duration-300",
              isInMenu
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-white text-gray-600 hover:bg-gray-100"
            )}
            onClick={toggleMenu}
          >
            <ShoppingBasket
              size={18}
              className={cn("h-4 w-4", isInMenu && "fill-current")}
            />
            <span className="sr-only">
              {isInMenu ? "Remove from menu" : "Add to menu"}
            </span>
          </Button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
            {name}
          </h3>
          <p className="text-xl font-bold text-tahat-600">{price}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          className={cn(
            "w-full flex items-center justify-center gap-2 transition-colors duration-300",
          )}
        >
           Bay Now 
        </Button>
      </CardFooter>
    </Card>
  );
}
