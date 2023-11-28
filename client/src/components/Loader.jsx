/* eslint-disable react/prop-types */
import { Spinner } from "@nextui-org/react";

export default function Loader({ color, size }) {
  return (
    <Spinner 
      label="Loading..."
      color={color}
      size={size}
      className="flex justify-center items-center mt-80"
    />
  );
}
