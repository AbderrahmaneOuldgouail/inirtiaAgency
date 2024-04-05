import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

export default function EditTravel({ travel }) {
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        id: travel.id,
        name: travel.name,
        description: travel.description,
        default_price: travel.default_price,
        distance: travel.distance ?? "",
        type: travel.type,
        assets: [],
    });
    const { errors, flash } = usePage().props;

    const handleChange = (file) => {
        setData("assets", file);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("travel.update", travel.type));
    };
    const deleteTravel = () => {
        destroy(route(`travel.destroy`, travel.id));
    };
    return (
        <div>
            <p>EditTravel</p>
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
                    {travel.type == "omra" && (
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
                    {travel.assets.map((item) => (
                        <img
                            key={item.id}
                            className=" max-w-[100px]"
                            src={item.image}
                        />
                    ))}
                </div>
                <PrimaryButton className="w-full justify-center">
                    {travel.type == "omra" ? "Edit Omra" : "Edit Travel"}
                </PrimaryButton>
            </form>
            <PrimaryButton
                onClick={deleteTravel}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Supprimé
            </PrimaryButton>
        </div>
    );
}
