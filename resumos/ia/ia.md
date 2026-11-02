# Inteligência Artificial

## 2.1. Conceitos fundamentais

Inteligência Artificial (IA) é o campo da Ciência da Computação que busca desenvolver sistemas capazes de executar tarefas que normalmente exigiriam inteligência humana, como aprender, raciocinar, reconhecer padrões e tomar decisões.

### Características dos sistemas de IA

- **Aprendizado:** melhoram seu desempenho a partir de dados.
- **Adaptação:** ajustam seu comportamento a novas informações.
- **Autonomia:** executam ações sem intervenção humana direta.
- **Raciocínio:** analisam informações e identificam padrões.
- **Interação:** comunicam-se com humanos por linguagem, imagens ou sensores.

### Hierarquia dos conceitos

- **Inteligência Artificial:** campo mais amplo.
- **Machine Learning:** subcampo da IA.
- **Deep Learning:** subcampo do Machine Learning, baseado em redes neurais profundas.

O **Teste de Turing**, proposto por Alan Turing, busca avaliar se uma máquina consegue apresentar comportamento conversacional indistinguível do humano.

## 2.2. Ontologias

Ontologia é uma representação formal e estruturada do conhecimento de determinado domínio. Define conceitos, categorias, propriedades e relações entre entidades.

### Ontologia e banco de dados

- **Banco de dados:** organiza e armazena dados.
- **Ontologia:** representa o significado dos dados e as relações entre eles.

Ontologias são utilizadas para integração de fontes heterogêneas, organização semântica e inferência lógica.

## 2.3. Classificação dos tipos de IA

### Classificações por capacidade

| Tipo | Característica |
|---|---|
| IA fraca | Executa tarefas específicas, sem consciência |
| IA forte | Teria consciência e inteligência geral; ainda teórica |
| ANI | Inteligência artificial estreita, especializada |
| AGI | Inteligência geral comparável à humana |
| ASI | Superaria amplamente a inteligência humana |

### Classificação por função

- **IA discriminativa:** identifica, classifica ou separa dados.
- **IA generativa:** cria novos conteúdos com base nos padrões aprendidos.

O ChatGPT é um exemplo de IA fraca e generativa.

## 2.4. Riscos e desafios

A utilização da IA exige atenção à ética, à segurança e à responsabilidade.

### Matriz FAT

| Princípio | Significado |
|---|---|
| Fairness | Justiça e tratamento equitativo |
| Accountability | Responsabilidade e possibilidade de revisão |
| Transparency | Transparência sobre funcionamento e limitações |

### Principais riscos

- **Desinformação:** geração e disseminação de conteúdos falsos.
- **Deepfake:** conteúdo artificial que simula pessoas ou acontecimentos reais.
- **Violação de direitos autorais:** utilização indevida de obras protegidas.
- **Viés algorítmico:** resultados discriminatórios ou distorcidos.
- **Alucinação:** geração de informações falsas apresentadas como verdadeiras.
- **Desatualização:** respostas que não refletem informações recentes.
- **Dados sensíveis:** exposição ou utilização inadequada de informações privadas.

> **Atenção:** a supervisão humana é indispensável. A IA pode auxiliar decisões, mas seus resultados devem ser verificados.

## 2.5. IA generativa e modelos de linguagem

A IA generativa produz novos conteúdos, como textos, imagens, vídeos, áudios e códigos.

### Modelos de linguagem

Os **LLMs** (*Large Language Models*) são grandes modelos de linguagem treinados com grandes volumes de dados textuais. Seu funcionamento envolve a identificação de padrões e a previsão probabilística dos próximos tokens.

**Tokenização** é o processo de dividir textos em unidades menores chamadas tokens.

> **Não confunda:** gerar conteúdo não é o mesmo que recuperar informações. Um modelo generativo pode produzir uma resposta coerente, mas isso não garante que ela seja verdadeira.

## 2.6. Arquiteturas de treinamento

| Arquitetura | Característica principal |
|---|---|
| MLP / Feed-forward | Dados fluem da entrada para a saída |
| CNN | Especializada em padrões visuais e imagens |
| RNN | Processa sequências e mantém estados anteriores |
| Transformer | Utiliza mecanismo de atenção e processamento paralelo |
| GAN | Duas redes competem: geradora e discriminadora |
| VAE | Utiliza encoder, decoder e espaço latente probabilístico |
| Difusão | Gera conteúdo revertendo gradualmente a adição de ruído |

### GAN: geradora e discriminadora

- **Geradora:** produz dados sintéticos.
- **Discriminadora:** avalia se os dados parecem reais.
- As duas redes são treinadas em competição.

### Transformer e atenção

O Transformer utiliza o mecanismo de atenção (*attention*) para identificar relações e dependências entre elementos de uma sequência. É a base de modelos como GPT e BERT.

## 2.7. Agentes de IA

Agente é uma entidade que percebe o ambiente por sensores, toma decisões e executa ações por atuadores para atingir objetivos.

O **agente racional** escolhe a ação que maximiza seu desempenho esperado, considerando as informações disponíveis e as limitações do ambiente.

### Principais tipos de agentes

- **Reativo:** utiliza a percepção atual e regras simples.
- **Baseado em modelo:** mantém uma representação interna do ambiente.
- **Baseado em objetivo:** escolhe ações para alcançar uma meta.
- **Baseado em utilidade:** busca maximizar uma função de utilidade.
- **De aprendizado:** melhora com experiências e feedback.
- **Deliberativo:** analisa alternativas e planeja antes de agir.
- **Híbrido:** combina reação e planejamento.
- **Multiagente:** interage com outros agentes.
- **Cognitivo:** utiliza modelos inspirados em processos mentais.
- **Social:** interage considerando contexto e normas sociais.

## 2.8. Engenharia de prompt

Engenharia de prompt é a prática de criar e ajustar instruções para orientar modelos generativos e obter respostas mais precisas e úteis.

Não é um algoritmo nem exige necessariamente retreinamento do modelo.

### Principais técnicas

| Técnica | Característica |
|---|---|
| Zero-shot | Solicitação sem fornecer exemplos |
| One-shot | Solicitação com um exemplo |
| Few-shot | Solicitação com poucos exemplos |
| Chain-of-Thought | Orientação para estruturar o raciocínio em etapas |

Quanto mais claro o contexto, o objetivo e o formato esperado, maior a possibilidade de obter uma resposta adequada.

## 2.9. Aplicações profissionais e públicas

A IA pode auxiliar na automação de tarefas repetitivas, na análise de grandes volumes de dados e na identificação de padrões.

### Aplicações na Administração Pública

- Auditoria e detecção de fraudes.
- Pesquisa jurídica e documental.
- Segurança da informação.
- Atendimento ao cidadão.
- Análise de processos.
- Apoio à tomada de decisões.

> **Atenção:** a qualidade dos resultados depende dos dados fornecidos, da configuração do sistema e da supervisão humana.
