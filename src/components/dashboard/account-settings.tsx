"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function AccountSettings() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <UserProfile
      routing="hash"
      appearance={{
        baseTheme: isDark ? dark : undefined,
        variables: {
          colorPrimary: isDark ? "#8b7ffb" : "#5b4fe8",
          colorBackground: isDark ? "#171529" : "#ffffff",
          colorText: isDark ? "#e9e8f7" : "#1e1b3a",
          colorTextSecondary: isDark ? "#9795b8" : "#6c6a8c",
          colorNeutral: isDark ? "#e9e8f7" : "#1e1b3a",
          colorDanger: isDark ? "#ef5b64" : "#d84654",
          borderRadius: "0.75rem",
        },
        elements: {
          rootBox: "w-full",
          card: "shadow-none border-0 w-full bg-transparent",
          navbar: "hidden",
          navbarMobileMenuButton: "hidden",
          scrollBox: "border-0 bg-transparent",
          pageScrollBox: "bg-transparent",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any}
    />
  );
}
