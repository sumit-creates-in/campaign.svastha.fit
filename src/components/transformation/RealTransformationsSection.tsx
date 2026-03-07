import { BeforeAfterDashboardCard } from '@/components/gamification/BeforeAfterDashboardCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RealTransformationsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('transformations.realTransformations')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('transformations.seeRealResults') || 'See real results from our community members who transformed their lives'}
          </p>
        </div>

        {/* Before/After Card */}
        <div className="max-w-4xl mx-auto">
          <BeforeAfterDashboardCard />
        </div>
      </div>
    </section>
  );
}
