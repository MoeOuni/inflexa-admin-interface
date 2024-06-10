import React from "react";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { PhoneInput } from "../app/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useCreateSupplier, useEditSupplier } from "@/api";
import { Supplier } from "@/lib/types";
import { Divider } from "antd";

const SupplierFormSchema = z.object({
  supplierCode: z.string().min(1, "Supplier code is required"),
  email: z.string().email("Invalid email address").optional(),
  companyName: z.string().min(1, "Company name is required"),
  taxNumber: z.string().min(1, "Tax Number is required"),
  representative: z.string().optional(),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" })
    .optional(),
  address: z.string().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
  proficPic: z.string().optional(),
  banque: z
    .object({
      _rib: z.string().optional(),
      _iban: z.string().optional(),
      _bic: z.string().optional(),
      _representative: z.string().optional(),
      _agency: z.string().optional(),
    })
    .optional(),
});

type SupplierForm = z.infer<typeof SupplierFormSchema>;

type Props = {
  editValues?: Supplier;
};

export default function SupplierForm({ editValues }: Props) {
  const createSupplier = useCreateSupplier();
  const editSupplier = useEditSupplier({ status: "ACTIVE" });

  const { t } = useTranslation();
  const [defaultValues, setDefaultValues] = React.useState<
    SupplierForm | undefined
  >(editValues || undefined);

  const form = useForm<SupplierForm>({
    resolver: zodResolver(SupplierFormSchema),
    defaultValues,
    mode: "onChange",
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
    if (status === "success") {
      setDefaultValues(undefined);
      form.reset();
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 p-4 rounded-md border bg-muted/40"
      >
        <Divider orientation="left">
          {t("supplier_general_information_label")}
        </Divider>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("supplier_company_name_label")}</FormLabel>
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
                <FormLabel>{t("supplier_code_label")}</FormLabel>
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
                <FormLabel>{t("supplier_tax_number_label")}</FormLabel>
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
                <FormLabel>{t("supplier_representative_label")}</FormLabel>
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
                <FormLabel>{t("supplier_phone_label")}</FormLabel>
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
                <FormLabel>{t("supplier_email_label")}</FormLabel>
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
              <FormLabel>{t("supplier_address_label")}</FormLabel>
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
              <FormLabel>{t("supplier_description_label")}</FormLabel>
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

        <div className="grid gap-4">
          <div className="grid gap-6">
            <Divider orientation="left">
              {t("supplier_bank_info_label_optional")}
            </Divider>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name={"banque._rib"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("supplier_bank_rib_label")}</FormLabel>
                    <FormControl>
                      <Input
                        id="rib"
                        {...field}
                        placeholder={t("supplier_bank_rib_placeholder")}
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
                name={"banque._iban"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("supplier_bank_iban_label")}</FormLabel>
                    <FormControl>
                      <Input
                        id="iban"
                        {...field}
                        placeholder={t("supplier_bank_iban_placeholder")}
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
                name={"banque._bic"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("supplier_bank_bic_label")}</FormLabel>
                    <FormControl>
                      <Input
                        id="bic"
                        {...field}
                        placeholder={t("supplier_bank_bic_placeholder")}
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
                name={"banque._representative"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("supplier_bank_representative_label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="representative"
                        {...field}
                        placeholder={t(
                          "supplier_bank_representative_placeholder"
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
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="banque._agency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("supplier_bank_agency_label")}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        id="agency"
                        placeholder={t("supplier_bank_agency_placeholder")}
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
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">
            {t(editValues ? "supplier_edit_button" : "supplier_save_button")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
