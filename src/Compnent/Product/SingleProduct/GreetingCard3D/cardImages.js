import christmasImg from "../../../../Assets/images/christmas Card.png";
import weddingImg from "../../../../Assets/images/Wedding Card2.png";
import birthdayImg from "../../../../Assets/images/Birthday Card.png";

/** Polished demo textures — used until product images load */
export const SHOWCASE_CARD = {
  cover: christmasImg,
  insideLeft: christmasImg,
  insideRight: christmasImg,
};

export const resolveCardImages = (product) => {
  const cover = product?.File1 || SHOWCASE_CARD.cover;
  const insideLeft = product?.File2 || cover;
  const insideRight = product?.File3 || product?.File2 || cover;

  return { cover, insideLeft, insideRight };
};

export const getShowcaseImageForName = (name = "") => {
  const n = name.toLowerCase();
  if (n.includes("wedding") || n.includes("anniversary")) {
    return { cover: weddingImg, insideLeft: weddingImg, insideRight: weddingImg };
  }
  if (n.includes("birthday") || n.includes("party")) {
    return { cover: birthdayImg, insideLeft: birthdayImg, insideRight: birthdayImg };
  }
  return SHOWCASE_CARD;
};
