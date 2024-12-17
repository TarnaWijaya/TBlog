async function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const text = userInput.value.trim();

    if (!text) return;

    // Tambahkan pesan user dengan profil
    const userMessageContainer = document.createElement("div");
    userMessageContainer.className = "message-container user-container";
    userMessageContainer.innerHTML = `
        <div class="message user">${text}</div>
        <img src="https://i.ibb.co/Z2XkjgQ/1734232863896.jpg" class="profile-img" alt="User">
    `;
    chatBox.appendChild(userMessageContainer);

    userInput.value = "";

    // Tambahkan loading indicator
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "message-container ai-container";
    loadingMessage.innerHTML = `
        <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
        <div class="message ai">AI sedang mengetik...</div>
    `;
    chatBox.appendChild(loadingMessage);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let reply;

        // Cek sapaan awal
        const greetings = ["halo", "hi", "hai", "hello"];
        if (greetings.includes(text.toLowerCase())) {
            reply = "Hai, apa kabar? Saya adalah asisten AI siap membantu!";
        } else if (text.toLowerCase().includes("developer kau siapa") || text.toLowerCase().includes("tarna wijaya")) {
            reply = "developer saya adalah tarna wijaya alias pengembangnya";
        } else {
            // Fetch data dari Gemini API hanya jika bukan sapaan awal atau nama "Tarna"
            const apiKey = "AIzaSyC0Cjd5U_kIM9tvqxfjjvQ_MlhabjtxA30";
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: text }] }]
                })
            });

            const data = await response.json();
            reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "AInya Error 🗿";
        }

        // Hapus loading indicator setelah mendapatkan respons
        chatBox.removeChild(loadingMessage);

        // Tampilkan pesan AI dengan profil
        const aiMessageContainer = document.createElement("div");
        aiMessageContainer.className = "message-container ai-container";
        aiMessageContainer.innerHTML = `
            <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
            <div class="message ai">${reply}</div>
        `;
        chatBox.appendChild(aiMessageContainer);
    } catch (error) {
        // Hapus loading indicator jika terjadi kesalahan
        chatBox.removeChild(loadingMessage);
        const errorMessage = document.createElement("div");
        errorMessage.className = "message-container ai-container";
        errorMessage.innerHTML = `
            <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
            <div class="message ai">Error: API gak bisa diakses.</div>
        `;
        chatBox.appendChild(errorMessage);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}