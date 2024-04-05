import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import React from "react";

export default function Faqs({ faqs }) {
    const { flash, errors } = usePage().props;
    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm({
        question: "",
        answer: "",
    });
    const submit = (e) => {
        e.preventDefault();
        post(route("faq.store"));
    };
    const deleteFaq = (id) => {
        destroy(route(`faq.destroy`, id));
    };
        const updateFaq = () => {
            console.log("update");
            // post(route(`conditions.update`));
        };
    console.log(flash);
    return (
        <div>
            <p>Manage FAQ</p>
            {faqs.length > 0 ? (
                faqs.map((item) => (
                    <div>
                        {item.id} :{item.question} = {item.answer}
                        <PrimaryButton onClick={() => updateFaq()}>
                            Update
                        </PrimaryButton>
                        <PrimaryButton
                            onClick={() => deleteFaq(item.id)}
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
                    htmlFor="question"
                    value={"question :"}
                />
                <TextInput
                    id="question"
                    type="text"
                    name="question"
                    value={data.question}
                    className="m-1 "
                    onChange={(e) => setData("question", e.target.value)}
                />
                {errors.question && (
                    <div className="text-red-600">{errors.question}</div>
                )}
                <InputLabel
                    className="text-xl mr-5"
                    htmlFor="answer"
                    value={"answer :"}
                />
                <TextInput
                    id="answer"
                    type="text"
                    name="answer"
                    value={data.answer}
                    className="m-1 "
                    onChange={(e) => setData("answer", e.target.value)}
                />
                {errors.answer && (
                    <div className="text-red-600">{errors.answer}</div>
                )}
                <PrimaryButton>Create a new FAQ</PrimaryButton>
            </form>
        </div>
    );
}
