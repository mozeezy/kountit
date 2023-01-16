import React from "react";
import { HomeItems } from "../Home/HomeItems";
import "./features.css";

const Features = () => {
  return (
    <div id="features" className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="title text-center mb-4">
              <h1>Features</h1>
              <p>
                Browse through our ground-breaking features. Tracking inventory
                has never been easier!
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          {HomeItems.map((value, index) => (
            <div className="col-lg-4 md-6">
              <div className="feature p-4 shadow border-hover rounded-5 mb-4">
                <div className="icon">{value.icon}</div>
                <h5 className="mt-4"> {value.title.toLocaleUpperCase()}</h5>
                <p className="mb-3">{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
