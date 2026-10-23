# Tipos de dados

## Visão geral

Os dados podem ser classificados conforme o grau de organização e a existência de um esquema predefinido.

| Tipo | Organização | Exemplos |
| --- | --- | --- |
| **Estruturados** | Esquema predefinido, geralmente tabular | Tabelas relacionais |
| **Semiestruturados** | Organização flexível, por chaves, tags ou hierarquia | JSON, XML, HTML e logs |
| **Não estruturados** | Sem esquema predefinido de campos | Texto livre, imagens, áudio e vídeo |

## 1. Dados estruturados

São organizados de acordo com um esquema predefinido, normalmente em linhas e colunas.

**Características**

- Possuem estrutura e campos definidos.
- Facilitam consultas, filtros, ordenações e operações estatísticas.
- São comuns em bancos de dados relacionais.
- Geralmente permitem validação por tipos e restrições.

**Exemplo: tabela de contribuintes**

| CPF | Nome | Município | Valor devido |
| --- | --- | --- | --- |
| 111... | Ana | Maceió | 500,00 |
| 222... | João | Arapiraca | 750,00 |

## 2. Dados semiestruturados

Apresentam alguma organização, mas não precisam seguir um esquema tabular rígido. Podem usar tags, chaves, valores ou estruturas hierárquicas.

**Exemplos**

- **JSON:** pares de chave e valor, com possibilidade de objetos e listas.
- **XML:** tags delimitam e hierarquizam elementos.
- **HTML:** elementos e tags estruturam o conteúdo de páginas.
- **Logs:** podem conter campos identificáveis.

**Exemplo em JSON**

```json
{
  "nome": "Ana",
  "municipio": "Maceió",
  "valor_devido": 500
}
```

## 3. Dados não estruturados

Não seguem um esquema de campos predefinido como o de uma tabela relacional. Seu armazenamento, busca e análise podem exigir técnicas específicas.

**Exemplos**

- Documentos com texto livre.
- Imagens e fotografias.
- Arquivos de áudio e vídeo.
- Mensagens de e-mail sem formato padronizado.

Uma imagem pode ser analisada para extrair informações, por exemplo, com reconhecimento de imagem. Isso não altera sua classificação original como dado não estruturado.

## Comparação para prova

| Característica | Estruturados | Semiestruturados | Não estruturados |
| --- | --- | --- | --- |
| Organização | Predefinida | Flexível ou hierárquica | Sem esquema predefinido |
| Esquema rígido | Geralmente sim | Não necessariamente | Geralmente não |
| Exemplos | Tabelas SQL | JSON e XML | Imagens, áudio e vídeo |
| Consulta tabular | Geralmente fácil | Depende da estrutura e das ferramentas | Geralmente mais difícil |

## Pegadinhas comuns

- **Estruturado não significa necessariamente numérico:** nomes, endereços e datas também podem ser dados estruturados quando ocupam campos definidos.
- **Semiestruturado não significa desorganizado:** JSON e XML têm estrutura, mas ela é mais flexível que a de uma tabela relacional tradicional.
- **Não estruturado não significa impossível de analisar:** textos, imagens e áudios podem ser processados com mineração de dados, processamento de linguagem natural e inteligência artificial.
- **Armazenamento não define a classificação:** dados não estruturados também podem ser armazenados em bancos de dados.
- **A classificação depende da organização dos dados**, não apenas do formato ou da extensão do arquivo.

## Revisão rápida

**Estruturado:** esquema predefinido.

**Semiestruturado:** organização flexível, como chaves ou tags.

**Não estruturado:** sem esquema predefinido de campos.
