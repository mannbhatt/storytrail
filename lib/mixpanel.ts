import mixpanel from 'mixpanel-browser';

let isInitialized = false;

export const initMixpanel = () => {
  if (isInitialized || typeof window === 'undefined') return;
  
  const token = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
  if (!token) {
    console.warn('Mixpanel token not found');
    return;
  }

  mixpanel.init(token, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
  });
  
  isInitialized = true;
};

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (!isInitialized) {
    console.warn('Mixpanel not initialized');
    return;
  }
  
  mixpanel.track(eventName, properties);
};

export const identifyUser = (userId: string, traits?: Record<string, unknown>) => {
  if (!isInitialized) {
    console.warn('Mixpanel not initialized');
    return;
  }
  
  mixpanel.identify(userId);
  if (traits) {
    mixpanel.people.set(traits);
  }
};

export const resetUser = () => {
  if (!isInitialized) {
    console.warn('Mixpanel not initialized');
    return;
  }
  
  mixpanel.reset();
};

export { mixpanel };
