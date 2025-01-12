document.addEventListener("DOMContentLoaded", () => {
    const codeWrappers = document.querySelectorAll("div[class*='language-']");

    codeWrappers.forEach((wrapper) => {
        // Hämta språket från klassnamnet (ex: "language-bash")
        const languageClass = wrapper.className.match(/language-(\w+)/);
        const language = languageClass ? languageClass[1] : "";

        // Skapa en container för hela kodboxen
        const container = document.createElement("div");
        container.className = "code-container";

        // Skapa en header för kodboxen
        const header = document.createElement("div");
        header.className = "code-header";
        header.textContent = language || ""; // Sätt språk eller lämna tomt

        // Skapa kopieringsikonen
        const button = document.createElement("button");
        button.className = "copy-btn";
        button.innerHTML = '<i class="fas fa-copy"></i>';

        // Lägg till kopieringsfunktion till knappen
        button.addEventListener("click", () => {
            const codeBlock = wrapper.querySelector("code");
            const code = codeBlock.textContent;

            // Kopiera koden till urklipp
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => (button.innerHTML = '<i class="fas fa-copy"></i>'), 2000);
            });
        });

        // Lägg till knappen i headern
        header.appendChild(button);

        // Flytta Rouge-wrappern in i containern
        const highlight = wrapper.querySelector(".highlight");
        container.appendChild(header);
        container.appendChild(highlight);

        // Ersätt original-wrappern med containern
        wrapper.parentNode.replaceChild(container, wrapper);
    });
});
