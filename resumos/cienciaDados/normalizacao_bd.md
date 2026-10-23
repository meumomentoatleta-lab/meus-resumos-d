# Normalização de Banco de Dados

**SEFAZ-AL · Modelagem de dados e SQL**

A normalização organiza as tabelas de um banco de dados relacional para reduzir redundâncias, evitar anomalias e preservar a integridade dos dados.

## Objetivos da normalização

- Reduzir a repetição desnecessária de informações.
- Evitar inconsistências na inserção, atualização e exclusão.
- Organizar os relacionamentos entre tabelas.
- Preservar a integridade dos dados.

## Anomalias que ela busca evitar

| Anomalia        | O que acontece                                                                              |
| --------------- | ------------------------------------------------------------------------------------------- |
| **Inserção**    | Não é possível inserir determinada informação sem inserir outra desnecessária.              |
| **Atualização** | A mesma informação precisa ser alterada em vários registros, podendo gerar inconsistências. |
| **Exclusão**    | Ao excluir um registro, perde-se também uma informação que deveria ser preservada.          |

## Formas normais

### 1ª Forma Normal (1FN) — valores atômicos

Uma tabela está na 1FN quando cada atributo contém um único valor por campo, sem grupos repetitivos.

**Exemplo inadequado**

| Aluno | Telefones            |
| ----- | -------------------- |
| Ana   | 9999-1111, 9999-2222 |

**Como resolver:** separar os telefones em registros distintos ou criar uma tabela específica para armazená-los.

> **Palavra-chave de prova:** atomicidade dos valores.

### 2ª Forma Normal (2FN) — dependência da chave inteira

Uma tabela está na 2FN quando:

- está na 1FN; e
- todo atributo não-chave depende da chave primária inteira, sem depender apenas de parte de uma chave composta.

**Exemplo:** em `MATRICULA(id_aluno, id_disciplina, nome_aluno, nota)`, supondo a chave composta `(id_aluno, id_disciplina)`, `nome_aluno` depende apenas de `id_aluno`, não da chave inteira.

**Como resolver:** separar os dados do aluno em uma tabela própria.

> **Palavra-chave de prova:** eliminar dependências parciais.

### 3ª Forma Normal (3FN) — sem dependência transitiva

Uma tabela está na 3FN quando:

- está na 2FN; e
- não possui dependências transitivas inadequadas de atributos não-chave em relação à chave.

**Exemplo:** em `FUNCIONARIO(id_funcionario, id_departamento, nome_departamento)`, se `id_funcionario` determina `id_departamento` e `id_departamento` determina `nome_departamento`, há uma dependência transitiva.

**Como resolver:** criar uma tabela `DEPARTAMENTO` para armazenar o nome do departamento.

> **Palavra-chave de prova:** eliminar dependências transitivas.

### Forma Normal de Boyce-Codd (FNBC/BCNF) — determinantes como superchaves

A FNBC é mais restritiva que a 3FN. Uma relação está nessa forma quando, para toda dependência funcional não trivial **X → Y**, **X é uma superchave**.

> **Atenção:** uma tabela pode estar na 3FN e ainda não estar na FNBC.

## Quadro comparativo

| Forma normal | Exigência principal                                                  |
| ------------ | -------------------------------------------------------------------- |
| **1FN**      | Valores atômicos; sem grupos repetitivos.                            |
| **2FN**      | 1FN e ausência de dependência parcial de atributo não-chave.         |
| **3FN**      | 2FN e ausência de dependência transitiva inadequada.                 |
| **FNBC**     | Todo determinante de dependência funcional não trivial é superchave. |

## Revisão rápida

**1FN:** valor único por campo → **2FN:** dependência da chave inteira → **3FN:** sem dependência transitiva → **FNBC:** determinantes são superchaves.
