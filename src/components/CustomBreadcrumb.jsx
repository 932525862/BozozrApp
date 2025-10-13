import React from "react";
import { Link } from "react-router-dom";

const CustomBreadcrumb = ({ items = [] }) => {
  return (
    <div className="flex items-center gap-2 text-[16px]">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-[#E0E0E0]">/</span>}

          {item.to ? (
            <Link to={item.to} className="text-[#4B4B4B]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1E1E1E]">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomBreadcrumb;
