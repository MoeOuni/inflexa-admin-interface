import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import SingleUpload from '../app/single-upload';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

const GeneralSettings = () => {
  return (
    <div>
      <div className="grid gap-4 grid-cols-1">
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Store Informations</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-4">
                <Label>Store Name</Label>
                <Input placeholder="Store Name" />
              </div>
              <div className="grid gap-4">
                <Label>Store Description</Label>
                <Textarea />
              </div>
              <div className="grid gap-4">
                <Label>Store Logo</Label>
                <SingleUpload />
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Save</Button>
          </CardFooter>
        </Card>
        <Card x-chunk="dashboard-04-chunk-1">
          <CardHeader>
            <CardTitle>Tax Registration Number</CardTitle>
            <CardDescription>
              Unique Identifier for your store. Used to generate invoices,
              orders, estimates, etc.
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
      </div>
    </div>
  );
};

export default GeneralSettings;
