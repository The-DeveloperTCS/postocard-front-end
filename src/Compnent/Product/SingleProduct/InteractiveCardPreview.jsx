import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../../Redux/Action/ProductAction";
import GreetingCardScene from "./GreetingCard3D/GreetingCardScene";
import {
  getShowcaseImageForName,
  resolveCardImages,
  SHOWCASE_CARD,
} from "./GreetingCard3D/cardImages";
import "./Styles/InteractiveCardPreview.css";

const STEP_LABELS = ["Front cover", "Opening", "Inside message"];
const MAX_STEP = STEP_LABELS.length - 1;

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

  const images = useMemo(() => {
    if (singleproduct?.File1) {
      return resolveCardImages(singleproduct);
    }
    return getShowcaseImageForName(singleproduct?.ProductName) || SHOWCASE_CARD;
  }, [singleproduct]);

  const handlePrev = () => setStep((current) => Math.max(current - 1, 0));
  const handleNext = () => setStep((current) => Math.min(current + 1, MAX_STEP));

  const ready = Boolean(images.cover);

  return (
    <div className="interactive-card">
      <div className="interactive-card__frame">
        <div className="interactive-card__stage">
          {isLoading && !singleproduct?.File1 ? (
            <div className="interactive-card__loading">Loading your card...</div>
          ) : ready ? (
            <Suspense
              fallback={
                <div className="interactive-card__loading">Preparing 3D preview...</div>
              }
            >
              <GreetingCardScene
                step={step}
                images={images}
                content={content}
                displayName={displayName}
              />
            </Suspense>
          ) : (
            <div className="interactive-card__loading">Card preview unavailable</div>
          )}
        </div>
        <p className="interactive-card__hint">Drag to rotate the card</p>
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
          disabled={step === MAX_STEP || !ready}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InteractiveCardPreview;
