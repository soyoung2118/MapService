import React, { memo } from "react";
import styled from "styled-components";

// width, height 매개변수로 받기

interface DividerProps {
  width?: string;
  height?: string;
}

const StyledDivider = styled.div<DividerProps>`
  width: ${(props) => (props.width ? props.width : "1px")};
  height: ${(props) => (props.height ? props.height : "20px")};
  opacity: 0.2;
  background: #707070;
  margin: 0 8px;
`;

function Divider({ width, height }: DividerProps) {
  return <StyledDivider width={width} height={height} />;
}

export default memo(Divider);
