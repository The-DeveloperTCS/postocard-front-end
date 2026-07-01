import {
  CARD_CATEGORIES,
  getCategoryBySlug,
} from "../data/cardCategories";

export const CATALOG_ID_PREFIX = "catalog-";

export const isCatalogProductId = (id) =>
  String(id || "").startsWith(CATALOG_ID_PREFIX);

export const getCatalogProductId = (slug) => `${CATALOG_ID_PREFIX}${slug}`;

export const buildCatalogProduct = (category, index = 0) => ({
  id: getCatalogProductId(category.slug),
  ProductName: category.name,
  Price: category.price,
  Discount: Math.max(category.originalPrice - category.price, 0),
  File1: category.image,
  File2: category.image,
  File3: category.image,
  File4: category.image,
  _isCatalog: true,
  _categorySlug: category.slug,
  _fallbackIndex: index,
  _imageClass: category.imageClass || "",
});

export const getAllCatalogProducts = () =>
  CARD_CATEGORIES.map((category, index) => buildCatalogProduct(category, index));

export const getCatalogProductById = (id) => {
  const slug = String(id || "").replace(CATALOG_ID_PREFIX, "");
  const category = getCategoryBySlug(slug);
  if (!category) return null;

  const index = CARD_CATEGORIES.findIndex((item) => item.slug === category.slug);
  return buildCatalogProduct(category, Math.max(index, 0));
};

export const getCatalogProductByTitle = (title) => {
  if (!title) return null;

  const normalized = title
    .toLowerCase()
    .replace(/\s*card\s*/gi, "")
    .trim();

  const category = CARD_CATEGORIES.find((item) => {
    const name = item.name.toLowerCase();
    const slug = item.slug.replace("-", " ");
    return (
      name.includes(normalized) ||
      normalized.includes(name.replace(" card", "")) ||
      slug.includes(normalized)
    );
  });

  return category ? buildCatalogProduct(category) : null;
};

export const getProductDetailPathForItem = (
  title,
  productId,
  allProduct = [],
  fallbackIndex = 0
) => {
  if (productId) {
    return `/product/${productId}`;
  }

  const catalogProduct = getCatalogProductByTitle(title);
  if (catalogProduct) {
    return `/product/${catalogProduct.id}`;
  }

  if (allProduct?.length) {
    const match = allProduct[fallbackIndex % allProduct.length];
    if (match?.id) {
      return `/product/${match.id}`;
    }
  }

  const fallbackCategory = CARD_CATEGORIES[fallbackIndex % CARD_CATEGORIES.length];
  return fallbackCategory
    ? `/product/${getCatalogProductId(fallbackCategory.slug)}`
    : null;
};
