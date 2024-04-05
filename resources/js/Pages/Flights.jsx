import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function Flights({ flights }) {
    const { data, setData, post } = useForm({
        diparture: "",
        arrival: "",
    });
    const { flash, errors } = usePage().props;
    const handleSearch = (e) => {
        e.preventDefault();
        post(route("flight.search"));
    };
    console.log(flash.FlightsListMessage);
    return (
        <MainLayout>
            <Head title="Flights" />
            {flash.FlightsListMessage && (
                <div>
                    {flash.FlightsListMessage.status == "success" ? (
                        <div className="text-lime-800">
                            {flash.FlightsListMessage.message}
                        </div>
                    ) : (
                        <div className="text-red-800">
                            {flash.FlightsListMessage.message}
                        </div>
                    )}
                </div>
            )}
            <p>Flights</p>
            <form onSubmit={handleSearch}>
                <div className="flex justify-center items-center mb-5">
                    <InputLabel className="text-xl mr-5">
                        Depart city :
                    </InputLabel>
                    <TextInput
                        min={1}
                        type="text"
                        name="diparture"
                        value={data.diparture}
                        className="m-1 "
                        onChange={(e) => setData("diparture", e.target.value)}
                    />
                    {errors.diparture && (
                        <div className="text-red-600">{errors.diparture} </div>
                    )}
                    <InputLabel className="text-xl mr-5">
                        arrival city :
                    </InputLabel>
                    <TextInput
                        min={1}
                        type="text"
                        name="arrival"
                        value={data.arrival}
                        className="m-1 "
                        onChange={(e) => setData("arrival", e.target.value)}
                    />
                    {errors.arrival && (
                        <div className="text-red-600">{errors.arrival} </div>
                    )}
                </div>
                <PrimaryButton className="w-full justify-center">
                    Book
                </PrimaryButton>
            </form>
            {flights.length > 0 ? (
                flights.map((item) => (
                    <>
                        <Link
                            href={route("flights.details", item.id)}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            flight #{item.id} / {item.default_price}
                        </Link>
                        <br />
                    </>
                ))
            ) : (
                <div>
                    <p>No flights available, Search for one</p>
                </div>
            )}
        </MainLayout>
    );
}
