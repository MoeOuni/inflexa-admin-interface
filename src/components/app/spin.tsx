import { LoaderCircle } from 'lucide-react';

const Spin = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
    </div>
  );
};

export default Spin;
