import React from "react";

export function SmallTypography({children}: {children: string | React.ReactNode}) {
    return (
      <small className="text-sm font-medium leading-none dark:text-white text-black">{children}</small>
    )
  }