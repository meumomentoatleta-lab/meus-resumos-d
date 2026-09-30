Resumo — Aula 07: Modelagem Multidimensional

O próprio PDF destaca que quatro tópicos concentram 72% das questões de concursos. Para quem está em pós-edital, a orientação é priorizar: Tabela Fato e Dimensão, operações OLAP, esquemas Estrela e Floco de Neve e OLAP × OLTP.

🔥 1. O que mais cai — prioridade máxima

1. Tabela Fato × Tabela Dimensão

Essa é uma das distinções que você precisa saber sem pensar.

Tabela Fato Tabela Dimensão
Registra eventos/fatos Descreve/contextualiza os fatos
Medidas quantitativas Atributos descritivos
Valor, quantidade, custo, lucro Produto, cliente, tempo, local
Muitas linhas Normalmente menos linhas
Possui FKs para dimensões Possui PK própria
Base para agregações Base para filtros e agrupamentos

Macete:

FATO = "quanto?"
DIMENSÃO = "quem, o quê, quando, onde, como?"

O PDF destaca que a fato registra os eventos mensuráveis e que as dimensões fornecem o contexto desses eventos.

⚠️ Pegadinha clássica

Se a questão disser:

"Nome do produto, categoria e cidade ficam na tabela fato."

ERRADO.

Essas são informações descritivas e devem estar nas dimensões.

A tabela fato normalmente concentra medidas + chaves estrangeiras.

⭐ 2. Esquema Estrela × Floco de Neve

O Esquema Estrela possui incidência alta no PDF.

⭐ Star Schema
DIM_PRODUTO
|
DIM_LOJA — FATO_VENDAS — DIM_DATA
|
DIM_CLIENTE

Características:

Fato no centro;
Dimensões ao redor;
Dimensões geralmente desnormalizadas;
Menos tabelas;
Menos JOINs;
Consultas mais simples;
Geralmente melhor desempenho analítico.
❄️ Snowflake Schema

A diferença fundamental:

Snowflake = dimensões normalizadas.

Uma dimensão pode ser quebrada em várias tabelas.

Exemplo:

FATO
|
DIM_PRODUTO
|
DIM_CATEGORIA
|
DIM_DEPARTAMENTO

Consequências:

Menor redundância;
Menor espaço;
Mais tabelas;
Mais JOINs;
Consultas mais complexas;
Manutenção de determinadas hierarquias pode ser facilitada.

O PDF apresenta justamente essa relação: Estrela → dimensões desnormalizadas; Floco de Neve → dimensões normalizadas.

🧠 Macete

⭐ ESTRELA = simples
❄️ SNOWFLAKE = normalizado

Se aparecer:

"Snowflake possui dimensões desnormalizadas."

→ ❌ ERRADO

🔥 3. OLAP × OLTP

Outro ponto indicado pelo PDF como prioridade para pós-edital.

OLTP

Online Transaction Processing

Foco:

Operações do dia a dia;
INSERT;
UPDATE;
DELETE;
Transações;
Dados operacionais;
Atualizações frequentes;
Modelo relacional;
Normalização.
OLAP

Online Analytical Processing

Foco:

Análise;
Relatórios;
Indicadores;
Dados históricos;
Agregações;
Múltiplas dimensões;
Consultas ad-hoc;
Tomada de decisão.
🧠 Decore:

OLTP = operação
OLAP = análise

Se a questão falar em venda sendo registrada, pense em OLTP.

Se falar em analisar vendas por ano, região, produto e cliente, pense em OLAP.

O PDF destaca que OLAP trabalha com análise multidimensional e grandes volumes de dados históricos, enquanto OLTP está relacionado às operações transacionais do dia a dia.

🔥 4. Operações OLAP

Esse é outro ponto que merece atenção especial.

Drill Down

Vai para mais detalhe.

Ano
↓
Trimestre
↓
Mês
↓
Dia

Drill Down = aprofundar.

Roll Up / Drill Up

Vai para mais agregação.

Dia
↑
Mês
↑
Trimestre
↑
Ano

Roll Up = subir/agregar.

🧠 Macete:

DOWN = descer para o detalhe.
UP = subir para a agregação.

Slice

Seleciona um valor específico de uma dimensão.

Exemplo:

Vendas apenas de 2025.

Dice

Seleciona valores/subconjuntos em múltiplas dimensões.

Exemplo:

Vendas de 2025 + produtos eletrônicos + região Nordeste.

Pivot

Também chamado de rotação.

Muda a disposição dos eixos para visualizar os mesmos dados sob outra perspectiva.

⚠️ Cuidado com "slice-and-dice"

O PDF apresenta decomposição/slice-and-dice como operação que permite filtrar e reorganizar dados do cubo, inclusive produzindo uma visualização bidimensional.

🔥 5. ROLAP × MOLAP × HOLAP

Também aparece nas questões e é uma fonte clássica de pegadinhas.

    ROLAP	MOLAP	HOLAP

Armazenamento Relacional Multidimensional Híbrido
Dados Tabelas Cubos Cubo + relacional
Desempenho Menor Alto Alto
Escalabilidade Alta Menor Alta
Ideia SQL Pré-cálculo Combinação
ROLAP

R = Relational

Utiliza banco relacional e SQL.

⚠️ Pegadinha:

"ROLAP armazena os dados exclusivamente em cubos multidimensionais."

❌ ERRADO.

O ROLAP trabalha sobre estruturas relacionais. O PDF inclusive apresenta questão CEBRASPE explorando exatamente essa confusão.

MOLAP

M = Multidimensional

Utiliza cubos multidimensionais e trabalha com dados pré-calculados/pré-agregados.

Resultado:

🚀 consultas muito rápidas.

HOLAP

H = Hybrid

Combina os dois:

agregações → cubo;
detalhes → banco relacional.
🟡 6. Medidas aditivas, não-aditivas e semi-aditivas

Esse assunto merece ser decorado.

Aditiva

Pode somar em todas as dimensões.

Exemplo:

Valor de venda.

Não-aditiva

Não pode somar em nenhuma dimensão.

Exemplos:

Percentual
Média
Margem

⚠️ Pegadinha clássica:

30% + 25% = 55%

Isso não representa corretamente a margem consolidada.

O PDF chama atenção especificamente para o erro de somar percentuais e médias.

Semi-aditiva

Pode somar em algumas dimensões, mas não em outras.

Exemplo clássico:

Estoque

Pode fazer sentido:

Estoque Produto A + Produto B

Mas não:

Estoque dia 1 + Estoque dia 2

porque são momentos diferentes.

🧠 Decore:

Aditiva → soma tudo
Não-aditiva → não soma
Semi-aditiva → soma algumas coisas

🟢 7. Granularidade

É o nível de detalhe representado por cada registro da tabela fato.

Exemplo:

Uma linha = uma venda de um produto em uma loja em determinado dia.

Então a granularidade é:

Produto + Loja + Dia.

⚠️ Esse conceito aparece nas questões do PDF. Uma questão CEBRASPE, por exemplo, relaciona a granularidade da fato ao que cada registro efetivamente representa.

Macete:

Antes de analisar uma tabela fato, pergunte:

"O que exatamente representa UMA linha?"

Essa resposta define a granularidade.

🟢 8. Chaves da Tabela Fato

Outra pegadinha importante.

A fato possui FKs que apontam para as dimensões.

Exemplo:

FATO_VENDAS

ID_DATA → DIM_DATA
ID_PRODUTO → DIM_PRODUTO
ID_LOJA → DIM_LOJA

VALOR_VENDA
QUANTIDADE
CUSTO

O PDF apresenta questão em que a associação das chaves das dimensões compõe a chave da fato, relacionando isso à definição da granularidade.

🎯 O que eu priorizaria para a prova

Considerando exatamente a orientação do PDF, minha ordem de revisão seria:

🔴 Prioridade máxima
Tabela Fato × Dimensão
Operações OLAP
Star Schema × Snowflake Schema
OLAP × OLTP

Esses são os quatro assuntos que o material destaca como responsáveis por 72% das questões.

🟠 Prioridade alta/média
Granularidade
Chaves da tabela fato
Medidas aditivas, não-aditivas e semi-aditivas
ROLAP × MOLAP × HOLAP
Constelação de fatos
Cubos multidimensionais
🟢 Prioridade baixa para pós-edital

O próprio PDF recomenda não gastar muito tempo, nessa situação, com:

Projeto dimensional completo em quatro etapas de Kimball;
As dez regras de Ralph Kimball;
Dimensões lentamente mutáveis;
Classificações de cubos densos/esparsos.

Para quem está em pré-edital, entretanto, o material recomenda estudar também esses tópicos.

🧠 10 frases para decorar antes da prova

1. Fato = medidas; dimensão = descrição.

2. Estrela = dimensão desnormalizada.

3. Snowflake = dimensão normalizada.

4. OLTP = transação; OLAP = análise.

5. Drill Down = mais detalhe.

6. Roll Up = mais agregação.

7. Slice = seleção em uma dimensão.

8. Dice = seleção em várias dimensões.

9. ROLAP = relacional; MOLAP = cubo; HOLAP = híbrido.

10. Aditiva soma tudo; não-aditiva não soma; semi-aditiva soma apenas em algumas dimensões.

⚠️ Perfil das pegadinhas CEBRASPE

Pelas questões comentadas no próprio PDF, a banca explora bastante trocas de conceitos aparentemente pequenos: afirmar que Snowflake é desnormalizado, dizer que ROLAP armazena dados em cubos, colocar atributos descritivos na fato ou confundir operações de navegação OLAP.

Portanto, para essa aula, não basta reconhecer os termos: você precisa saber a diferença exata entre eles.

Envest Research inc.

25 questões, 10 minutos

Pontuação, percentil e áreas fortes no final.

Anúncio
Mais opções
Anúncios não influenciam as respostas obtidas do ChatGPT. Seus chats continuam privados.
Saiba mais sobre anúncios e personalização
gere em markdown

Claro. Abaixo está o conteúdo em Markdown puro, pronto para copiar e salvar como .md.

# Resumo — Aula 07: Modelagem Multidimensional

## 🔥 O que mais cai em concurso

Segundo o PDF, **quatro tópicos concentram 72% das questões de concursos**:

1. Tabela Fato e Tabela Dimensão
2. Operações OLAP
3. Esquemas Estrela e Floco de Neve
4. OLAP × OLTP

> **Dica de pós-edital:** priorize esses quatro assuntos antes de avançar para os demais.

---

# 1. Tabela Fato × Tabela Dimensão

Essa é uma das principais diferenças que precisam ser dominadas.

| Tabela Fato                     | Tabela Dimensão                          |
| ------------------------------- | ---------------------------------------- |
| Registra eventos/fatos          | Descreve e contextualiza os fatos        |
| Contém medidas quantitativas    | Contém atributos descritivos             |
| Valor, quantidade, custo, lucro | Produto, cliente, tempo, local           |
| Grande quantidade de registros  | Geralmente menor quantidade de registros |
| Possui chaves estrangeiras      | Possui chave primária própria            |
| Base para agregações            | Base para filtros e agrupamentos         |

### Macete

> **FATO = "quanto?"**
>
> **DIMENSÃO = "quem, o quê, quando, onde e como?"**

### Exemplo

```text
FATO_VENDAS
├── ID_DATA
├── ID_PRODUTO
├── ID_CLIENTE
├── QUANTIDADE
├── VALOR_VENDA
└── CUSTO
DIM_PRODUTO
├── ID_PRODUTO
├── NOME_PRODUTO
├── CATEGORIA
└── MARCA
⚠️ Pegadinha

Se a questão disser:

"Nome do produto, categoria e cidade ficam na tabela fato."

ERRADO.

São informações descritivas e pertencem às dimensões.

2. Esquema Estrela × Floco de Neve
⭐ Star Schema — Esquema Estrela

Possui uma Tabela Fato central conectada diretamente às dimensões.

             DIM_PRODUTO
                  |
DIM_LOJA — FATO_VENDAS — DIM_DATA
                  |
             DIM_CLIENTE
Características
Fato no centro;
Dimensões ao redor;
Dimensões geralmente desnormalizadas;
Menos tabelas;
Menos JOINs;
Consultas mais simples;
Geralmente melhor desempenho analítico.
Macete

⭐ ESTRELA = simples e desnormalizado

❄️ Snowflake Schema — Esquema Floco de Neve

No Snowflake, as dimensões são normalizadas e podem ser divididas em várias tabelas.

FATO_VENDAS
     |
DIM_PRODUTO
     |
DIM_CATEGORIA
     |
DIM_DEPARTAMENTO
Características
Dimensões normalizadas;
Maior quantidade de tabelas;
Mais JOINs;
Menor redundância;
Maior complexidade das consultas.
Macete

❄️ SNOWFLAKE = normalizado

⚠️ Pegadinha

"O Snowflake possui dimensões desnormalizadas."

ERRADO.

No Snowflake, as dimensões são normalizadas.

3. OLTP × OLAP
OLTP

Online Transaction Processing

Foco nas operações do dia a dia.

Características
Transações;
INSERT;
UPDATE;
DELETE;
Dados operacionais;
Atualizações frequentes;
Processamento de operações;
Sistemas transacionais.
Exemplos
Registrar uma venda;
Cadastrar um cliente;
Atualizar estoque;
Efetuar um pagamento.
OLAP

Online Analytical Processing

Foco na análise dos dados.

Características
Análise;
Relatórios;
Indicadores;
Dados históricos;
Agregações;
Múltiplas dimensões;
Consultas analíticas;
Apoio à tomada de decisão.
Exemplos

"Analisar as vendas por ano, região, produto e cliente."

Isso é OLAP.

Macete

OLTP = operação

OLAP = análise

4. Operações OLAP
Drill Down

Permite aumentar o nível de detalhe.

Ano
 ↓
Trimestre
 ↓
Mês
 ↓
Dia
Macete

DOWN = descer para o detalhe

Roll Up / Drill Up

Permite aumentar o nível de agregação.

Dia
 ↑
Mês
 ↑
Trimestre
 ↑
Ano
Macete

UP = subir para a agregação

Slice

Seleciona um valor específico de uma dimensão.

Exemplo

Analisar somente as vendas de 2025.

ANO = 2025
Macete

SLICE = corta uma dimensão

Dice

Seleciona subconjuntos de valores em múltiplas dimensões.

Exemplo

Vendas de 2025, de produtos eletrônicos, na região Nordeste.

Nesse caso, são aplicados filtros em diferentes dimensões.

Macete

DICE = vários filtros/dimensões

Pivot

Também chamada de rotação.

Permite reorganizar os eixos do cubo para visualizar os mesmos dados sob outra perspectiva.

5. ROLAP × MOLAP × HOLAP
Característica	ROLAP	MOLAP	HOLAP
Armazenamento	Relacional	Multidimensional	Híbrido
Estrutura	Tabelas relacionais	Cubos	Cubo + relacional
Desempenho	Menor	Alto	Alto
Escalabilidade	Alta	Menor	Alta
Ideia principal	SQL	Pré-cálculo	Combinação
ROLAP

R = Relational

Utiliza bancos de dados relacionais para realizar análises multidimensionais.

Macete

ROLAP = Relacional

⚠️ Pegadinha

"ROLAP armazena os dados exclusivamente em cubos multidimensionais."

ERRADO.

ROLAP trabalha com estruturas relacionais.

MOLAP

M = Multidimensional

Utiliza estruturas/cubos multidimensionais.

Características:

Dados pré-calculados;
Dados pré-agregados;
Alto desempenho nas consultas.
Macete

MOLAP = Multidimensional

HOLAP

H = Hybrid

Combina características de ROLAP e MOLAP.

De forma geral:

Dados agregados → cubo;
Dados detalhados → banco relacional.
Macete

HOLAP = híbrido

6. Medidas
Medidas Aditivas

Podem ser somadas em todas as dimensões.

Exemplos
Valor de venda;
Quantidade;
Custo.
Macete

ADITIVA = soma tudo

Medidas Não-Aditivas

Não podem ser somadas em nenhuma dimensão.

Exemplos
Percentuais;
Razões;
Algumas médias.
⚠️ Pegadinha

Não se deve simplesmente somar percentuais.

30% + 25% ≠ percentual consolidado correto
Macete

NÃO-ADITIVA = não soma

Medidas Semi-Aditivas

Podem ser somadas em algumas dimensões, mas não em outras.

Exemplo clássico

Estoque

Pode fazer sentido somar estoques de produtos diferentes:

Estoque Produto A
+
Estoque Produto B

Mas não faz sentido simplesmente somar:

Estoque no dia 1
+
Estoque no dia 2

porque são valores referentes a momentos diferentes.

Macete

SEMI-ADITIVA = soma em algumas dimensões

7. Granularidade

Granularidade representa o nível de detalhe dos dados.

Uma forma muito importante de identificar a granularidade é perguntar:

"O que exatamente representa UMA linha da tabela fato?"

Exemplo

Se cada registro representa:

Uma venda de um produto, em uma loja, em determinado dia.

A granularidade envolve:

Produto + Loja + Dia
⚠️ Dica de prova

Quanto mais detalhado for o registro, maior será o nível de detalhe da granularidade.

8. Chaves da Tabela Fato

A tabela fato normalmente possui chaves estrangeiras que apontam para as dimensões.

Exemplo
FATO_VENDAS

ID_DATA       → DIM_DATA
ID_PRODUTO    → DIM_PRODUTO
ID_LOJA       → DIM_LOJA

VALOR_VENDA
QUANTIDADE
CUSTO

A combinação das chaves das dimensões está relacionada à identificação do evento e à granularidade definida para a tabela fato.

9. Constelação de Fatos

Também pode aparecer como Fact Constellation.

Caracteriza-se pela existência de múltiplas tabelas fato que compartilham dimensões.

Exemplo
             DIM_DATA
                |
       ┌────────┴────────┐
       ↓                 ↓
FATO_VENDAS        FATO_ESTOQUE
       ↑                 ↑
       └──── DIM_PRODUTO ┘
Ideia principal

Várias fatos + dimensões compartilhadas

🎯 Prioridade para a prova

Segundo o PDF, os quatro assuntos com maior concentração de questões são:

🔴 Prioridade máxima
Tabela Fato × Tabela Dimensão
Operações OLAP
Star Schema × Snowflake Schema
OLAP × OLTP
🟠 Prioridade alta/média
Granularidade;
Chaves da tabela fato;
Medidas aditivas, não-aditivas e semi-aditivas;
ROLAP × MOLAP × HOLAP;
Constelação de fatos;
Cubos multidimensionais.
🟢 Menor prioridade no pós-edital

O PDF recomenda não gastar muito tempo, nessa situação, com:

Projeto dimensional completo em quatro etapas de Kimball;
As dez regras de Ralph Kimball;
Dimensões lentamente mutáveis;
Classificações de cubos densos/esparsos.

Para pré-edital, esses assuntos também devem ser estudados.

🧠 10 frases para decorar

1. Fato = medidas; dimensão = descrição.

2. Estrela = dimensão desnormalizada.

3. Snowflake = dimensão normalizada.

4. OLTP = transação; OLAP = análise.

5. Drill Down = mais detalhe.

6. Roll Up = mais agregação.

7. Slice = seleção em uma dimensão.

8. Dice = seleção em várias dimensões.

9. ROLAP = relacional; MOLAP = cubo; HOLAP = híbrido.

10. Aditiva soma tudo; não-aditiva não soma; semi-aditiva soma em algumas dimensões.

⚠️ Principais pegadinhas de concurso
Pegadinha 1

"A tabela fato contém os atributos descritivos dos produtos."

❌ ERRADO

Os atributos descritivos ficam nas dimensões.

Pegadinha 2

"No Star Schema, as dimensões são normalmente normalizadas."

❌ ERRADO

No Star Schema, as dimensões são geralmente desnormalizadas.

Pegadinha 3

"No Snowflake, as dimensões são desnormalizadas."

❌ ERRADO

No Snowflake, as dimensões são normalizadas.

Pegadinha 4

"Drill Down reduz o nível de detalhe."

❌ ERRADO

Drill Down aumenta o nível de detalhe.

Pegadinha 5

"Roll Up aumenta o nível de detalhe."

❌ ERRADO

Roll Up aumenta a agregação.

Pegadinha 6

"ROLAP utiliza cubos multidimensionais como estrutura principal."

❌ ERRADO

ROLAP utiliza estruturas relacionais.

Pegadinha 7

"MOLAP trabalha com estruturas multidimensionais."

✅ CERTO

Pegadinha 8

"Estoque é uma medida sempre aditiva."

❌ ERRADO

Estoque é um exemplo clássico de medida semi-aditiva, especialmente em relação à dimensão tempo.

🚀 Estratégia de revisão

Se você tiver pouco tempo antes da prova, memorize primeiro esta sequência:

FATO × DIMENSÃO
       ↓
ESTRELA × SNOWFLAKE
       ↓
OLTP × OLAP
       ↓
SLICE × DICE
       ↓
DRILL DOWN × ROLL UP
       ↓
ROLAP × MOLAP × HOLAP
       ↓
ADITIVA × NÃO-ADITIVA × SEMI-ADITIVA
       ↓
GRANULARIDADE
Resumo final

A lógica central da aula pode ser reduzida a:

MODELO DIMENSIONAL
│
├── FATO
│   └── Medidas
│
├── DIMENSÕES
│   └── Contexto
│
├── ESQUEMAS
│   ├── Estrela → desnormalizado
│   └── Snowflake → normalizado
│
└── OLAP
    ├── Slice
    ├── Dice
    ├── Drill Down
    ├── Roll Up
    └── Pivot
```
