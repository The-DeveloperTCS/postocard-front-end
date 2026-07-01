/**
 * Match a display title (e.g. "Wedding Card") to a product from the API list.
 */
export const getProductId = (product) =>
  product?.id ?? product?.ID ?? product?.product_id ?? null;

export const getProductIdByTitle = (title, allProduct) => {
  if (!allProduct?.length || !title) return null;

  const normalized = title
    .toLowerCase()
    .replace(/\s*card\s*/gi, "")
    .trim();

  const match = allProduct.find((product) => {
    const name = product?.ProductName?.toLowerCase() || "";
    return name.includes(normalized) || normalized.includes(name);
  });

  return match ? getProductId(match) : null;
};

export const getProductDetailPath = (title, allProduct, fallbackIndex = 0) => {
  if (!allProduct?.length) return null;

  const id =
    getProductIdByTitle(title, allProduct) ??
    getProductId(allProduct[fallbackIndex % allProduct.length]);

  return id ? `/product/${id}` : null;
};
