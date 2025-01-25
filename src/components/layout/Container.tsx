import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mx-auto px-4 sm:px-0 max-w-screen-2xl ">{children}</div>
  );
};

export default Container;
