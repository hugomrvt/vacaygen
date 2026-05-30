import React from 'react';
import { useHistory } from '@/hooks/useLocalStorage';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Trash2, Copy, Clock, Repeat, Filter } from 'lucide-react';
import { MessageHistoryItem } from '@/types';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';

// History Item Component
interface HistoryItemProps {
  item: MessageHistoryItem;
  onCopy: (content: string) => void;
  onRegenerate: (item: MessageHistoryItem) => void;
  onDelete: (id: string) => void;
  language: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onCopy, onRegenerate, onDelete, language }) => {
  const locale = language === 'fr' ? fr : enUS;
  const formattedDate = format(new Date(item.createdAt), 'PPP', { locale });
  const formattedTime = format(new Date(item.createdAt), 'HH:mm', { locale });

  return (
    <Card className="border-2 border-black mb-4" key={item.id}>
      <CardHeader className="pb-3 border-b-2 border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              {item.styleId}
            </Badge>
            <Badge variant="secondary" size="sm">
              {item.language}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formattedDate} à {formattedTime}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onCopy(item.message)}
              title="Copier"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onRegenerate(item)}
              title="Régénérer"
            >
              <Repeat className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(item.id)}
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="whitespace-pre-wrap text-sm p-3 bg-muted/50 border border-border/20">
          {item.message}
        </div>
        
        {/* Show vacation data summary */}
        {item.vacationData && (
          <div className="mt-4 pt-4 border-t-2 border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {item.vacationData.startDate && (
                <div className="flex items-center gap-2">
                  <span className="font-bold">Début:</span>
                  <span>{item.vacationData.startDate}</span>
                </div>
              )}
              {item.vacationData.endDate && (
                <div className="flex items-center gap-2">
                  <span className="font-bold">Fin:</span>
                  <span>{item.vacationData.endDate}</span>
                </div>
              )}
              {item.vacationData.destination && (
                <div className="flex items-center gap-2">
                  <span className="font-bold">Destination:</span>
                  <span>{item.vacationData.destination}</span>
                </div>
              )}
              {item.vacationData.activity && (
                <div className="flex items-center gap-2">
                  <span className="font-bold">Activité:</span>
                  <span>{item.vacationData.activity}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Main History Manager Component
interface HistoryManagerProps {
  onRegenerate: (item: MessageHistoryItem) => void;
  className?: string;
}

export const HistoryManager: React.FC<HistoryManagerProps> = ({ onRegenerate, className }) => {
  const { t, language } = useTranslation();
  const { history, deleteFromHistory, clearHistory } = useHistory();
  const [filterStyle, setFilterStyle] = useState<string>('all');

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      // Could add toast notification
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleDelete = (id: string) => {
    deleteFromHistory(id);
  };

  const handleClearHistory = () => {
    if (window.confirm(language === 'fr' ? 'Êtes-vous sûr de vouloir effacer tout l\'historique ?' : 'Are you sure you want to clear all history?')) {
      clearHistory();
    }
  };

  // Filter history by style
  const filteredHistory = filterStyle === 'all' 
    ? history 
    : history.filter((item) => item.styleId === filterStyle);

  // Get unique styles from history
  const uniqueStyles = ['all', ...Array.from(new Set(history.map((item) => item.styleId)))];

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t('history.title')}</h2>
          <p className="text-muted-foreground mt-1">
            {t('history.subtitle')}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearHistory}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            {t('history.clearAll')}
          </Button>
        </div>
      </div>

      {/* Filter */}
      {history.length > 0 && (
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm font-medium">{t('history.filter')}: </span>
          <div className="flex items-center gap-1">
            {uniqueStyles.map((style) => (
              <button
                key={style}
                onClick={() => setFilterStyle(style)}
                className={`px-3 py-1 text-xs font-medium border-2 border-border transition-colors ${
                  filterStyle === style 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-transparent text-foreground hover:bg-muted'
                }`}
              >
                {style === 'all' ? t('history.allStyles') : style}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredHistory.length === 0 ? (
        <Card className="border-2 border-black text-center py-12">
          <CardContent>
            <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">
              {t('history.empty')}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {t('history.emptyHint')}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              onCopy={handleCopy}
              onRegenerate={onRegenerate}
              onDelete={handleDelete}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryManager;
