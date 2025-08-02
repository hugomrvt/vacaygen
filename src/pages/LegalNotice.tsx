import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import SEOHead from '@/components/SEOHead';

const LegalNotice = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={t('legal.title')} 
        description={t('legal.description')}
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
          <h1 className="text-3xl font-bold mb-2">Mentions Légales</h1>
          <p className="text-muted-foreground">Informations légales concernant VacayGen</p>
        </div>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Éditeur du site</h2>
            <div className="space-y-2">
              <p><strong>Nom :</strong> Hugo Mourlevat</p>
              <p><strong>Site web :</strong> VacayGen</p>
              <p><strong>URL :</strong> <a href="https://vacaygen.lovable.app" className="text-primary hover:underline">https://vacaygen.lovable.app</a></p>
              <p><strong>Contact :</strong> <a href="https://www.linkedin.com/in/hugomrvt/" className="text-primary hover:underline">LinkedIn</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
            <div className="space-y-2">
              <p><strong>Hébergeur :</strong> Lovable</p>
              <p><strong>Adresse :</strong> Services d'hébergement cloud</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
            <p>
              Le contenu de ce site web (textes, images, logos, icônes, sons, logiciels) est la propriété 
              exclusive de Hugo Mourlevat, sauf mention contraire. Toute reproduction, représentation, 
              modification, publication, adaptation de tout ou partie des éléments du site est interdite, 
              sauf autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation de responsabilité</h2>
            <p>
              L'éditeur ne pourra être tenu responsable des dommages directs et indirects causés au matériel 
              de l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne 
              répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Données personnelles</h2>
            <p>
              VacayGen respecte votre vie privée. Aucune donnée personnelle n'est collectée, stockée ou 
              transmise par cette application. Tous les traitements sont effectués localement dans votre 
              navigateur.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default LegalNotice;