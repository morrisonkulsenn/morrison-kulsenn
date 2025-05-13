/*
 * SCRIPT DE ALTERNÂNCIA DE IDIOMA
 * Comentado para uso futuro - o site atualmente está configurado apenas para português
 */

// // Função global para mudar o idioma quando o select é alterado
// function changeLanguage(lang) {
//     // Armazena o idioma selecionado em um cookie para persistência
//     document.cookie = `preferred_language=${lang}; path=/; max-age=${60*60*24*365}`;
//     
//     // Redireciona para a versão correta da página atual
//     const currentPath = window.location.pathname;
//     const pathWithoutLang = currentPath.replace(/^\/(pt|en)/, '');
//     window.location.href = `/${lang}${pathWithoutLang}`;
// }
// 
// document.addEventListener('DOMContentLoaded', function() {
//     // Detecta o idioma do navegador para novos visitantes (opcional)
//     function detectBrowserLanguage() {
//         if (document.cookie.indexOf('preferred_language=') === -1) {
//             const browserLang = navigator.language || navigator.userLanguage;
//             if (browserLang.startsWith('pt')) {
//                 return 'pt';
//             } else {
//                 return 'en';
//             }
//         }
//         return null;
//     }
//     
//     // Redireciona automaticamente com base no idioma do navegador (opcional)
//     const detectedLang = detectBrowserLanguage();
//     if (detectedLang && window.location.pathname === '/') {
//         changeLanguage(detectedLang);
//     }
//     
//     // Garante que o select de idioma tenha o valor correto
//     const languageSelect = document.getElementById('language-select');
//     if (languageSelect) {
//         const currentLang = window.location.pathname.match(/^\/(pt|en)/) ? 
//             window.location.pathname.match(/^\/(pt|en)/)[1] : 'pt';
//         languageSelect.value = currentLang;
//     }
// });
