import React, { useState, useEffect } from "react";

import Styled from "./Image.styles";
import { Loader } from "@/components/ui";

const LOADER_DELAY_MS = 200;

const Image = ({ className, alt, src, loaderProps = {} }) => {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  // Delay showing loader
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, LOADER_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && showLoader && <Loader {...loaderProps} />}
      <Styled.Image
        className={className}
        failedLoading={failed}
        loadingImage={loading}
        alt={alt}
        src={src}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setFailed(true);
        }}
      />
    </>
  );
};

export default Image;
