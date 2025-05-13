// Garantir que as funções de cálculo estejam no escopo global
window.calculateZScore = function() {
    const x = parseFloat(document.getElementById("testValue").value);
    const mu = parseFloat(document.getElementById("meanValue").value);
    const sigma = parseFloat(document.getElementById("stdDev").value);
    
    if (!isNaN(x) && !isNaN(mu) && !isNaN(sigma) && sigma !== 0) {
        const z = (x - mu) / sigma;
        document.getElementById("result").innerText = `Z-Score: ${z.toFixed(4)}`;
    } else {
        document.getElementById("result").innerText = "Por favor, insira valores válidos.";
    }
};

// Implementação da função erf (Função de erro)
window.erf = function(x) {
    const sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
};

// Função de distribuição normal cumulativa (CDF)
window.normalCDF = function(z) {
    return (1.0 + window.erf(z / Math.sqrt(2))) / 2;
};

// Variável global para o gráfico
window.gaussianChart = null;

// Função para calcular a probabilidade entre dois Z-Scores
window.calculateProbability = function() {
    const z1 = parseFloat(document.getElementById("zScore1").value);
    const z2 = parseFloat(document.getElementById("zScore2").value);
    
    if (!isNaN(z1) && !isNaN(z2)) {
        const prob1 = window.normalCDF(z1);
        const prob2 = window.normalCDF(z2);
        const prob = Math.abs(prob2 - prob1);

        document.getElementById("probResult").innerText = `Probabilidade entre Z-Scores: ${(prob * 100).toFixed(2)}%`;

        // Atualiza o gráfico da curva gaussiana
        window.updateGaussianChart(z1, z2);
    } else {
        document.getElementById("probResult").innerText = "Por favor, insira Z-Scores válidos.";
    }
};

window.updateGaussianChart = function(z1, z2) {
    const ctx = document.getElementById('gaussianChart');
    if (!ctx) return;
    
    const context = ctx.getContext('2d');

    // Verifica se já existe um gráfico e destrói o anterior
    if (window.gaussianChart) {
        window.gaussianChart.destroy();
    }

    // Gera os dados para a curva normal
    const labels = [];
    const normalData = [];
    const highlightData = [];
    
    // Ordena os z-scores para garantir que z1 seja menor que z2
    const [zMin, zMax] = z1 < z2 ? [z1, z2] : [z2, z1];
    
    // Gera 100 pontos para a curva
    for (let i = -4; i <= 4; i += 0.1) {
        const x = parseFloat(i.toFixed(1));
        labels.push(x);
        
        // Função de densidade de probabilidade normal
        const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-(x * x) / 2);
        normalData.push(y);
        
        // Destaca a área entre z1 e z2
        highlightData.push((x >= zMin && x <= zMax) ? y : 0);
    }
    
    // Cria o gráfico
    window.gaussianChart = new Chart(context, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Distribuição Normal',
                    data: normalData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: true
                },
                {
                    label: `Área entre Z=${zMin.toFixed(2)} e Z=${zMax.toFixed(2)}`,
                    data: highlightData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Valor Z'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Densidade de Probabilidade'
                    },
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            return `Densidade: ${value.toFixed(4)}`;
                        }
                    }
                }
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('myTable');
    if (!table) return;
    
    const headers = table.getElementsByTagName('th');
    const rows = table.getElementsByTagName('tr');

    // Adiciona eventos de hover para destacar linhas e colunas
    Array.from(table.getElementsByTagName('td')).forEach(cell => {
        // Evento de hover (mouseover)
        cell.addEventListener('mouseover', () => {
            const cellIndex = cell.cellIndex;
            const rowIndex = cell.parentElement.rowIndex;

            // Destacar o cabeçalho da coluna
            if (headers[cellIndex]) {
                headers[cellIndex].classList.add('highlight-header');
            }

            // Destacar a primeira célula da linha
            table.rows[rowIndex].cells[0].classList.add('highlight-first-cell');

            // Destacar toda a linha
            for (let i = 0; i < rows[rowIndex].cells.length; i++) {
                table.rows[rowIndex].cells[i].classList.add('highlight-full-row');
            }

            // Destacar toda a coluna
            for (let i = 1; i < rows.length; i++) {
                if (rows[i].cells[cellIndex]) {
                    rows[i].cells[cellIndex].classList.add('highlight-full-col');
                }
            }
        });

        // Remover o destaque ao sair do hover (mouseout)
        cell.addEventListener('mouseout', () => {
            // Remove destaque do cabeçalho da coluna
            Array.from(headers).forEach(header => {
                header.classList.remove('highlight-header');
            });

            // Remove destaque da primeira célula da linha
            Array.from(table.getElementsByTagName('td')).forEach(cell => {
                cell.classList.remove('highlight-first-cell');
            });

            // Remove destaque da linha completa
            Array.from(table.rows[cell.parentElement.rowIndex].cells).forEach(rowCell => {
                rowCell.classList.remove('highlight-full-row');
            });

            // Remove destaque da coluna completa
            for (let i = 1; i < rows.length; i++) {
                if (rows[i].cells[cell.cellIndex]) {
                    rows[i].cells[cell.cellIndex].classList.remove('highlight-full-col');
                }
            }
        });
    });

    // Adiciona a classe sticky para a linha do Z positivo
    const zPositiveRow = Array.from(table.rows).find(row => {
        // Procura a fileira que tem o header "Z" e "+ 0.00"
        return row.cells.length > 1 &&
            row.cells[0].textContent.trim() === "Z" &&
            row.cells[1].textContent.includes("+");
    });

    if (zPositiveRow) {
        zPositiveRow.classList.add('sticky-z-positive');
    }

    // Adiciona eventos de clique para destacar células
    const cells = document.querySelectorAll("td");

    // Função para remover destaques de uma célula específica
    function removeHighlight(cell) {
        const cellIndex = cell.cellIndex;
        const rowIndex = cell.parentElement.rowIndex;

        // Remove o zoom da célula
        cell.classList.remove("zoomed");

        // Remove destaque da linha até a célula clicada
        for (let i = 0; i <= cellIndex; i++) {
            if (cell.parentElement.cells[i]) {
                cell.parentElement.cells[i].classList.remove("highlight-click");
            }
        }

        // Remove destaque da coluna até a célula clicada
        const rows = cell.closest("table").rows;
        for (let i = 1; i <= rowIndex; i++) {
            if (rows[i] && rows[i].cells[cellIndex]) {
                rows[i].cells[cellIndex].classList.remove("highlight-click");
            }
        }
    }

    cells.forEach(cell => {
        // Evento de clique (click)
        cell.addEventListener("click", function() {
            const cellIndex = this.cellIndex;
            const rowIndex = this.parentElement.rowIndex;

            // Verifica se já está marcado
            const isHighlighted = this.classList.contains("zoomed");

            // Se já estiver marcado, desmarque
            if (isHighlighted) {
                removeHighlight(this);
            } else {
                // Verifica se já há duas células destacadas
                const highlightedCells = document.querySelectorAll(".zoomed");

                // Se houver duas, remove o destaque da mais antiga (primeira)
                if (highlightedCells.length >= 2) {
                    removeHighlight(highlightedCells[0]);
                }

                // Aplica o destaque à célula clicada
                this.classList.add("zoomed");

                // Destaca a linha até a célula clicada
                for (let i = 0; i <= cellIndex; i++) {
                    if (this.parentElement.cells[i]) {
                        this.parentElement.cells[i].classList.add("highlight-click");
                    }
                }

                // Destaca a coluna até a célula clicada
                const rows = this.closest("table").rows;
                for (let i = 1; i <= rowIndex; i++) {
                    if (rows[i] && rows[i].cells[cellIndex]) {
                        rows[i].cells[cellIndex].classList.add("highlight-click");
                    }
                }

                // Destaca a primeira célula (coluna Z) da linha do z
                this.parentElement.cells[0].classList.add("highlight-click");
            }
        });
    });
});

// As funções foram movidas para o escopo global no início do arquivo

function updateGaussianChart(z1, z2) {
    const ctx = document.getElementById('gaussianChart').getContext('2d');

    // Verifica se já existe um gráfico e destrói o anterior
    if (gaussianChart) {
        gaussianChart.destroy();
    }

    const dataPoints = [];
    const highlightedArea = [];

    // Certifique-se de que z1 é o menor e z2 é o maior
    const lowerZ = Math.min(z1, z2);
    const upperZ = Math.max(z1, z2);

    for (let z = -4; z <= 4; z += 0.1) {
        const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * z * z);
        dataPoints.push({ x: z, y: y });

        // Destaca a área apenas se z estiver entre lowerZ e upperZ
        if (z >= lowerZ && z <= upperZ) {
            highlightedArea.push({ x: z, y: y });
        }
    }

    gaussianChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Curva Gaussiana',
                    data: dataPoints,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Área entre Z-Scores',
                    data: highlightedArea,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    fill: true,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    title: {
                        display: true,
                        text: 'Z-Score'
                    },
                    min: -4,
                    max: 4
                },
                y: {
                    title: {
                        display: true,
                        text: 'Densidade'
                    },
                    min: 0,
                    max: 0.5
                }
            },
            plugins: {
                legend: {
                    display: true
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Z: ${context.parsed.x.toFixed(2)}, Densidade: ${context.parsed.y.toFixed(4)}`;
                        }
                    }
                }
            }
        }
    });
}
