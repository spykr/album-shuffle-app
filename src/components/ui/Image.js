import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { Loader } from "components/ui";

const LOADER_DELAY_MS = 200;

const StyledImage = styled.img`
  height: 100%;
  width: 100%;

  ${p =>
    (p.loading || p.failed) &&
    css`
      opacity: 0;
    `}
`;

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
      <StyledImage
        className={className}
        failed={failed}
        loading={loading}
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
