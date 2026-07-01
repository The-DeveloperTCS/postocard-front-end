import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../../Redux/Action/ProductAction";
import "./Styles/InteractiveCardPreview.css";

const STEP_LABELS = ["Front cover", "Open inside"];

const InteractiveCardPreview = ({ content = "", displayName = "" }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleproduct = useSelector((state) => state.product.singleproduct);
  const isLoading = useSelector((state) => state.product.singleProductLoad);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setStep(0);
  }, [id, singleproduct?.id, singleproduct?.ProductName]);

  const coverImage = singleproduct?.File1;
  const insideImage = singleproduct?.File2 || singleproduct?.File3 || coverImage;
  const isOpen = step >= 1;

  const handlePrev = () => setStep((current) => Math.max(current - 1, 0));
  const handleNext = () => setStep((current) => Math.min(current + 1, 1));

  return (
    <div className="interactive-card">
      <div className="interactive-card__frame">
        <div className="interactive-card__stage">
          {isLoading && !coverImage ? (
            <div className="interactive-card__loading">Loading your card...</div>
          ) : (
            <div
              className={`interactive-card__book${isOpen ? " is-open" : ""}`}
              aria-live="polite"
            >
              <div className="interactive-card__spread">
                <div className="interactive-card__page interactive-card__page--left">
                  {insideImage ? (
                    <img src={insideImage} alt="" />
                  ) : (
                    <div className="interactive-card__page-fallback" />
                  )}
                </div>
                <div className="interactive-card__page interactive-card__page--right">
                  <div className="interactive-card__message">
                    <p>
                      {content ||
                        "Write your message on the left — it will appear inside the card."}
                    </p>
                    {displayName ? (
                      <p className="interactive-card__signature">{displayName}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="interactive-card__cover">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt={singleproduct?.ProductName || "Card cover"}
                  />
                ) : (
                  <div className="interactive-card__placeholder">
                    <span>Card preview</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="interactive-card__nav">
        <button
          type="button"
          className="interactive-card__nav-btn interactive-card__nav-btn--prev"
          onClick={handlePrev}
          disabled={step === 0}
        >
          Prev
        </button>
        <span className="interactive-card__step-label">{STEP_LABELS[step]}</span>
        <button
          type="button"
          className="interactive-card__nav-btn interactive-card__nav-btn--next"
          onClick={handleNext}
          disabled={step === 1 || !coverImage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InteractiveCardPreview;
