Material de revisão baseado na Aula 09 — Inteligência Artificial e Ciência de Dados (Estratégia Concursos, 2026).

1. Resumo estratégico com as principais dicas
   1.1. Conceitos básicos de Mineração de Dados

Mineração de Dados (Data Mining) é o processo de explorar grandes volumes de dados para descobrir padrões, correlações, tendências e informações implícitas, potencialmente úteis para a tomada de decisões.

Principais objetivos:

Descobrir padrões desconhecidos.

Identificar relacionamentos entre variáveis.

Encontrar tendências e comportamentos recorrentes.

Realizar classificações, agrupamentos e previsões.

Apoiar decisões estratégicas.

Exemplo: identificar que clientes que compram determinado produto frequentemente compram outro produto também.

Dica de prova

Quando a questão mencionar descoberta de padrões ocultos, informações implícitas, correlações desconhecidas ou tendências em grandes volumes de dados, associe a Data Mining.

A mineração de dados não se limita a Data Warehouses ou dados estruturados. Também pode utilizar arquivos, bancos NoSQL, textos, imagens, vídeos e outras fontes, desde que os dados sejam adequadamente preparados.

Tipos de dados

Tipo

Característica

Exemplo

Estruturados

Possuem modelo definido, campos e organização rígida

Tabelas relacionais, planilhas

Semiestruturados

Possuem marcadores ou organização parcial, sem esquema totalmente rígido

XML, JSON

Não estruturados

Não possuem modelo de dados predefinido

Textos livres, imagens, vídeos e áudios

A mineração de processos (Process Mining) utiliza registros de eventos (logs) para descobrir, monitorar e melhorar processos de negócio, identificando gargalos e desvios.

1.2. Tipos de análise de dados

Descritiva

Pergunta: O que aconteceu?

Resume dados históricos por meio de estatísticas, relatórios, dashboards e operações OLAP.

Diagnóstica

Pergunta: Por que aconteceu?

Investiga relações, padrões e possíveis causas dos resultados observados.

Preditiva

Pergunta: O que provavelmente acontecerá?

Utiliza dados históricos, modelos estatísticos e Machine Learning para estimar eventos futuros.

Prescritiva

Pergunta: O que deve ser feito?

Recomenda ações utilizando previsões, otimização, simulação e regras de decisão.

Macete para memorizar:

Descritiva = passado.

Diagnóstica = causa.

Preditiva = futuro.

Prescritiva = ação.

1.3. Processo KDD — Knowledge Discovery in Databases

O KDD é o processo mais amplo de descoberta de conhecimento em bases de dados. A mineração de dados é apenas uma de suas etapas.

A sequência clássica apresentada no material é:

1. Seleção

Escolher os dados relevantes

2. Pré-processamento

Limpar, corrigir e integrar os dados

3. Transformação

Adequar os dados aos algoritmos

4. Mineração de Dados

Aplicar algoritmos e extrair padrões

5. Interpretação e Avaliação

Validar, interpretar e verificar a utilidade dos resultados

Diferenças importantes entre as fases

Fase

Palavra-chave

Exemplo

Seleção

Escolher

Selecionar transações dos últimos cinco anos

Pré-processamento

Limpar

Corrigir datas inválidas e tratar ausências

Transformação

Converter

Normalizar valores e codificar categorias

Mineração

Descobrir

Detectar padrões de fraude

Interpretação/Avaliação

Validar

Verificar se os padrões são úteis e confiáveis

Atenção: alguns autores organizam o KDD de maneira diferente. O material também apresenta uma abordagem de seis etapas, de Elmasri e Navathe, incluindo enriquecimento e relatório/exibição. Se a questão mencionar expressamente um autor, observe a classificação utilizada por ele.

Técnicas de pré-processamento

Valores ausentes: exclusão de registros ou imputação de valores.

Dados inconsistentes: correção de formatos, tipos e valores inválidos.

Outliers: identificação e tratamento de valores atípicos.

Classes desbalanceadas: oversampling, undersampling ou ajuste de pesos.

Dados sensíveis: anonimização, pseudonimização e mascaramento.

Técnicas de transformação

Redução de dimensionalidade.

Normalização numérica, como Min-Max e Z-Score.

Discretização de valores contínuos em categorias.

Agregação de registros.

Codificação de variáveis categóricas, como One-Hot Encoding.

Pegadinha recorrente: limpeza e qualidade dos dados estão associadas ao pré-processamento; adequação de escala, representação e formato está associada à transformação.

1.4. CRISP-DM — prioridade alta para a prova

O CRISP-DM (Cross Industry Standard Process for Data Mining) é uma metodologia de referência para organizar projetos de mineração de dados. É independente de ferramentas e aplicável a diferentes setores.

As seis fases são:

1

Entendimento do negócio

Definir objetivos, necessidades e critérios de sucesso.

2

Entendimento dos dados

Coletar, explorar e verificar a qualidade inicial dos dados.

3

Preparação dos dados

Selecionar, limpar, integrar, transformar e preparar os dados.

4

Modelagem

Escolher algoritmos, construir modelos e ajustar parâmetros.

5

Avaliação

Verificar desempenho e adequação aos objetivos do negócio.

6

Implantação

Disponibilizar os resultados e modelos para utilização prática.

Pontos que merecem atenção:

O modelo possui seis fases.

O processo é iterativo: pode haver retorno a fases anteriores.

A preparação dos dados é especialmente trabalhosa, podendo consumir de 50% a 70% do tempo do projeto, conforme destacado na aula.

A avaliação verifica se o modelo atende aos objetivos do negócio.

A modelagem é a fase de construção dos modelos com técnicas de mineração e Machine Learning.

Pegadinha: exploração dos dados e identificação de sua qualidade inicial estão associadas ao entendimento dos dados. Limpeza e transformação são atividades de preparação; construção de modelos pertence à modelagem.

1.5. Aprendizado supervisionado, não supervisionado e por reforço

Tipo

Característica

Principais tarefas

Supervisionado

Utiliza dados rotulados

Classificação e regressão

Não supervisionado

Busca padrões em dados sem rótulos prévios

Agrupamento e associação

Por reforço

Aprende por meio de feedback, ações e recompensas

Maximização de recompensas

Classificação × regressão

Classificação

Prevê uma categoria ou classe. Exemplo: determinar se uma declaração apresenta risco alto ou baixo de fraude.

Regressão

Estima um valor numérico, geralmente contínuo. Exemplo: prever o faturamento de uma empresa ou o preço de um imóvel.

Algoritmos e técnicas importantes:

Árvores de decisão: podem realizar classificação e regressão.

Naive Bayes: classificador probabilístico que pressupõe independência entre os preditores.

SVM: encontra um hiperplano que separa classes.

Redes neurais: podem ser utilizadas em diferentes tarefas, incluindo classificação e regressão.

Macete para memorizar

Supervisionado = C + R: classificação e regressão.

Não supervisionado = A + A: associação e agrupamento.

A primeira dupla aprende com exemplos rotulados; a segunda procura estruturas, grupos e relações sem depender de classes previamente definidas.

1.6. Agrupamento (Clustering)

O agrupamento procura reunir observações semelhantes em grupos, sem que as classes precisem ser definidas previamente.

Principais técnicas:

K-Means: divide os dados em K grupos, buscando minimizar as distâncias entre os pontos e os respectivos centroides.

Agrupamento hierárquico: constrói uma estrutura hierárquica de grupos.

Single Linkage: utiliza a menor distância entre pontos de dois grupos.

Complete Linkage: utiliza a maior distância entre pontos de dois grupos.

Coeficiente Silhouette

O coeficiente Silhouette ajuda a avaliar a qualidade do agrupamento, considerando a proximidade do elemento em relação ao próprio grupo e aos grupos vizinhos.

Sua interpretação geral é:

Próximo de +1: agrupamento adequado.

Próximo de 0: observação na fronteira entre grupos.

Próximo de −1: possível atribuição inadequada ao grupo.

Pegadinha: na classificação, as classes são predefinidas; no agrupamento, os grupos são descobertos a partir dos dados.

1.7. Regras de associação

As regras de associação identificam itens ou atributos que ocorrem conjuntamente com frequência. São úteis para descobrir padrões de compra, relações entre características de empresas e combinações de eventos.

Uma regra é representada por:

X→Y

Isso significa que se investiga a associação entre a ocorrência de X e a ocorrência de Y. A associação não comprova causalidade.

Medidas de interesse

Suporte: frequência com que os itens X e Y aparecem juntos no conjunto de transações.

Suporte(X→Y)=
N
N(X∪Y)
​

Confiança: proporção de transações que contêm X e também contêm Y.

Confian
c
\c
​

a(X→Y)=
Suporte(X)
Suporte(X∪Y)
​

Elevação (Lift): compara a confiança da regra com o suporte do consequente.

Lift(X→Y)=
Suporte(Y)
Confian
c
\c
​

a(X→Y)
​

Interpretação do Lift:

Lift>1: associação positiva.

Lift=1: independência estatística entre os itens.

Lift<1: associação negativa.

Exemplo: em 100 transações, 40 contêm fraldas, 30 contêm cerveja e 20 contêm ambos.

Suporte da regra: 20/100=20%.

Confiança: 20/40=50%.

Lift: 0,50/0,30≈1,67.

Isso indica que a compra de fraldas está positivamente associada à compra de cerveja nessa base, sem demonstrar que uma compra cause a outra.

Algoritmos

Apriori: procura conjuntos frequentes de itens usando limites de suporte e confiança.

FP-Growth: utiliza uma estrutura chamada FP-Tree para compactar os dados e reduzir a necessidade de varreduras completas da base.

Dica de prova: se o enunciado apresentar regras com suporte e confiança, a resposta tende a ser regras de associação, não classificação nem clusterização.

1.8. Detecção de anomalias

A detecção de anomalias, também chamada Anomaly Detection ou Outlier Detection, identifica observações que se desviam significativamente do comportamento esperado.

Aplicações:

Detecção de fraudes financeiras.

Identificação de transações atípicas.

Monitoramento de sistemas.

Identificação de comportamentos incomuns.

Nem todo outlier é um erro: pode representar uma ocorrência rara, porém legítima.

1.9. Mineração de texto (Text Mining)

É a extração de informações e padrões relevantes de grandes volumes de dados textuais, frequentemente não estruturados.

Aplicações:

Análise de sentimentos.

Classificação de documentos.

Extração de tópicos.

Organização de documentos.

Análise de notícias, e-mails, comentários e jurisprudência.

Técnicas mais cobradas

Técnica

Função

Tokenização

Divide o texto em unidades menores, como palavras

Stopwords

Remove palavras frequentes de baixo valor informativo

Stemming

Reduz palavras ao radical por regras heurísticas

Lematização

Converte palavras à forma canônica, considerando fatores linguísticos

Lowercasing

Converte letras para minúsculas

Remoção de pontuação

Elimina sinais de pontuação

Bag of Words

Representa o texto pela ocorrência/frequência dos termos

TF-IDF

Pondera termos conforme a frequência no documento e sua raridade na coleção

Stemming × lematização: o stemming pode gerar radicais que não são palavras válidas; a lematização busca uma forma linguística canônica.

Mineração de texto × mecanismo de busca: a mineração busca descobrir padrões e informações; o mecanismo de busca recupera conteúdos em resposta a uma consulta do usuário.
