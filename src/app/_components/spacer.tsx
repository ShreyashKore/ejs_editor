import React from "react";

type Props = {
  width?: number;
  height?: number;
};

export function Spacer({ width, height, ...restProps }: Props) {
  return (
    <div
      data-testid="Spacer"
      style={{ width: width, height: height }}
      {...restProps}
    />
  );
}

export default Spacer;
