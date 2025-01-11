document.addEventListener("DOMContentLoaded", () => {
    // Hitta alla kodblock
    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((codeBlock) => {
        // Skapa en container för kodblocket
        const container = document.createElement("div");
        container.className = "code-container";

        // Skapa kopieringsknappen
        const button = document.createElement("button");
        button.className = "copy-btn";
        button.textContent = "Copy";

        // Lägg till knappens kopieringsfunktion
        button.addEventListener("click", () => {
            const code = codeBlock.querySelector("code").textContent;

            // Kopiera koden till urklipp
            navigator.clipboard.writeText(code).then(() => {
                button.textContent = "Copied!";
                setTimeout(() => (button.textContent = "Copy"), 2000);
            });
        });

        // Flytta kodblocket in i containern och lägg till knappen
        codeBlock.parentNode.insertBefore(container, codeBlock);
        container.appendChild(codeBlock);
        container.appendChild(button);
    });
});
