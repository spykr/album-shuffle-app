import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Loader } from "components/ui";

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
  return (
    <>
      {loading && <Loader {...loaderProps} />}
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
