import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";
import { AiOutlineSearch } from "react-icons/ai";
import { CARD_CATEGORIES } from "../../../../data/cardCategories";
import { getCategoryCollectionPath } from "../../../../utils/productCatalog";

const Sidebar = ({
  search,
  setSerach,
  filterdata,
  setshowfilter,
  showfilter,
}) => {
  const handleCategoryClick = () => {
    filterdata();
    setshowfilter(false);
  };

  const isActiveCategory = (slug) => {
    const current = String(search || "all").toLowerCase();
    return current === slug;
  };

  return (
    <div
      className={
        showfilter
          ? "product_section2_sidebar_box show_filter"
          : "product_section2_sidebar_box"
      }
    >
      <h3>FILTER</h3>

      <div className="sidebar_search_bar">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search"
          value={search === "all" ? "" : search}
          onChange={(e) => setSerach(e.target.value || "all")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCategoryClick();
            }
          }}
        />
      </div>

      <div className="sidebar_filter_by_category">
        <ul>
          <li
            className={isActiveCategory("all") ? "sidebar-category-active" : ""}
          >
            <NavLink to={getCategoryCollectionPath("all")} onClick={handleCategoryClick}>
              View All
            </NavLink>
          </li>
          {CARD_CATEGORIES.map((category) => (
            <li
              key={category.slug}
              className={
                isActiveCategory(category.slug) ? "sidebar-category-active" : ""
              }
            >
              <NavLink
                to={getCategoryCollectionPath(category.slug)}
                onClick={handleCategoryClick}
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
