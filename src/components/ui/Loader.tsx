import React from "react";

import Styled from "./Loader.styles";

type Props = {
  backgroundColor?: string;
  borderWidth?: number;
};

const Loader = ({ backgroundColor = "", borderWidth = 5 }: Props) => {
  return (
    <Styled.Container backgroundColor={backgroundColor}>
      <Styled.Loader borderWidth={borderWidth} />
    </Styled.Container>
  );
};

export default Loader;
