import React from "react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";

export default function EditFlight({ flight, classes }) {
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        id: flight.id,
        diparture: flight.diparture,
        arrival: flight.arrival,
        class: "",
        default_price: flight.default_price,
    });
    const { errors, flash } = usePage().props;
    const submit = (e) => {
        e.preventDefault();
        post(route("flight.update"));
    };
    const deleteFlight = () => {
        destroy(route(`flight.destroy`, flight.id));
    };
    return (
        <div>
            <h1>Edit Flight</h1>
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
                                    checked={
                                        (data.class == "" && item == flight.class) || data.class == item 
                                    }
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
            <PrimaryButton
                onClick={deleteFlight}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Supprimé
            </PrimaryButton>
        </div>
    );
}
