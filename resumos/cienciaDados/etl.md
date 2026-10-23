# ETL e MDM

## Visão geral

**ETL** (*Extract, Transform, Load* — Extração, Transformação e Carga) é um processo de integração de dados. Ele coleta dados de diferentes fontes, prepara-os e carrega-os em um destino, como um Data Warehouse.

O objetivo é disponibilizar dados mais consistentes e organizados, adequados para análise e apoio à decisão.

## As etapas do ETL

| Etapa | Nome | O que faz | Exemplo |
| --- | --- | --- | --- |
| **E** | Extração (*Extract*) | Coleta dados das fontes de origem, como bancos de dados, planilhas, arquivos, APIs e sistemas corporativos. | Extrair informações de contribuintes de diferentes sistemas. |
| **T** | Transformação (*Transform*) | Prepara os dados com limpeza, padronização, validação, deduplicação e regras de negócio. | Padronizar datas e corrigir valores inconsistentes. |
| **L** | Carga (*Load*) | Grava os dados transformados no sistema de destino, como um Data Warehouse ou banco analítico. | Carregar dados tratados no repositório usado para relatórios. |

**Ordem clássica:** Extração → Transformação → Carga.

## Principais operações de transformação

- **Limpeza:** corrigir dados inválidos ou inconsistentes.
- **Padronização:** uniformizar datas, nomes, unidades e formatos.
- **Deduplicação:** identificar e remover registros duplicados.
- **Tratamento de valores ausentes:** preencher, manter ou excluir valores conforme as regras definidas.
- **Validação:** verificar se os dados obedecem aos critérios estabelecidos.
- **Integração:** combinar informações provenientes de fontes distintas.
- **Regras de negócio:** calcular campos derivados ou adequar os dados às necessidades da organização.

## ETL × ELT

| Característica | ETL | ELT |
| --- | --- | --- |
| Ordem | Extrair → Transformar → Carregar | Extrair → Carregar → Transformar |
| Momento da transformação | Antes da carga no destino final | Depois da carga no destino |
| Processamento | Pode ocorrer em ferramenta intermediária | Frequentemente aproveita a capacidade do sistema de destino |
| Para lembrar | Transforma antes de carregar | Carrega antes de transformar |

> **Pegadinha:** se a transformação ocorre depois da carga no destino, a sequência é ELT, não ETL.

## Carga completa × incremental

- **Carga completa:** carrega todo o conjunto de dados definido para a operação.
- **Carga incremental:** carrega apenas os dados novos ou alterados desde a execução anterior, conforme os critérios de detecção de mudanças.

A carga incremental pode reduzir o volume de processamento, mas depende de mecanismos que identifiquem corretamente inclusões e alterações. Não significa necessariamente carregar um único registro.

## ETL e Data Warehouse

O ETL é frequentemente usado para alimentar um **Data Warehouse**, que consolida dados de diferentes fontes para consultas, relatórios e análises.

```text
Sistemas tributários + planilhas + APIs
                    ↓
               Extração
                    ↓
     Transformação (limpeza e padronização)
                    ↓
                  Carga
                    ↓
             Data Warehouse
                    ↓
           Relatórios e análises
```

> **Não confunda:** ETL é o processo de integração e preparação dos dados; Data Warehouse é um possível destino analítico.

## MDM — Master Data Management

**MDM** (*Master Data Management*) é o conjunto de práticas, processos e tecnologias usado para manter os dados mestres de uma organização consistentes, confiáveis e alinhados entre diferentes sistemas.

Dados mestres representam entidades essenciais ao negócio, como clientes, produtos, fornecedores e unidades organizacionais.

### Exemplo

Três sistemas de uma Secretaria da Fazenda podem registrar o mesmo contribuinte de formas diferentes:

- Sistema A: Maria da Silva
- Sistema B: MARIA SILVA
- Sistema C: Maria Silva

O MDM busca identificar que esses registros representam a mesma entidade e estabelecer uma representação consistente, com regras para qualidade, identificação e manutenção dos dados.

## ETL × MDM

| Aspecto | ETL | MDM |
| --- | --- | --- |
| Finalidade | Extrair, transformar e carregar dados | Gerenciar dados mestres de forma consistente |
| Foco | Fluxo de integração e preparação | Qualidade, identidade e consistência das entidades |
| Exemplo | Padronizar dados antes de carregá-los | Garantir uma visão consistente do cadastro de clientes |
| Relação | Pode alimentar processos de MDM | Pode utilizar ETL como apoio |

> **Atenção para a prova:** ETL é um processo; MDM é uma abordagem de gestão de dados mestres. São complementares, não sinônimos.

## Pegadinhas comuns em concursos

1. **ETL transforma antes de carregar.** Transformar depois da carga caracteriza ELT.
2. **Transformação vai além de converter formatos:** inclui limpeza, validação, deduplicação e aplicação de regras de negócio.
3. **A extração pode envolver várias fontes e formatos**, não apenas um banco de dados.
4. **Carga incremental não é sinônimo de carga de um único registro:** abrange os dados novos ou alterados conforme os critérios adotados.
5. **ETL não é Data Warehouse:** um é processo de integração e preparação; o outro é um possível repositório analítico.
6. **ETL e MDM não são sinônimos:** são conceitos distintos que podem trabalhar em conjunto.

## Revisão rápida

**ETL:** extrair → transformar → carregar.

**ELT:** extrair → carregar → transformar.

**MDM:** manter dados mestres consistentes entre sistemas.

**Data Warehouse:** possível destino analítico alimentado pelo ETL.
