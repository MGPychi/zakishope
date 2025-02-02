import Link from "next/link"
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="w-full mx-auto py-10   bg-background">
      <div className="container px-4 mx-auto max-w-screen-2xl py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">WorldTech</h2>
            <p className="text-sm text-muted-foreground">Your one-stop shop for home electronics</p>
            <div className="space-y-2">
              <p className="text-sm">+1 (555) 123-4567</p>
              <Link href="mailto:info@worldtech.com" className="text-sm hover:underline">
                info@worldtech.com
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">
                Featured Products
              </Link>
              <Link href="/brands" className="text-sm text-muted-foreground hover:text-foreground">
                Top Brands
              </Link>
              <Link href="/trending" className="text-sm text-muted-foreground hover:text-foreground">
                Trending Products
              </Link>
              <Link href="/sitemap" className="text-sm text-muted-foreground hover:text-foreground">
                Sitemap
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                FAQs
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms & Conditions
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold">Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/tvs" className="text-sm text-muted-foreground hover:text-foreground">
                TVs & Entertainment
              </Link>
              <Link href="/appliances" className="text-sm text-muted-foreground hover:text-foreground">
                Home Appliances
              </Link>
              <Link href="/kitchen" className="text-sm text-muted-foreground hover:text-foreground">
                Kitchen Electronics
              </Link>
              <Link href="/smart-home" className="text-sm text-muted-foreground hover:text-foreground">
                Smart Home
              </Link>
            </nav>
          </div>

          {/* Social & Apps */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect With Us</h3>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://youtube.com">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://wa.me/1234567890">
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">WhatsApp</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

      </div>
    </footer>
  )
}

