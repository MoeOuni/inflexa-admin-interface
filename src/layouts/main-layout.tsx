import { Outlet } from 'react-router-dom';
import { LoaderCircle, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { ModeToggle } from '@/components/app/mode-toggle';
import { LangToggle } from '@/components/app/lang-toggle';
import { Suspense } from 'react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar.tsx';
import { AppSidebar } from '@/components/app/app-sidebar';
import { Separator } from '@/components/ui/separator.tsx';

// import runOneSignal from '@/lib/one-signal';

const Spin = () => {
  return <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />;
};

function MainLayout() {
  // useEffect(() => {
  //   // Run OneSignal for push notifications once logged in.
  //   runOneSignal();
  // }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="w-full flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />

            <form className="w-full">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
            <div className="flex gap-2">
              <ModeToggle />
              <LangToggle />
            </div>
          </div>
        </header>
        <div
          className="p-4 lg:p-6 w-auto overflow-y-scroll pt-0"
          style={{ maxHeight: 'calc(100vh - 4.1rem)' }}
        >
          <div>
            <Suspense
              fallback={
                <div className="flex h-[100%] items-center justify-center">
                  <Spin />
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default MainLayout;
