import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

export const GET: RequestHandler = async () => {
    const ollama = new Ollama({ host: "http://localhost:11434/" });



    const chat = await ollama.chat({
        model: "deepseek-r1:latest",
        messages: [
            { role: "system", content: "you are mario from super mario bros. answer as Mario. the assistant. only" },
            { role: "user", content: "Hello" },

        ],
    });

    return json({ done: chat.message.content });

};    