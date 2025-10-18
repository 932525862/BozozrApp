import React from "react";
import { Button } from "antd";
import { FiSettings, FiTrash2, FiShoppingCart } from "react-icons/fi";


const ProductCard= ({ product, onDelete }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-16 h-16 object-contain mb-2" />
      <h3 className="text-sm font-medium text-gray-800 truncate w-full">{product.name}</h3>
      <p className="text-cyan-600 text-sm mb-3">{product.quantity}</p>

      <div className="flex justify-between w-full gap-2">
        <Button
          onClick={onDelete}
          icon={<FiTrash2 />}
          className="flex-1 rounded-xl border-gray-300 hover:border-red-500 hover:text-red-500"
        >
          O‘chirish
        </Button>

        <Button
          type="primary"
          icon={<FiShoppingCart />}
          className="flex-1 rounded-xl bg-cyan-500 hover:bg-cyan-600"
        >
          Sotib olish
        </Button>
      </div>

      <button className="absolute top-3 right-3 text-gray-500 hover:text-cyan-600">
        <FiSettings />
      </button>
    </div>
  );
};

export default ProductCard;
