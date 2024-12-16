async function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const text = userInput.value.trim();

    if (!text) return;

    // Menyimpan pesan pengguna dalam chat history
    const userMessageContainer = document.createElement("div");
    userMessageContainer.className = "message-container user-container";
    userMessageContainer.innerHTML = `
        <div class="message user">${text}</div>
        <img src="https://i.ibb.co/Z2XkjgQ/1734232863896.jpg" class="profile-img" alt="User">
    `;
    chatBox.appendChild(userMessageContainer);

    // Update history chat di localStorage
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ sender: 'user', message: text });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

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
        aiMessageContainer.innerHTML = `
            <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
            <div class="message ai">${data.candidates?.[0]?.content?.parts?.[0]?.text || "AInya Error 🗿"}</div>
        `;
        chatBox.appendChild(aiMessageContainer);

        // Update history chat dengan pesan AI
        chatHistory.push({ sender: 'ai', message: data.candidates?.[0]?.content?.parts?.[0]?.text || "AInya Error 🗿" });
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

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
}

// Memuat chat history saat halaman dimuat
window.onload = () => {
    const chatBox = document.getElementById("chat-box");
    const chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    
    chatHistory.forEach(entry => {
        const messageContainer = document.createElement("div");
        messageContainer.className = `message-container ${entry.sender}-container`;
        messageContainer.innerHTML = `
            <div class="message ${entry.sender}">${entry.message}</div>
            <img src="${entry.sender === 'user' ? 'https://i.ibb.co/Z2XkjgQ/1734232863896.jpg' : 'https://i.ibb.co/41xKxg4/pp.webp'}" class="profile-img" alt="${entry.sender}">
        `;
        chatBox.appendChild(messageContainer);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
};