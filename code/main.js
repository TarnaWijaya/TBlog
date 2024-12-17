async function sendMessage() {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const text = userInput.value.trim();

    if (!text) return;

    const userMessageContainer = document.createElement("div");
    userMessageContainer.className = "message-container user-container";
    userMessageContainer.innerHTML = `
        <div class="message user">${text}</div>
        <img src="https://i.ibb.co/Z2XkjgQ/1734232863896.jpg" class="profile-img" alt="User">
    `;
    chatBox.appendChild(userMessageContainer);

    userInput.value = "";

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

        const greetings = ["halo", "hi", "hai", "hello"];
        if (greetings.includes(text.toLowerCase())) {
            reply = "Hai, apa kabar? Saya adalah asisten TarzAI-TarnaWijaya siap membantu!";} else if (
    text.toLowerCase().includes("developer kau siapa") ||
    text.toLowerCase().includes("developermu siapa") ||
    text.toLowerCase().includes("siapa developermu") ||
    text.toLowerCase().includes("siapa yang buat kamu") ||
    text.toLowerCase().includes("siapa pengembangmu") ||
    text.toLowerCase().includes("kamu dibuat oleh siapa") ||
    text.toLowerCase().includes("siapa yang membuatmu") ||
    text.toLowerCase().includes("pengembangmu siapa") ||
    text.toLowerCase().includes("pembuatmu siapa") ||
    text.toLowerCase().includes("siapa coder kamu") ||
    text.toLowerCase().includes("siapa pembuatmu") ||
    text.toLowerCase().includes("siapa dev kamu") ||
    text.toLowerCase().includes("siapa yang menciptakanmu") ||
    text.toLowerCase().includes("yang bikin kamu siapa") ||
    text.toLowerCase().includes("siapa yang bikin kamu") ||
    text.toLowerCase().includes("siapa yang merancangmu") ||
    text.toLowerCase().includes("kamu dibuat sama siapa") ||
    text.toLowerCase().includes("siapa yang menciptakan kamu") ||
    text.toLowerCase().includes("kamu diciptakan oleh siapa") ||
    text.toLowerCase().includes("penciptamu siapa") ||
    text.toLowerCase().includes("siapa yang ngoding kamu") ||
    text.toLowerCase().includes("siapa yang mendesain kamu") ||
    text.toLowerCase().includes("siapa yang memprogram kamu") ||
    text.toLowerCase().includes("dibuat sama siapa kamu") ||
    text.toLowerCase().includes("yang mendesain kamu siapa") ||
    text.toLowerCase().includes("kamu di-develop oleh siapa") ||
    text.toLowerCase().includes("siapa yang mengembangkan kamu") ||
    text.toLowerCase().includes("pembuat dari kamu siapa") ||
    text.toLowerCase().includes("siapa yang mengkoding kamu") ||
    text.toLowerCase().includes("siapa yang menciptakan dirimu") ||
    text.toLowerCase().includes("siapa orang di balik kamu") ||
    text.toLowerCase().includes("siapa yang membuat dirimu") ||
    text.toLowerCase().includes("siapa pembangunmu") ||
    text.toLowerCase().includes("siapa yang membangun kamu") ||
    text.toLowerCase().includes("kamu dirancang oleh siapa") ||
    text.toLowerCase().includes("siapa desainer kamu") ||
    text.toLowerCase().includes("yang bikin dirimu siapa") ||
    text.toLowerCase().includes("siapa yang menciptakan dirimu") ||
    text.toLowerCase().includes("kamu didesain oleh siapa") ||
    text.toLowerCase().includes("siapa mastermind di balik kamu") ||
    text.toLowerCase().includes("siapa yang merancang dirimu") ||
    text.toLowerCase().includes("kamu dikoding oleh siapa") ||
    text.toLowerCase().includes("siapa yang nge-dev kamu") ||
    text.toLowerCase().includes("siapa dev di balik kamu") ||
    text.toLowerCase().includes("siapa yang bikin aplikasi ini") ||
    text.toLowerCase().includes("siapa yang bikin chatbot ini") ||
    text.toLowerCase().includes("chatbot ini dibuat oleh siapa") ||
    text.toLowerCase().includes("aplikasi ini dibuat oleh siapa") ||
    text.toLowerCase().includes("yang bikin ini siapa") ||
    text.toLowerCase().includes("siapa yang ada di balik aplikasi ini") ||
    text.toLowerCase().includes("kamu dibuat oleh siapa?") ||
    text.toLowerCase().includes("siapa pembuat aplikasi ini?") ||
    text.toLowerCase().includes("siapa developer dibalik aplikasi ini?") ||
    text.toLowerCase().includes("siapa yang bikin chatbot ini?") ||
    text.toLowerCase().includes("siapa yang membuat aplikasi ini?") ||
    text.toLowerCase().includes("apakah kamu dibuat oleh perusahaan?") ||
    text.toLowerCase().includes("apakah ada tim pengembangnya?") ||
    text.toLowerCase().includes("kapan kamu dibuat?") ||
    text.toLowerCase().includes("apakah kamu buatan tim?") ||
    text.toLowerCase().includes("siapa yang bertanggung jawab untuk membuat aplikasi ini?") ||
    text.toLowerCase().includes("kamu diciptakan oleh siapa?") ||
    text.toLowerCase().includes("kamu dibuat oleh siapa saja?") ||
    text.toLowerCase().includes("ada berapa orang yang membuat aplikasi ini?") ||
    text.toLowerCase().includes("siapa yang mengembangkan chatbot ini?") ||
    text.toLowerCase().includes("chatbot ini diciptakan oleh siapa?") ||
    text.toLowerCase().includes("developer yang membuat chatbot ini siapa?") ||
    text.toLowerCase().includes("apakah developer kamu bekerja di perusahaan?") ||
    text.toLowerCase().includes("siapa yang mengembangkan aplikasi ini?") ||
    text.toLowerCase().includes("developer aplikasi ini siapa?") ||
    text.toLowerCase().includes("siapa yang bertanggung jawab atas pengembangan aplikasi ini?")
) {
    reply = "Saya dibuat oleh TarnaWijaya, seorang programmer muda, yang sedang mengembangkan berbagai aplikasi dan chatbot!";
} else {

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

        chatBox.removeChild(loadingMessage);

        const aiMessageContainer = document.createElement("div");
        aiMessageContainer.className = "message-container ai-container";
        aiMessageContainer.innerHTML = `
            <img src="https://i.ibb.co/41xKxg4/pp.webp" class="profile-img" alt="AI">
            <div class="message ai">${reply}</div>
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
}