import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';
import { useTransformations } from '@/hooks/gamification/useTransformations';
import { useLanguage } from '@/contexts/LanguageContext';

export function BeforeAfterDashboardCard() {
  const { t } = useLanguage();
  const { approvedTransformations, isLoadingApproved, isLoadingUser } = useTransformations();
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

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/30 dark:via-pink-950/30 dark:to-orange-950/30 border-0 shadow-lg">
      <CardContent className="p-0">
        {/* Carousel */}
        {isLoadingApproved || isLoadingUser ? (
          <div className="px-4 pb-4">
            <div className="h-48 bg-muted/50 rounded-xl animate-pulse" />
          </div>
        ) : null}

        {!isLoadingApproved && !isLoadingUser && approvedTransformations.length > 0 && (
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
          )}

          {!isLoadingApproved && !isLoadingUser && approvedTransformations.length === 0 && (
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
