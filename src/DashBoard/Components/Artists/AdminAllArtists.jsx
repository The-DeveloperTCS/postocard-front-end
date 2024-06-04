import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getallArtist,
  artistDeleteFunc
} from "../../../Redux/Action/ArtistAction";
import "./AdminAllUsers.css";
import Loading from "../../../Layout/Loading/Loading";
import { NavLink } from 'react-router-dom';
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";

const AdminAllArtists = () => {

  const dispatch = useDispatch();
  const allArtist = useSelector((state) => state.artist.allArtist);
  const isloading = useSelector((state) => state.artist.loading);
  const [selectedItem, setSelectedItem] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    dispatch(getallArtist(""));
  }, []);

  const onDelete = (item) => {
    setShowConfirm(true)
    setSelectedItem(item)
  }

  return (
    <>
      {isloading ? (
        <Loading />
      ) : (
        <div className="bg-gray-50 min-h-screen relative">

          <SweetAlert
            showCancel
            show={showConfirm}
            confirmBtnText="Yes"
            cancelBtnText="No"
            cancelBtnBsStyle="default"
            title="Are you sure?"
            confirmBtnCssClass="sweet-alert-confirm-button"
            cancelBtnCssClass="sweet-alert-cancle-button"
            warning
            confirmBtnBsStyle="danger"
            focusCancelBtn
            onConfirm={() => {
              setShowConfirm(!showConfirm);
              dispatch(artistDeleteFunc(selectedItem))

            }}
            onCancel={() => {
              setShowConfirm(!showConfirm);
            }}
          >
            You want to delete <b> artist
            </b>
          </SweetAlert>
          <div>
            <div className="p-4">
              <div className="bg-white p-4 rounded-md">
                <NavLink to={'/admin/create/artists'}>
                  <button className='bg-[#6E6EEF] text-white py-2 px-6 rounded-[10px]'>Add Artist</button>
                </NavLink>
                <div>
                  <h2 className="mb-4 text-xl font-bold text-gray-700">
                    All Artists ({allArtist?.length})
                  </h2>
                  <div>
                    <div>
                      <div className=" admin_user_table bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-md">
                        <div>
                          <span>ID</span>
                        </div>
                        <div>
                          <span>Name</span>
                        </div>
                        <div>
                          <span>Email</span>
                        </div>

                        <div>
                          <span>Actions</span>
                        </div>
                      </div>
                      <div>
                        {allArtist?.map((item, index) => {
                          return (
                            <div
                              className=" border-t text-md font-normal mt-2 admin_user_table"
                              key={index}
                            >
                              <div className="px-2 max-w-[300px] flex place-items-center">
                                <span>{item?.id}</span>
                              </div>
                              <div className="px-2 max-w-[300px]">
                                <span>{item?.name}</span>
                              </div>
                              <div className="px-2">
                                <span>{item.email}</span>
                              </div>
                              <div className="flex gap-1 px-2">
                                <Link to={`/admin/artists/${item.id}`} >
                                  <button
                                    class="middle none center mr-4 rounded-lg bg-green-500 py-2 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                  >
                                    Edit
                                  </button>
                                </Link>
                                <button
                                  class="middle none center mr-4 rounded-lg bg-red-500 py-2 px-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                  data-ripple-light="true"
                                  onClick={() => onDelete(item)}
                                >
                                  Delete
                                </button>
                              </div>

                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAllArtists;
