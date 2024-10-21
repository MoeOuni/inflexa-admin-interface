import { Button } from '@/components/ui/button.tsx';

const Unauthorized = () => {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">401</h1>
        <span className="font-medium">Session Expired</span>
        <p className="text-center text-muted-foreground">
          Your session has expired. Please log in again to continue.
        </p>
        <div className="mt-6 flex gap-4">
          <Button
            variant="outline"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              window.location.href = '/login'; // Clear session and localStorage
            }}
          >
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
