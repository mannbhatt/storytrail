# Mixpanel Integration Setup

## Overview
Mixpanel has been successfully integrated into your StoryTrail Next.js application for user analytics and event tracking.

## Installation
- ✅ Mixpanel SDK (`mixpanel-browser`) installed
- ✅ Type definitions (`@types/mixpanel`) installed

## Files Created/Modified

### 1. Mixpanel Configuration (`lib/mixpanel.ts`)
- Core Mixpanel client setup
- Event tracking functions
- User identification and management
- Development/production environment handling

### 2. Mixpanel Provider (`components/providers/MixpanelProvider.tsx`)
- Client-side initialization wrapper
- Ensures Mixpanel only runs in browser environment

### 3. Auth Provider Integration (`components/providers/AuthProvider.tsx`)
- Automatic user identification on login
- User data tracking (email, creation date)
- User session management

### 4. Custom Hook (`hooks/useMixpanel.ts`)
- Convenient tracking functions for common events
- Story interactions (view, like, share)
- Search and filter tracking
- Page view tracking

### 5. Stories List Integration (`components/stories/StoriesList.tsx`)
- Search event tracking
- Filter application tracking
- Results count tracking

### 6. App Layout (`app/layout.tsx`)
- MixpanelProvider integration into component tree

## Environment Variables
Add your Mixpanel token to your environment variables:

```bash
# For development (.env.local)
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token_here

# For production
# Add to your hosting provider's environment variables
```

## Usage Examples

### Basic Event Tracking
```typescript
import { useMixpanel } from '@/hooks/useMixpanel';

function MyComponent() {
  const { track } = useMixpanel();
  
  const handleClick = () => {
    track('Button Clicked', {
      button_name: 'subscribe',
      location: 'homepage'
    });
  };
  
  return <button onClick={handleClick}>Subscribe</button>;
}
```

### Story Interaction Tracking
```typescript
import { useMixpanel } from '@/hooks/useMixpanel';

function StoryComponent({ story }) {
  const { trackStoryView, trackStoryLike } = useMixpanel();
  
  useEffect(() => {
    trackStoryView(story.id, story.title);
  }, [story.id, story.title]);
  
  const handleLike = () => {
    trackStoryLike(story.id, story.title);
    // ... like logic
  };
  
  return (
    <div>
      <h2>{story.title}</h2>
      <button onClick={handleLike}>Like</button>
    </div>
  );
}
```

### User Identification (Automatic)
User identification is handled automatically through the AuthProvider when users log in/out.

## Tracked Events

### Automatic Events
- **Page Views**: Tracked automatically by Mixpanel
- **User Authentication**: Login/logout events with user properties
- **Search**: Search queries and result counts
- **Filters**: Category and location filter applications

### Available Manual Tracking Functions
- `trackStoryView(storyId, storyTitle)`
- `trackStoryLike(storyId, storyTitle)`
- `trackStoryShare(storyId, storyTitle, platform)`
- `trackSearch(query, resultsCount)`
- `trackPageView(pageName)`
- `track(eventName, properties)`

## Development vs Production
- Development mode: Mixpanel debug logging enabled
- Production mode: Standard tracking without debug logs
- Environment detection handled automatically

## Next Steps
1. Add your Mixpanel token to environment variables
2. Test tracking in development mode
3. Add more custom events as needed
4. Review Mixpanel dashboard for insights

## Notes
- Mixpanel only runs in browser environment
- All tracking is client-side only
- User data is automatically synced with Supabase auth
- Events are queued and sent automatically
