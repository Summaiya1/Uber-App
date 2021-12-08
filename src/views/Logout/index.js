import React, { useEffect } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/actions/userAction";

export default function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUser());
  }, []);
  return <View></View>;
}
