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

const CategoriesSettings = () => {
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
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Used to identify your products categories and sub-categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {view === "table" ? (
            <Button
              size={"sm"}
              className="flex gap-1 items-center"
              onClick={handleViewChange}
            >
              <SquarePlus size={20} /> Add Category
            </Button>
          ) : (
            <BackButton onClick={handleViewChange} />
          )}
          {view === "table" ? (
            <CategoriesTable
              data={categories?.data?.categories ?? []}
              handleEdit={handleEdit}
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
