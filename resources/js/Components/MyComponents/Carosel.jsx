import React from "react";
import { Carousel } from "flowbite-react";

export default function Carosel({ data }) {
    const images = [
        { url: "/static/image1.jpg", name: "carosel img" },
        { url: "/static/image2.jpg", name: "carosel img" },
        { url: "/static/image3.jpg", name: "carosel img" },
        { url: "/static/image4.jpg", name: "carosel img" },
    ];
    return (
        <div className="h-56 sm:h-64 xl:h-96 2xl:h-96">
            <Carousel slide={false}>
                {data.length > 0
                    ? data.map((item, index) => (
                          <img
                              key={index}
                              src={item.assets[0].image}
                              alt={item.assets[0].name}
                              className="object-cover "
                          />
                      ))
                    : images.map((item, index) => (
                          <img
                              key={index}
                              src={item.url}
                              alt={item.name}
                              className="object-cover "
                          />
                      ))}
            </Carousel>
        </div>
    );
}
