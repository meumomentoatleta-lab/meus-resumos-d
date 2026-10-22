# SPED Fiscal

> **Revisão para concurso** — conceitos, estrutura da EFD-ICMS/IPI e pontos de atenção sobre NF-e.

## 1. SPED: conceito e objetivos

Instituído pelo **Decreto nº 6.022/2007**, o Sistema Público de Escrituração Digital (SPED) moderniza o cumprimento das obrigações acessórias por meio digital e com certificação digital.

Entre seus objetivos estão:

- integrar as administrações tributárias;
- racionalizar e uniformizar as obrigações acessórias;
- aprimorar a fiscalização por meio do cruzamento de dados.

> **Atenção:** não confunda os objetivos do SPED com os benefícios decorrentes de sua implantação.

## 2. EFD-ICMS/IPI

A Escrituração Fiscal Digital (EFD) é um arquivo digital, assinado digitalmente e transmitido pela Internet. Reúne documentos fiscais, informações de interesse do Fisco e registros de apuração de impostos.

| Característica | Como lembrar |
| --- | --- |
| Abrangência | Escrituração individualizada por estabelecimento |
| Periodicidade | Mensal |
| Conteúdo | Documentos fiscais, informações fiscais e apuração |

> **Pegadinha clássica:** receber a EFD não significa homologar a apuração nem reconhecer como verdadeiras as informações declaradas.

## 3. Livros substituídos pela EFD

Memorize a sequência:

**Entradas → Saídas → Inventário → Apuração do IPI → Apuração do ICMS → CIAP → Produção/Estoque**

A relação está prevista no material de referência e no **Ajuste SINIEF 02/09**.

## 4. Blocos da EFD

| Bloco | Palavra-chave |
| --- | --- |
| 0 | Cadastro e identificação |
| B | ISS/DF |
| C | Mercadorias e documentos fiscais |
| D | Comunicação e transporte |
| E | Apuração do ICMS/IPI |
| G | CIAP |
| H | Inventário |
| K | Produção e estoque |
| 1 | Outras informações |
| 9 | Totais e controle |

**Maior prioridade para auditoria e questões:** blocos **C, E, G, H e K**.

> **Macete:** 0 cadastra; C traz mercadorias; D, transporte/comunicação; E, apuração; G, CIAP; H, inventário; K, produção/estoque; 9 totaliza.

## 5. Registros C100 e C170

| Registro | Nível de informação |
| --- | --- |
| C100 | Documento fiscal em nível geral |
| C170 | Itens do documento fiscal |

O C100 não detalha os itens; esse detalhamento aparece no C170.

> **Atenção:** para a NFC-e, modelo 65, o C100 registra somente operações de saída.

## 6. CIAP — Bloco G

O Bloco G trata do **Controle de Crédito de ICMS do Ativo Permanente (CIAP)** e do crédito de ICMS relacionado ao ativo imobilizado.

**Fórmula destacada:**

`Crédito = coeficiente de creditamento × saldo acumulado × fração mensal`

Na apuração mensal, a fração é **1/48**.

| Escrituração do CIAP | Tipo |
| --- | --- |
| CIAP C | Englobada |
| CIAP D | Individualizada |

## 7. NF-e e DANFE

> **NF-e ≠ DANFE**

| NF-e | DANFE |
| --- | --- |
| Documento fiscal eletrônico, de existência digital | Documento Auxiliar da NF-e |
| Arquivo XML | Representação auxiliar impressa |
| É o documento fiscal | Ajuda a acompanhar o trânsito e consultar a NF-e |

O DANFE pode apresentar, entre outras informações, a chave de acesso, o código de barras e o protocolo de autorização. **Ele não é a NF-e e não a substitui.**

## 8. Modelos 55 e 65

| Modelo | Documento | Uso associado |
| --- | --- | --- |
| 55 | NF-e | Documento fiscal eletrônico tradicional |
| 65 | NFC-e | Venda a consumidor final |

## 9. Autorização de Uso da NF-e

Memorize o fluxo básico:

**Gerar XML → assinar digitalmente → transmitir à SEFAZ → verificação → Autorização de Uso**

Com a autorização, a NF-e passa a ser o documento fiscal. Em regra, sem autorização não ocorre o trânsito da mercadoria, ressalvadas as hipóteses de contingência previstas na legislação.

## 10. Eventos da NF-e

Evento é o registro de uma ocorrência relacionada ao documento fiscal eletrônico. Ele pode alterar a situação do documento ou apenas registrar ciência/ocorrência.

| Responsável | Exemplos |
| --- | --- |
| Emitente | Carta de Correção Eletrônica (CC-e), cancelamento e EPEC |
| Destinatário | Confirmação, ciência, desconhecimento ou operação não realizada |
| Fisco | Manifestação do Fisco e registro de passagem |

## O que priorizar para a prova

### Prioridade 1

1. Conceito e objetivos do SPED
2. EFD e livros substituídos
3. Blocos da EFD
4. Diferença entre C100 e C170
5. NF-e e DANFE
6. Modelos 55 e 65

### Prioridade 2

1. Bloco E — registros E110 e E210
2. Bloco G e CIAP
3. Cancelamento da NF-e
4. Carta de Correção Eletrônica
5. Eventos da NF-e
6. Modelo operacional da NF-e

## Revisão relâmpago

- **NF-e:** documento digital em XML.
- **DANFE:** auxiliar; não substitui a NF-e.
- **55:** NF-e. **65:** NFC-e.
- **C100:** documento. **C170:** itens.
- **G:** CIAP. **E:** apuração. **H:** inventário. **K:** produção/estoque.
- **EFD recebida ≠ EFD homologada.**
