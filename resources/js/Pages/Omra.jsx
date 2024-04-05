import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Container from "@/Components/Container";
import Carosel from "@/Components/MyComponents/Carosel";
import Card from "@/Components/MyComponents/HotelScreenComponents/Card";

export default function Omra({ omras }) {
    return (
        <MainLayout>
            <Head title="omras" />
            <Carosel data={omras} />
            <Container className="flex flex-col py-10 bg-gray-100">
                {omras.length > 0 ? (
                    <>
                        <div className="flex flex-wrap justify-center">
                            {omras.map((item) => (
                                <Card item={item} key={item.id} />
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="text-l md:text-xl lg:text-3xl text-black font-bold inter-var text-center  mb-10">
                        There's no omras to show yet !
                    </p>
                )}
            </Container>{" "}
        </MainLayout>
    );
}
