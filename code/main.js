// Fungsi untuk menyimpan riwayat chat di localStorage
function saveChatHistory() {
    const chatBox = document.getElementById("chat-box");
    localStorage.setItem("chatHistory", chatBox.innerHTML);
}

// Fungsi untuk memuat riwayat chat dari localStorage
function loadChatHistory() {
    const chatBox = document.getElementById("chat-box");
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
        chatBox.innerHTML = savedHistory;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

// Fungsi utama untuk mengirim pesan
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
    saveChatHistory(); // Simpan riwayat setelah menambah pesan user

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
        // Fetch data dari Gemini API
        const apiKey = "AIzaSyDXhTqI0YDY4H7YAZYiooDR5Jjl4r2XNHc";
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

        chatBox.removeChild(loadingMessage);

        // Tampilkan pesan AI dengan profil
        const aiMessageContainer = document.createElement("div");
        aiMessageContainer.className = "message-container ai-container";
        aiMessageContainer.innerHTML = `
            <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
            <div class="message ai">${data.candidates?.[0]?.content?.parts?.[0]?.text || "AInya Error 🗿"}</div>
        `;
        chatBox.appendChild(aiMessageContainer);

        saveChatHistory(); // Simpan riwayat setelah menambah pesan AI
    } catch (error) {
        chatBox.removeChild(loadingMessage);
        const errorMessage = document.createElement("div");
        errorMessage.className = "message-container ai-container";
        errorMessage.innerHTML = `
            <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
            <div class="message ai">Error: API gak bisa diakses.</div>
        `;
        chatBox.appendChild(errorMessage);

        saveChatHistory(); // Simpan riwayat meski terjadi error
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Muat riwayat chat saat halaman dimuat
window.onload = loadChatHistory;