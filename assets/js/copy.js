document.addEventListener("DOMContentLoaded", () => {
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((codeBlock) => {
        // Skapa en container för kodblocket
        const container = document.createElement("div");
        container.className = "code-container";

        // Skapa en header för kodboxen
        const header = document.createElement("div");
        header.className = "code-header";
        header.textContent = "Copy code"; // Du kan ändra texten här

        // Skapa kopieringsikonen
        const button = document.createElement("button");
        button.className = "copy-btn";
        button.innerHTML = '<i class="fas fa-copy"></i>'; // Lägg till Font Awesome-ikon

        // Lägg till kopieringsfunktion till knappen
        button.addEventListener("click", () => {
            const code = codeBlock.querySelector("code").textContent;

            // Kopiera koden till urklipp
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>'; // Ändra till check-ikon
                setTimeout(() => (button.innerHTML = '<i class="fas fa-copy"></i>'), 2000);
            });
        });

        // Lägg till knappen i headern
        header.appendChild(button);

        // Lägg till header och kodblocket i containern
        codeBlock.parentNode.insertBefore(container, codeBlock);
        container.appendChild(header);
        container.appendChild(codeBlock);
    });
});
