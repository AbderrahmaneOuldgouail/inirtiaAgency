import { Link, useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

export default function Travel({ travels, type }) {
    const { data, setData, post } = useForm({
        name: "",
        description: "",
        default_price: "",
        distance: "",
        type: type,
    });
    const { errors, flash } = usePage().props;

    const handleChange = (file) => {
        setData("assets", file);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("travel.store", travels.id));
    };
    console.log(travels);
    return (
        <div>
            <p>Travel</p>
            {travels.map((item) => (
                <div key={item.id}>
                    <Link
                        href={route("travel.edit", item.id)}
                        className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Travel #{item.id} / {item.name}
                    </Link>
                 {item.assets.map((image) => (
                        <img className=" max-w-[100px]" src={image.image} />
                    ))} 
                    <br />
                </div>
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
                            htmlFor="description"
                            value={"description :"}
                        />
                        <textarea
                            id="description"
                            value={data.description}
                            name="description"
                            className="m-1 "
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            col={100}
                            rows={10}
                        ></textarea>
                        {errors.description && (
                            <div className="text-red-600">
                                {errors.description}{" "}
                            </div>
                        )}
                    </div>
                    {type == "omra" && (
                        <div className="flex flex-row justify-center items-center">
                            <InputLabel
                                className="text-xl mr-5"
                                htmlFor="distance"
                                value={"Distance :"}
                            />
                            <TextInput
                                id="distance"
                                type="number"
                                name="distance"
                                value={data.distance}
                                className="m-1 "
                                onChange={(e) =>
                                    setData("distance", e.target.value)
                                }
                            />
                            {errors.distance && (
                                <div className="text-red-600">
                                    {errors.distance}
                                </div>
                            )}
                        </div>
                    )}
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
                    {type == "omra" ? "Create Omra" : "Create Travel"}
                </PrimaryButton>
            </form>
        </div>
    );
}
