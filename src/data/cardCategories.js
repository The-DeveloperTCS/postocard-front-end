import weddingImg from "../Assets/images/Wedding Card2.png";
import birthdayImg from "../Assets/images/Birthday Card.png";
import christmasImg from "../Assets/images/christmas Card.png";
import valentineImg from "../Assets/images/Occasions.png";
import anniversaryImg from "../Assets/images/Wedding Card.png";
import engagementImg from "../Assets/images/newbdc.png";
import partyImg from "../Assets/images/HappyBirthday.png";
import bestWishesImg from "../Assets/images/Occasions.png";

export const CARD_CATEGORIES = [
  {
    slug: "wedding",
    name: "Wedding Card",
    image: weddingImg,
    imageClass: "",
    price: 20,
    originalPrice: 30,
    keywords: ["wedding"],
  },
  {
    slug: "birthday",
    name: "Birthday Card",
    image: birthdayImg,
    imageClass: "carousel4-img-photo",
    price: 20,
    originalPrice: 30,
    keywords: ["birthday"],
  },
  {
    slug: "christmas",
    name: "Christmas Card",
    image: christmasImg,
    imageClass: "slide1-img-tilted",
    price: 20,
    originalPrice: 30,
    keywords: ["christmas", "christamas"],
  },
  {
    slug: "valentine",
    name: "Valentine Card",
    image: valentineImg,
    imageClass: "",
    price: 20,
    originalPrice: 30,
    keywords: ["valentine"],
  },
  {
    slug: "anniversary",
    name: "Anniversary Card",
    image: anniversaryImg,
    imageClass: "",
    price: 20,
    originalPrice: 30,
    keywords: ["anniversary"],
  },
  {
    slug: "engagement",
    name: "Engagment Card",
    image: engagementImg,
    imageClass: "carousel4-img-photo",
    price: 20,
    originalPrice: 30,
    keywords: ["engagement", "engagment"],
  },
  {
    slug: "party",
    name: "Party Card",
    image: partyImg,
    imageClass: "",
    price: 20,
    originalPrice: 30,
    keywords: ["party"],
  },
  {
    slug: "best-wishes",
    name: "Best Wishes Card",
    image: bestWishesImg,
    imageClass: "",
    price: 20,
    originalPrice: 30,
    keywords: ["best wishes", "bestwishes"],
  },
];

export const getCategoryBySlug = (slug) =>
  CARD_CATEGORIES.find(
    (category) => category.slug === String(slug || "").toLowerCase()
  );
