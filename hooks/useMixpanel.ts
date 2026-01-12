'use client';

import { useCallback } from 'react';
import { trackEvent } from '@/lib/mixpanel';

export const useMixpanel = () => {
  const track = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    trackEvent(eventName, properties);
  }, []);

  const trackStoryView = useCallback((storyId: string, storyTitle?: string) => {
    track('Story Viewed', {
      story_id: storyId,
      story_title: storyTitle,
    });
  }, [track]);

  const trackStoryLike = useCallback((storyId: string, storyTitle?: string) => {
    track('Story Liked', {
      story_id: storyId,
      story_title: storyTitle,
    });
  }, [track]);

  const trackStoryShare = useCallback((storyId: string, storyTitle?: string, platform?: string) => {
    track('Story Shared', {
      story_id: storyId,
      story_title: storyTitle,
      platform,
    });
  }, [track]);

  const trackSearch = useCallback((query: string, resultsCount?: number) => {
    track('Search Performed', {
      query,
      results_count: resultsCount,
    });
  }, [track]);

  const trackPageView = useCallback((pageName: string) => {
    track('Page Viewed', {
      page_name: pageName,
    });
  }, [track]);

  return {
    track,
    trackStoryView,
    trackStoryLike,
    trackStoryShare,
    trackSearch,
    trackPageView,
  };
};
