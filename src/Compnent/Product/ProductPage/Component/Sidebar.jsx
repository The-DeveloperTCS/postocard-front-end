import React, { useEffect, useState } from "react";
import "../Styles/Sidebar.css";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { server } from "../../../../Setting/GlobalVariable";
import Cookies from "js-cookie";

const Sidebar = ({ }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${server}/parentCategory/categoryAndChild`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookies.get("ApiLoginToken"),
        },
      });
      setCategories(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={"product_section2_sidebar_box show_filter"}
    >
      <div className="sidebar_search_bar">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search"
        />
      </div>
     
      {/* ------------------ filter by ctegory- */}
      <div className="sidebar_filter_by_category">
        <ul>
          {categories.map((pc) => {
            return (
              <li>
                {pc.name}
                {pc.categories.length > 0 && pc.categories.map((c) => {
                  return (
                    <ul>
                      <li>
                        {c.CategoryName}
                        {c.sub_category.length > 0 && c.sub_category.map((sc) => {
                          return (
                            <ul>
                              <li>
                                {sc.SubCategoryName}
                              </li>
                            </ul>
                          )
                        })}
                      </li>
                    </ul>
                  )
                })}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;