import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage, Link } from "@inertiajs/react";
import React from "react";

export default function Flights({ flights, classes }) {
    const { data, setData, post } = useForm({
        diparture: "",
        arrival: "",
        class: "",
        default_price: "",
    });
    const { flash, errors } = usePage().props;
    const submit = (e) => {
        e.preventDefault();
        post(route("flight.store"));
    };
    return (
        <div>
            <p>Manage Hotels</p>
            {flights.map((item) => (
                <>
                    <Link
                        key={item.id}
                        href={route("flight.edit", item.id)}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Flight #{item.id} / {item.name}
                    </Link>
                    <br />
                </>
            ))}
            {flash?.message && (
                <div className="text-lime-800">{flash.message.message}</div>
            )}
            <form onSubmit={submit}>
                <div className="flex flex-col justify-center items-center mb-5">
                    <div className="flex flex-row justify-center items-center">
                        <InputLabel
                            className="text-xl mr-5"
                            htmlFor="diparture"
                            value={"diparture :"}
                        />
                        <TextInput
                            id="diparture"
                            type="text"
                            name="diparture"
                            value={data.diparture}
                            className="m-1 "
                            onChange={(e) =>
                                setData("diparture", e.target.value)
                            }
                        />
                        {errors.diparture && (
                            <div className="text-red-600">
                                {errors.diparture}{" "}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <InputLabel
                            className="text-xl mr-5"
                            htmlFor="arrival"
                            value={"arrival :"}
                        />
                        <TextInput
                            id="arrival"
                            type="text"
                            name="arrival"
                            value={data.arrival}
                            className="m-1 "
                            onChange={(e) => setData("arrival", e.target.value)}
                        />
                        {errors.arrival && (
                            <div className="text-red-600">
                                {errors.arrival}{" "}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <InputLabel
                            className="text-xl mr-5"
                            htmlFor="default_price"
                            value={"default price :"}
                        />
                        <TextInput
                            id="default_price"
                            type="text"
                            name="default_price"
                            value={data.default_price}
                            className="m-1 "
                            onChange={(e) =>
                                setData("default_price", e.target.value)
                            }
                        />
                        {errors.default_price && (
                            <div className="text-red-600">
                                {errors.default_price}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <InputLabel
                            className="text-xl mr-5"
                            value={"Class :"}
                        />
                        {classes.map((item) => (
                            <>
                                <TextInput
                                    id={item}
                                    type="radio"
                                    name="class"
                                    value={item}
                                    className="m-1 ml-5"
                                    onChange={(e) =>
                                        setData("class", e.target.value)
                                    }
                                />
                                <InputLabel
                                    htmlFor={item}
                                    value={item}
                                    className="inline ml-2"
                                />
                            </>
                        ))}
                        {errors.class && (
                            <div className="text-red-600">{errors.class}</div>
                        )}{" "}
                    </div>
                </div>
                <PrimaryButton className="w-full justify-center">
                    Add Hotel
                </PrimaryButton>
            </form>
        </div>
    );
}
