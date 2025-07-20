import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | ZakisHope",
  description:
    "Politique de confidentialité de ZakisHope - Comment nous protégeons vos données personnelles.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Politique de Confidentialité
      </h1>

      <div className="prose prose-lg max-w-none">
        <p className="mb-4">
          <strong>Dernière mise à jour :</strong> 20 juillet 2025
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Chez ZakisHope, nous accordons une grande importance à la protection
            de vos données personnelles. Cette politique de confidentialité vous
            explique comment nous collectons, utilisons, partageons et
            protégeons vos informations lorsque vous utilisez notre site web et
            nos services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Collecte des Informations
          </h2>
          <p className="mb-4">
            Nous collectons différents types d&apos;informations lorsque vous
            utilisez notre site :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Informations personnelles</strong> : nom, prénom, adresse
              email, numéro de téléphone, adresse postale, informations de
              paiement lorsque vous créez un compte ou passez une commande.
            </li>
            <li>
              <strong>Informations d&apos;utilisation</strong> : données sur la
              façon dont vous interagissez avec notre site, y compris les pages
              visitées, les produits consultés, et les achats effectués.
            </li>
            <li>
              <strong>Informations techniques</strong> : adresse IP, type et
              version de navigateur, réglages de fuseau horaire, types et
              versions de plug-ins, système d&apos;exploitation et plateforme.
            </li>
            <li>
              <strong>Cookies et technologies similaires</strong> : nous
              utilisons des cookies pour améliorer votre expérience sur notre
              site, analyser l&apos;utilisation et personnaliser le contenu.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Utilisation des Informations
          </h2>
          <p className="mb-4">Nous utilisons vos informations pour :</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Traiter vos commandes et gérer votre compte</li>
            <li>Vous fournir une expérience personnalisée sur notre site</li>
            <li>
              Communiquer avec vous concernant votre compte ou vos commandes
            </li>
            <li>Vous informer sur nos produits, promotions et offres</li>
            <li>Améliorer notre site web et nos services</li>
            <li>Détecter et prévenir les fraudes</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Partage des Informations
          </h2>
          <p className="mb-4">
            Nous ne vendons pas vos données personnelles. Nous pouvons partager
            vos informations avec :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Prestataires de services</strong> : entreprises qui nous
              aident à exploiter notre site, traiter les paiements, expédier les
              commandes, ou fournir des services d&apos;assistance client.
            </li>
            <li>
              <strong>Partenaires commerciaux</strong> : avec votre
              consentement, pour des offres promotionnelles.
            </li>
            <li>
              <strong>Autorités légales</strong> : lorsque nous sommes
              légalement tenus de le faire ou pour protéger nos droits légaux.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Sécurité des Données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité appropriées pour
            protéger vos informations personnelles contre l&apos;accès non
            autorisé, l&apos;altération, la divulgation ou la destruction.
            Cependant, aucune méthode de transmission sur Internet ou de
            stockage électronique n&apos;est totalement sécurisée, et nous ne
            pouvons garantir une sécurité absolue.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Vos Droits</h2>
          <p className="mb-4">
            Vous disposez de certains droits concernant vos données personnelles
            :
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Accéder à vos données personnelles</li>
            <li>Rectifier vos données inexactes</li>
            <li>Demander la suppression de vos données</li>
            <li>Limiter ou vous opposer au traitement de vos données</li>
            <li>Demander la portabilité de vos données</li>
            <li>Retirer votre consentement</li>
          </ul>
          <p>
            Pour exercer ces droits, veuillez nous contacter à l&apos;adresse
            email indiquée ci-dessous.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Conservation des Données
          </h2>
          <p>
            Nous conservons vos données personnelles aussi longtemps que
            nécessaire pour atteindre les objectifs décrits dans cette politique
            de confidentialité, à moins qu&apos;une période de conservation plus
            longue ne soit requise ou permise par la loi.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience de
            navigation. Vous pouvez configurer votre navigateur pour refuser
            tous les cookies ou vous alerter lorsque des cookies sont envoyés.
            Cependant, certaines parties du site peuvent ne pas fonctionner
            correctement si vous désactivez les cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Modifications de la Politique de Confidentialité
          </h2>
          <p>
            Nous pouvons mettre à jour cette politique de confidentialité de
            temps à autre. Nous vous informerons de tout changement important en
            publiant la nouvelle politique sur cette page et en mettant à jour
            la date de &quot;dernière mise à jour&quot; en haut de cette
            politique.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Nous Contacter</h2>
          <p>
            Si vous avez des questions concernant cette politique de
            confidentialité, veuillez nous contacter à :
          </p>
          <p className="mt-2">
            <strong>Email :</strong> contact@zakishope.com
            <br />
            <strong>Adresse :</strong> 123 Rue du Commerce, 75000 Paris, France
          </p>
        </section>
      </div>
    </div>
  );
}
