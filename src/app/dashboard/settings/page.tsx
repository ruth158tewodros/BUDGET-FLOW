import { UserProfile } from "@clerk/nextjs";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  return (
    <>
      <Topbar title="Settings" />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Settings</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account and app preferences.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Switch between light and dark mode. Your choice is saved automatically.
                </p>
              </div>
              <ThemeToggle />
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <UserProfile
                routing="hash"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-0 w-full",
                    navbar: "hidden",
                    navbarMobileMenuButton: "hidden",
                    scrollBox: "border-0",
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
