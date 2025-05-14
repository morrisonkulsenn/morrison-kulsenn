document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("testimonial-list")) { 
        const testimonials = [
            {
                name: "Qual a diferença entre média, mediana e moda?",
                text: "A média é a soma dos valores dividida pelo número de observações. A mediana é o valor central quando os dados estão ordenados. A moda é o valor que aparece com maior frequência no conjunto de dados."
            },
            {
                name: "O que são testes paramétricos e não paramétricos?",
                text: "Testes paramétricos assumem que os dados seguem uma distribuição específica (geralmente normal) e fazem inferências sobre parâmetros populacionais. Testes não paramétricos não fazem suposições sobre a distribuição dos dados."
            },
            {
                name: "Como interpretar o valor-p em um teste de hipótese?",
                text: "O valor-p representa a probabilidade de observar um resultado tão ou mais extremo que o obtido, assumindo que a hipótese nula é verdadeira. Um valor-p menor que o nível de significância (geralmente 0,05) sugere rejeitar a hipótese nula."
            },
            {
                name: "Qual a diferença entre distribuição binomial e normal?",
                text: "A distribuição binomial modela o número de sucessos em um número fixo de tentativas independentes com probabilidade constante. A distribuição normal é contínua, simétrica e definida por sua média e desvio padrão."
            },
            {
                name: "O que é análise de variância (ANOVA)?",
                text: "ANOVA é uma técnica estatística que compara as médias de três ou mais grupos para determinar se há diferenças estatisticamente significativas entre eles, analisando a variação entre e dentro dos grupos."
            },
            {
                name: "Como lidar com dados ausentes em análise estatística?",
                text: "Existem várias abordagens, como remoção de casos (listwise deletion), substituição pela média ou mediana, imputá-los usando regressão, ou usar métodos mais avançados como imputáção múltipla."
            },
            {
                name: "Como calcular a probabilidade condicional?",
                text: "A probabilidade condicional P(A|B) é calculada dividindo a probabilidade da interseção dos eventos P(A ∩ B) pela probabilidade do evento condicionante P(B)."
            },
            {
                name: "O que é regressão linear e quando usá-la?",
                text: "Regressão linear é uma técnica para modelar a relação entre uma variável dependente e uma ou mais variáveis independentes. É útil para prever valores e entender a força da relação entre variáveis."
            },
            {
                name: "Como usar Regressão Linear em Python",
                text: "Você pode usar a biblioteca scikit-learn para implementar Regressão Linear em Python. Primeiro, importe a biblioteca, então crie um objeto LinearRegression e use o método fit para treinar o modelo."
            },
            {
                name: "O que é o coeficiente de determinação (R²)?",
                text: "O R² indica a proporção da variação na variável dependente que é explicada pelo modelo. Varia de 0 a 1, onde valores mais próximos de 1 indicam que o modelo explica melhor os dados."
            },
            {
                name: "Quando usar estatística bayesiana em vez de frequentista?",
                text: "A abordagem bayesiana é útil quando temos conhecimento prévio sobre os parâmetros (priori), quando trabalhamos com amostras pequenas, ou quando queremos fazer inferências sobre os próprios parâmetros em vez de apenas testar hipóteses."
            }
        ];
        
        const testimonialList = document.getElementById("testimonial-list");
        
        const renderTestimonials = () => {
            if (!testimonialList) return;
            testimonialList.innerHTML = ""; 
            const cards = [];
            if (testimonials.length === 0) return;

            const last = testimonials[testimonials.length - 1];
            cards.push(last, ...testimonials, testimonials[0]); 
        
            cards.forEach(t => {
                const div = document.createElement("div");
                div.className = "testimonial";
                div.innerHTML = `
                    <span class="testimonial-name">${t.name}</span>
                    <blockquote>${t.text}</blockquote>
                `;
                testimonialList.appendChild(div);
            });
        };
        
        renderTestimonials();
        
        let index = 1; 
        const testimonialWidth = 284; 
        const total = testimonials.length;
        
        if (testimonialList && total > 0) {
            testimonialList.style.transform = `translateX(-${testimonialWidth * index}px)`;
        
            const updatePosition = () => {
                testimonialList.style.transition = "transform 0.5s ease-in-out";
                testimonialList.style.transform = `translateX(-${testimonialWidth * index}px)`;
            };
            
            const resetPosition = () => {
                testimonialList.style.transition = "none";
                testimonialList.style.transform = `translateX(-${testimonialWidth * index}px)`;
            };
            
            const prevBtn = document.getElementById("prevBtn");
            const nextBtn = document.getElementById("nextBtn");

            if (prevBtn) {
                prevBtn.addEventListener("click", (event) => { 
                    event.preventDefault();
                    if (index <= 0) { 
                        index = total +1; 
                    }
                    index--;
                    updatePosition();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener("click", (event) => { 
                    event.preventDefault();
                    if (index >= total + 1) { 
                         index = 0; 
                    }
                    index++;
                    updatePosition();
                });
            }
            
            testimonialList.addEventListener("transitionend", () => {
                if (index === 0) {
                    index = total;
                    resetPosition();
                }
                if (index === total + 1) {
                    index = 1;
                    resetPosition();
                }
            });
        }
    }

    const blogPosts = [
        { title: "Como usar Regressão Linear em Python", url: "#" },
        { title: "Entendendo o Teorema de Bayes na Prática", url: "#" },
        { title: "5 Dicas para Visualização de Dados Eficiente", url: "#" }
    ];

    const blogList = document.getElementById("blog-list");
    if (blogList) {
        blogPosts.forEach(post => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${post.url}">${post.title}</a>`;
            blogList.appendChild(li);
        });
    }
});

const feriados = [
    { data: "2023-12-25", nome: "Natal", horario: "Fechado" },
    { data: "2023-01-01", nome: "Ano Novo", horario: "Fechado" },
    { data: "2023-09-07", nome: "Independência do Brasil", horario: "Fechado" },
    { data: "2025-05-03", nome: "Teste", horario: "Atendimento das 9h às 12h" },
  ];
  
  function verificarFeriado() {
    const hoje = new Date();
    const hojeFormatado = hoje.toISOString().split("T")[0];
    const feriadoAtual = feriados.find(feriado => feriado.data === hojeFormatado);
    return feriadoAtual;
  }
  
  function mostrarModalFeriado(feriado) {
    const modal = document.getElementById("feriadoModal");
    if (!modal || !document.getElementById("feriadoNome") || !document.getElementById("feriadoHorario")) return;
    document.getElementById("feriadoNome").textContent = feriado.nome;
    document.getElementById("feriadoHorario").textContent = feriado.horario;
    modal.style.display = "block";
    
    const closeModalBtn = modal.querySelector(".close-modal");
    if(closeModalBtn) closeModalBtn.onclick = function() { modal.style.display = "none"; }
    
    const entendiBtn = document.getElementById("entendiBtn");
    if(entendiBtn) entendiBtn.onclick = function() { modal.style.display = "none"; }
    
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const feriado = verificarFeriado();
    if (feriado) {
      setTimeout(() => {
        mostrarModalFeriado(feriado);
      }, 1000);
    }
  });

document.addEventListener("DOMContentLoaded", function() {
    const cookieModal = document.getElementById("cookie-consent-modal");
    if (!cookieModal) return; 

    const acceptButton = document.getElementById("cookie-accept");
    const settingsButton = document.getElementById("cookie-settings");
    const declineButton = document.getElementById("cookie-decline");
    const settingsView = document.getElementById("cookie-settings-view");
    const mainView = document.getElementById("cookie-main-view");
    const settingsBackButton = document.getElementById("cookie-settings-back");
    const saveSettingsButton = document.getElementById("cookie-save-settings");
    const analyticsCheckbox = document.getElementById("analytics-cookies");
    const marketingCheckbox = document.getElementById("marketing-cookies");
    
    const allCookieElementsPresent = acceptButton && settingsButton && declineButton && settingsView && mainView && settingsBackButton && saveSettingsButton && analyticsCheckbox && marketingCheckbox;

    const cookieConsent = getCookie("cookie_consent");
    let cookiePreferences = getCookie("cookie_preferences");
    try {
        cookiePreferences = cookiePreferences ? JSON.parse(cookiePreferences) : null;
    } catch (e) {
        cookiePreferences = null;
    }
        
    if (!cookieConsent && cookieModal && allCookieElementsPresent) {
        setTimeout(() => {
            cookieModal.style.display = "block";
        }, 1000);
    } else if (cookieConsent === "custom" && cookiePreferences) {
        loadCookiesAccordingToPreferences(cookiePreferences);
    }
    
    if(settingsButton && mainView && settingsView) settingsButton.addEventListener("click", function() {
        mainView.style.display = "none";
        settingsView.style.display = "block";
        
        if (cookiePreferences) {
            if(analyticsCheckbox) analyticsCheckbox.checked = cookiePreferences.analytics || false;
            if(marketingCheckbox) marketingCheckbox.checked = cookiePreferences.marketing || false;
        } else {
            if(analyticsCheckbox) analyticsCheckbox.checked = true;
            if(marketingCheckbox) marketingCheckbox.checked = false;
        }
    });
    
    if(settingsBackButton && settingsView && mainView) settingsBackButton.addEventListener("click", function() {
        settingsView.style.display = "none";
        mainView.style.display = "block";
    });
    
    if(acceptButton && cookieModal) acceptButton.addEventListener("click", function() {
        setCookie("cookie_consent", "accepted", 365);
        setCookie("cookie_preferences", JSON.stringify({
            analytics: true,
            marketing: true
        }), 365);
        cookieModal.style.display = "none";
        loadAllCookies();
    });
    
    if(declineButton && cookieModal) declineButton.addEventListener("click", function() {
        setCookie("cookie_consent", "declined", 365);
        setCookie("cookie_preferences", JSON.stringify({
            analytics: false,
            marketing: false
        }), 365);
        cookieModal.style.display = "none";
    });
    
    if(saveSettingsButton && cookieModal && analyticsCheckbox && marketingCheckbox) saveSettingsButton.addEventListener("click", function() {
        const preferences = {
            analytics: analyticsCheckbox.checked,
            marketing: marketingCheckbox.checked
        };
        
        setCookie("cookie_consent", "custom", 365);
        setCookie("cookie_preferences", JSON.stringify(preferences), 365);
        cookieModal.style.display = "none";
        
        loadCookiesAccordingToPreferences(preferences);
    });
    
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    }
    
    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(";");
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }
    
    function loadCookiesAccordingToPreferences(prefs) {
        if (prefs && prefs.analytics) {
            loadAnalyticsCookies();
        }
        if (prefs && prefs.marketing) {
            loadMarketingCookies();
        }
    }
    
    function loadAllCookies() {
        loadAnalyticsCookies();
        loadMarketingCookies();
    }
    
    function loadAnalyticsCookies() {
        // console.log("Carregando cookies analíticos...");
    }
    
    function loadMarketingCookies() {
        // console.log("Carregando cookies de marketing...");
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const mainMenu = document.querySelector(".main-menu");
    const submenuContainer = document.querySelector(".submenu-container");
    const mainContent = document.getElementById("main-content");

    if (!mainMenu || !submenuContainer) {
        return;
    }

    submenuContainer.style.display = "none";
    let activeMainMenuItemLI = null; 

    function closeAllSubmenusAndReset() {
        submenuContainer.style.display = "none";
        if (activeMainMenuItemLI) {
            activeMainMenuItemLI.querySelector("a")?.classList.remove("main-menu-active");
            activeMainMenuItemLI = null;
        }
        // Fecha todos os dropdowns de terceiro nível e reseta seus estilos
        submenuContainer.querySelectorAll("ul.submenu > li").forEach(subLi => {
            const ownDropdown = subLi.querySelector("ul.dropdown");
            const chevron = subLi.querySelector("a > .chevron, .chevron");
            if (ownDropdown) {
                ownDropdown.style.display = "none";
            }
            if (chevron) {
                chevron.style.transform = "rotate(0deg)";
            }
            subLi.querySelector("a")?.classList.remove("submenu-item-active");
        });
        if (mainContent) {
            mainContent.style.marginTop = "";
        }
    }

    mainMenu.querySelectorAll("li").forEach(mainLi => {
        const mainLink = mainLi.querySelector("a");
        if (!mainLink) return;

        const mainLinkHref = mainLink.getAttribute("href");
        // Verifica se o link principal deve abrir o submenuContainer (Serviços, Orientações)
        const togglesSubmenuContainer = mainLinkHref && (mainLinkHref.includes("/servicos/") || mainLinkHref.includes("/orientacoes/"));

        if (togglesSubmenuContainer) {
            mainLink.addEventListener("click", function(event) {
                event.preventDefault(); 
                event.stopPropagation();
                const isAlreadyOpenAndActive = activeMainMenuItemLI === mainLi && submenuContainer.style.display === "block";
                if (isAlreadyOpenAndActive) {
                    closeAllSubmenusAndReset();
                } else {
                    closeAllSubmenusAndReset(); 
                    submenuContainer.style.display = "block";
                    mainLink.classList.add("main-menu-active");
                    activeMainMenuItemLI = mainLi;
                    if (mainContent) {
                        setTimeout(() => {
                            if (submenuContainer.style.display === "block") { 
                                const containerHeight = submenuContainer.offsetHeight;
                                mainContent.style.marginTop = containerHeight + "px";
                            }
                        }, 15); 
                    }
                }
            });
        } else {
            // Para links do menu principal que NÃO abrem o submenuContainer, fecha tudo
            mainLink.addEventListener("click", function(event) {
                // Não previne o default se for um link normal
                closeAllSubmenusAndReset();
            });
        }
    });

    // Lógica para os itens dentro do submenuContainer (ex: Headsets, Microfones)
    submenuContainer.querySelectorAll("ul.submenu > li").forEach(subLi => {
        const subLink = subLi.querySelector("a:not([href*=\'#\']):not([href=\'\'])"); // Pega o link principal do item de submenu
        const ownDropdown = subLi.querySelector("ul.dropdown"); // Dropdown de terceiro nível
        const chevron = subLink?.querySelector(".chevron");

        if (subLink && ownDropdown) { 
            subLink.addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation();

                const isCurrentlyOpen = ownDropdown.style.display === "block";

                // Fecha todos os outros dropdowns de terceiro nível no mesmo submenuContainer
                submenuContainer.querySelectorAll("ul.submenu > li").forEach(otherSubLi => {
                    if (otherSubLi !== subLi) {
                        const otherDropdown = otherSubLi.querySelector("ul.dropdown");
                        const otherChevron = otherSubLi.querySelector("a > .chevron, .chevron");
                        if (otherDropdown) {
                            otherDropdown.style.display = "none";
                        }
                        if (otherChevron) {
                            otherChevron.style.transform = "rotate(0deg)";
                        }
                        otherSubLi.querySelector("a")?.classList.remove("submenu-item-active");
                    }
                });

                // Alterna o estado do dropdown clicado
                if (isCurrentlyOpen) {
                    ownDropdown.style.display = "none";
                    if (chevron) chevron.style.transform = "rotate(0deg)";
                    subLink.classList.remove("submenu-item-active");
                } else {
                    ownDropdown.style.display = "block";
                    if (chevron) chevron.style.transform = "rotate(-180deg)";
                    subLink.classList.add("submenu-item-active");
                }
            });
        }
    });

    // Fechar tudo se clicar fora do menu
    document.addEventListener("click", function(event) {
        const isClickInsideMainMenu = mainMenu.contains(event.target);
        const isClickInsideSubmenuContainer = submenuContainer.contains(event.target);
        if (!isClickInsideMainMenu && !isClickInsideSubmenuContainer) {
            closeAllSubmenusAndReset();
        }
    });
});

