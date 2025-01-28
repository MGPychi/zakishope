import Link from "next/link";
import { Search,
  //  Heart 
  } from "lucide-react";
import LogoImage from "../../../../public/logo.png";
import { Button } from "@/components/ui/button";
import SiteHeaderCart from "./site-header-cart";
import Image from "next/image";
import SearchBar from "./search-bar";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container py-4 lg:py-2 mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <Image
                width={350}
                height={300}
                src={LogoImage}
                alt="World Tech"
                className="h-[80px] w-auto md:h-[100px]"
              />
            </Link>

            {/* Mobile Icons */}
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-tahat-800"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Link href="/cart">
                <SiteHeaderCart />
              </Link>
            </div>
          </div>

          {/* Search Section */}
          <SearchBar />

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-tahat-800"
            >
              <Heart className="h-5 w-5" />
            </Button> */}
            <Link href="/cart">
              <SiteHeaderCart />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}