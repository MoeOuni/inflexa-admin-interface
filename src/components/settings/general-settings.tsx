import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import SingleUpload from "../app/single-upload";

const GeneralSettings = () => {
  return (
    <>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Store Name</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Store Name" />
          </form>
        </CardContent>
        <CardHeader>
          <CardTitle>Store Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <SingleUpload />
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Tax Registration Number</CardTitle>
          <CardDescription>
            Unique Identifier for your store. Used to generate invoices, orders,
            estimates, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input placeholder="Tax Registration Number" />
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default GeneralSettings;
