import { ConfigContext, ExpoConfig } from "expo/config";

const EAS_PROJECT_ID = "60d3e5f1-8f30-49b6-b980-58f083f696a4";
const PROJECT_SLUG = "todonow";
const OWNER = "mohamedo-desu";

// App production config
const APP_NAME = "Todo Now";
const BUNDLE_IDENTIFIER = `com.mohamedodesu.${PROJECT_SLUG}`;
const PACKAGE_NAME = `com.mohamedodesu.${PROJECT_SLUG}`;
const ICON = "./assets/icons/icon.png";
const ADAPTIVE_ICON = "./assets/icons/adaptive-icon.png";
const SCHEME = PROJECT_SLUG;

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ Building app for environment:", process.env.APP_ENV);
  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(
      (process.env.APP_ENV as "development" | "preview" | "production") ||
        "development"
    );

  return {
    ...config,
    name: name,
    version: "1.0.0",
    slug: PROJECT_SLUG,
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    icon: icon,
    scheme: scheme,
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#ffffff",
      },
      package: packageName,
      softwareKeyboardLayoutMode: "pan",
      edgeToEdgeEnabled: true,
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/icons/splash-icon.png",
          imageWidth: 80,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            image: "./assets/icons/splash-icon.png",
            backgroundColor: "#000000",
          },
        },
      ],
      [
        "@sentry/react-native/expo",
        {
          organization: "mohamedo-apps-desu",
          project: PROJECT_SLUG,
          url: "https://sentry.io",
        },
      ],
      [
        "expo-font",
        {
          fonts: [          
            "./assets/fonts/Urbanist-Bold.ttf",
            "./assets/fonts/Urbanist-Medium.ttf",
            "./assets/fonts/Urbanist-Regular.ttf",      
          ],
        },
      ],
      
      [
        "expo-notifications",
        {
          icon: "./assets/icons/splash-icon.png",
          color: "#FFECCD",
          defaultChannel: "default",
          sounds: [],
          enableBackgroundRemoteNotifications: true,
        },
      ],
      
      [
        "react-native-edge-to-edge",
        {
          android: {
            parentTheme: "Light",
            enforceNavigationBarContrast: false,
          },
        },
      ],
      "expo-secure-store", 
      "./plugins/custom-android-styles.js"
    ],
    experiments: {
      reactCompiler: false,
      typedRoutes: true,
      reactCanary: true,
      remoteBuildCache: {
        provider: "eas",
      },
    },
    owner: OWNER,
  };
};

export const getDynamicAppConfig = (
  environment: "development" | "preview" | "production"
) => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      adaptiveIcon: ADAPTIVE_ICON,
      scheme: SCHEME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME}`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: "./assets/icons/icon.png",
      adaptiveIcon: "./assets/icons/adaptive-icon.png",
      scheme: `${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: "./assets/icons/icon.png",
    adaptiveIcon: "./assets/icons/adaptive-icon.png",
    scheme: `${SCHEME}-dev`,
  };
};
