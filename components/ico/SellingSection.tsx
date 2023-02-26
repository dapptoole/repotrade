import { iteratorSymbol } from "immer/dist/internal";
import Link from "next/link";
import React from "react";

const SellingSection = ({ data }: any) => {
  return (
    <section className="mt-5">
      <div className="container">
        <div className="section-title">
          <h2>{data?.launchpad_why_choose_us_text}</h2>
        </div>
        <div className="row">
          {data?.feature_list?.map((item: any, index: number) => (
            <div key={`feature{index}`} className="col-lg-3 col-md-6">
              <Link
                href={`${
                  item?.link ? item?.link : "page-details/" + item?.slug
                }`}
              >
                <a className="single-card">
                  <img
                    className="card-icon"
                    src={item.image ? item.image : "/chooseOne.svg"}
                    alt="icon"
                  />
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-content">{item.description}</p>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SellingSection;
