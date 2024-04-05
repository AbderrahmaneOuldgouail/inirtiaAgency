import React from "react";
import { Link } from "@inertiajs/react";

import { CardBody, CardContainer, CardItem } from "@/Components/ui/Card";
import Rating from "@/Components/MyComponents/Rating";

export default function Card({ item }) {
    return (
        <CardContainer
            className="inter-var m-5 "
        >
            <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-xl  h-300 rounded-xl p-6 border  ">
                <CardItem
                    translateZ="50"
                    className="text-l font-bold text-neutral-600 dark:text-white flex items-center justify-between"
                >
                    {item.name}
                    {item.rating && 
                    <Rating rating={item.rating} />
                    }
                </CardItem>
                <CardItem
                    translateZ="60"
                    className="w-full text-neutral-500 text-sm mt-2 dark:text-neutral-300"
                >
                    <div className="truncate w-3/4">{item.descreption}</div>
                </CardItem>
                <CardItem translateZ={100} className="w-full mt-4" rotateX={10}>
                    <img
                        src={item.assets[0].image}
                        height="300"
                        width="300"
                        className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                        alt="thumbnail"
                    />
                </CardItem>
                <div className="flex justify-between items-center mt-10">
                    <CardItem
                        translateZ={60}
                        as="p"
                        target="__blank"
                        className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                    >
                        <span className="text-sm font-bold text-neutral-600 dark:text-white">
                            Price :
                        </span>
                        <span className="text-xl font-bold text-neutral-600 dark:text-white">
                            {item.default_price} DA
                        </span>
                    </CardItem>
                    <CardItem
                        translateZ={20}
                        translateX={30}
                        as="button"
                        className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                    >
                        <Link href={route("travel.details", item.id)}>
                            Book now
                        </Link>
                    </CardItem>
                </div>
            </CardBody>
        </CardContainer>
    );
}
