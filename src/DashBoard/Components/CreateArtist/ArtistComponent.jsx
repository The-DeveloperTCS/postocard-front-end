import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  ArtistCreateFunc,
} from "../../../Redux/Action/ArtistAction";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";

const ArtistComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [artist, setArtist] = useState({
    name: "",
    email: ""
  });

  const createArtist = () => {
    setIsLoading(true)
    if (!artist) {
      setIsLoading(false)
      return toast.error("Please fill in the field");
    }
    dispatch(ArtistCreateFunc(artist, navigate));
  };

  return (
    <>
      <div className="flex justify-center place-items-center h-[90vh]">
        <div className="w-[650px]">
          <h2 className="text-[50px] text-center mb-3 font-semibold">
            Create Artist
          </h2>
          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Artist Name.
            </label>
            <input
              type="text"
              value={artist.name}
              onChange={(e) => setArtist({ ...artist, name: e.target.value })}
              placeholder="Enter Artist Name"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>

          <div className="w-full mb-2">
            <label htmlFor="name" className="w-full text-[19px] font-bold px-1">
              Artist Email.
            </label>
            <input
              type="email"
              value={artist.email}
              onChange={(e) => setArtist({ ...artist, email: e.target.value })}
              placeholder="Enter Artist Email"
              className="w-full border-[1px] border-[#8080803b] rounded-sm px-2 py-1 my-1 text-[17px] outline-none bg-[#8080803a]"
            />
          </div>
          <Button
            disabled={isLoading}
            onClick={createArtist}
            className="w-full px-3 py-2 bg-[#6E6EEF] text-[white] my-3 rounded-sm"
          >
            {isLoading && <Spinner as="span" animation="grow" />}
            {isLoading ? "Loading" : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ArtistComponent;