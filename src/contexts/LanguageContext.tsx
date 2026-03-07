import { createContext, useContext, ReactNode } from 'react';

interface LanguageContextType {
  t: (key: string) => string;
  language: string;
}

const translations: Record<string, string> = {
  'transformations.beforeAfter': 'Before & After',
  'transformations.realTransformations': 'Real Transformations',
  'transformations.seeRealResults': 'See real results from our community members who transformed their lives',
  'transformations.all': 'View All',
  'transformations.myTransformationStatus': 'My Transformation Status',
  'transformations.submissions': 'submissions',
  'transformations.submission': 'submission',
  'transformations.totalPoints': 'Total Points',
  'transformations.approved': 'Approved',
  'transformations.underReview': 'Under Review',
  'transformations.rejected': 'Rejected',
  'transformations.unknown': 'Unknown',
  'transformations.submissionNumber': 'Submission #',
  'transformations.pts': 'pts',
  'transformations.before': 'Before',
  'transformations.after': 'After',
  'transformations.kg': 'kg',
  'transformations.lost': 'Lost',
  'transformations.celebration': '🎉',
  'transformations.noTransformationsYet': 'No transformations yet',
  'transformations.submitWinPoints': 'Submit Your Transformation & Win Points',
  'transformations.submissionUnderReview': 'Submission Under Review',
  'transformations.waitForReview': 'Please wait while we review your submission',
  'transformations.submitTransformation': 'Submit Your Transformation',
  'transformations.submitDescription': 'Share your transformation journey and inspire others! Upload your before and after photos to earn points.',
  'transformations.earnPoints': 'Earn up to 5,000 points!',
  'transformations.requirement1': 'Clear before and after photos',
  'transformations.requirement2': 'Visible transformation results',
  'transformations.requirement3': 'Authentic and recent photos',
  'common.comingSoon': 'Coming Soon',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ t, language: 'en' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
