import React from 'react';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PhoneInput } from '@/components/app/phone-input';

import { useCreateSupplier, useEditSupplier } from '@/api';
import { Supplier } from '@/lib/types';
import { Divider } from 'antd';
import BackButton from '@/components/app/back-button';
import { ClipboardX, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SupplierFormSchema } from '@/lib/schemas';

type SupplierForm = z.infer<typeof SupplierFormSchema>;

type Props = {
  editValues?: Supplier;
};

export default function SupplierForm({ editValues }: Props) {
  const createSupplier = useCreateSupplier();
  const editSupplier = useEditSupplier({ status: 'ACTIVE' });

  const { t } = useTranslation();
  const [defaultValues, setDefaultValues] = React.useState<
    SupplierForm | undefined
  >(editValues || undefined);

  const form = useForm<SupplierForm>({
    resolver: zodResolver(SupplierFormSchema),
    defaultValues,
    mode: 'onChange',
  });
  async function onSubmit(data: z.infer<typeof SupplierFormSchema>) {
    let status;

    if (editValues) {
      await editSupplier.mutateAsync({
        _id: editValues?._id,
        ...data,
      });
      status = editSupplier.status;
    } else {
      await createSupplier.mutateAsync({
        ...data,
      });

      status = createSupplier.status;
    }
    if (status === 'success') {
      setDefaultValues(undefined);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 ">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Save Supplier
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={() => {
                form.reset({});
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
              disabled={createSupplier.isPending}
              className="h-8 gap-1"
            >
              <Save className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                {t(
                  editValues ? 'supplier_edit_button' : 'supplier_save_button',
                )}
              </span>
            </Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle> {t('supplier_general_information_label')}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('supplier_company_name_label')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="supplierCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('supplier_code_label')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('supplier_tax_number_label')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="representative"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('supplier_representative_label')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('supplier_phone_label')}</FormLabel>
                    <FormControl>
                      <PhoneInput
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                        defaultCountry="TN"
                        placeholder="Enter a phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('supplier_email_label')}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                        placeholder="Enter Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('supplier_address_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={
                        createSupplier?.isPending || editSupplier?.isPending
                      }
                    />
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
                  <FormLabel>{t('supplier_description_label')}</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={
                        createSupplier?.isPending || editSupplier?.isPending
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('supplier_bank_info_label_optional')}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name={'banque._rib'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('supplier_bank_rib_label')}</FormLabel>
                    <FormControl>
                      <Input
                        id="rib"
                        {...field}
                        placeholder={t('supplier_bank_rib_placeholder')}
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'banque._iban'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('supplier_bank_iban_label')}</FormLabel>
                    <FormControl>
                      <Input
                        id="iban"
                        {...field}
                        placeholder={t('supplier_bank_iban_placeholder')}
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'banque._bic'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('supplier_bank_bic_label')}</FormLabel>
                    <FormControl>
                      <Input
                        id="bic"
                        {...field}
                        placeholder={t('supplier_bank_bic_placeholder')}
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={'banque._representative'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t('supplier_bank_representative_label')}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="representative"
                        {...field}
                        placeholder={t(
                          'supplier_bank_representative_placeholder',
                        )}
                        disabled={
                          createSupplier?.isPending || editSupplier?.isPending
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="banque._agency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('supplier_bank_agency_label')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="agency"
                      placeholder={t('supplier_bank_agency_placeholder')}
                      disabled={
                        createSupplier?.isPending || editSupplier?.isPending
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="grid gap-4">
          <div className="grid gap-6">
            <Divider orientation="left"></Divider>
          </div>
        </div>
      </form>
    </Form>
  );
}
