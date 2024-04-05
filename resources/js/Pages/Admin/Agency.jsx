import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Agency({ cordinates, url }) {
    const { flash, errors } = usePage().props;
    const { data, setData, post } = useForm({
        id: cordinates?.id,
        name: cordinates?.name,
        descreption: cordinates?.descreption,
        adresse: cordinates?.adresse,
        phone: cordinates?.phone,
        email: cordinates?.email,
        localisation: cordinates?.localisation,
        logo: "",
    });
    const update = () => {
        post(route("agency.update"));
    };
    const create = () => {
        post(route("agency.store"));
    };
    console.log(cordinates);

    return (
        <div>
            <p>Agency </p>
            <form encType="multipart/form-data">
                <InputLabel
                    className="text-xl mr-5"
                    htmlFor="name"
                    value={"name :"}
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
                    <div className="text-red-600">{errors.name}</div>
                )}
                <InputLabel
                    className="text-xl mr-5"
                    htmlFor="descreption"
                    value={"descreption :"}
                />
                <TextInput
                    id="descreption"
                    type="text"
                    name="descreption"
                    value={data.descreption}
                    className="m-1 "
                    onChange={(e) => setData("descreption", e.target.value)}
                />
                {errors.descreption && (
                    <div className="text-red-600">{errors.descreption}</div>
                )}
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
                <InputLabel
                    className="text-xl mr-5"
                    htmlFor="localisation"
                    value={"localisation :"}
                />
                <TextInput
                    id="localisation"
                    type="text"
                    name="localisation"
                    value={data.localisation}
                    className="m-1 "
                    onChange={(e) => setData("localisation", e.target.value)}
                />
                {errors.localisation && (
                    <div className="text-red-600">{errors.localisation}</div>
                )}
                <InputLabel
                    className="text-xl mr-5"
                    htmlFor="phone"
                    value={"phone :"}
                />
                <TextInput
                    id="phone"
                    type="text"
                    name="phone"
                    value={data.phone}
                    className="m-1 "
                    onChange={(e) => setData("phone", e.target.value)}
                />
                {errors.phone && (
                    <div className="text-red-600">{errors.phone}</div>
                )}
                <InputLabel
                    className="text-xl mr-5"
                    htmlFor="email"
                    value={"email :"}
                />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="m-1 "
                    onChange={(e) => setData("email", e.target.value)}
                />
                {errors.email && (
                    <div className="text-red-600">{errors.email}</div>
                )}
                <InputLabel
                    className="text-xl mr-5"
                    htmlFor="logo"
                    value={"logo :"}
                />
                <TextInput
                    id="logo"
                    type="file"
                    name="logo"
                    // value={data.logo}
                    className="m-1 "
                    onChange={(e) => setData("logo", e.target.files[0])}
                />
                {errors.logo && (
                    <div className="text-red-600">{errors.logo}</div>
                )}
                <img className=" max-w-[100px]" src={url} />
            </form>
            {cordinates ? (
                <PrimaryButton onClick={() => update()}>update</PrimaryButton>
            ) : (
                <PrimaryButton onClick={() => create()}>
                    Create Agency Cordinates
                </PrimaryButton>
            )}
            <SecondaryButton>
                <Link
                    href={route("faq.index")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                    Manage FAQ
                </Link>
            </SecondaryButton>
            <SecondaryButton>
                <Link
                    href={route("conditions.index")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                    Manage General conditions
                </Link>
            </SecondaryButton>
        </div>
    );
}
