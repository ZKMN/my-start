import React from "react";
import { ICoreLayoutProps } from "./CoreLayoutTypes";

export const CoreLayout = ({ children }: ICoreLayoutProps) => {
  return <div>{children}</div> 
};

export default CoreLayout;
