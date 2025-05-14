document.addEventListener('DOMContentLoaded', function() {
    // Encontrar todos os blocos de código
    const codeBlocks = document.querySelectorAll('pre.highlight');
    
    // Para cada bloco de código
    codeBlocks.forEach(function(codeBlock, index) {
        // Criar um container para o bloco de código
        const container = document.createElement('div');
        container.className = 'code-container';
        
        // Criar o botão de copiar
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.setAttribute('aria-label', 'Copiar código');
        copyButton.setAttribute('data-index', index);
        
        // Adicionar o ícone SVG
        copyButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            </svg>
            <span>Copiar</span>
        `;
        
        // Substituir o bloco de código pelo container
        codeBlock.parentNode.insertBefore(container, codeBlock);
        container.appendChild(copyButton);
        container.appendChild(codeBlock);
        
        // Adicionar evento de clique ao botão
        copyButton.addEventListener('click', function() {
            // Obter o texto do código
            const code = codeBlock.querySelector('code') ? 
                         codeBlock.querySelector('code').innerText : 
                         codeBlock.innerText;
            
            // Copiar para a área de transferência
            navigator.clipboard.writeText(code).then(function() {
                // Feedback visual
                const span = copyButton.querySelector('span');
                const originalText = span.innerText;
                span.innerText = 'Copiado!';
                copyButton.classList.add('copied');
                
                // Restaurar o texto original após 2 segundos
                setTimeout(function() {
                    span.innerText = originalText;
                    copyButton.classList.remove('copied');
                }, 2000);
            }).catch(function(err) {
                console.error('Erro ao copiar texto: ', err);
            });
        });
    });
});
