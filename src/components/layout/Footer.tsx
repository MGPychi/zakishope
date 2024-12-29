import Link from "next/link";
import { MapPin, Phone, Mail, Facebook } from "lucide-react";
import { infos } from "@/constants";

const Footer = () => {
  return (
    <footer className="bg-primary py-20 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Informations sur l'entreprise */}
          <div className="space-y-4">
            {/* <Image src="/placeholder.svg?height=50&width=100" alt="Logo Zak Electric" className="h-12" /> */}
            <p className="text-sm">{infos.description}</p>
          </div>

          {/* Accès rapide */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Accès rapide</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className=" transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/#about" className=" transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/#services" className=" transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/#contact" className=" transition-colors">
                  Contactez-nous
                </Link>
              </li>
            </ul>
          </div>

          {/* Contactez-nous */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{infos.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>{infos.phone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>{infos.email}</span>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Réseaux sociaux</h3>
            <ul className="space-y-4">
              <li className="">
                <Link href={infos.facebook} className="hover:underline">
                  <div className="flex gap-2 items-center">
                    <Facebook className="w-5 h-5" />
                    <span>{infos.facebookName}</span>
                  </div>
                </Link>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>WhatsApp: {infos.whatsapp}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="mt-12 pt-4 border-t border-gray-700 flex flex-wrap justify-between items-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} ZAK ELECTRIC. Tous droits
            réservés.
          </p>
          <p>Conçu & Développé par Webelocity</p>
          <div className="flex gap-4 mt-4 lg:mt-0">
            <Link href="/legal" className=" transition-colors">
              Avertissement légal
            </Link>
            <Link href="/terms" className=" transition-colors">
              Termes & Conditions
            </Link>
            <Link href="/privacy" className=" transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
