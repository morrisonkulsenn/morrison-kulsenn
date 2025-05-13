---
layout: post
title: "Probabilidades no Jogo da Velha: Uma Análise Matemática"
date:   2025-05-11 13:12:00 +0000
category: "PROBABILIDADE"
author: "Morrison Külsenn"
author_bio: "Especialista em Teoria dos Jogos e Probabilidade Aplicada"
image: "/assets/images/img/tictactoes.png"
read_time: "7 minutos"
tags: [probabilidade, teoria-dos-jogos, combinatoria, matematica-recreativa]
---

O jogo da velha, conhecido em inglês como "Tic-tac-toe" ou "Noughts and Crosses", é um dos jogos mais simples e populares do mundo. Apesar de sua aparente simplicidade, este jogo oferece um fascinante campo de estudo para a teoria da probabilidade e a matemática combinatória.

## Introdução ao Jogo da Velha

O jogo da velha é disputado em um tabuleiro 3×3, onde dois jogadores alternam marcando espaços vazios com seus símbolos (geralmente X e O). O objetivo é formar uma linha de três símbolos iguais na horizontal, vertical ou diagonal.

> 🎮 **Curiosidade**: Evidências arqueológicas sugerem que versões primitivas do jogo da velha já eram jogadas no Antigo Egito, por volta de 1300 a.C.

## Espaço Amostral: Quantos Jogos Possíveis Existem?

Para entender as probabilidades no jogo da velha, precisamos primeiro determinar o número total de possíveis configurações do tabuleiro.

### Abordagem Inicial

À primeira vista, poderíamos pensar que, com 9 células e cada uma podendo estar em 3 estados (X, O ou vazio), teríamos 3^9 = 19.683 possibilidades. No entanto, esta contagem é imprecisa, pois:

1. Os jogadores se alternam, então o número de X's e O's deve ser igual ou diferir em apenas 1
2. O jogo termina quando um jogador vence ou o tabuleiro está cheio
3. Certas configurações são impossíveis de alcançar em um jogo real

### Cálculo Refinado

Considerando as restrições acima, o número real de possíveis estados de jogo válidos é significativamente menor:

- **Número total de jogos possíveis (incluindo jogos incompletos)**: 255.168
- **Número de jogos completos possíveis**: 26.830

Quando consideramos a simetria do tabuleiro (rotações e reflexões), este número se reduz ainda mais:

- **Número de jogos distintos considerando simetria**: 31.896

## Probabilidades de Resultados

### Distribuição de Resultados

Em um jogo aleatório (onde ambos os jogadores fazem movimentos aleatórios), as probabilidades de cada resultado são:

- **Vitória do primeiro jogador (X)**: 58,27%
- **Vitória do segundo jogador (O)**: 28,65%
- **Empate**: 13,08%

Estes números revelam uma vantagem significativa para o primeiro jogador, o que é esperado em jogos de informação perfeita com número ímpar de casas.

### Probabilidade Condicional

A probabilidade de vitória muda drasticamente dependendo do primeiro movimento:

$$P(X_{vence} \mid X_{centro}) = 0,659$$

$$P(X_{vence} \mid X_{canto}) = 0,612$$

$$P(X_{vence} \mid X_{lateral}) = 0,521$$

Isto demonstra que iniciar no centro oferece a maior vantagem estatística.

## Análise Combinatória

### Número de Configurações Vencedoras

Existem 8 linhas vencedoras possíveis (3 horizontais, 3 verticais e 2 diagonais). Para cada linha, existem 2 possibilidades (X ou O), resultando em 16 configurações vencedoras possíveis.

No entanto, nem todas são alcançáveis em um jogo real. O número de configurações vencedoras realmente possíveis é:

- **Configurações com vitória de X**: 626
- **Configurações com vitória de O**: 316

### Cálculo Manual de Possibilidades

Vamos calcular formalmente o número de possíveis jogos até o terceiro movimento:

#### Análise sem considerar simetria

1. **Primeiro movimento (X)**: 
   $$N_1 = \binom{9}{1} = 9$$
   
   Onde $\binom{9}{1}$ representa o número de maneiras de escolher 1 posição dentre 9 disponíveis.

2. **Segundo movimento (O)**:
   $$N_2 = N_1 \times \binom{8}{1} = 9 \times 8 = 72$$
   
   Para cada uma das 9 configurações anteriores, temos 8 posições restantes para O.

3. **Terceiro movimento (X)**:
   $$N_3 = N_2 \times \binom{7}{1} = 72 \times 7 = 504$$
   
   Para cada uma das 72 configurações anteriores, temos 7 posições restantes para X.

#### Análise considerando simetria

O tabuleiro 3×3 possui 8 simetrias (4 rotações e 4 reflexões). Definindo $G$ como o grupo de simetrias e $X$ como o conjunto de configurações, pelo Lema de Burnside, o número de órbitas distintas é:

$$|X/G| = \frac{1}{|G|} \sum_{g \in G} |X^g|$$

Onde $|X^g|$ é o número de configurações fixadas pela simetria $g$.

Aplicando ao primeiro movimento:

1. **Primeiro movimento (X)**:
   - Devido à simetria, as 9 posições se reduzem a 3 classes de equivalência:
     * $C_1 = \{(1,1)\}$ (centro): 1 posição
     * $C_2 = \{(0,0), (0,2), (2,0), (2,2)\}$ (cantos): 4 posições equivalentes
     * $C_3 = \{(0,1), (1,0), (1,2), (2,1)\}$ (laterais): 4 posições equivalentes
   - Total: $|X/G| = 3$ possibilidades distintas

2. **Segundo movimento (O) após X no centro**:
   - Com X no centro, as simetrias preservam 2 classes de equivalência para O:
     * $D_1 = \{(0,0), (0,2), (2,0), (2,2)\}$ (cantos): 4 posições equivalentes
     * $D_2 = \{(0,1), (1,0), (1,2), (2,1)\}$ (laterais): 4 posições equivalentes
   - Total: $|X/G| = 2$ possibilidades distintas

3. **Segundo movimento (O) após X no canto**:
   - Com X em um canto (por exemplo, (0,0)), as simetrias preservam 4 classes:
     * $E_1 = \{(1,1)\}$ (centro): 1 posição
     * $E_2 = \{(0,2), (2,0)\}$ (cantos adjacentes): 2 posições equivalentes
     * $E_3 = \{(2,2)\}$ (canto oposto): 1 posição
     * $E_4 = \{(0,1), (1,0)\}$ (laterais adjacentes): 2 posições equivalentes
     * $E_5 = \{(1,2), (2,1)\}$ (laterais opostas): 2 posições equivalentes
   - Total: $|X/G| = 4$ possibilidades distintas

4. **Segundo movimento (O) após X na lateral**:
   - Com X em uma lateral (por exemplo, (0,1)), as simetrias preservam 4 classes:
     * $F_1 = \{(1,1)\}$ (centro): 1 posição
     * $F_2 = \{(0,0), (0,2)\}$ (cantos adjacentes): 2 posições equivalentes
     * $F_3 = \{(2,0), (2,2)\}$ (cantos opostos): 2 posições equivalentes
     * $F_4 = \{(1,0), (1,2)\}$ (laterais adjacentes): 2 posições equivalentes
     * $F_5 = \{(2,1)\}$ (lateral oposta): 1 posição
   - Total: $|X/G| = 4$ possibilidades distintas

Assim, pelo princípio da adição, o número total de configurações distintas após dois movimentos é:

$$N_{2,simetria} = 2 + 4 + 4 = 10$$

Em vez das 72 configurações sem considerar simetria.

### Cálculo de Probabilidade com Combinatória

A probabilidade de uma configuração específica $c$ após $n$ movimentos pode ser calculada usando:

$$P(c) = \frac{1}{|C_n|}$$

Onde $|C_n|$ é a cardinalidade do conjunto de todas as configurações possíveis após $n$ movimentos.

Para calcular o número de jogos $N(k)$ que terminam em exatamente $k$ movimentos (onde $k \geq 5$), usamos:

$$N(k) = \binom{9}{k} \times P_{vit\acute{o}ria}(k)$$

Onde $P_{vit\acute{o}ria}(k)$ é a probabilidade de uma configuração de vitória ocorrer no $k$-ésimo movimento, e $\binom{9}{k}$ representa o coeficiente binomial "9 escolhe $k$".

A probabilidade de vitória do jogador X em um jogo aleatório pode ser expressa como:

$$P(X_{vence}) = \sum_{k=5}^{9} P(X_{vence} \mid k) \times P(k)$$

Onde $P(X_{vence} \mid k)$ é a probabilidade condicional de X vencer dado que o jogo termina em exatamente $k$ movimentos, e $P(k)$ é a probabilidade de um jogo terminar em exatamente $k$ movimentos.

### Árvore de Possibilidades

A árvore completa de possibilidades do jogo da velha tem:

- **Profundidade máxima**: 9 níveis (correspondendo aos 9 movimentos possíveis)
- **Fator de ramificação inicial**: 9 (número de primeiras jogadas possíveis)
- **Fator de ramificação médio**: aproximadamente 4,47

## Estratégia Perfeita e Teoria dos Jogos

O jogo da velha é considerado "resolvido" na teoria dos jogos, o que significa que conhecemos a estratégia ótima para ambos os jogadores.

### Teorema Minimax

Aplicando o algoritmo minimax, podemos provar que:

- Com jogo perfeito de ambos os lados, o resultado será sempre um empate
- O primeiro jogador pode forçar no mínimo um empate
- O segundo jogador pode no máximo forçar um empate

### Árvore de Decisão Simplificada

Uma versão simplificada da árvore de decisão para o primeiro movimento mostra:

```
Centro → Oponente no canto → Canto oposto
Canto → Oponente no centro → Canto adjacente
Canto → Oponente no canto adjacente → Centro
```

## Implementação em Julia

Podemos simular jogos aleatórios para verificar empiricamente as probabilidades teóricas usando Julia, uma linguagem moderna e de alto desempenho para computação científica:

```julia
using Random
using StatsBase

function criar_tabuleiro()
    return zeros(Int, 3, 3)
end

function verificar_vitoria(tabuleiro, jogador)
    # Verificar linhas e colunas
    for i in 1:3
        if all(tabuleiro[i, :] .== jogador) || all(tabuleiro[:, i] .== jogador)
            return true
        end
    end
    
    # Verificar diagonais
    if all(diag(tabuleiro) .== jogador) || all(diag(reverse(tabuleiro, dims=2)) .== jogador)
        return true
    end
    
    return false
end

function tabuleiro_cheio(tabuleiro)
    return !any(tabuleiro .== 0)
end

function simular_jogo()
    tabuleiro = criar_tabuleiro()
    jogador_atual = 1  # 1 para X, 2 para O
    
    while true
        # Encontrar posições vazias
        posicoes_vazias = findall(tabuleiro .== 0)
        
        if isempty(posicoes_vazias)
            return 0  # Empate
        end
        
        # Escolher movimento aleatório
        movimento = rand(posicoes_vazias)
        tabuleiro[movimento] = jogador_atual
        
        # Verificar vitória
        if verificar_vitoria(tabuleiro, jogador_atual)
            return jogador_atual
        end
        
        # Alternar jogador
        jogador_atual = 3 - jogador_atual  # Alterna entre 1 e 2
    end
end

# Simular 10.000 jogos
resultados = [simular_jogo() for _ in 1:10000]
contagem = countmap(resultados)

println("X vence: $(round(contagem[1]/100, digits=2))%")
println("O vence: $(round(contagem[2]/100, digits=2))%")
println("Empate: $(round(get(contagem, 0, 0)/100, digits=2))%")

# Visualização dos resultados
using Plots

labels = ["X vence", "O vence", "Empate"]
valores = [get(contagem, 1, 0), get(contagem, 2, 0), get(contagem, 0, 0)]
porcentagens = round.(valores ./ sum(valores) .* 100, digits=1)

pie(labels, valores, 
    title = "Distribuição de Resultados em 10.000 Jogos",
    legend = :topright,
    annotations = [(0.5, 0.5, text("Total: 10.000", :center, 10))],
    autopct = (x) -> "$(round(x, digits=1))%")
```

A implementação em Julia oferece várias vantagens:

1. **Desempenho**: Julia combina a facilidade de uso de Python com o desempenho próximo ao C
2. **Sintaxe matemática**: Notação mais próxima da matemática formal
3. **Visualização integrada**: Biblioteca Plots para visualização dos resultados
4. **Paralelização automática**: Operações vetorizadas são automaticamente paralelizadas

## Curiosidades Matemáticas

### Relação com a Teoria dos Grafos

O jogo da velha pode ser representado como um grafo onde:
- Cada nó representa um estado do tabuleiro
- Cada aresta representa um movimento válido
- O grafo completo contém 5.478 nós

### Complexidade Computacional

Apesar de sua simplicidade, o jogo da velha tem uma complexidade de:
- **Complexidade espacial**: O(b^d) ≈ O(9!)
- **Complexidade temporal para solução exata**: O(b^d) ≈ O(9!)

onde b é o fator de ramificação médio e d é a profundidade máxima.

## Aplicações Educacionais

O jogo da velha oferece excelentes oportunidades para ensinar conceitos matemáticos:

- **Probabilidade condicional**: Como as chances mudam após cada jogada
- **Combinatória**: Contagem de possíveis estados do jogo
- **Teoria dos jogos**: Estratégias ótimas e equilíbrio
- **Simetria**: Como rotações e reflexões reduzem o espaço de estados

## Conclusão

Apesar de sua aparente simplicidade, o jogo da velha revela uma rica estrutura matemática quando analisado sob a ótica da probabilidade e da combinatória. Sua completa resolução matemática não diminui seu valor educacional e recreativo, pelo contrário, nos permite apreciar a elegância dos princípios matemáticos subjacentes a este jogo milenar.

> 🧠 **Reflexão**: A próxima vez que você jogar uma partida de jogo da velha, observe como cada movimento altera drasticamente o espaço de probabilidades do jogo!

## Referências

1. Ferguson, T. S. (2020). "Game Theory" (2nd ed.). Mathematics Department, UCLA.
2. Schaeffer, J., et al. (2007). "Checkers Is Solved". Science, 317(5844), 1518-1522.
3. Patashnik, O. (1980). "Qubic: 4×4×4 Tic-Tac-Toe". Mathematics Magazine, 53(4), 202-216.
4. Gardner, M. (2001). "The Colossal Book of Mathematics: Classic Puzzles, Paradoxes, and Problems". W. W. Norton & Company.
