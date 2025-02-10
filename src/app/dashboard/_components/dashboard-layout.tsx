'use client';

import { Home, PanelLeft, Folder, Users, User2 } from 'lucide-react';
import NextLink from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from '@/components/dashboard/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/dashboard/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dashboard/ui/dropdown';
import { paths } from '@/config/paths';
import { cn } from '@/utils/cn';
import { logout, useUserProfile } from '@/features/auth/utils/auth-utils';
import { Spinner } from '@/components/dashboard/ui/spinner';
import { useState } from 'react';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: user, isLoading } = useUserProfile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isLoading) return <Spinner />;

  const navigation = [
    { name: 'Dashboard', to: paths.app.dashboard.getHref(), icon: Home },
    user?.role === 'ADMIN' && {
      name: 'Users',
      to: paths.app.users.getHref(),
      icon: Users,
    },
    { name: 'News', to: paths.app.newsArchive.getHref(), icon: Folder },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <div className="flex w-full flex-col bg-muted/40 p-10">
      <aside className="fixed inset-y-0 mt-20 py-20 left-0 z-10 hidden w-60 flex-col bg-black sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.to;
            return (
              <NextLink
                key={item.name}
                href={item.to}
                className={cn(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                  isActive && 'bg-gray-900 text-white',
                )}
              >
                <item.icon
                  className={cn(
                    'text-gray-400 group-hover:text-gray-300',
                    'mr-4 size-6 shrink-0',
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </NextLink>
            );
          })}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-10 z-20 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          {/* <Progress /> */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent
              side="left"
              className="bg-black pt-24 text-white sm:max-w-60 z-50 border-r-0" // Added border-r-0
            >
              <nav className="grid gap-6 text-lg font-medium p-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.to;
                  return (
                    <NextLink
                      key={item.name}
                      href={item.to}
                      onClick={() => setIsDrawerOpen(false)}
                      className={cn(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                        isActive && 'bg-gray-900 text-white',
                      )}
                    >
                      <item.icon
                        className={cn(
                          'text-gray-400 group-hover:text-gray-300',
                          'mr-4 size-6 shrink-0',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </NextLink>
                  );
                })}
              </nav>
            </DrawerContent>
          </Drawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full focus:outline-none"
              >
                <span className="sr-only">Open user menu</span>
                <User2 className="size-6 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem
                onClick={() => router.push(paths.app.profile.getHref())}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn('block px-4 py-2 text-sm text-gray-700 w-full')}
                onClick={() => logout()}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
};

function Fallback({ error }: { error: Error }) {
  return <p>Error: {error.message ?? 'Something went wrong!'}</p>;
}

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <Layout>
      <ErrorBoundary key={pathname} FallbackComponent={Fallback}>
        {children}
      </ErrorBoundary>
    </Layout>
  );
};
