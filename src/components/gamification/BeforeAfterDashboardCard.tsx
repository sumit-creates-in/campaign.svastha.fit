import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import { ArrowRight, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useTransformations } from '@/hooks/gamification/useTransformations';
import { useLanguage } from '@/contexts/LanguageContext';

export function BeforeAfterDashboardCard() {
  const { t } = useLanguage();
  const { approvedTransformations, userTransformations, isLoadingApproved, isLoadingUser } = useTransformations();
  const [showMyStatus, setShowMyStatus] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll carousel with pause functionality
  useEffect(() => {
    if (!api || approvedTransformations.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000); // 3 seconds interval for better visibility

    return () => clearInterval(interval);
  }, [api, approvedTransformations.length, isPaused]);

  // Handle click to pause/resume scrolling
  const handleImageClick = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-3 w-3 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-3 w-3 text-red-500" />;
      default:
        return <Clock className="h-3 w-3 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return t('transformations.underReview');
      case 'approved':
        return t('transformations.approved');
      case 'rejected':
        return t('transformations.rejected');
      default:
        return t('transformations.unknown');
    }
  };

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30 border-0 shadow-lg">
      <CardContent className="p-0">
        {/* User's Own Transformations Status - Toggleable */}
        {userTransformations.length > 0 && showMyStatus && (
          <div className="px-4 pb-3 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-purple-500" />
                <h4 className="font-semibold text-sm">
                  {t('transformations.myTransformationStatus')}
                </h4>
              </div>
              <div className="text-xs text-gray-500">
                {userTransformations.length} {userTransformations.length > 1 ? t('transformations.submissions') : t('transformations.submission')}
              </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg mb-3 border border-purple-100">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <p className="text-xs text-purple-600 font-medium">
                    {t('transformations.totalPoints')}
                  </p>
                  <p className="text-lg font-bold text-purple-700">
                    {userTransformations.reduce((sum, t) => sum + t.points_awarded, 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-purple-600 font-medium">
                    {t('transformations.approved')}
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {userTransformations.filter(t => t.submission_status === 'approved').length}
                  </p>
                </div>
              </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {userTransformations.map((transformation, index) => (
                <div
                  key={transformation.id}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(transformation.submission_status)}
                    <div>
                      <p className="text-sm font-medium">
                        {t('transformations.submissionNumber')}{userTransformations.length - index}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transformation.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`text-xs mb-1 ${getStatusColor(transformation.submission_status)}`}>
                      {getStatusText(transformation.submission_status)}
                    </Badge>
                    <p className="text-xs text-purple-600 font-medium">
                      +{transformation.points_awarded.toLocaleString()} {t('transformations.pts')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Carousel */}
        {isLoadingApproved || isLoadingUser ? (
          <div className="px-4 pb-4">
            <div className="h-48 bg-muted/50 rounded-xl animate-pulse" />
          </div>
        ) : approvedTransformations.length > 0 ? (
            <div className="px-2 pb-2">
              <Carousel
                setApi={setApi}
                opts={{
                  align: 'start',
                  loop: true,
                  skipSnaps: false,
                  dragFree: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2">
                  {approvedTransformations.map((transformation) => (
                    <CarouselItem key={transformation.id} className="pl-2 basis-full sm:basis-1/2">
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {/* Before Image */}
                        <div
                          className="relative rounded-lg overflow-hidden aspect-[3/4] bg-gray-100 cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center"
                          onClick={handleImageClick}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleImageClick();
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={`${isPaused ? 'Resume' : 'Pause'} transformation slideshow`}
                        >
                          <img
                            src={transformation.before_image_url}
                            alt="Before transformation"
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop';
                            }}
                          />
                          {/* Attractive Before Badge */}
                          <div className="absolute bottom-2 left-2">
                            <div className="bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20">
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-bold text-white uppercase tracking-wide">
                                  {t('transformations.before')}
                                </span>
                                {(transformation as any).before_weight && (
                                  <>
                                    <ArrowRight className="h-2.5 w-2.5 text-white/70" />
                                    <span className="text-xs text-white/90 font-medium">
                                      {(transformation as any).before_weight}{t('transformations.kg')}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* After Image */}
                        <div
                          className="relative rounded-lg overflow-hidden aspect-[3/4] bg-gray-100 cursor-pointer transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 flex items-center justify-center"
                          onClick={handleImageClick}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleImageClick();
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-label={`${isPaused ? 'Resume' : 'Pause'} transformation slideshow`}
                        >
                          <img
                            src={transformation.after_image_url}
                            alt="After transformation"
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=600&fit=crop';
                            }}
                          />
                          {/* Attractive After Badge */}
                          <div className="absolute bottom-2 right-2">
                            <div className="bg-gradient-to-r from-emerald-500 to-green-500 backdrop-blur-sm rounded-full px-2 py-1 border border-white/20 shadow-lg">
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-bold text-white uppercase tracking-wide">
                                  {t('transformations.after')}
                                </span>
                                {(transformation as any).after_weight && (
                                  <>
                                    <ArrowRight className="h-2.5 w-2.5 text-white/70" />
                                    <span className="text-xs text-white/90 font-medium">
                                      {(transformation as any).after_weight}{t('transformations.kg')}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {(transformation.profiles?.full_name || (transformation as any).demo_user_name) && (
                        <div className="text-center px-2 pb-1">
                          <p className="text-xs text-muted-foreground">
                            — {(transformation as any).is_demo && (transformation as any).demo_user_name
                              ? (transformation as any).demo_user_name.split(' ')[0]
                              : transformation.profiles?.full_name?.split(' ')[0]}
                          </p>
                          {((transformation as any).before_weight && (transformation as any).after_weight) && (
                            <p className="text-xs text-green-600 font-medium mt-1">
                              {t('transformations.lost')} {(Number((transformation as any).before_weight) - Number((transformation as any).after_weight)).toFixed(1)} {t('transformations.kg')}! {t('transformations.celebration')}
                            </p>
                          )}
                        </div>
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          ) : (
            <div className="px-4 pb-4">
              <div className="h-48 bg-muted/30 rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground text-sm">
                  {t('transformations.noTransformationsYet')}
                </p>
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
