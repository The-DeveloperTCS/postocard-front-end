import React, { useState } from "react";
import Dropdown from 'react-multilevel-dropdown';
import { RxCross1 } from "react-icons/rx";

const BottomBottomHeader = ({ showheader, setshowheader, categories }) => {

  return (
    <div
      className={
        showheader
          ? "bottom_bottom_header mob_bottom_header"
          : "bottom_bottom_header"
      }
    >
      <RxCross1 className="cross" onClick={() => setshowheader(false)} />
      <div className="drop_down_menus">
        <div className={`bottom_bottom_header_menus_parent`}>

          {
            categories.map((pc, i) => {
              return (
                <Dropdown
                  title={pc.name}

                >
                  {pc.categories.length > 0 && pc.categories.map((c, i) => {
                    return (
                      <Dropdown.Item>
                        {c.CategoryName}
                        {c.sub_category.length > 0 && c.sub_category.map((sc, i) => {
                          return (
                            <Dropdown.Submenu>
                              {sc.SubCategoryName}
                            </Dropdown.Submenu>
                          )
                        })}
                      </Dropdown.Item>
                    )
                  })}
                </Dropdown>
              )
            })
          }

        </div>
      </div>
    </div>
  );
};

export default BottomBottomHeader;
