import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage, Link } from "@inertiajs/react";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

export default function Hotels({ hotels }) {
    const { data, setData, post } = useForm({
        name: "",
        adresse: "",
        rating: "",
        descreption: "",
        default_price: "",
        assets: [],
    });

    const { flash, errors } = usePage().props;

    const handleChange = (file) => {
        setData("assets", file);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("hotel.store"));
    };

    return (
        <div>
            {errors.assets && (
                <div className="text-red-600">{errors.assets}</div>
            )}
            <p>Manage Hotels</p>
            {flash?.message && (
                <div className="text-lime-800">{flash.message.message}</div>
            )}
            {hotels.map((item) => (
                <>
                    <Link
                        key={item.id}
                        href={route("hotel.edit", item.id)}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Hotel #{item.id} / {item.name}
                    </Link>
                    {item.assets.map((image) => (
                        <img className=" max-w-[100px]" src={image.image} />
                    ))}

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
                </div>
                <PrimaryButton className="w-full justify-center">
                    Add Hotel
                </PrimaryButton>
            </form>
        </div>
    );
}
