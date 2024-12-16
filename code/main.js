// Cek apakah pengguna sudah memiliki nama yang tersimpan di localStorage
let userName = localStorage.getItem('userName');
if (!userName) {
    userName = prompt("Masukkan nama Anda:");
    localStorage.setItem('userName', userName);
}

let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || []; // Ambil riwayat chat jika ada

async function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const text = userInput.value.trim();

    if (!text) return;

    // Simpan pesan pengguna ke chatHistory
    chatHistory.push({ sender: "user", text: text });

    // Tambahkan pesan pengguna dengan profil
    const userMessageContainer = document.createElement("div");
    userMessageContainer.className = "message-container user-container";
    userMessageContainer.innerHTML = `
        <div class="message user">${text}</div>
        <img src="https://i.ibb.co/Z2XkjgQ/1734232863896.jpg" class="profile-img" alt="User">
        <button class="copy-btn" onclick="copyMessage('${text}')">Copy</button>
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
        const aiMessageText = data.candidates?.[0]?.content?.parts?.[0]?.text || "AInya Error 🗿";
        chatHistory.push({ sender: "ai", text: aiMessageText });

        aiMessageContainer.innerHTML = `
            <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
            <div class="message ai">${aiMessageText}</div>
            <button class="copy-btn" onclick="copyMessage('${aiMessageText}')">Copy</button>
        `;
        chatBox.appendChild(aiMessageContainer);
    } catch (error) {
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

    // Simpan riwayat percakapan ke localStorage
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Fungsi untuk menyalin pesan ke clipboard
function copyMessage(text) {
    const tempInput = document.createElement("input");
    document.body.appendChild(tempInput);
    tempInput.value = text;
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Pesan disalin ke clipboard!");
}

// Saat memuat halaman, tampilkan riwayat percakapan sebelumnya
function loadChatHistory() {
    const chatBox = document.getElementById("chat-box");
    chatHistory.forEach((message) => {
        const messageContainer = document.createElement("div");
        messageContainer.className = message.sender === "user" ? "message-container user-container" : "message-container ai-container";
        messageContainer.innerHTML = `
            <img src="${message.sender === "user" ? "https://i.ibb.co/Z2XkjgQ/1734232863896.jpg" : "https://i.ibb.co/41xKxg4/pp.webp"}" class="profile-img" alt="${message.sender}">
            <div class="message ${message.sender}">${message.text}</div>
            <button class="copy-btn" onclick="copyMessage('${message.text}')">Copy</button>
        `;
        chatBox.appendChild(messageContainer);
    });
}

loadChatHistory();  // Panggil fungsi untuk memuat riwayat chat ketika halaman
dimuat