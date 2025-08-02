import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Conditions d'utilisation - VacayGen" 
        description="Conditions générales d'utilisation de VacayGen"
      />
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Conditions d'Utilisation</h1>
          <p className="text-muted-foreground">Conditions générales d'utilisation de VacayGen</p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Objet</h2>
            <p>
              Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités 
              et conditions d'utilisation du service VacayGen, ainsi que les droits et obligations des utilisateurs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
            <p>
              VacayGen est un générateur gratuit de messages d'absence automatique. Le service permet aux 
              utilisateurs de créer des messages personnalisés pour informer de leur absence temporaire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Accès au service</h2>
            <p>
              Le service est accessible gratuitement à tout utilisateur disposant d'un accès internet. 
              Aucune inscription n'est requise. L'utilisateur s'engage à utiliser le service de manière 
              responsable et conforme à sa destination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Utilisation autorisée</h2>
            <div className="space-y-2">
              <p><strong>Utilisations autorisées :</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Génération de messages d'absence professionnels</li>
                <li>Personnalisation des messages selon vos besoins</li>
                <li>Utilisation à des fins personnelles ou professionnelles</li>
              </ul>
              
              <p className="mt-4"><strong>Utilisations interdites :</strong></p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Utilisation à des fins illégales ou frauduleuses</li>
                <li>Génération de contenus offensants, diffamatoires ou inappropriés</li>
                <li>Tentative de contournement des mesures de sécurité</li>
                <li>Utilisation abusive pouvant perturber le fonctionnement du service</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
            <p>
              Les messages générés par VacayGen sont libres d'utilisation par l'utilisateur. 
              Cependant, le code source et l'interface de l'application restent la propriété de l'éditeur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Responsabilité</h2>
            <p>
              L'utilisateur est seul responsable de l'usage qu'il fait des messages générés. 
              L'éditeur ne saurait être tenu responsable des conséquences de l'utilisation 
              des messages dans un contexte professionnel ou personnel.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Disponibilité du service</h2>
            <p>
              L'éditeur s'efforce d'assurer une disponibilité du service 24h/24 et 7j/7, 
              mais ne saurait être tenu responsable d'interruptions temporaires liées 
              à la maintenance ou à des causes techniques indépendantes de sa volonté.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Modification des CGU</h2>
            <p>
              L'éditeur se réserve le droit de modifier les présentes CGU à tout moment. 
              Les modifications entrent en vigueur dès leur publication sur le site.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;