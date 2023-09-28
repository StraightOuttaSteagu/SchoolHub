import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Connect = () => {
    const params = useParams();

    useEffect(() => {
        const socket = io("http://localhost:3001", {
            query: { 
                you: params.you,
                to: params.to
            }
        });

        socket.on("connect", () => {
            console.log("connectedd");
        });
    }, [])

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            window.location.href = `/chat/${data.get("you")}/${data.get("to")}`;
        }}>
            <div>
                <label htmlFor="you">You</label>
                <input type="text" id="you" name="you"></input>
            </div>
            <div>
                <label htmlFor="to">To</label>
                <input type="text" id="to" name="to"></input>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default Connect;