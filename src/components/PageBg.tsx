import { type ReactNode } from "react";
import funky from "../assets/funky.png";
import carpet from "../assets/carpet.png";
import balcony from "../assets/balcony.png";
import caffee from "../assets/caffee.png";
import office from "../assets/office.png";
import skopje from "../assets/skopje.png";

const images: Record<string, string> = {
  funky,
  carpet,
  balcony,
  caffee,
  office,
  skopje,
};

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
      <div className="absolute inset-0 bg-white/65" />
    </div>
    <div className="relative flex-1 flex flex-col">
      {children}
    </div>
  </div>
);

export default PageBg;
