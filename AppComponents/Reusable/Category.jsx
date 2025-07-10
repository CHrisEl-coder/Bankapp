import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";
import { topCategoryStyles } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const Category = ({ category }) => {
  const { name, count, totalCount } = category;
  const percentage = ((count / totalCount) * 100).toFixed(1);
  const keys = Object.keys(topCategoryStyles);
  const matchedKey = keys.find((key) =>
    key.toLowerCase().includes(name.toLowerCase())
  );

  const style = topCategoryStyles[matchedKey] || topCategoryStyles.default;

  const {
    icon,
    progress: { bg: progressBg, indicator },
    bg,
    text: { main, count: countText },
    circleBg,
  } = style;

  return (
    <div className={cn("flex gap-4 items-center p-4", bg)}>
      <figure
        className={cn("rounded-full p-2 border border-pink-950", circleBg)}
      >
        <Image src={icon} alt="merchant logo" width={20} height={20} />
      </figure>
      <div className="w-full flex flex-col gap-2">
        <div className={cn("flex items-center justify-between")}>
          <p className={cn("text-[12px] font-medium", main)}>{name}</p>
          <p className={cn("text-[12px] font-medium ", countText)}>{count}</p>
        </div>
        <Progress
          value={Number(percentage)}
          className={cn("h-2 w-full", progressBg)}
          indicatorClassName={cn("h-2 w-full", indicator)}
        />
      </div>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    count: PropTypes.string,
    totalCount: PropTypes.string,
  }).isRequired,
};

export default Category;
