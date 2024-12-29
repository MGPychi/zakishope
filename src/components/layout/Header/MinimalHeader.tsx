"use client";

import React, { useState } from "react";
import { Phone, Menu } from "lucide-react";
import * as motion from "framer-motion/m";
import Link from "next/link";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import ContactUsModal from "@/components/modals/ContactUsModal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import ProductSearchBar from "@/app/products/_components/ProductSearchBar";
import Image from "next/image";
import { getAllFeaturedActiveProducts } from "@/app/data/products-data";

const MinimalHeader = ({
  className,
  containerClassName,
  featuredProducts,
}: {
  className?: string;
  containerClassName?: string;
  featuredProducts: Awaited<ReturnType<typeof getAllFeaturedActiveProducts>>;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/#about" },
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50",
        className
      )}
    >
      <div className={clsx("container mx-auto px-4", containerClassName)}>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">
                <span className="text-gray-900">DALI</span>
                <span className="text-primary">ELICTRIQUE</span>
              </span>
            </Link>
          </motion.div>

          <div className="flex items-center justify-end lg:justify-center w-full max-w-3xl space-x-2 mx-auto">
            <div className="w-full hidden md:block  max-w-sm">
              <ProductSearchBar
                basePath="/products"
                className="!py-px"
                count={0}
                currentPage={1}
                searchTerm=""
              />
            </div>
            {/* Desktop Navigation */}
            <div className="hidden  xl:flex items-center space-x-6">
              <div className="space-x-4">
                {links.map((link) => (
                  <Button
                    key={`minimal_header_link_${link.href}`}
                    variant={"ghost"}
                  >
                    <Link key={link.title} href={link.href} className="">
                      {link.title}
                    </Link>
                  </Button>
                ))}
              </div>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-2">
                      Featured Products
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {featuredProducts.map((product) => (
                          <ListItem
                            key={product.id}
                            title={product.name
                              .split(" ")
                              .slice(0, 4)
                              .join(" ")}
                            href={`/products/${product.slug}`}
                          >
                            <div className="py-1" />
                            <div className="flex items-center space-x-2">
                              <Image
                                src={product.images[0].url}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded-md object-cover"
                              />
                              <span className="text-xs">
                                {product.description.slice(0, 50)}...
                              </span>
                            </div>
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Contact Section */}
          <div className="flex items-center space-x-4">
            <motion.div
              className="hidden lg:flex items-center space-x-2 text-gray-600"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">0781810656</span>
            </motion.div>
            <ContactUsModal />
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <Menu className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Browse our products and featured items.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="relative">
                    <ProductSearchBar
                      basePath="/products"
                      count={0}
                      currentPage={1}
                      searchTerm=""
                    />
                    {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-8 w-full"
                    /> */}
                  </div>
                  <Separator />

                  <h3 className="mb-2 py-4 text-lg font-semibold">Pages</h3>
                  <div className="flex flex-col gap-y-2">
                    {links.map((link) => (
                      <SheetClose asChild key={link.title} className="">
                        <Link
                          href={link.href}
                          className="block  hover:bg-gray-50  px-4   rounded-md  py-3 transition-all   duration-200 text-muted-foreground hover:text-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {link.title}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-2 py-4 text-lg font-semibold">
                      Featured Products
                    </h3>
                    {featuredProducts.map((product) => (
                      <SheetClose asChild key={product.id}>
                        <div className="flex gap-4 items-center">
                          <Link
                            href={`/products/${product.slug}`}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <div className="flex space-x-2 items-center hover:bg-gray-50 rounded-d p-2 px-4">
                              <Image
                                width={50}
                                height={50}
                                src={product.images[0].url}
                                alt={`${product.name} image`}
                              />
                              <span>{product.name.slice(0, 30)}</span>
                            </div>
                          </Link>
                        </div>
                      </SheetClose>
                    ))}
                  </div>
                  <Separator />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MinimalHeader;
