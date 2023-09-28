import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Chat = () => {
    const params = useParams();
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
            }}>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}

                <div>
                    <label htmlFor="message">Message</label>
                    <input type="text" id="message" name="message"></input>
                </div>
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default Chat;