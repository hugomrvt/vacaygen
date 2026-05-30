import React, { useState } from 'react';
import { useTemplates } from '@/hooks/useLocalStorage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Textarea';
import { Plus, Trash2, Edit2, Copy, Heart, X } from 'lucide-react';
import { CustomTemplate } from '@/types';

// Template Card Component
interface TemplateCardProps {
  template: CustomTemplate;
  onDelete: (id: string) => void;
  onCopy: (content: string) => void;
  onUse: (template: CustomTemplate) => void;
  language: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onDelete, onCopy, onUse, language }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(template.name);
  const [editedContent, setEditedContent] = useState(template.content);

  const handleSave = () => {
    // In a real implementation, we would update the template
    setIsEditing(false);
  };

  return (
    <Card className="border-2 border-black mb-4" key={template.id}>
      <CardHeader className="pb-3 border-b-2 border-border">
        <div className="flex items-center justify-between">
          {isEditing ? (
            <Input
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="flex-1"
            />
          ) : (
            <CardTitle className="text-lg font-bold">{template.name}</CardTitle>
          )}
          
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave} variant="success">
                  {t('templates.save')}
                </Button>
                <Button size="sm" onClick={() => setIsEditing(false)} variant="ghost">
                  <X className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onCopy(template.content)}
                  title={t('templates.copy')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onUse(template)}
                  title={t('templates.use')}
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditing(true)}
                  title={t('templates.edit')}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(template.id)}
                  title={t('templates.delete')}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="muted" size="sm">
            {template.styleId}
          </Badge>
          <Badge variant="muted" size="sm">
            {template.language}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {new Date(template.createdAt).toLocaleDateString(language)}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="min-h-[100px]"
          />
        ) : (
          <div className="whitespace-pre-wrap text-sm p-3 bg-muted/50 border border-border/20">
            {template.content}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// New Template Form
interface NewTemplateFormProps {
  onSave: (name: string, content: string, styleId: string, language: string) => void;
  onCancel: () => void;
  language: string;
}

const NewTemplateForm: React.FC<NewTemplateFormProps> = ({ onSave, onCancel, language }) => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [styleId, setStyleId] = useState('millennial-pro');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    onSave(name, content, styleId, language);
    setName('');
    setContent('');
    setStyleId('millennial-pro');
  };

  const styles = [
    { id: 'millennial-pro', name: 'Millennial Pro' },
    { id: 'professional', name: 'Professionnel' },
    { id: 'gen-z', name: 'Gen Z' },
    { id: 'creative', name: 'Créatif' },
    { id: 'friendly', name: 'Amical' },
    { id: 'minimalist', name: 'Minimaliste' },
  ];

  return (
    <Card className="border-2 border-black mb-4">
      <CardHeader className="pb-3 border-b-2 border-border">
        <CardTitle className="text-lg font-bold">
          {t('templates.new')}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('templates.name')}</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('templates.namePlaceholder')}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('templates.style')}</label>
            <select
              value={styleId}
              onChange={(e) => setStyleId(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-transparent border-2 border-input focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {styles.map((style) => (
                <option key={style.id} value={style.id}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('templates.content')}</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('templates.contentPlaceholder')}
              className="min-h-[150px]"
              required
            />
          </div>
          
          <div className="flex items-center justify-end gap-2 pt-4 border-t-2 border-border">
            <Button type="button" variant="ghost" onClick={onCancel}>
              {t('templates.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={!name.trim() || !content.trim()}>
              {t('templates.save')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Main Template Manager Component
interface TemplateManagerProps {
  onUseTemplate: (template: CustomTemplate) => void;
  className?: string;
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({ onUseTemplate, className }) => {
  const { t, language } = useTranslation();
  const { templates, saveTemplate, deleteTemplate } = useTemplates();
  const [showNewForm, setShowNewForm] = useState(false);

  const handleSaveTemplate = (name: string, content: string, styleId: string, lang: string) => {
    saveTemplate({
      name,
      content,
      styleId,
      language: lang,
    });
    setShowNewForm(false);
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Could add toast notification
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleUseTemplate = (template: CustomTemplate) => {
    onUseTemplate(template);
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('templates.title')}</h2>
          <p className="text-muted-foreground mt-1">
            {t('templates.subtitle')}
          </p>
        </div>
        
        <Button onClick={() => setShowNewForm(!showNewForm)} leftIcon={<Plus className="w-4 h-4" />}>
          {t('templates.newButton')}
        </Button>
      </div>

      {showNewForm && (
        <NewTemplateForm
          onSave={handleSaveTemplate}
          onCancel={() => setShowNewForm(false)}
          language={language}
        />
      )}

      {templates.length === 0 ? (
        <Card className="border-2 border-black text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t('templates.empty')}
            </p>
            <Button onClick={() => setShowNewForm(true)} leftIcon={<Plus className="w-4 h-4" />}>
              {t('templates.createFirst')}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onDelete={deleteTemplate}
              onCopy={handleCopy}
              onUse={handleUseTemplate}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateManager;
