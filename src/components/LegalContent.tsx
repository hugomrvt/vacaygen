import React from 'react';
import { Shield, Database, Eye, Lock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTranslation } from '@/hooks/useTranslation';

export function LegalNoticeContent() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('legal.notice.title')}</h2>
        <p className="text-muted-foreground">{t('legal.notice.subtitle')}</p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.notice.editor.title')}</h3>
          <div className="space-y-2 text-sm">
            <p><strong>{t('legal.notice.editor.name')} :</strong> Hugo Mourlevat</p>
            <p><strong>{t('legal.notice.editor.website')} :</strong> VacayGen</p>
            <p><strong>URL :</strong> <a href="https://vacaygen.lovable.app" className="text-primary hover:underline">https://vacaygen.lovable.app</a></p>
            <p><strong>{t('legal.notice.editor.contact')} :</strong> <a href="https://www.linkedin.com/in/hugomrvt/" className="text-primary hover:underline">LinkedIn</a></p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.notice.hosting.title')}</h3>
          <div className="space-y-2 text-sm">
            <p><strong>{t('legal.notice.hosting.provider')} :</strong> Lovable</p>
            <p><strong>{t('legal.notice.hosting.address')} :</strong> {t('legal.notice.hosting.cloud')}</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.notice.ip.title')}</h3>
          <p className="text-sm">{t('legal.notice.ip.content')}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.notice.liability.title')}</h3>
          <p className="text-sm">{t('legal.notice.liability.content')}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.notice.data.title')}</h3>
          <p className="text-sm">{t('legal.notice.data.content')}</p>
        </section>
      </div>
    </div>
  );
}

export function TermsOfServiceContent() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('legal.terms.title')}</h2>
        <p className="text-muted-foreground">{t('legal.terms.subtitle')}</p>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.terms.object.title')}</h3>
          <p className="text-sm">{t('legal.terms.object.content')}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.terms.service.title')}</h3>
          <p className="text-sm">{t('legal.terms.service.content')}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.terms.access.title')}</h3>
          <p className="text-sm">{t('legal.terms.access.content')}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.terms.usage.title')}</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="font-medium mb-2">{t('legal.terms.usage.allowed')}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('legal.terms.usage.allowed.1')}</li>
                <li>{t('legal.terms.usage.allowed.2')}</li>
                <li>{t('legal.terms.usage.allowed.3')}</li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium mb-2">{t('legal.terms.usage.forbidden')}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('legal.terms.usage.forbidden.1')}</li>
                <li>{t('legal.terms.usage.forbidden.2')}</li>
                <li>{t('legal.terms.usage.forbidden.3')}</li>
                <li>{t('legal.terms.usage.forbidden.4')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.terms.ip.title')}</h3>
          <p className="text-sm">{t('legal.terms.ip.content')}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.terms.responsibility.title')}</h3>
          <p className="text-sm">{t('legal.terms.responsibility.content')}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.terms.availability.title')}</h3>
          <p className="text-sm">{t('legal.terms.availability.content')}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.terms.modifications.title')}</h3>
          <p className="text-sm">{t('legal.terms.modifications.content')}</p>
        </section>
      </div>
    </div>
  );
}

export function PrivacyPolicyContent() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">{t('legal.privacy.title')}</h2>
        <p className="text-muted-foreground">{t('legal.privacy.subtitle')}</p>
      </div>

      {/* Privacy Highlight */}
      <Alert className="border-green-500/20 bg-green-500/5">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-sm">
          <strong className="text-green-600">100% {t('legal.privacy.data.none')} :</strong> {t('legal.privacy.highlight')}
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            {t('legal.privacy.data.title')}
          </h3>
          <div className="bg-card p-4 rounded-lg border">
            <h4 className="font-semibold text-green-600 mb-3">✅ {t('legal.privacy.data.none')}</h4>
            <p className="mb-4 text-sm">{t('legal.privacy.data.content')}</p>
            
            <h5 className="font-semibold mb-2 text-sm">{t('legal.privacy.data.not.collected')}</h5>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>{t('legal.privacy.data.not.1')}</li>
              <li>{t('legal.privacy.data.not.2')}</li>
              <li>{t('legal.privacy.data.not.3')}</li>
              <li>{t('legal.privacy.data.not.4')}</li>
              <li>{t('legal.privacy.data.not.5')}</li>
              <li>{t('legal.privacy.data.not.6')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            {t('legal.privacy.processing.title')}
          </h3>
          <p className="text-sm mb-3">{t('legal.privacy.processing.content')}</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>{t('legal.privacy.processing.1')}</li>
            <li>{t('legal.privacy.processing.2')}</li>
            <li>{t('legal.privacy.processing.3')}</li>
            <li>{t('legal.privacy.processing.4')}</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            {t('legal.privacy.cookies.title')}
          </h3>
          <div className="space-y-4">
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-semibold mb-2 text-sm">🍪 {t('legal.privacy.cookies.technical')}</h4>
              <p className="text-sm">{t('legal.privacy.cookies.technical.content')}</p>
            </div>
            
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-semibold mb-2 text-sm">💾 {t('legal.privacy.storage.title')}</h4>
              <p className="text-sm">{t('legal.privacy.storage.content')}</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.privacy.sharing.title')}</h3>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <p className="font-semibold text-red-600 dark:text-red-400 text-sm">
              ❌ {t('legal.privacy.sharing.none')}
            </p>
            <p className="text-red-600 dark:text-red-400 mt-2 text-sm">
              {t('legal.privacy.sharing.content')}
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.privacy.security.title')}</h3>
          <p className="text-sm mb-3">{t('legal.privacy.security.content')}</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>{t('legal.privacy.security.1')}</li>
            <li>{t('legal.privacy.security.2')}</li>
            <li>{t('legal.privacy.security.3')}</li>
            <li>{t('legal.privacy.security.4')}</li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.privacy.rights.title')}</h3>
          <p className="text-sm mb-3">{t('legal.privacy.rights.content')}</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>{t('legal.privacy.rights.1')}</strong></li>
            <li><strong>{t('legal.privacy.rights.2')}</strong></li>
            <li><strong>{t('legal.privacy.rights.3')}</strong></li>
            <li><strong>{t('legal.privacy.rights.4')}</strong></li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.privacy.third.title')}</h3>
          <p className="text-sm">{t('legal.privacy.third.content')}</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-3">{t('legal.privacy.contact.title')}</h3>
          <p className="text-sm">
            {t('legal.privacy.contact.content')}{' '}
            <a href="https://www.linkedin.com/in/hugomrvt/" className="text-primary hover:underline">
              Hugo Mourlevat
            </a>
          </p>
        </section>

        <p className="text-xs text-muted-foreground mt-6">
          Dernière mise à jour : {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}