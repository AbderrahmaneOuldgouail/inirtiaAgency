import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";

export default function Contact() {
    const { data, setData, post } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        content: "",
    });
    const { flash, errors } = usePage().props;
    const submit = (e) => {
        e.preventDefault();
        post(route("message.send"));
    };
    return (
        <MainLayout>
            <Head title="Contact" />

            <div>Omra</div>
            <p>Contact</p>
            {errors && (
                <div>
                    {Object.entries(errors).map(([key, value]) => (
                        <div className="text-red-600" key={key}>
                            {value}
                        </div>
                    ))}
                </div>
            )}
            {flash.message && (
                <div>
                    {flash.message.statu == "success" ? (
                        <div className="text-lime-800">
                            {flash.message.message}
                        </div>
                    ) : (
                        <div className="text-red-800">
                            {flash.message.message}
                        </div>
                    )}
                </div>
            )}
            <form onSubmit={submit} className="w-300">
                <InputLabel htmlFor="first_name" value="first_name" />
                <TextInput
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={data.first_name}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData("first_name", e.target.value)}
                />
                <InputLabel htmlFor="last_name" value="last_name" />
                <TextInput
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={data.last_name}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    isFocused={true}
                    onChange={(e) => setData("last_name", e.target.value)}
                />

                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    autoComplete="email"
                    isFocused={true}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputLabel htmlFor="subject" value="subject" />
                <TextInput
                    id="subject"
                    type="text"
                    name="subject"
                    value={data.subject}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("subject", e.target.value)}
                />

                <InputLabel htmlFor="content" value="content" />
                <TextInput
                    id="content"
                    type="text"
                    name="content"
                    value={data.content}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData("content", e.target.value)}
                />
                <PrimaryButton>Send</PrimaryButton>
            </form>
        </MainLayout>
    );
}
