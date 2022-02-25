# ![logo BLUE](https://i.ibb.co/sHBwqxz/BLUE.gif "BLUE") **Simulador de votação**

A ideia deste projeto é criar um programa que simule uma votação com todo o conteúdo visto no módulo até este momento.

## O programa deve:

+ Receber votos até que o usuário diga que não tem mais ninguém para votar;

+ Ter uma função chamada autorizaVoto(anoNascimento) retornando: "Negado`, "Opcional" ou "Obrigatório";

+ Ter uma função chamada votacao(autorizacao, voto) que valida e contabiliza o voto (número entre 1 e 5) ou retorna a mensagem: "Você não pode votar", caso o voto não possa ser contabilizado;

+ Contabilizar os votos de acordo com os significados:  
-- 1 = Candidato 1  
-- 2 = Candidato 2  
-- 3 = Candidato 3  
-- 4 = Voto Nulo  
-- 5 = Voto em Branco  

+ Ter uma função chamada exibirResultados() que deve mostrar:
-- O total de votos para cada candidato  
-- O total de votos nulos  
-- O total de votos em branco  
-- Qual candidato venceu a votação  