import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TransformationSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransformationSubmitModal({ isOpen, onClose }: TransformationSubmitModalProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-purple-600" />
            {t('transformations.submitTransformation') || 'Submit Your Transformation'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600">
            {t('transformations.submitDescription') || 
              'Share your transformation journey and inspire others! Upload your before and after photos to earn points.'}
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm font-medium text-purple-900 mb-2">
              {t('transformations.earnPoints') || 'Earn up to 5,000 points!'}
            </p>
            <ul className="text-xs text-purple-700 space-y-1">
              <li>✓ {t('transformations.requirement1') || 'Clear before and after photos'}</li>
              <li>✓ {t('transformations.requirement2') || 'Visible transformation results'}</li>
              <li>✓ {t('transformations.requirement3') || 'Authentic and recent photos'}</li>
            </ul>
          </div>
          <Button 
            onClick={onClose}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {t('common.comingSoon') || 'Coming Soon'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
