2. Resumo estratégico para a prova

O pré-processamento é realizado antes da aplicação dos algoritmos de mineração, preparando os dados para melhorar sua qualidade, consistência e adequação à análise. As cinco etapas clássicas são limpeza, integração, seleção, transformação e redução.
curso-400499-aula-08-prof-diego-carvalho-e-renato-da-costa-287f-completo.pdf

Principais conceitos e fórmulas

Tema

O que memorizar

Valores ausentes

MCAR, MAR e MNAR; imputação e remoção

Inconsistências

Corrigir tipos, formatos e conflitos

PCA

Reduz dimensões maximizando a variância explicada

Normalização Min-Max

Reescala geralmente para [0,1]

Z-Score

Média 0 e desvio-padrão 1

Robust Scaling

Utiliza mediana e IQR

Discretização

Transforma valores contínuos em intervalos

Outliers

Valores atípicos; podem ser reais ou erros

Binning

Equal-Width: mesma largura; Equal-Frequency: mesma quantidade aproximada de registros

Balanceamento

Undersampling, Oversampling e Cost-Sensitive

SMOTE

Gera exemplos sintéticos da classe minoritária

Dados categóricos

One-Hot, Label, Ordinal, Frequency e Target Encoding

Normalização textual

Padroniza textos para facilitar o processamento

Agregação

Resume registros por soma, média, mediana, contagem etc.

Desidentificação

Reduz o risco de identificação de indivíduos

curso-400499-aula-08-prof-diego-carvalho-e-renato-da-costa-287f-completo.pdf
Fórmulas importantes

Min-Max Scaling

x
′
=
x
max
​

−x
min
​

x−x
min
​

    ​

Reescala os valores, geralmente para o intervalo de 0 a 1. É sensível a outliers.

Z-Score

Z=
σ
x−μ
​

Em que μ é a média e σ é o desvio-padrão. Produz dados com média 0 e desvio-padrão 1.

Robust Scaling

x
′
=
IQR
x−Mediana
​

Em que IQR=Q3−Q1. É menos sensível a valores extremos.

Critério do IQR para outliers

LI=Q1−1,5(IQR)
LS=Q3+1,5(IQR)

Valores abaixo do limite inferior ou acima do superior são sinalizados como possíveis outliers.

Pegadinhas recorrentes

Normalização numérica não é o mesmo que normalização de bancos de dados relacionais.

Discretização transforma dados contínuos em categorias; codificação transforma categorias em representações numéricas.

PCA é não supervisionado, enquanto LDA é supervisionado.

O PCA cria componentes principais, não apenas seleciona as variáveis originais.

A imputação por média é sensível a outliers; a mediana é mais robusta.

Outliers não devem ser necessariamente removidos, pois podem representar eventos legítimos.

Undersampling descarta exemplos da classe majoritária; Oversampling aumenta a representação da classe minoritária.

Target Encoding utiliza informações da variável-alvo e exige cuidados para evitar vazamento de dados.

Stemming obtém um radical, enquanto a lematização busca a forma de dicionário.

A agregação reduz a granularidade e pode mascarar informações individuais.
