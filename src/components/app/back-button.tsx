import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="h-7 w-7"
      onClick={() => navigate(-1)}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">{t('back')}</span>
    </Button>
  );
};

export default BackButton;
