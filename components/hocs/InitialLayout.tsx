import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import Loader from "../common/Loader";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inPublicLayout = segments[0] === "(public)";

    if (!isSignedIn && !inPublicLayout) {
      router.replace("/(public)");
    } else if (isSignedIn && inPublicLayout) {
      router.replace("/(protected)");
    }
  }, [isLoaded, isSignedIn, segments]);

  if (!isLoaded) return <Loader />;

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default InitialLayout;
