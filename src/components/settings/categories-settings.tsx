import React from "react";
import { CategoriesTable } from "../data-tables/categories-table";
import { CategoryForm } from "../forms/category-form";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { SquarePlus } from "lucide-react";
import BackButton from "../app/back-button";
import { useCategores } from "@/api";
import { Category } from "@/lib/types";
import { useTranslation } from "react-i18next";

const CategoriesSettings = () => {
  const { t } = useTranslation();
  const categories = useCategores();
  const [view, setView] = React.useState("table");
  const [selectedCategory, setSelectedCategory] =
    React.useState<Category | null>(null);

  const handleViewChange = () => {
    setView(view === "table" ? "form" : "table");
  };

  const handleEdit = (category?: Category) => {
    setSelectedCategory(category || null);
    if (category) setView("form");
  };

  return (
    <>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>{t("categories")}</CardTitle>
          <CardDescription>{t("categories_table_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          {view === "table" ? (
            <Button
              size={"sm"}
              className="flex gap-1 items-center"
              onClick={handleViewChange}
            >
              <SquarePlus className="h-4 w-4" /> {t("category_add_button")}
            </Button>
          ) : (
            <BackButton onClick={handleViewChange} />
          )}
          {view === "table" ? (
            <CategoriesTable
              data={categories?.data?.data ?? []}
              handleEdit={handleEdit}
              loading={categories.isLoading}
            />
          ) : (
            <CategoryForm
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default CategoriesSettings;
