import styled, { css } from "styled-components";

const Image = styled.img`
  height: 100%;
  width: 100%;

  ${p =>
    (p.loadingImage || p.failedLoading) &&
    css`
      opacity: 0;
    `}
`;

export default {
  Image,
};
