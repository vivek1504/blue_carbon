import SafeScreen from "@/components/SafeScreen";
import { ClerkProvider } from "@clerk/clerk-expo";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

// UI Kitten imports
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
VITE_CLERK_PUBLISHABLE_KEY = "pk_test_Z2VudWluZS1tb25rZmlzaC04LmNsZXJrLmFjY291bnRzLmRldiQ"

export default function RootLayout() {
    return (
        <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY} tokenCache={"async-storage"}>
            {/* Wrap everything inside ApplicationProvider */}
            <ApplicationProvider {...eva} theme={eva.light}>
                <SafeScreen style={{ flex: 1, backgroundColor: "#0b3e2aff" }}>
                    <Slot />
                </SafeScreen>
                <StatusBar style="dark" />
            </ApplicationProvider>
        </ClerkProvider>
    );
}
