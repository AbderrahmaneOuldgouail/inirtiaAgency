import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import Container from "@/Components/Container";
import Carosel from "@/Components/MyComponents/Carosel";
import Card from "@/Components/MyComponents/HotelScreenComponents/Card";

export default function Travels({ travels }) {
    return (
        <MainLayout>
            <Head title="Travels" />
            <Carosel data={travels} />
            <Container className="flex flex-col py-10 bg-gray-100">
                {travels.length > 0 ? (
                    <>
                        <div className="flex flex-wrap justify-center">
                            {travels.map((item) => (
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
        </MainLayout>
    );
}
