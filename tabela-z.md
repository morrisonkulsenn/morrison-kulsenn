---
layout: page
title: Tabela Z (Normal Padrão)
description: Tabela de valores da distribuição normal padrão (Z) para cálculo de probabilidades e intervalos de confiança
permalink: /tabela-z/
use_toc: false
---

<link rel="stylesheet" href="{{ '/assets/css/tabela-z.css' | relative_url }}">

<div class="tabela-z-container">
    <h1>Distribuição Normal Padrão (Tabela Z)</h1>
    
    <p class="tabela-descricao">
        A tabela Z mostra a área sob a curva normal padrão para um valor Z específico. 
        Cada valor na tabela representa a probabilidade de uma variável normal padrão ser menor ou igual ao valor Z correspondente.
    </p>

    <div class="table-responsive">
        <table id="myTable" class="tabela-z">
            <thead>
                <tr>
                    <th>Z</th>
                    <th>−0.00</th>
                    <th>−0.01</th>
                    <th>−0.02</th>
                    <th>−0.03</th>
                    <th>−0.04</th>
                    <th>−0.05</th>
                    <th>−0.06</th>
                    <th>−0.07</th>
                    <th>−0.08</th>
                    <th>−0.09</th>
                </tr>
            </thead>
            <tbody>
                <!-- Primeira parte da tabela: valores negativos de Z -->
                {% include tabela-z-negativa.html %}
                
                <!-- Segunda parte da tabela: valores positivos de Z -->
                {% include tabela-z-positiva.html %}
            </tbody>
        </table>
    </div>

    <div class="calculator" id="calculator">
        <h2>Calculadora de Z-Score</h2>
        <div class="calculator-form">
            <label for="testValue">Valor observado (X):</label>
            <input type="number" id="testValue" placeholder="Digite o valor observado" step="any" required>
        
            <label for="meanValue">Média (μ):</label>
            <input type="number" id="meanValue" placeholder="Digite a média" step="any" required>
        
            <label for="stdDev">Desvio padrão (σ):</label>
            <input type="number" id="stdDev" placeholder="Digite o desvio padrão" step="any" required>
        
            <button onclick="calculateZScore()">Calcular Z-Score</button>
            <h3 id="result" class="result"></h3>
        </div>
        
        <h2>Probabilidade entre dois Z-Scores</h2>
        <div class="calculator-form">
            <label for="zScore1">Z-Score 1:</label>
            <input type="number" id="zScore1" placeholder="Digite o primeiro Z-Score" step="any" required>
        
            <label for="zScore2">Z-Score 2:</label>
            <input type="number" id="zScore2" placeholder="Digite o segundo Z-Score" step="any" required>
        
            <button onclick="calculateProbability()">Calcular Probabilidade</button>
            <h3 id="probResult" class="result"></h3>
        </div>
        
        <div class="chart-container">
            <canvas id="gaussianChart" width="400" height="250"></canvas>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="{{ '/assets/js/tabela-z.js' | relative_url }}"></script>
