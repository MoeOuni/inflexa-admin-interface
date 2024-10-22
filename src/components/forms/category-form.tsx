import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ClipboardX, PlusCircle, Save, Trash2 } from 'lucide-react';
import { useCreateCategory, useEditCategory } from '@/api';
import type { Category } from '@/lib/types';
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BackButton from '@/components/app/back-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CategoryFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  description: z.string().optional(),
  image: z.string().optional(),
  subCategories: z
    .array(
      z.object({
        name: z.string().nonempty('Name is required'),
        description: z.string().optional(),
        image: z.string().optional(),
      }),
    )
    .optional(),
});

type CategoryForm = z.infer<typeof CategoryFormSchema>;

type Props = {
  selectedCategory: Category | null;
  handleChangeView: () => void;
  setSelectedCategory?: React.Dispatch<React.SetStateAction<Category | null>>;
};

export function CategoryForm({ selectedCategory }: Props) {
  const { t } = useTranslation();
  const createCategory = useCreateCategory();
  const editCategory = useEditCategory();
  const [defaultValues, setDefaultValues] = React.useState<
    CategoryForm | undefined
  >(selectedCategory || undefined);
  const form = useForm<CategoryForm>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    name: 'subCategories',
    control: form.control,
  });

  async function onSubmit(data: CategoryForm) {
    setDefaultValues(data);

    let status;
    if (selectedCategory) {
      editCategory.mutate({ ...data, _id: selectedCategory?._id });
      status = editCategory.status;
    } else {
      createCategory.mutate(data);
      status = createCategory.status;
    }

    if (status === 'success') {
      setDefaultValues(undefined);
      fields.forEach((_, index) => remove(index));
      form.reset();
    }
  }

  return (
    <div className="pb-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              New Category
            </h1>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 gap-1"
                onClick={() => {
                  setDefaultValues(undefined);
                  fields.forEach((_, index) => remove(index));
                  form.reset({
                    name: '',
                    description: '',
                    image: '',
                  });
                }}
              >
                <ClipboardX className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Discard
                </span>
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={createCategory.isPending}
                className="h-8 gap-1"
              >
                <Save className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  {t('save_category_button')}
                </span>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Parent Category</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('category_name_label')}</FormLabel>
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
                    <FormLabel>{t('category_description_label')}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={createCategory.isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('category_sub_category_key')}</CardTitle>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('category_name_label')}</TableHead>
                    <TableHead>{t('category_description_label')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((_field, index) => (
                    <TableRow>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`subCategories.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>{t("category_name_label")}</FormLabel> */}
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={createCategory.isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`subCategories.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>{t("category_description_label")}</FormLabel> */}
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={createCategory.isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={'ghost'}
                          onClick={() => remove(index)}
                          className=""
                          size={'sm'}
                          disabled={createCategory.isPending}
                        >
                          <Trash2 className="h-5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-center border-t p-4">
              <Button
                size="sm"
                type="button"
                variant="ghost"
                disabled={createCategory.isPending}
                onClick={() =>
                  append({
                    name: '',
                    description: '',
                    image: '',
                  })
                }
                className="gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                {t('category_sub_category_add_button')}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
