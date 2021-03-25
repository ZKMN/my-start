import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { someActionGetRequest } from "redux-base/actions";
import { ICoreLayoutProps } from "./CoreLayoutTypes";

export const CoreLayout = ({ children }: ICoreLayoutProps) => {
  const disp = useDispatch();

  useEffect(() => {
    disp(someActionGetRequest());
  })

  return <div>{children}</div> 
};

export default CoreLayout;
