import { Outlet } from 'react-router-dom';

const Settings = () => {
  return (
    <>
      <div className=" w-full max-w-6xl my-3">
        <Outlet />
      </div>
    </>
  );
};

export default Settings;
