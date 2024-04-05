import InputLabel from "@/Components/InputLabel";
import CommentForm from "@/Components/MyComponents/CommentForm";
import CommentList from "@/Components/MyComponents/CommentList";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function TravelDetails({ travel, comments }) {
    const { data, setData, post } = useForm({
        travel_id: travel.id,
        default_price: travel.default_price,
        nb_people: "",
    });

    const { flash, errors } = usePage().props;
    const submit = (e) => {
        e.preventDefault();
        post(route("store.travelbooking"));
    };
    console.log(travel);
    return (
        <div>
            <p>TravelDetails</p>
            {flash.message?.TravelBookingMessage && (
                <div>{flash.message.TravelBookingMessage.message}</div>
            )}
            {errors.nb_people && (
                <div className="text-red-600">{errors.nb_people}</div>
            )}
            {travel.assets.map((item) => (
                <img className=" max-w-[100px]" src={item.image} />
            ))}
            <form onSubmit={submit}>
                <InputLabel>Adult number</InputLabel>
                <TextInput
                    min={1}
                    type="number"
                    name="nb_people"
                    value={data.nb_people}
                    className="mt-1 "
                    onChange={(e) => setData("nb_people", e.target.value)}
                />
                <PrimaryButton>book</PrimaryButton>
            </form>
            <CommentForm id={travel.id} type={"travel"} />
            <CommentList comments={comments} />
        </div>
    );
}
