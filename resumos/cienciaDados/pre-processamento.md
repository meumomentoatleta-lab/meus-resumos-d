# 📚 Resumo — Pré-processamento de Dados e Mineração

Resumo estratégico para concursos, com foco nos **principais conceitos, fórmulas, técnicas de transformação e pegadinhas de prova**.

---

# 1. 🎯 Ideia central

O **pré-processamento** é realizado **antes da aplicação dos algoritmos de mineração**, preparando os dados para melhorar sua:

- **Qualidade**;
- **Consistência**;
- **Adequação à análise**.

### 🧠 Cinco etapas clássicas

```text
LIMPEZA
   ↓
INTEGRAÇÃO
   ↓
SELEÇÃO
   ↓
TRANSFORMAÇÃO
   ↓
REDUÇÃO
```

> 🎯 **Memorize:** **L-I-S-T-R**
> **Limpeza → Integração → Seleção → Transformação → Redução**

---

# 2. 📋 Principais conceitos

| Tema                     | 🎯 O que memorizar                                                                |
| ------------------------ | --------------------------------------------------------------------------------- |
| **Valores ausentes**     | MCAR, MAR e MNAR; imputação e remoção                                             |
| **Inconsistências**      | Corrigir tipos, formatos e conflitos                                              |
| **PCA**                  | Reduz dimensões maximizando a variância explicada                                 |
| **Normalização Min-Max** | Reescala geralmente para **[0,1]**                                                |
| **Z-Score**              | Média **0** e desvio-padrão **1**                                                 |
| **Robust Scaling**       | Utiliza **mediana e IQR**                                                         |
| **Discretização**        | Transforma valores contínuos em intervalos                                        |
| **Outliers**             | Valores atípicos; podem ser reais ou erros                                        |
| **Binning**              | Equal-Width = mesma largura; Equal-Frequency = quantidade aproximada de registros |
| **Balanceamento**        | Undersampling, Oversampling e Cost-Sensitive                                      |
| **SMOTE**                | Gera exemplos sintéticos da classe minoritária                                    |
| **Dados categóricos**    | One-Hot, Label, Ordinal, Frequency e Target Encoding                              |
| **Normalização textual** | Padroniza textos para facilitar o processamento                                   |
| **Agregação**            | Resume registros por soma, média, mediana, contagem etc.                          |
| **Desidentificação**     | Reduz o risco de identificação de indivíduos                                      |

---

# 3. 🕳️ Valores ausentes

Os dados podem apresentar valores ausentes por diferentes motivos.

### Principais mecanismos

| Mecanismo | Ideia principal                                                        |
| --------- | ---------------------------------------------------------------------- |
| **MCAR**  | Ausência completamente aleatória                                       |
| **MAR**   | Ausência depende de outras variáveis observadas                        |
| **MNAR**  | Ausência depende do próprio valor ausente ou de fatores não observados |

### Estratégias

Os valores ausentes podem ser tratados por:

- **Remoção** de registros ou variáveis;
- **Imputação** de valores.

> ⚠️ **Pegadinha:** imputação não significa necessariamente substituir pela **média**. Existem diversas estratégias, como mediana, moda, regressão e métodos mais sofisticados.

---

# 4. 🧹 Inconsistências

O pré-processamento também busca identificar e corrigir inconsistências nos dados.

### Exemplos

- Tipos de dados incorretos;
- Formatos diferentes;
- Valores incompatíveis;
- Conflitos entre fontes;
- Representações diferentes para o mesmo valor.

> 🎯 **Objetivo:** garantir maior **consistência e qualidade** dos dados antes da mineração.

---

# 5. 📉 PCA — Análise de Componentes Principais

O **PCA (Principal Component Analysis)** é uma técnica de **redução de dimensionalidade**.

### 🎯 Objetivo

Reduzir o número de dimensões buscando **maximizar a variância explicada**.

### Características importantes

- É uma técnica **não supervisionada**.
- Cria **novos componentes principais**.
- Os componentes são combinações das variáveis originais.
- Não se limita a simplesmente selecionar variáveis existentes.

### ⚠️ Pegadinha de prova

> **PCA não seleciona simplesmente as variáveis originais.**

Ele cria **novas componentes** que representam os dados.

### PCA × LDA

| PCA                         | LDA                           |
| --------------------------- | ----------------------------- |
| **Não supervisionado**      | **Supervisionado**            |
| Busca maximizar a variância | Considera as classes          |
| Cria componentes principais | Busca separação entre classes |

> 🧠 **Memorize:**
> **PCA → não supervisionado**
> **LDA → supervisionado**

---

# 6. 📏 Normalização Min-Max

A normalização **Min-Max** reescala os valores, geralmente para o intervalo **[0,1]**.

### Fórmula

$$
x' = \frac{x - x_{min}}{x_{max} - x_{min}}
$$

Onde:

- `x` = valor original;
- `xmin` = menor valor;
- `xmax` = maior valor;
- `x'` = valor transformado.

### 🎯 Característica

O valor mínimo passa a ser **0** e o máximo passa a ser **1**.

### ⚠️ Pegadinha

A normalização Min-Max é **sensível a outliers**.

Um valor extremo pode alterar significativamente `xmin` ou `xmax` e, consequentemente, afetar toda a escala.

---

# 7. 📊 Z-Score

O **Z-Score** padroniza os dados utilizando a média e o desvio-padrão.

### Fórmula

$$
Z = \frac{x-\mu}{\sigma}
$$

Onde:

- `x` = valor observado;
- `μ` = média;
- `σ` = desvio-padrão.

### Resultado esperado

Após a padronização:

- **Média ≈ 0**
- **Desvio-padrão ≈ 1**

> 🎯 **Memorize:**
> **Z-Score → média 0 + desvio-padrão 1**

---

# 8. 🛡️ Robust Scaling

O **Robust Scaling** utiliza medidas menos sensíveis a valores extremos.

### Fórmula

$$
x' = \frac{x - Mediana}{IQR}
$$

Onde:

$$
IQR = Q3 - Q1
$$

### Característica principal

É **menos sensível a outliers** do que métodos baseados na média e no desvio-padrão.

> 🧠 **Memorize:**
> **Robust → Mediana + IQR**

---

# 9. 🚨 Outliers

**Outliers** são valores considerados atípicos em relação ao comportamento geral dos dados.

### ⚠️ Atenção

Um outlier pode representar:

- Erro de medição;
- Erro de cadastro;
- Erro de processamento;
- Evento raro;
- Evento legítimo.

Portanto:

> ❌ **Outlier não significa automaticamente erro.**

### 🎯 Pegadinha

**Outliers não devem ser necessariamente removidos.**

Antes de removê-los, é necessário avaliar seu significado no contexto dos dados.

---

# 10. 📐 Critério do IQR para outliers

O método baseado no **IQR (Intervalo Interquartil)** utiliza os quartis para identificar possíveis valores atípicos.

### Fórmula do IQR

$$
IQR = Q3 - Q1
$$

### Limite inferior

$$
LI = Q1 - 1,5(IQR)
$$

### Limite superior

$$
LS = Q3 + 1,5(IQR)
$$

### Interpretação

São sinalizados como possíveis outliers os valores:

- **Abaixo de LI**; ou
- **Acima de LS**.

> 🧠 **Memorize:**
> **1,5 × IQR** é o fator clássico utilizado para os limites.

---

# 11. 📦 Binning

**Binning** é uma técnica que divide os dados em intervalos ou grupos.

### Equal-Width

Os intervalos possuem a **mesma largura**.

```text
|----|----|----|----|
```

### Equal-Frequency

Os intervalos possuem aproximadamente a **mesma quantidade de registros**.

```text
|---|---|---|---|
```

### 🧠 Diferença essencial

> **Equal-Width → mesma largura**

> **Equal-Frequency → mesma frequência/quantidade aproximada**

---

# 12. 🔢 Discretização

A **discretização** transforma valores **contínuos em categorias ou intervalos**.

### Exemplo

Uma idade:

```text
23
37
51
68
```

Pode ser transformada em:

```text
18–30
31–45
46–60
61+
```

### ⚠️ Pegadinha

> **Discretização transforma dados contínuos em categorias.**

Não confundir com **codificação**, que transforma categorias em representações numéricas.

---

# 13. ⚖️ Balanceamento de classes

O balanceamento busca lidar com situações em que as classes possuem quantidades muito diferentes de exemplos.

### Principais técnicas

#### 🔻 Undersampling

Reduz a quantidade de exemplos da **classe majoritária**.

> **Undersampling → descarta exemplos da maioria.**

#### 🔺 Oversampling

Aumenta a representação da **classe minoritária**.

> **Oversampling → aumenta a minoria.**

#### 💰 Cost-Sensitive

Atribui **custos/pesos diferentes** aos erros de classificação de acordo com a classe.

---

# 14. 🤖 SMOTE

**SMOTE (Synthetic Minority Over-sampling Technique)** é uma técnica de oversampling.

### 🎯 Objetivo

Gerar **novos exemplos sintéticos da classe minoritária**.

### ⚠️ Pegadinha

O SMOTE:

> ❌ Não simplesmente duplica os exemplos existentes.

> ✅ **Gera exemplos sintéticos** com base nos exemplos da classe minoritária.

### 🧠 Associação

**SMOTE → Oversampling → Classe minoritária → Exemplos sintéticos**

---

# 15. 🏷️ Dados categóricos

Dados categóricos podem ser transformados em representações adequadas aos algoritmos de mineração.

### Principais técnicas

| Técnica                | Ideia                                               |
| ---------------------- | --------------------------------------------------- |
| **One-Hot Encoding**   | Cria uma variável binária para cada categoria       |
| **Label Encoding**     | Atribui códigos numéricos às categorias             |
| **Ordinal Encoding**   | Representa categorias respeitando uma ordem         |
| **Frequency Encoding** | Representa categorias pela frequência de ocorrência |
| **Target Encoding**    | Utiliza informações relacionadas à variável-alvo    |

---

## 15.1. ⚠️ Target Encoding

O **Target Encoding** utiliza informações da **variável-alvo** para representar as categorias.

### 🚨 Cuidado

Como utiliza informações do target, existe risco de **vazamento de dados (data leakage)**.

É necessário realizar o procedimento corretamente, especialmente durante a separação entre treino e teste.

> 🎯 **Ponto de prova:**
> **Target Encoding → usa variável-alvo → atenção ao data leakage.**

---

# 16. 📝 Normalização textual

A normalização textual busca **padronizar textos** para facilitar o processamento.

Pode envolver, por exemplo:

- Padronização de maiúsculas/minúsculas;
- Tratamento de caracteres;
- Remoção ou padronização de elementos;
- Tratamento de espaços;
- Outras transformações necessárias ao processamento.

### Stemming × Lematização

| Stemming                                                | Lematização                        |
| ------------------------------------------------------- | ---------------------------------- |
| Obtém um **radical**                                    | Busca a **forma de dicionário**    |
| Pode produzir uma forma que não seja uma palavra válida | Busca uma forma linguística válida |
| Mais simples                                            | Mais sofisticada                   |

### 🧠 Memorize

> **Stemming → radical**

> **Lematização → lema / forma de dicionário**

---

# 17. 📊 Agregação

A **agregação** resume vários registros em informações mais gerais.

### Exemplos

- Soma;
- Média;
- Mediana;
- Contagem;
- Máximo;
- Mínimo.

### 🎯 Consequência

A agregação reduz a **granularidade** dos dados.

### ⚠️ Pegadinha

> A agregação pode **mascarar informações individuais**.

Quanto mais os dados são agregados, maior pode ser a perda de detalhes sobre os registros originais.

---

# 18. 🔐 Desidentificação

A **desidentificação** busca reduzir o risco de identificação de indivíduos presentes em um conjunto de dados.

### 🎯 Objetivo

> **Reduzir o risco de identificação dos indivíduos.**

Pode ser utilizada como parte de estratégias de proteção de dados e privacidade.

---

# 19. 🚨 Pegadinhas recorrentes

## ❌ 1. Normalização numérica ≠ normalização de bancos de dados

São conceitos completamente diferentes.

**Normalização numérica:**

→ transformação/reescalonamento de valores.

**Normalização de bancos relacionais:**

→ organização das tabelas para reduzir redundâncias e problemas de dependência.

---

## ❌ 2. Discretização ≠ codificação

**Discretização:**

> Contínuo → categorias/intervalos.

**Codificação:**

> Categorias → representação numérica.

---

## ❌ 3. PCA ≠ seleção de variáveis

O PCA:

> **Cria novos componentes principais.**

Não apenas escolhe algumas das variáveis originais.

---

## ❌ 4. PCA × LDA

> **PCA → não supervisionado**

> **LDA → supervisionado**

---

## ❌ 5. Média × Mediana

A imputação pela **média** é mais sensível a outliers.

A **mediana** é mais robusta diante de valores extremos.

> 🧠 **Outlier → prefira lembrar da mediana como medida mais robusta.**

---

## ❌ 6. Outlier ≠ erro

Um outlier pode ser:

- erro;
- evento raro;
- evento legítimo.

Portanto, não deve ser automaticamente eliminado.

---

## ❌ 7. Undersampling × Oversampling

**Undersampling:**

> reduz a classe majoritária.

**Oversampling:**

> aumenta a classe minoritária.

---

## ❌ 8. SMOTE

> **SMOTE gera exemplos sintéticos da classe minoritária.**

Não é simplesmente uma duplicação dos registros existentes.

---

## ❌ 9. Target Encoding

> Utiliza informações da **variável-alvo**.

Por isso, exige atenção especial para evitar **vazamento de dados**.

---

## ❌ 10. Stemming × Lematização

> **Stemming → radical**

> **Lematização → forma de dicionário**

---

## ❌ 11. Agregação

A agregação:

> **reduz a granularidade dos dados**

e pode:

> **mascarar informações individuais.**

---

# 20. 🧠 Mapa mental

```text
PRÉ-PROCESSAMENTO
│
├── 5 ETAPAS
│   ├── Limpeza
│   ├── Integração
│   ├── Seleção
│   ├── Transformação
│   └── Redução
│
├── VALORES AUSENTES
│   ├── MCAR
│   ├── MAR
│   ├── MNAR
│   ├── Imputação
│   └── Remoção
│
├── REDUÇÃO DE DIMENSIONALIDADE
│   └── PCA
│       ├── Não supervisionado
│       ├── Maximiza variância explicada
│       └── Cria novos componentes
│
├── NORMALIZAÇÃO / ESCALONAMENTO
│   ├── Min-Max
│   │   ├── Geralmente [0,1]
│   │   └── Sensível a outliers
│   │
│   ├── Z-Score
│   │   ├── Média = 0
│   │   └── Desvio-padrão = 1
│   │
│   └── Robust Scaling
│       ├── Mediana
│       ├── IQR
│       └── Menos sensível a outliers
│
├── OUTLIERS
│   ├── Valores atípicos
│   ├── Podem ser erros ou eventos legítimos
│   └── IQR
│       ├── LI = Q1 − 1,5×IQR
│       └── LS = Q3 + 1,5×IQR
│
├── DISCRETIZAÇÃO
│   └── Contínuo → categorias/intervalos
│
├── BINNING
│   ├── Equal-Width
│   │   └── Mesma largura
│   └── Equal-Frequency
│       └── Mesma quantidade aproximada
│
├── BALANCEAMENTO
│   ├── Undersampling
│   │   └── Reduz maioria
│   ├── Oversampling
│   │   └── Aumenta minoria
│   ├── Cost-Sensitive
│   └── SMOTE
│       └── Exemplos sintéticos da minoria
│
├── DADOS CATEGÓRICOS
│   ├── One-Hot
│   ├── Label
│   ├── Ordinal
│   ├── Frequency
│   └── Target
│       └── Cuidado com data leakage
│
├── TEXTO
│   ├── Normalização
│   ├── Stemming
│   │   └── Radical
│   └── Lematização
│       └── Forma de dicionário
│
├── AGREGAÇÃO
│   ├── Soma
│   ├── Média
│   ├── Mediana
│   ├── Contagem
│   └── Reduz granularidade
│
└── DESIDENTIFICAÇÃO
    └── Reduz risco de identificação
```

---

# 21. 🏆 Resumo de bolso

> **PRÉ-PROCESSAMENTO = Limpeza + Integração + Seleção + Transformação + Redução**

> **PCA = não supervisionado + novos componentes + variância**

> **Min-Max = geralmente [0,1] + sensível a outliers**

> **Z-Score = média 0 + desvio-padrão 1**

> **Robust = mediana + IQR**

> **IQR = Q3 − Q1**

> **Outlier = não significa necessariamente erro**

> **Equal-Width = mesma largura**

> **Equal-Frequency = mesma quantidade aproximada**

> **Undersampling = reduz maioria**

> **Oversampling = aumenta minoria**

> **SMOTE = exemplos sintéticos da minoria**

> **Target Encoding = usa target + risco de leakage**

> **Stemming = radical**

> **Lematização = forma de dicionário**

> **Agregação = reduz granularidade**

> **Desidentificação = reduz risco de identificação**
