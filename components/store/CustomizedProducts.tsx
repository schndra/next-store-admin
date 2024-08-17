"use client";

import { ColorType, SizeType } from "@/app/_types/types";
import useCart from "@/hooks/use-cart-store";
// import { products } from "@wix/stores";
import { useEffect, useState } from "react";
// import Add from "./Add";

const CustomizeProducts = ({
  colors,
  sizes,
  productId,
}: {
  productId: string;
  colors?: ColorType[];
  sizes?: SizeType[];
}) => {
  const [selectedOption, setSelectedOption] = useState<{
    [key: string]: string;
  }>({});

  const handleSelectedOption = (optionType: string, choice: string) => {
    setSelectedOption((prev) => ({ ...prev, [optionType]: choice }));
  };

  // console.log(selectedOption);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <ul className="flex items-center gap-3">
          {colors?.map((item, _i) => (
            <li
              key={item.id}
              className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500"
              style={{
                backgroundColor: item.value,
              }}
              onClick={() => handleSelectedOption("colorId", item.id)}
            >
              {selectedOption.color === item.id && (
                <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </li>
          ))}
        </ul>
        <h4 className="font-medium">Choose a size</h4>
        <ul className="flex items-center gap-3">
          {sizes?.map((item) =>
            selectedOption.size !== item.id ? (
              <li
                key={item.id}
                className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer"
                onClick={() => handleSelectedOption("sizeId", item.id)}
              >
                {item.name}
              </li>
            ) : (
              <li
                key={item.id}
                className="ring-1 ring-lama text-white bg-lama rounded-md py-1 px-4 text-sm cursor-pointer"
              >
                {item.name}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default CustomizeProducts;
