import { Outlet} from "react-router-dom";




const Settings = () => {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
      </div>
      <div className=" w-full max-w-6xl my-3">
       

          <Outlet />

      </div>
    </>
  );
};

export default Settings;
