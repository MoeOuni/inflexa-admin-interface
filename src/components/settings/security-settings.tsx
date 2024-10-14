import { useRoles } from '@/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Role } from '@/lib/types';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { Button } from '../ui/button';
import { ArrowUpDown, Cog, SquarePlus, Trash2 } from 'lucide-react';
import RoleForm from '../forms/role-form';
import BackButton from '../app/back-button';

const CollapsibleRole = ({
  role,
  setSelectedRole,
}: {
  role: Role;
  setSelectedRole: (role: Role) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col items-start lg:items-center md:items-center lg:flex-row md:flex-row justify-between  px-4">
        <h4 className="text-sm font-semibold">
          @{role.name} ({role?.permissions?.length} permissions)
        </h4>
        <div>
          <Button variant={'ghost'} size={'sm'}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>

          <Button
            variant={'ghost'}
            size={'sm'}
            onClick={() => setSelectedRole(role)}
          >
            <Cog className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ArrowUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <div className="rounded-md border px-4 mb-2 py-2 font-mono text-sm shadow-sm">
        {role.description}
      </div>
      <CollapsibleContent className="space-y-2">
        {role.permissions?.map((permission: any) => {
          return (
            <div
              key={permission?._id || permission}
              className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm"
            >
              @{permission?.name ?? permission} <br />
              <span className="text-muted-foreground">
                {permission?.description}
              </span>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

const SecuritySettings = () => {
  const [view, setView] = useState('display');

  // tsc-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleViewChange = () => {
    setView(view === 'display' ? 'form' : 'display');
  };

  // const handleEdit = (role?: Role) => {
  //   setSelectedRole(role || null);
  //   if (role) setView("form");
  // };

  const roles = useRoles();

  console.log(roles.data);
  return (
    <Card x-chunk="dashboard-04-chunk-1">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Used to define your security and rules parameters of the store.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border p-3 rounded-md bg-muted/40">
          <h4>Roles & Permissions</h4>
          <p className="text-muted-foreground text-sm">
            Used to define your platform access permissions for each role.{' '}
          </p>

          {view === 'display' ? (
            <>
              <Button size="sm" onClick={handleViewChange} className="my-3">
                <SquarePlus className="h-4 w-4" />
                <span className="ml-1">Create Role</span>
              </Button>
              <div className="space-y-2">
                {roles.data?.data?.map((role: Role) => (
                  <CollapsibleRole
                    key={role._id}
                    role={role}
                    setSelectedRole={setSelectedRole}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="my-3">
                <BackButton />
              </div>
              <RoleForm selectedRole={selectedRole} />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
