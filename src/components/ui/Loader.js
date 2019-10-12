import React from "react";

import Styled from "./Loader.styles";

const Loader = ({ backgroundColor, borderWidth = 5 }) => {
  return (
    <Styled.Container backgroundColor={backgroundColor}>
      <Styled.Loader borderWidth={borderWidth} />
    </Styled.Container>
  );
};

export default Loader;
