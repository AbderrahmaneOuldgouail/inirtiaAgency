import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function HotelDetails({ hotel }) {
    const { data, setData, post } = useForm({
        hotel_id: hotel.id,
        default_price: hotel.default_price,
        check_in: "",
        check_out: "",
        nb_people: "",
    });
    const { flash, errors } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post(route("store.hotelbooking"));
    };

    return (
        <div>
            <p>Hotel details</p>
            {hotel.assets.map((item) => (
                <img className=" max-w-[100px]" src={item.image} />
            ))}
            {flash.message && <div>{flash.message.message}</div>}
            {errors.check_in && (
                <div className="text-red-600">{errors.check_in} </div>
            )}
            <form onSubmit={submit}>
                <InputLabel>check in</InputLabel>
                <TextInput
                    type="date"
                    name="check_in"
                    value={data.check_in}
                    className="mt-1 "
                    onChange={(e) => setData("check_in", e.target.value)}
                />
                {errors.check_out && (
                    <div className="text-red-600">{errors.check_out} </div>
                )}
                <InputLabel>check out</InputLabel>
                <TextInput
                    type="date"
                    name="check_out"
                    value={data.check_out}
                    className="mt-1 "
                    onChange={(e) => setData("check_out", e.target.value)}
                />
                {errors.nb_people && (
                    <div className="text-red-600">{errors.nb_people} </div>
                )}
                <InputLabel>Adult number</InputLabel>
                <TextInput
                    min={1}
                    type="number"
                    name="nb_people"
                    value={data.nb_people}
                    className="mt-1 "
                    onChange={(e) => setData("nb_people", e.target.value)}
                />
                <PrimaryButton className="m-2">book</PrimaryButton>
            </form>
        </div>
    );
}
