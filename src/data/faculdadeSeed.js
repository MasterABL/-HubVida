export const faculdadeSeedData = [
  {
    order_index: 1,
    title: 'Introdução aos Modelos de Negócios',
    difficulty: 'Básico',
    content: [
      {
        type: 'concept',
        title: 'A Explicação de Base',
        text: 'Historicamente, na Administração Clássica de autores como Henri Fayol, o planejamento era um processo longo, rígido e altamente formal. O documento símbolo dessa era para novos empreendimentos é o `Plano de Negócios`, que costuma ter de 30 a 50 páginas detalhando análises de mercado. No entanto, com a velocidade da revolução digital, esse modelo tornou-se lento.\n\nHoje, entramos no conceito de `Modelo de Negócios`, que descreve a lógica de como uma organização cria, entrega e captura valor. Para facilitar isso, Alexander Osterwalder desenvolveu o `Business Model Canvas` (`BMC`), uma ferramenta de gerenciamento estratégico visual.'
      },
      {
        type: 'analogy',
        text: 'Pense no `Plano de Negócios` como o "memorial descritivo" de um prédio, cheio de textos técnicos. O `Modelo de Negócios` (Canvas) é a "maquete" ou a "planta baixa". Ele possui apenas uma página com 9 blocos interconectados, permitindo que a diretoria mova peças (ideias) rapidamente antes de gastar milhões na construção.'
      },
      {
        type: 'sidebar',
        text: 'O estrategista Michael Porter nos ensina que estratégia é escolher o que *não fazer*; o Canvas permite que a empresa visualize essas escolhas de forma ágil e integrada em uma única página.'
      },
      {
        type: 'example',
        title: 'Netflix e Uber',
        text: 'Modelos disruptivos superam modelos dominantes no mercado, como fez a Netflix (que popularizou o `Modelo de Assinatura`) e a Uber (`Modelo de Plataforma Multilateral`). O Canvas permite orquestrar essas inovações velozmente.'
      },
      {
        type: 'takeaway',
        text: 'Um Modelo de Negócio descreve a essência de como você gera valor; o Plano de Negócio é o documento burocrático de como operá-lo a longo prazo.'
      },
      {
        type: 'question',
        text: 'Qual é a principal diferença prática e conceitual entre um Plano de Negócios tradicional e um Modelo de Negócios ágil na ideação de uma startup?'
      }
    ]
  },
  {
    order_index: 2,
    title: 'Segmentos de Clientes e Oferta de Valor',
    difficulty: 'Básico',
    content: [
      {
        type: 'concept',
        title: 'Segmentos & Proposta de Valor',
        text: 'No planejamento estratégico, existe a máxima: "quem vende para todo mundo não vende para ninguém". O `Segmento de Clientes` define quem você atende (Nicho, Massa, etc). A `Oferta de Valor` resolve o problema do cliente através de uma equação simples: `Valor = Benefícios / Custo` (ou Esforço).'
      },
      {
        type: 'analogy',
        text: 'Em colchões, as molas ensacadas são funcionalidades do produto. A `Oferta de Valor` é uma "noite de sono revigorante". Você não vende a broca, você vende o furo na parede.'
      },
      {
        type: 'example',
        title: 'Southwest Airlines vs Hyatt',
        text: 'A Southwest foca no valor da "viagem barata e sem frescuras" para um `Mercado de Massa`. A rede Hyatt foca na "experiência de luxo personalizada" para um `Segmento Premium`. O `Fit` perfeito entre quem é o cliente e o valor entregue sustenta a empresa.'
      },
      {
        type: 'sidebar',
        text: 'Ao preencher o Canvas com post-its, a equipe costuma usar uma cor específica para cada `Persona` (Segmento) e a mesma cor para a `Oferta de Valor` correspondente, para garantir o encaixe.'
      },
      {
        type: 'takeaway',
        text: 'Valor só é percebido quando o benefício que o cliente recebe é superior ao "esforço" (dinheiro, risco, tempo) que ele gastou.'
      },
      {
        type: 'question',
        text: 'Se você gerenciasse um Banco Tradicional, qual Oferta de Valor específica você desenvolveria para evitar que jovens migrassem para o Nubank?'
      }
    ]
  },
  {
    order_index: 3,
    title: 'Tipos de Segmento e Mercado de Massa',
    difficulty: 'Intermediário',
    content: [
      {
        type: 'concept',
        title: 'A Escala do Mercado de Massa',
        text: 'O `Mercado de Massa` representa uma estratégia onde a empresa opta por produzir em grande escala e tentar atrair todos os tipos de compradores, sem discriminar segmentos específicos. Isso garante `Economia de Escala`.'
      },
      {
        type: 'example',
        title: 'O Modelo T de Henry Ford',
        text: 'A sociedade de consumo de massa nasceu com Henry Ford e o lançamento do Modelo T (1908). Ele aplicou a linha de produção, barateando o automóvel que antes era um item artesanal de luxo. Grande volume de vendas compensa a margem reduzida.'
      },
      {
        type: 'sidebar',
        text: 'Hoje, devido à proliferação das mídias digitais, o marketing de massa tradicional sofre para gerar ROI, obrigando as corporações a buscar o Micromarketing ou o `Nicho`.'
      },
      {
        type: 'analogy',
        text: 'Vender em massa hoje é como tentar pescar com uma rede gigante no oceano inteiro, enquanto a segmentação é usar sonares para jogar uma rede menor diretamente no cardume.'
      },
      {
        type: 'takeaway',
        text: 'A grande vantagem do mercado de massa é a diluição agressiva dos custos fixos, permitindo guerra de preços que novos entrantes não aguentam.'
      },
      {
        type: 'question',
        text: 'Como a inovação da "linha de montagem" ilustra a relação direta entre o Custo Unitário e o Preço de Venda?'
      }
    ]
  },
  {
    order_index: 4,
    title: 'Canais e Relacionamento',
    difficulty: 'Intermediário',
    content: [
      {
        type: 'concept',
        title: 'Canais de Distribuição e Touchpoints',
        text: 'No Canvas, o bloco de `Canais` descreve os pontos de contato (Distribuição, Vendas, Pós-venda). O `Relacionamento` define a natureza da ligação para atingir 3 objetivos: `Aquisição`, `Retenção` e `Upselling` (vender mais para o mesmo cliente).'
      },
      {
        type: 'analogy',
        text: 'Pense na Oferta de Valor como uma encomenda valiosa. O `Canal` é a rodovia e o veículo logístico. Já o `Relacionamento` é a atitude do entregador: ele apenas joga a caixa no chão (Autoatendimento) ou ele sabe seu nome e te atende com cuidado (Assistência Pessoal)?'
      },
      {
        type: 'example',
        title: 'O Funil do Starbucks',
        text: 'A rede Starbucks utiliza pontos físicos (`Canais Próprios`) para garantir uma atmosfera padrão. Mas utiliza aplicativos mobile para criar reciprocidade e gerar `Upselling` e `Retenção` altíssimos a custo marginal quase zero.'
      },
      {
        type: 'sidebar',
        text: 'Philip Kotler sempre alerta: conquistar um cliente novo custa de 5 a 7 vezes mais do que manter um cliente atual (Retenção).'
      },
      {
        type: 'takeaway',
        text: 'Canais são o "caminho"; o Relacionamento é o "motivo" para voltar a andar nele.'
      },
      {
        type: 'question',
        text: 'Para uma marca de relógios de alto luxo (Rolex), por que um canal próprio pode ser melhor que um canal pulverizado em marketplaces abertos?'
      }
    ]
  },
  {
    order_index: 5,
    title: 'Fontes de Receita e Recursos-Chave',
    difficulty: 'Avançado',
    content: [
      {
        type: 'concept',
        title: 'Como o Caixa Gira',
        text: 'As `Fontes de Receita` são a captura do valor. Podem ser Transacionais (uma vez) ou Recorrentes (`SaaS`, assinaturas). Os `Recursos-Chave` representam os ativos primários que possibilitam o negócio rodar: Físicos, Intelectuais, Humanos ou Financeiros.'
      },
      {
        type: 'analogy',
        text: 'Pense no corpo corporativo. Os `Clientes` são o coração, e as `Fontes de Receita` são as artérias que mantêm o fluxo de dinheiro circulando. Os `Recursos-Chave` são seus órgãos especializados: sem os certos, o sangue trava.'
      },
      {
        type: 'example',
        title: 'Ativos vs Assinaturas',
        text: 'A Intel necessita de enormes fábricas (`Recurso Físico`), dependendo de grandes aportes de capital. A Microsoft depende quase inteiramente de código protegido por direitos autorais (`Recurso Intelectual`) e programadores (`Recurso Humano`).'
      },
      {
        type: 'takeaway',
        text: 'Mudar a fonte de receita tradicional (venda direta) para o licenciamento continuado aumenta dramaticamente o `LTV` (Life-Time Value) de uma carteira de clientes.'
      },
      {
        type: 'question',
        text: 'Qual é a diferença prática e financeira entre uma Receita Transacional e uma Receita Recorrente predição de caixa?'
      }
    ]
  },
  {
    order_index: 6,
    title: 'Atividades, Parcerias e Estrutura de Custos',
    difficulty: 'Avançado',
    content: [
      {
        type: 'concept',
        title: 'OpEx, CapEx e Alianças',
        text: 'Sua vantagem dita o seu `Core Business` (Atividade-Chave). O resto deve ou pode ser terceirizado no bloco de `Parcerias` (Coopetição, Relação Fornecedor). Em termos de custo, o negócio pode ser `Cost-driven` (minimizar gastos a todo custo) ou `Value-driven` (criação de alto valor agregado sem medo de custos pesados de aquisição e retenção).'
      },
      {
        type: 'sidebar',
        text: 'Atenção aos jargões: `OPEX` (Despesas Operacionais repetitivas, custo da nuvem, salários) e `CAPEX` (Despesa de Capital, compra de máquinas, terrenos, softwares).'
      },
      {
        type: 'example',
        title: 'Coopetição no Blu-Ray',
        text: 'Historicamente, a Sony e a Philips desenvolveram o CD juntas e, mais tarde, um consórcio vasto de rivais eletrônicas liderou o consórcio do Blu-Ray. Isso dilui o risco extremo e altos custos do `CAPEX` investigativo em P&D.'
      },
      {
        type: 'analogy',
        text: 'As Parcerias-Chave são como amortecedores de carro. Elas distribuem e estabilizam os choques das oscilações de mercado entre você e uma rede de suporte externa, para que a cabine do passageiro (o seu `Core Business`) não sofra solavancos e danos diretos.'
      },
      {
        type: 'takeaway',
        text: 'Modelos `Value-driven` correm riscos letais sistêmicos em crises abruptas, pois seus altos custos fixos perdem a retaguarda das vendas premium.'
      },
      {
        type: 'question',
        text: 'Onde estaria o maior peso da Estrutura de Custos de uma nova rede de academia low-cost? Como isso define o modelo de negócios final?'
      }
    ]
  }
];
