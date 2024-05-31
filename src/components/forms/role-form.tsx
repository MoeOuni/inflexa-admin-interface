import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Role } from "@/lib/types";
import { useCreateRole, useEditRole, usePermissions } from "@/api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const FormSchema = z.object({
  name: z.string().nonempty("Name is required."),
  description: z.string().nonempty("Description is required."),
  permissions: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one permission.",
    }),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  selectedRole: Role | null;
  setSelectedRole?: React.Dispatch<React.SetStateAction<Role | null>>;
};

const RoleForm = ({ selectedRole }: Props) => {
  const permissions = usePermissions();
  const editRole = useEditRole();
  const createRole = useCreateRole();
  const [defaultValues, setDefaultValues] = React.useState<
    FormValues | undefined
  >({
    name: selectedRole?.name || "",
    description: selectedRole?.description || "",
    permissions:
      selectedRole?.permissions?.map((item: any) => {
        return item?._id ?? item;
      }) || [],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: FormValues) {
    let status;
    if (selectedRole) {
      await editRole.mutateAsync({
        ...data,
        _id: selectedRole._id,
      });
      status = editRole.status;
    } else {
      await createRole.mutateAsync(data);

      status = createRole.status;
    }

    if (status === "success") {
      setDefaultValues(undefined);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Permission Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="permissions"
          render={() => (
            <FormItem>
              <FormLabel>Permissions</FormLabel>
              <FormMessage />
              <div className="flex flex-wrap">
                {permissions.data?.permissions?.map((permission: any) => {
                  return (
                    <div key={permission._id} className="w-full md:w-1/2 p-1">
                      <FormField
                        control={form.control}
                        name="permissions"
                        render={({ field }) => (
                          <FormItem
                            key={permission._id}
                            className="flex flex-row items-start space-x-3 space-y-0 bg-white/40 dark:bg-black/40  rounded-md border p-4 shadow"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value.includes(permission._id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        permission._id,
                                      ])
                                    : field.onChange(
                                        field.value.filter(
                                          (item) => item !== permission._id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>{permission.name}</FormLabel>
                              <FormDescription>
                                {permission?.description}
                              </FormDescription>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  );
                })}
              </div>
            </FormItem>
          )}
        />
        <div className="p-1">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default RoleForm;
