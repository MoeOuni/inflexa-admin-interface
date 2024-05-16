import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SmallTypography } from "../typography/small-typography";
import { Trash2 } from "lucide-react";
import { useCreateCategory,useEditCategory } from "@/api";
import type { Category } from "@/types";

const CategoryFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  description: z.string().optional(),
  image: z.string().optional(),
  subCategories: z
    .array(
      z.object({
        name: z.string().nonempty("Name is required"),
        description: z.string().optional(),
        image: z.string().optional(),
      })
    )
    .optional(),
});

type CategoryForm = z.infer<typeof CategoryFormSchema>;

type Props = {
  selectedCategory: Category | null;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<Category | null>>;
};

export function CategoryForm({selectedCategory}: Props) {
  const createCategory = useCreateCategory();
  const editCategory = useEditCategory();
  const [defaultValues, setDefaultValues] = React.useState<CategoryForm | undefined>(selectedCategory || undefined);
  const form = useForm<CategoryForm>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    name: "subCategories",
    control: form.control,
  });

  async function onSubmit(data: CategoryForm) {
    setDefaultValues(data);

    let status;
    if (editCategory) {
      editCategory.mutate({ ...data, _id: selectedCategory?._id});
      status = editCategory.status;
      return;
    } else{
    createCategory.mutate(data);
    status = createCategory.status;
    }

    if (status === "success") {
      setDefaultValues(undefined)
      fields.forEach((_, index) => remove(index));
      form.reset()
    }
  }

  return (
    <div className="py-4">
      {/* <DrawerTitle>New category</DrawerTitle>
     <DrawerDescription>
       Fill in the form below to proceed.
     </DrawerDescription> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={createCategory.isPending} />
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
                  <Input {...field} disabled={createCategory.isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="p-3 border rounded-md bg-muted/40 space-y-6">
            <div>
              <SmallTypography>Sub-Categories</SmallTypography>
            </div>
            {fields.map((field, index) => (
              <div className="flex gap-2" key={field.id}>
                <FormField
                  control={form.control}
                  name={`subCategories.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="w-[40%]">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={createCategory.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`subCategories.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="w-[50%]">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={createCategory.isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"outline"}
                  onClick={() => remove(index)}
                  className="mt-8"
                  disabled={createCategory.isPending}
                >
                  <Trash2 />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              disabled={createCategory.isPending}
              onClick={() =>
                append({
                  name: "",
                  description: "",
                  image: "",
                })
              }
            >
              Add Sub-Category
            </Button>
          </div>
          <Button type="submit" disabled={createCategory.isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
