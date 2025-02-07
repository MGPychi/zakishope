import { CartItems } from "./_components/cart-items";
import { CartSummary } from "./_components/cart-summary";
import { SiteHeader } from "../../components/layout/site-header/site-header";
import { SiteNav } from "../../components/layout/site-nav";
import ConfirmCommandButton from "./_components/ConfirmCommandButton";
import Footer from "@/components/layout/Footer/Footer";
import Container from "@/components/layout/Container";
import * as motion from "motion/react-m"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Votre Panier - WorldTech Constantine",
};



export default function CartPage() {
  return (
    <>
      <Container>
        <SiteHeader />
        <SiteNav />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen px-2 py-12"
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold font-heading text-tahat-900 mb-8"
          >
            Votre Panier
          </motion.h1>
          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="lg:col-span-2"
            >
              <CartItems />
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-4"
            >
              <CartSummary />
              <ConfirmCommandButton />
            </motion.div>
          </div>
        </motion.main>
      </Container>
      <Footer />
    </>
  )
}

