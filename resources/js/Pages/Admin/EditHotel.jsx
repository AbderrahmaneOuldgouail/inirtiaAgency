import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export default function EditHotel({ hotel}) {
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        id: hotel.id,
        name: hotel.name,
        adresse: hotel.adresse,
        rating: hotel.rating,
        descreption: hotel.descreption,
        default_price: hotel.default_price,
        assets: [],
    });
    const { errors, flash } = usePage().props;
    const handleChange = (file) => {
        setData("assets", file);
    };
    const submit = (e) => {
        e.preventDefault();
        post(route("hotel.update"));
    };
    const deleteHotel = () => {
        destroy(route(`hotel.destroy`, hotel.id));
    };

    return (
        <div>
            <h1>EditHotel</h1>

            {flash?.message && (
                <div className="text-lime-800">{flash.message.message}</div>
            )}
            <form onSubmit={submit}>
                <div className="flex flex-col justify-center items-center mb-5">
                    <div className="flex flex-row justify-center items-center">
                        <InputLabel
                            className="text-xl mr-5"
                            htmlFor="name"
                            value={"Name :"}
                        />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="m-1 "
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <div className="text-red-600">{errors.name} </div>
                        )}
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <InputLabel
                            className="text-xl mr-5"
                            htmlFor="descreption"
                            value={"Descreption :"}
                        />
                        <textarea
                            id="descreption"
                            value={data.descreption}
                            name="descreption"
                            className="m-1 "
                            onChange={(e) =>
                                setData("descreption", e.target.value)
                            }
                            col={100}
                            rows={10}
                        ></textarea>
                        {errors.descreption && (
                            <div className="text-red-600">
                                {errors.descreption}{" "}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <InputLabel
                            className="text-xl mr-5"
                            htmlFor="rating"
                            value={"Rating :"}
                        />
                        <TextInput
                            id="rating"
                            min={1}
                            max={5}
                            type="number"
                            name="rating"
                            value={data.rating}
                            className="m-1 "
                            onChange={(e) => setData("rating", e.target.value)}
                        />
                        {errors.rating && (
                            <div className="text-red-600">{errors.rating} </div>
                        )}
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <InputLabel
                            className="text-xl mr-5"
                            htmlFor="adresse"
                            value={"adresse :"}
                        />
                        <TextInput
                            id="adresse"
                            type="text"
                            name="adresse"
                            value={data.adresse}
                            className="m-1 "
                            onChange={(e) => setData("adresse", e.target.value)}
                        />
                        {errors.adresse && (
                            <div className="text-red-600">{errors.adresse}</div>
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
                            htmlFor="assets"
                            value={"assets :"}
                        />
                        <FileUploader
                            handleChange={handleChange}
                            name="file"
                            multiple={true}
                        />
                        {errors.assets && (
                            <div className="text-red-600">{errors.assets}</div>
                        )}
                    </div>
                    {hotel.assets.map((item) => (
                        <img key={item.id} className=" max-w-[100px]" src={item.image} />
                    ))}
                </div>
                <PrimaryButton className="w-full justify-center">
                    update
                </PrimaryButton>
            </form>
            <PrimaryButton
                onClick={deleteHotel}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Supprimé
            </PrimaryButton>
        </div>
    );
}
