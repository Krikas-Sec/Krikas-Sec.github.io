document.addEventListener("DOMContentLoaded", () => {
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((codeBlock) => {
        // Skapa en container för kodblocket
        const container = document.createElement("div");
        container.className = "code-container";

        // Skapa kopieringsikonen
        const button = document.createElement("button");
        button.className = "copy-btn";
        button.innerHTML = '<i class="fas fa-copy"></i>'; // Lägg till Font Awesome-ikon

        // Lägg till knappens kopieringsfunktion
        button.addEventListener("click", () => {
            const code = codeBlock.querySelector("code").textContent;

            // Kopiera koden till urklipp
            navigator.clipboard.writeText(code).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>'; // Ändra till check-ikon
                setTimeout(() => (button.innerHTML = '<i class="fas fa-copy"></i>'), 2000);
            });
        });

        // Flytta kodblocket in i containern och lägg till knappen
        codeBlock.parentNode.insertBefore(container, codeBlock);
        container.appendChild(codeBlock);
        container.appendChild(button);
    });
});
