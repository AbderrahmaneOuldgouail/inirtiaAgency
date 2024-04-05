import React from "react";

export default function CommentList({ comments }) {
    return (
        <div>
            <h1>CommentList</h1>
            {comments.map((item) => (
                <div key={item.id}>
                    <p>
                        {item.first_name} {item.last_name}
                    </p>
                    <p>{item.content} </p>
                    <p>{item.created_at} </p>
                </div>
            ))}
        </div>
    );
}
