const prompt = require('prompt-sync')();
console.log();
console.log('Bem-vindo ao KENPO-CASTLE! Aqui você jogará um JOKENPO no estilo medieval!');
console.log();
let nome = prompt('Digite o seu nome: ').trim();
let reino = prompt('Digite o seu Reino: ').trim();
console.log();
console.log(`[JUIZ]: Olá, nobre ${nome}! Seja bem-vindo(a) à minha taverna! Como anda ${reino}? Faz tempo que não passo por lá...
Enfim, vamos iniciar o campeonato anual de JOKENPO medieval!`);
console.log();
console.log(`[JUIZ]: Como é o primeiro dia, só temos um inscrito junto com você! O seu adversário é o Cavaleio Godze do reino de Azedron!`)
console.log();
console.log(`[JUIZ]: ${nome} as regras são simples:

1- ESCUDO ganha de ESPADA mas perde para MANTO;
2- ESPADA ganha de MANTO mas perde para ESCUDO;
3- MANTO ganha de ESCUDO mas perde para ESPADA.`);
console.log();
console.log(`[JUIZ]: Regras simples pra quem vem de ${reino} não acha?`);
console.log();
console.log('[JUIZ]: Ah, mais uma coisa... Você joga na mesma hora que Godze para evitar trapaças! Terá também um placar para ir vendo quem está ganhando ou perdendo!');
console.log();

const computador = ['ESCUDO',['ESPADA'],['MANTO']];
console.log();
let resposta = '';
while(resposta!='N'){
let contRodadas=0;
let Uvitoria = 0;
let empate= 0;
let Cvitoria =  0;

let rodadas;
// let rodadas=prompt('Digite a quantidade de RODADAS que você irá apostar: ').trim();
let nAleatorio = '';
let rAleatorio = '';
let Uescolha ='';

while(true){
    console.log('Você só pode digitar números em RODADAS!')
    rodadas=prompt('Digite a quantidade de RODADAS que você irá apostar: ').trim();

    if(!isNaN(rodadas) && rodadas>0 && rodadas % 1 == 0 && rodadas.length !=0){
        break;
    }
    console.log(`Você deve digitar um número válido!`);
}
console.log();
console.log(`[JUIZ]: VAMOS PRO JOGO! BOA SORTE, ${nome}!`)
console.log();
    for(let i=0; i<parseInt(rodadas);i++){
    contRodadas++;
    nAleatorio = [Math.floor((Math.random() * computador.length))]
    rAleatorio = computador[nAleatorio];
    console.log(`${nome} venceu: ${Uvitoria} -- Godze venceu: ${Cvitoria} -- EMPATES: ${empate}`);
    console.log();
    while(Uescolha!='ESCUDO'|| Uescolha!='ESPADA'|| Uescolha!='MANTO'){
    console.log();
    console.log();
    Uescolha = prompt(`${nome}, escolha entre: ESCUDO, ESPADA ou MANTO: `).toUpperCase().trim();
    if(Uescolha=='ESCUDO'||Uescolha=='ESPADA'||Uescolha=='MANTO')
    break;
    }
    console.log();
    if(rAleatorio==Uescolha){
        console.log();
        console.log(`[JUIZ] ${nome}, você escolheu ${Uescolha} e Godze ${rAleatorio} e vocês empataram!`);
        console.log();
        empate++;
        
    }
    else if ((rAleatorio=='ESCUDO' && Uescolha =='MANTO') || rAleatorio=='ESPADA' && Uescolha=='ESCUDO' || rAleatorio=='MANTO' && Uescolha=='ESPADA'){
        console.log();
       console.log(`[JUIZ] ${nome}, você escolheu ${Uescolha} e o Godze ${rAleatorio} e você ganhou essa rodada!`);
       console.log();
        Uvitoria++;
        
    }
    else{
        console.log();
        console.log(`[JUIZ] ${nome}, você escolheu ${Uescolha} e o Godze ${rAleatorio} e você perdeu essa rodada...`);
        console.log();
        Cvitoria++;
        
    }
    }
    console.log();     
console.log();
console.log(`[JUIZ] No final de tudo, jogamos ${contRodadas} rodadas e ${nome} venceu: ${Uvitoria}, Godze ${Cvitoria} e teve ${empate} empates!`)
console.log();

if(Uvitoria>Cvitoria){
    console.log();
    console.log(`[JUIZ] PARABÉNS, ${nome}! Você ganhou: ${Uvitoria}, o Godze ${Cvitoria} e teve ${empate} empates!`);
    console.log(`${nome}, do reino de ${reino}, É O(a) NOVO(a) CAMPEÃO(ã)`);
    console.log();
}else if(Uvitoria==Cvitoria){
    console.log();
    console.log(` [JUIZ] ${nome}, você venceu ${Uvitoria} e o Godze ${Cvitoria} e terminou em EMPATE!`)
    console.log();
}
else{
    console.log();
    console.log(`[JUIZ] ${nome}, infelizmente não teves sorte hoje. Você ganhou ${Uvitoria} e o Godze ganhou ${Cvitoria}, os empates deram: ${empate}`)
    console.log('Godze, do reino de Azedron, É O NOVO CAMPEÃO!');
    console.log();
}
while(resposta!='S'||resposta!='N'){
    resposta=prompt('Deseja jogar mais uma partida? [S] ou [N]: ').toUpperCase().trim();
    if(resposta=='S'|| resposta=='N'){
        break;
    }   
    }
console.log();
}
console.log(`Obrigado por ter jogado, ${nome}! Dúvidas, susgestões e etc -> kellbberbarcarolo@gmail.com `);
console.log();