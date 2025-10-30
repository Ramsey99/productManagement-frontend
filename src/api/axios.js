import axios from "axios";
const API_URL = import.meta.env.VITE_API_BASE || "https://productmanagement-backend-fsw6.onrender.com/api";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// category axios
export const getCategories = async () => {
  try {
    const res = await instance.get("/categories");
    return res.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    throw error;
  }
};

export const addCategory = async (data) => {
  try {
    const res = await instance.post("/categories/add", data);
    return res.data;
  } catch (error) {
    console.error("Error adding category", error);
    throw error;
  }
};

export const updateCategory = async (id, data) => {
  try {
    const res = await instance.patch(`/categories/update/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating category", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await instance.delete(`/categories/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting category", error);
    throw error;
  }
};

//subcategory axios
export const getSubCategories = async () => {
  try {
    const res = await instance.get("/subcategories");
    return res.data;
  } catch (error) {
    console.error("Error fetching subcategories", error);
    throw error;
  }
};

export const addSubCategory = async (data) => {
  try {
    const res = await instance.post("/subcategories/add", data);
    return res.data;
  } catch (error) {
    console.error("Error adding subcategory", error);
    throw error;
  }
};

export const updateSubCategory = async (id, data) => {
  try {
    const res = await instance.patch(`/subcategories/update/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating subcategory", error);
    throw error;
  }
};

export const deleteSubCategory = async (id) => {
  try {
    const res = await instance.delete(`/subcategories/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting subcategory", error);
    throw error;
  }
};

// product axios
export const getProducts = async ({
  page = 1,
  limit = 50,
  search = "",
  categoryId = "",
  subCategoryId = "",
}) => {
  try {
    const params = { page, limit };
    if (search) params.search = search;
    if (categoryId) params.categoryId = categoryId;
    if (subCategoryId) params.subCategoryId = subCategoryId;

    const res = await instance.get("/products", { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error;
  }
};

export const addProduct = async (formData) => {
  try {
    const res = await instance.post("/products/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding product", error);
    throw error;
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const res = (await instance.patch(`/products/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })).data;
    return res.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const res = await instance.delete(`/products/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};
