import { Link, Outlet } from 'react-router-dom';
import { CircleUser, LoaderCircle, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { Sidebar, SidebarMobile } from '@/components/app/side-bar';
import { ModeToggle } from '@/components/app/mode-toggle';
import { LangToggle } from '@/components/app/lang-toggle';
import {
  Suspense,
  useContext,
  // useEffect
} from 'react';
import { AuthContext } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NotificationSheet from '@/components/app/notification-sheet';
import { useMenuNotifications } from '@/api';

// import runOneSignal from '@/lib/one-signal';

const Spin = () => {
  return <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />;
};

function MainLayout() {
  const { user, setToken, setUser } = useContext(AuthContext);

  const menuNotificatons = useMenuNotifications({ type: 'menu' });

  // useEffect(() => {
  //   // Run OneSignal for push notifications once logged in.
  //   runOneSignal();
  // }, []);

  return (
    <div className="lg:grid md:grid min-h-screen w-full lg:grid-cols-[235px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <img src="./icon-logo.svg" className="h-8" />
              <span className="text-2xl">Inflexa</span>
            </Link>
            <div className="ml-auto">
              <NotificationSheet
                hasNewNotifications={
                  menuNotificatons?.data?.data?.notifications
                }
              />
            </div>
          </div>
          <div className="flex-1">
            <Sidebar notifications={menuNotificatons?.data?.data?.menu || []} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SidebarMobile
            notifications={menuNotificatons?.data?.data?.menu || []}
          />
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                {user?.profile?.avatarUrl ? (
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.avatarUrl as string}
                      alt="me"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                ) : (
                  <CircleUser className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setToken('');
                  setUser(undefined);
                  window.location.reload();
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
          <LangToggle />
        </header>
        <div style={{ height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
          <div
            className="p-4 lg:p-6 w-auto overflow-y-scroll"
            style={{ maxHeight: 'calc(100vh - 60px)' }}
          >
            <Suspense
              fallback={
                <div className="flex min-h-[100vh] items-center justify-center">
                  <Spin />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
