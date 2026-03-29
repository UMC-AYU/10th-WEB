import type { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#fffaf3] rounded-2xl shadow-md p-10 text-center">
      {children}
    </div>
  );
};

export default PageWrapper;
