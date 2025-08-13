"use server";

import db from "@/lib/db";

const getCategories = async () => {
  return db.category.findMany();
};

export { getCategories };
