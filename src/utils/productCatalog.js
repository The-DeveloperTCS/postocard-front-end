import { CARD_CATEGORIES, getCategoryBySlug } from "../data/cardCategories";
import { getProductId } from "./productLink";

const catalogProduct = (category, index) => ({
  id: `catalog-${category.slug}`,
  ProductName: category.name,
  Price: category.price,
  Discount: Math.max(category.originalPrice - category.price, 0),
  File1: category.image,
  _isCatalog: true,
  _categorySlug: category.slug,
  _fallbackIndex: index,
  _imageClass: category.imageClass || "",
});

export const productMatchesCategory = (product, category) => {
  if (!product || !category) return false;

  const name = (product.ProductName || "").toLowerCase();
  const subCategory =
    product?.sub_category_details?.SubCategoryName?.toLowerCase() || "";
  const parentCategory =
    product?.sub_category_details?.category_details?.CategoryName?.toLowerCase() ||
    "";

  return category.keywords.some(
    (keyword) =>
      name.includes(keyword) ||
      subCategory.includes(keyword) ||
      parentCategory.includes(keyword)
  );
};

export const mergeCatalogWithApi = (apiProducts = []) => {
  const products = [];
  const usedApiIds = new Set();

  CARD_CATEGORIES.forEach((category, index) => {
    const matches = apiProducts.filter(
      (product) =>
        productMatchesCategory(product, category) &&
        !usedApiIds.has(getProductId(product))
    );

    if (matches.length > 0) {
      matches.forEach((product) => {
        const id = getProductId(product);
        usedApiIds.add(id);
        products.push({
          ...product,
          _categorySlug: category.slug,
          _fallbackIndex: index,
          _imageClass: category.imageClass || "",
        });
      });
      return;
    }

    products.push(catalogProduct(category, index));
  });

  apiProducts.forEach((product) => {
    const id = getProductId(product);
    if (!usedApiIds.has(id)) {
      products.push({
        ...product,
        _fallbackIndex: products.length,
        _imageClass: "",
      });
    }
  });

  return products;
};

export const filterProductsBySearch = (products, search) => {
  if (!products?.length) return [];

  const term = String(search || "all").toLowerCase();

  if (term === "all") {
    return products;
  }

  const category = getCategoryBySlug(term);

  if (category) {
    return products.filter(
      (product) =>
        product._categorySlug === category.slug ||
        productMatchesCategory(product, category)
    );
  }

  return products.filter((product) =>
    product.ProductName?.toLowerCase().includes(term)
  );
};

export const getCategoryCollectionPath = (slug) =>
  slug === "all" ? "/allcollection/all" : `/allcollection/${slug}`;
