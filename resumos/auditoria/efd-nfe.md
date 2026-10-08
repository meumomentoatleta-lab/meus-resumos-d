📚 Resumo — principais pontos e dicas para concurso

1. EFD-ICMS/IPI: memorize o ciclo
   A lógica da EFD pode ser resumida assim:
   GERAR → VALIDAR → ASSINAR → TRANSMITIR → RECEBER RECIBO

O arquivo é submetido ao programa validador, que verifica a consistência e outros requisitos. Depois ocorre a assinatura digital e a transmissão.
⚠️ Pegadinha
Recepção da EFD não significa homologação.
A entrega/recepção não significa que o Fisco reconheceu como verdadeiras as informações ou homologou a apuração do imposto. 2. "Totalidade das informações" é um ponto forte
A EFD não se limita simplesmente às notas fiscais.
Ela pode conter informações relacionadas a:

- entradas;
- saídas;
- serviços;
- produtos;
- matérias-primas;
- produção;
- consumo de insumos;
- estoque;
- inventário;
- apuração;
- pagamento;
- cobrança de tributos.
  E as situações de exceção tributária também devem ser informadas:
  Isenção + imunidade + não incidência + diferimento + suspensão.

3. Assinatura da EFD — cuidado com os detalhes
   O PDF trabalha uma questão bastante específica sobre quem pode assinar a EFD.
   Um detalhe que pode virar pegadinha:
   e-PJ/e-CNPJ → 8 primeiros caracteres do CNPJ.

Não são 9.
Também aparecem:

- e-PF/e-CPF do produtor rural ou representante legal;
- sucessora em determinadas hipóteses;
- procurador eletrônico;
- inventariante com procuração eletrônica.

4. NF-e — conceito fundamental
   A NF-e é:
   documento fiscal de existência exclusivamente digital, emitido e armazenado eletronicamente.

Sua validade jurídica está relacionada à:
assinatura eletrônica qualificada + autorização de uso pelo Fisco.
A NF-e corresponde ao modelo 55. 5. NF-e × DANFE
Essa é uma das maiores pegadinhas do assunto.
NF-e
É o documento fiscal eletrônico.
DANFE
É o Documento Auxiliar da NF-e.
Portanto:
❌ DANFE não é a NF-e.
❌ DANFE não substitui a NF-e.
✅ NF-e é o documento eletrônico, normalmente representado pelo XML.
✅ DANFE é a representação gráfica auxiliar.

O DANFE serve principalmente para acompanhar o trânsito da mercadoria e permitir a consulta da NF-e. 6. Modelo 55 × Modelo 65
Decore:
Modelo Documento
55 NF-e
65 NFC-e

A NF-e modelo 55 substitui documentos fiscais em papel, como os modelos 1 e 1-A, nas hipóteses previstas.
A NFC-e modelo 65 está associada às operações de venda no varejo ao consumidor final. 7. Cancelamento da NF-e
Uma questão praticamente obrigatória para decorar:
24 horas + sem circulação/prestação/vinculação à Duplicata Escritural.

Em regra, o cancelamento deve ser solicitado em prazo não superior a 24 horas, contado da concessão da Autorização de Uso.
Além disso:

- é realizado por registro de evento;
- o pedido é transmitido pela Internet;
- deve obedecer ao leiaute do MOC.
  ⚠️ Pegadinha
  A legislação admite que a UF, em casos excepcionais, possa recepcionar pedido de cancelamento extemporâneo.

8. Carta de Correção Eletrônica
   A CC-e pode corrigir determinados erros, mas existem limites.
   ❌ Não pode alterar:

- base de cálculo;
- alíquota;
- quantidade;
- preço;
- outras variáveis que determinem o valor do imposto;
- remetente;
- destinatário;
- data de emissão;
- data de saída.
  Macete:
  Se a alteração muda imposto, pessoa ou data → desconfie da CC-e.

9. Eventos da NF-e
   Evento é uma ocorrência relacionada ao documento fiscal eletrônico.
   O PDF divide os eventos conforme o responsável pelo registro.
   Emitente

- Cancelamento;
- CC-e;
- EPEC.
  Destinatário
- Confirmação da operação;
- Ciência da operação;
- Desconhecimento da operação;
- Operação não realizada.
  Fisco
- Manifestação do Fisco;
- Registro de passagem.
  Outros
- SUFRAMA;
- Averbação de exportação;
- Eventos propagados de outros documentos.

10. MOC — Manual de Orientação ao Contribuinte
    O MOC é extremamente importante porque consolida as especificações técnicas da NF-e/NFC-e.
    Entre seus conteúdos estão:

- padrões de comunicação;
- leiaute;
- regras de validação;
- especificações técnicas;
- integração entre contribuinte e Fisco.
  Para memorizar:
  MOC = manual técnico da NF-e.

11. XML e Schema XML
    A NF-e é estruturada em XML.
    O Schema XML funciona como uma especificação da estrutura que o arquivo deve obedecer.
    Ele determina:

- elementos;
- grupos;
- ordem;
- tipo de dado;
- tamanho;
- obrigatoriedade;
- opcionalidade.
  Se o XML não respeitar o Schema, pode ocorrer rejeição.
  Números importantes
  O material destaca:
  215 → Falha no Schema XML
  225 → Falha no Schema XML do lote de NF-e

12. UTF-8
    Questão clássica:
    A codificação de caracteres da NF-e é UTF-8.

Não confunda com:

- ISO-8859-1;
- PT-BR;
- ASCII.

13. Status da NF-e
    O fluxo de análise pode resultar em diferentes situações.
    Autorizada
    A NF-e recebeu autorização de uso.
    Rejeitada
    A NF-e apresenta alguma inconsistência.
    Importante: a NF-e rejeitada não fica arquivada e pode ser corrigida e retransmitida.
    Denegada
    O material apresenta o conceito histórico da denegação.
    Para fins de prova, é importante saber que a situação atualmente deve ser tratada com atenção porque os casos que anteriormente resultavam em denegação passaram a ser tratados como rejeição.
    🎯 O que mais vale revisar antes da prova
    Eu daria prioridade máxima a estes pontos da Aula 01:
    🔴 Prioridade máxima
1. NF-e = modelo 55
1. NFC-e = modelo 65
1. NF-e ≠ DANFE
1. NF-e = existência digital/XML
1. DANFE = documento auxiliar
1. 24 horas para cancelamento, em regra
1. Cancelamento exige ausência de circulação/prestação/vinculação à Duplicata Escritural
1. Limitações da CC-e
1. Eventos do emitente × destinatário × Fisco
1. MOC e Schema XML
1. UTF-8
1. Rejeição × autorização
1. 215 e 225 — falha no Schema XML
1. EFD: recepção não significa homologação
1. EFD: certificado A1/A3
   🧠 Macete final
   55 = NF-e
   65 = NFC-e
   XML = NF-e
   DANFE = auxiliar
   24h = cancelamento
   CC-e ≠ imposto/data/pessoa
   MOC = especificações técnicas
   Schema = estrutura do XML
   UTF-8 = codificação
   215/225 = Schema XML
   EFD recebida ≠ EFD homologada
