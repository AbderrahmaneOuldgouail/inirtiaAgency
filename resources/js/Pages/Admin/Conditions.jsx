import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Conditions({ conditions }) {
    const { flash, errors } = usePage().props;
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        title: "",
        content: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("conditions.store"));
    };
    const deleteCondition = (id) => {
        destroy(route(`conditions.destroy`, id));
    };
    const updateCondition = () => {
      console.log('update')
        // post(route(`conditions.update`));
    };
    console.log(flash);
    return (
        <div>
            <p>Manage Conditions</p>
            {conditions.length > 0 ? (
                conditions.map((item) => (
                    <div>
                        {item.id} :{item.title} = {item.content}
                        <PrimaryButton onClick={()  => updateCondition()}>
                            Update
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={() => deleteCondition(item.id)}
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Supprimé
                        </PrimaryButton>
                    </div>
                ))
            ) : (
                <p>No Data Found!</p>
            )}
            <form onSubmit={submit}>
                <InputLabel
                    className="text-xl mr-5"
                    htmlFor="title"
                    value={"title :"}
                />
                <TextInput
                    id="title"
                    type="text"
                    name="title"
                    value={data.title}
                    className="m-1 "
                    onChange={(e) => setData("title", e.target.value)}
                />
                {errors.title && (
                    <div className="text-red-600">{errors.title}</div>
                )}
                <InputLabel
                    className="text-xl mr-5"
                    htmlFor="content"
                    value={"content :"}
                />
                <TextInput
                    id="content"
                    type="text"
                    name="content"
                    value={data.content}
                    className="m-1 "
                    onChange={(e) => setData("content", e.target.value)}
                />
                {errors.content && (
                    <div className="text-red-600">{errors.content}</div>
                )}
                <PrimaryButton>Create a new Condition</PrimaryButton>
            </form>
        </div>
    );
}
