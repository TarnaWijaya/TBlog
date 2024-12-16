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

    // Simpan pesan ke history
    saveToHistory({ role: "user", content: text });
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
        // Ambil history chat dari localStorage dan batasi jumlahnya
        let history = getHistory();
        if (history.length > 10) {
            history = history.slice(-10); // Hanya kirim 10 pesan terakhir
        }

        // Fetch data dari Gemini API
        const apiKey = "AIzaSyDXhTqI0YDY4H7YAZYiooDR5Jjl4r2XNHc"; // Ganti dengan API key yang valid
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: history
                    .filter(msg => msg.content && msg.content.trim() !== "") // Hanya pesan valid
                    .map(msg => ({ parts: [{ text: msg.content }] }))
            })
        });

        const data = await response.json();

        // Periksa apakah respons dari API valid
        if (!response.ok) {
            throw new Error(data.error?.message || "Terjadi kesalahan pada API");
        }

        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "AInya Error 🗿";

        chatBox.removeChild(loadingMessage);

        // Tampilkan pesan AI dengan profil
        const aiMessageContainer = document.createElement("div");
        aiMessageContainer.className = "message-container ai-container";
        aiMessageContainer.innerHTML = `
            <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
            <div class="message ai">${aiResponse}</div>
        `;
        chatBox.appendChild(aiMessageContainer);

        // Simpan balasan AI ke history
        saveToHistory({ role: "ai", content: aiResponse });
    } catch (error) {
        chatBox.removeChild(loadingMessage);
        const errorMessage = document.createElement("div");
        errorMessage.className = "message-container ai-container";
        errorMessage.innerHTML = `
            <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
            <div class="message ai">Error: ${error.message}</div>
        `;
        chatBox.appendChild(errorMessage);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}