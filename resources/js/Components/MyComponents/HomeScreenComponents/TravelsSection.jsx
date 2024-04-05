import React from "react";
import { Link } from "@inertiajs/react";
import Container from "@/Components/Container";
import Card from "../HotelScreenComponents/Card";

export default function TravelsSection({ travels }) {
    return (
        <div className="flex flex-col py-10 bg-gray-100 dark:bg-gray-900">
            <Container>
                <p className="text-xl md:text-2xl lg:text-4xl text-black  dark:text-white font-bold inter-var text-center  mb-10">
                    Best destinations
                </p>
                {travels.length > 0 ? (
                    <>
                        <div className="flex justify-end text-neutral-500 text-sm m-2 dark:text-neutral-300">
                            <Link href={route("travel.list")}>Show All</Link>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {travels.slice(0, 3).map((item) => (
                                <Card item={item} key={item.id} />
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-l md:text-xl lg:text-3xl text-black font-bold inter-var text-center  mb-10">
                        There's no travels to show yet !
                    </p>
                )}
            </Container>
        </div>
    );
}
