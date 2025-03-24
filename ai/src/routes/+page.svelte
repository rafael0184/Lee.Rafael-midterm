<script lang="ts">

    import MarkdownIt from "markdown-it";

    let response = ""; 
    let userQuery = ""; 
    const md = MarkdownIt();

    
    async function sendQuery() {
        if (!userQuery.trim()) return; 

        try {
            const request = await fetch("http://localhost:5173/api2/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: userQuery }),
            });

            const apiResponse = await request.json();
            response = apiResponse?.message || "No response from AI.";
        } catch (error) {
            console.error("Error sending query:", error);
            response = "Failed to fetch AI response.";
        }
    }
</script>


<div class="flex flex-col items-center pt-10 space-y-4">
   
    <div class="w-4/6">
        <input
            type="text"
            bind:value={userQuery}
            placeholder="Type your query here..."
            class="w-full p-2 border rounded"
        />
        <button
            on:click={sendQuery}
            class="mt-2 p-2 bg-blue-500 text-white rounded w-full"
        >
            Send
        </button>
    </div>

	
    <div class="rounded p-4 w-4/6 bg-blue-200 overflow-hidden text-ellipsis  ">
        {@html md.render(response)}
    </div>
</div>