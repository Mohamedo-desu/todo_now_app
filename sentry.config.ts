import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";

// Define your navigation integration
const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo(),
});

const sentryConfig = {
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  //debug: process.env.NODE_ENV === "development",
  enableAutoSessionTracking: true,
  attachStacktrace: true,
  attachScreenshot: true,
  enableAutoPerformanceTracing: true,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    Sentry.mobileReplayIntegration({
      maskAllText: false,
      maskAllImages: false,
      maskAllVectors: false,
      enableExperimentalViewRenderer: true,
      enableFastViewRendering: true,
    }),
    Sentry.spotlightIntegration(),
    navigationIntegration,
  ],
  environment: process.env.NODE_ENV || "development",
  release: process.env.EXPO_PUBLIC_APP_VERSION || "1.0.0",
  dist: process.env.EXPO_PUBLIC_APP_BUILD || "1",
  beforeSend(event) {
    if (event.request?.data) {
      delete event.request.data;
    }
    return event;
  },
  beforeBreadcrumb(breadcrumb) {
    if (breadcrumb.data?.url) {
      breadcrumb.data.url = breadcrumb.data.url.replace(
        /token=[^&]+/,
        "token=[REDACTED]"
      );
    }
    return breadcrumb;
  },
};

export default sentryConfig;
