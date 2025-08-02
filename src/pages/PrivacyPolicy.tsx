import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield, Database, Eye, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';
import { Alert, AlertDescription } from '@/components/ui/alert';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Politique de confidentialité - VacayGen" 
        description="Politique de confidentialité et protection des données de VacayGen"
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
          <h1 className="text-3xl font-bold mb-2">Politique de Confidentialité</h1>
          <p className="text-muted-foreground">Protection de vos données personnelles</p>
        </div>

        {/* Privacy Highlight */}
        <Alert className="border-green-500/20 bg-green-500/5 mb-8">
          <Shield className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-sm">
            <strong className="text-green-600">100% Privé :</strong> VacayGen fonctionne entièrement dans votre navigateur. 
            Aucune donnée n'est envoyée vers nos serveurs ou stockée en ligne.
          </AlertDescription>
        </Alert>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" />
              1. Collecte de données
            </h2>
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-semibold text-green-600 mb-3">✅ Aucune collecte de données personnelles</h3>
              <p className="mb-4">
                VacayGen ne collecte, ne stocke et ne transmet <strong>aucune donnée personnelle</strong>. 
                L'application fonctionne entièrement dans votre navigateur web.
              </p>
              
              <h4 className="font-semibold mb-2">Données NON collectées :</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Informations de contact (email, téléphone, nom)</li>
                <li>Dates de vacances saisies</li>
                <li>Messages générés</li>
                <li>Préférences utilisateur</li>
                <li>Adresse IP ou données de géolocalisation</li>
                <li>Historique de navigation</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6 text-primary" />
              2. Traitement des données
            </h2>
            <p>
              Toutes les données saisies dans VacayGen (dates, messages personnalisés, préférences de style) 
              sont traitées <strong>localement dans votre navigateur</strong> uniquement. Ces informations :
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-4">
              <li>Ne quittent jamais votre ordinateur</li>
              <li>Ne sont pas sauvegardées sur nos serveurs</li>
              <li>Sont automatiquement effacées lorsque vous fermez l'onglet</li>
              <li>Ne sont pas partagées avec des tiers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6 text-primary" />
              3. Cookies et stockage local
            </h2>
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">🍪 Cookies techniques uniquement</h4>
                <p>
                  VacayGen utilise uniquement des cookies techniques nécessaires au fonctionnement 
                  de l'application (préférences de langue, thème sombre/clair). Aucun cookie de tracking 
                  ou publicitaire n'est utilisé.
                </p>
              </div>
              
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">💾 Stockage local temporaire</h4>
                <p>
                  Les données saisies peuvent être temporairement stockées dans le stockage local 
                  de votre navigateur pour améliorer l'expérience utilisateur. Ces données sont 
                  automatiquement supprimées à la fermeture de l'onglet.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Partage de données</h2>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <p className="font-semibold text-red-600 dark:text-red-400">
                ❌ Aucun partage de données
              </p>
              <p className="text-red-600 dark:text-red-400 mt-2">
                VacayGen ne partage aucune donnée avec des tiers, partenaires commerciaux, 
                ou services d'analyse, car aucune donnée n'est collectée.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Sécurité</h2>
            <p>
              Bien qu'aucune donnée ne soit transmise ou stockée en ligne, VacayGen implémente 
              plusieurs mesures de sécurité :
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-4">
              <li>Validation et sanitisation des entrées utilisateur</li>
              <li>Protection contre les attaques XSS (Cross-Site Scripting)</li>
              <li>Limitation du taux de génération de messages</li>
              <li>Code source sécurisé et régulièrement audité</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Vos droits</h2>
            <p>
              Même si aucune donnée personnelle n'est collectée, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-4">
              <li><strong>Droit à l'information :</strong> Cette politique vous informe de nos pratiques</li>
              <li><strong>Droit de contrôle :</strong> Vous contrôlez entièrement vos données locales</li>
              <li><strong>Droit d'effacement :</strong> Fermez l'onglet pour effacer toutes les données</li>
              <li><strong>Droit de portabilité :</strong> Copiez vos messages générés librement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Services tiers</h2>
            <p>
              VacayGen est hébergé sur la plateforme Lovable. Aucune donnée utilisateur n'est 
              transmise à Lovable ou à d'autres services tiers. Seules des données techniques 
              anonymes (statistiques de visite) peuvent être collectées par l'hébergeur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
            <p>
              Pour toute question concernant cette politique de confidentialité, vous pouvez 
              contacter le développeur via son profil LinkedIn : 
              <a href="https://www.linkedin.com/in/hugomrvt/" className="text-primary hover:underline ml-1">
                Hugo Mourlevat
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Modifications</h2>
            <p>
              Cette politique de confidentialité peut être mise à jour pour refléter des changements 
              dans l'application. La version actuelle est toujours disponible sur cette page.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;