import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

export const POST: RequestHandler = async ({ request }) => {
    const { query } = await request.json(); 

    const ollama = new Ollama({ host: "http://localhost:11434/" });

    const dataOfMasterUser = {
        name: "Rafael Christian",
        course: "BSCS",
        hobbies: ["basketball", "playing valorant", "playing mobile legends"],
        favoriteFood: ["pansit", "sinigang", "bicol express"],
        userType: "Master User",
    };

    const chat = await ollama.chat({
        model: "deepseek-r1:7b",
        messages: [
            {
                role: "system",
                content: `Here is the information of the master user: ${JSON.stringify(dataOfMasterUser)}
                    respond only based on the data of the master user`,
            },
            {
                role: "user",
                content: query, 
            },
        ],
    });

    return json({ message: chat.message.content });
};