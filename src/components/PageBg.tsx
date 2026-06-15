import { type ReactNode } from "react";

const images = {
  funky: "/assets/funky.png",
  carpet: "/assets/carpet.png",
  balcony: "/assets/balcony.png",
  caffee: "/assets/caffee.png",
  office: "/assets/office.png",
  skopje: "/assets/skopje.png",
} as const;

type PageBgProps = {
  image: keyof typeof images;
  children: ReactNode;
};

const PageBg = ({ image, children }: PageBgProps) => (
  <div className="relative flex-1 flex flex-col">
    <div className="fixed inset-0 -z-10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${images[image]})` }}
      />
      <div className="absolute inset-0 bg-white/85" />
    </div>
    <div className="relative flex-1 flex flex-col">
      {children}
    </div>
  </div>
);

export default PageBg;
