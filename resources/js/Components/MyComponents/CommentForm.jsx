import React from "react";
import TextInput from "../TextInput";
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";

export default function CommentForm({ id, type }) {
    const { data, setData, post } = useForm({
        id: id,
        type: type,
        content: "",
    });

    const { flash, errors } = usePage().props;
    const submit = (e) => {
        e.preventDefault();
        post(route("store.comment"));
    };
    return (
        <div>
            <p>Comment Form</p>
            {flash.message?.CommentMessage && (
                <div>
                    {flash.message.CommentMessage.status == "success" ? (
                        <div className="text-lime-800">
                            {flash.message.CommentMessage.message}
                        </div>
                    ) : (
                        <div className="text-red-800">
                            {flash.message.CommentMessage.message}
                        </div>
                    )}
                </div>
            )}
            {errors.content && (
                <div className="text-red-600">{errors.content}</div>
            )}
            <form onSubmit={submit}>
                <InputLabel htmlFor="content" value="content" />
                <TextInput
                    type="text"
                    name="content"
                    value={data.content}
                    className="mt-1 "
                    onChange={(e) => setData("content", e.target.value)}
                />
                <PrimaryButton>Comment</PrimaryButton>
            </form>
        </div>
    );
}
