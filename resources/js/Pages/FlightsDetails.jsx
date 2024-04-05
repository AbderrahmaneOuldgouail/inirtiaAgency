import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React, { useState } from "react";

export default function FlightsDetails({ flight }) {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const { data, setData, post } = useForm({
        flight_id: flight.id,
        default_price: flight.default_price,
        nb_people: "",
    });
    const { flash,errors } = usePage().props;
    console.log(flash);

    const submit = (e) => {
        e.preventDefault();
        setIsModelOpen(false);
        post(route("store.flightbooking"));
    };
    return (
        <div>
            <h1 className="text-3xl">Flights Details</h1>
            <p>Departure : </p>
            <p>Arrivel : </p>
            <p>Price for Adult : </p>
            <p>Class :</p>
            {flash.message?.FlightBookingMessage && (
                <div>
                    {flash.status == "success" ? (
                        <div className="text-lime-800">
                            {flash.message.FlightBookingMessage.message}
                        </div>
                    ) : (
                        <div className="text-red-800">
                            {flash.message.FlightBookingMessage.message}
                        </div>
                    )}
                </div>
            )}
            <form onSubmit={submit}>
                <div className="flex justify-center items-center mb-5">
                    <InputLabel className="text-xl mr-5">
                        Adult number :
                    </InputLabel>
                    <TextInput
                        min={1}
                        type="number"
                        name="nb_people"
                        value={data.nb_people}
                        className="m-1 "
                        onChange={(e) => setData("nb_people", e.target.value)}
                    />
                    {errors.nb_people && (
                        <div className="text-red-600">{errors.nb_people} </div>
                    )}
                </div>
                <PrimaryButton className="w-full justify-center">
                    Book
                </PrimaryButton>
            </form>
        </div>
    );
}
