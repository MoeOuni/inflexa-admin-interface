import { Outlet } from 'react-router-dom';

const Providers = () => {
  return (
    <>
      <div className="flex items-center">
        <Outlet />
      </div>
    </>
  );
};

export default Providers;
