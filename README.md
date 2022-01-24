# PROJETOS Módulo 1

## **PROJETO | A Jornada do Herói**

Hoje nós começamos o nosso primeiro projeto entregável! Esse projeto vai avaliar os conteúdos passados durante essa primeira semana, e se você consegue desenvolver uma programação utilizando todos eles.

Você poderá usar as aulas de Codelab para trabalhar no seu projeto.

A premissa é a seguinte: O nosso herói chegou ao fim da sua jornada, ao desafio final, e você pode criar um background legal resumindo qual foi essa jornada e onde ele chegou. Use sua criatividade! Vale qualquer coisa: Uma guerreira que percorreu um longo caminho para enfrentar um bruxo e salvar seu povo, um astronauta que teve que viajar aos confins da galáxia para deter uma anomalia que iria engolir seu planeta, ou uma pessoa que está voltando para casa ao fim de um dia cansativo e precisa fazer o jantar.

Dependendo de como foi sua jornada, dos objetivos que foram concluídos no caminho, teremos um resultado final diferente.

### **Requisitos**

Você deve criar um programa que faça 5 perguntas para o usuário, e dependendo das respostas, vai exibir um resultado diferente no final. As perguntas devem ser todas de Sim ou Não, e devem ser referentes aos objetivos que ele tiveram que ser cumpridos durante a jornada, por exemplo: "Você conseguiu encontrar a Espada Mágica da Chama da Estrela do Inverno?", "Você conseguiu consertar os reatores nucleares do motor de dobra?", "Você se lembrou de passar no mercado e comprar óleo?"

No final, o programa deve fazer uma contagem de quantas respostas foram Sim, e exibir o resultado de acordo com esse número:

- 0 respostas Sim: Você falha miseravelmente.
- 1 ou 2 respostas Sim: Você falha, mas ainda consegue fugir da situação.
- 3 respostas Sim: Você chega perto de conseguir alcançar seu objetivo, mas acaba falhando por pouco.
- 4 respostas Sim: Depois de muito esforço você conquista seu objetivo, embora não de maneira perfeita.
- 5 respostas Sim: Você triunfa de maneira inquestionável e seus feitos serão lembrados por muitas gerações.

O programa deve contar a história inicial (background), fazer as perguntas, e ao final, exibir o resultado de acordo com as situações acima.

### **Para hoje**

- Construir o rascunho da sua história
- Criar as variáveis com o prompt para fazer as perguntas e receber as respostas
- Exibir ao final o valor de cada uma das respostas

---

## **PROJETO 1 | Continuação**

Agora seu projeto já deve estar ganhando forma, você já tem as perguntas a serem feitas, e já sabe como usar o if para exibir diferentes resultados de acordo com cada situação.

### **Para hoje**

- Pensar na melhor maneira de contar as respostas Sim do usuário.
- Escrever um programa que dependendo do número de respostas Sim exiba um console.log() diferente.

Esses são os requisitos básicos para o seu projeto, que serão considerados essenciais na avaliação. Mas nada impede que você implemente novas funcionalidades! Você pode tanto usar o que foi visto em aula para tornar o seu programa ainda mais interessante, quanto usar coisas que ainda não foram vistas no curso, mas que você pode pesquisar por conta própria e implementar!

Todos que apresentarem um projeto funcional receberão um certificado por ele! E aqueles que apresentarem funcionalidades inovadoras, ou seja, que vão além do que foi visto em aula, receberão um certificado de projeto destaque!

Seja criativo, e caso tenha qualquer dúvida, não hesite em falar com o(a) professor(a)!

---

## **PROJETO 2 | Jokenpô**

O Jokenpô é o popular jogo do "Pedra, papel e tesoura". A premissa é simples, você tem 3 elementos para escolher, e cada um deles vence de um, e perde para o outro.

- Pedra ganha da tesoura, mas perde para o papel;
- Tesoura ganha do papel, mas perde para a pedra;
- Papel ganha da pedra, mas perde para a tesoura.

E para esse projeto você deve desenvolver um programa capaz de :

- Receber o elemento escolhido pelo usuário;
- Escolher um elemento aleatório para o computador;
- Comparar os dois elementos e declarar um vencedor.

Você pode adaptar o jogo ao seu projeto criado anteriormente (por exemplo fazer um: "Espada, Escudo e Magia") para incrementar ainda mais o seu projeto. Apenas lembre-se de deixar claro para o usuário como funcionará o jogo nesse caso (quem ganha e quem perde de quem).

### **Requisitos**

Para esse projeto, os requisitos fundamentais serão:

+ Permitir que eu decida quantas rodadas iremos fazer;
+ Ler a minha escolha (Pedra, papel ou tesoura, ou os elementos escolhidos por você para o seu jogo);
+ Decidir de forma aleatória a decisão do computador;
+ Comparar os valores e declarar o vencedor (marcando 1 vitória para ele);
+ Repetir os passos 2, 3 e 4 de acordo com o número de rodadas escolhido;
+ Ao final das repetições, mostrar quantas rodadas cada jogador ganhou;
+ Determinar quem foi o grande campeão de acordo com a quantidade de vitórias de cada um (computador e jogador);
+ Perguntar se o Jogador quer jogar novamente: Se sim volte ao primeiro passo, se não finalize o programa.

## **Para hoje**

O projeto é extenso, e temos muito o que fazer! Mas vamos começar por partes. Para hoje seus objetivos são:

+ Criar uma lista com os elementos a serem escolhidos;
+ Criar as variáveis que receberão as escolhas do usuário e do computador (prompt para o usuário, e aleatório para o computador);
+ Fazer a validação da entrada do usuário (o programa só deve aceitar o que foi definido por você como entradas válidas);
+ Exibir o elemento da lista correspondente à escolha de cada um;
+ Comparar os elementos e exibir quem foi o vencedor dessa rodada.