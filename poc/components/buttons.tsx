import React from "react";
import { Icon } from "@iconify/react";
import { ComponentProps, memo } from "react";

interface ButtonPlayProps extends ComponentProps<"button"> {
  isPlaying?: boolean;
}

export const MemoizedButtonPlayPause = memo(function ButtonPlayPause({
  isPlaying,
  children,
  ...props
}: ButtonPlayProps) {
  return (
    <button type="button" {...props}>
      {children ? (
        children
      ) : (
        <Icon
          icon={
            isPlaying ? "ion:pause-circle-outline" : "ion:play-circle-outline"
          }
        />
      )}
    </button>
  );
});