document.addEventListener("DOMContentLoaded", () => {
    const codeBlocks = document.querySelectorAll("div.highlighter-rouge");

    codeBlocks.forEach((block) => {
        const pre = block.querySelector("pre");
        const code = block.querySelector("code");

        // Detect language from div or code tag
        let language = "";
        const divLangMatch = block.className.match(/language-(\w+)/);
        const codeLangMatch = code.className.match(/language-(\w+)/);
        if (divLangMatch) language = divLangMatch[1];
        else if (codeLangMatch) language = codeLangMatch[1];

        // Create container
        const container = document.createElement("div");
        container.className = "code-container";

        // Create header
        const header = document.createElement("div");
        header.className = "code-header";
        header.textContent = language;

        // Copy button
        const button = document.createElement("button");
        button.className = "copy-btn";
        button.innerHTML = '<i class="fas fa-copy"></i>';

        // Copy function
        button.addEventListener("click", () => {
            navigator.clipboard.writeText(code.textContent).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            });
        });

        header.appendChild(button);

        // Move the original content
        const highlightWrapper = block.querySelector("div.highlight");
        container.appendChild(header);
        container.appendChild(highlightWrapper);

        block.parentNode.replaceChild(container, block);
    });
});
