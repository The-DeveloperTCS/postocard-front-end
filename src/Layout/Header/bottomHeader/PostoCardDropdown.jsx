import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../Styles/PostoCardDropdown.css";

const YourComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(-1);

  const handleHover = (index) => {
    setHoveredOption(index);
  };

  const handleLeave = () => {
    setHoveredOption(-1);
  };

  const handleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="Header-dropdown-main">
      <div className={`bottom_bottom_header_menus_parent`}>
        <p className="cursor-pointer" onClick={() => handleOpen(0)}>
          Holidays
        </p>
        <IoIosArrowDown
          className="cursor-pointer"
          onClick={() => handleOpen(0)}
        />
        {openIndex === 0 && (
          <div className="menus flex-wrap bigger-dropdown">
            <ul style={{ color: "#30404D" }}>
              <li
                onMouseEnter={() => handleHover(0)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font"> Father's Day</p>
                {hoveredOption === 0 && (
                  <ul>
                    <li>Subcategory 1</li>
                  </ul>
                )}
              </li>
              {/* Other options and subcategories */}
              <li
                onMouseEnter={() => handleHover(1)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font"> Mother's Day</p>
                {hoveredOption === 1 && (
                  <ul>
                    <li>Subcategory 1</li>
                    <li>Subcategory 2</li>
                  </ul>
                )}
              </li>
              {/* Other options and subcategories */}
              <li
                onMouseEnter={() => handleHover(2)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font"> Valentine's Day</p>
                {hoveredOption === 2 && (
                  <ul>
                    <li>Subcategory 1</li>
                    <li>Subcategory 2</li>
                    <li>Subcategory 3</li>
                  </ul>
                )}
              </li>
              {/* Other options and subcategories */}
              {/* <li
                onMouseEnter={() => handleHover(3)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font"> Option 4</p>
                {hoveredOption === 3 && (
                  <ul>
                    <li>Subcategory 1</li>
                    <li>Subcategory 2</li>
                  </ul>
                )}
              </li> */}
            </ul>
          </div>
        )}
      </div>

      <div className={`bottom_bottom_header_menus_parent`}>
        <p className="cursor-pointer" onClick={() => handleOpen(1)}>
          OCCASIONS
        </p>
        <IoIosArrowDown
          className="cursor-pointer"
          onClick={() => handleOpen(1)}
        />
        {openIndex === 1 && (
          <div className="menus flex-wrap bigger-dropdown">
            <ul>
              <li
                onMouseEnter={() => handleHover(0)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font">Wedding Card</p>

                {hoveredOption === 0 && (
                  <ul>
                    <li>Subcategory 1</li>
                    <li>Subcategory 2</li>
                  </ul>
                )}
              </li>
              {/* Other options and subcategories */}
              {/* Other options and subcategories */}
              <li
                onMouseEnter={() => handleHover(1)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font"> Birthday Card</p>{" "}
                {hoveredOption === 1 && (
                  <ul>
                    <li>Subcategory 1</li>
                    <li>Subcategory 2</li>
                  </ul>
                )}
              </li>
              {/* Other options and subcategories */}
              <li
                onMouseEnter={() => handleHover(2)}
                onMouseLeave={handleLeave}
              >
                <p className="for-options-font"> christmas Card</p>{" "}
                {hoveredOption === 2 && (
                  <ul>
                    <li>Subcategory 1</li>
                    <li>Subcategory 2</li>
                  </ul>
                )}
              </li>
              {/* Other options and subcategories */}
              {/* <li
                onMouseEnter={() => handleHover(3)}
                onMouseLeave={handleLeave}
              >
                Option 4
                {hoveredOption === 3 && (
                  <ul>
                    <li>Subcategory 1</li>
                    <li>Subcategory 2</li>
                  </ul>
                )}
              </li> */}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default YourComponent;
