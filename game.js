//variáveis da bolinha: 
let xBolinha = 300;
let yBolinha =100;
let diametroBolinha = 20;
let raioBolinha = diametroBolinha / 2;
let velocidadexBolinha = 5;
let velocidadeyBolinha = 5;

//variáveis da raquete:
let xRaquete = 10;
let yRaquete = 160;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//váriaveis da raquete do oponente:
let xRaqueteOponente = 580;  
let yRaqueteOponente = 160; 
let velocidadeXOponente;
let velocidadeYOponente;
let chanceDeErrar = 0;

//Sons do jogo:
let ponto;
let raquetada;
let trilha;
  
function preload() {
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3"); 
  trilha = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//Placar do jogo:

let meusPontos = 0;
let pontosOponente = 0;

function draw() {
  background(100);
  mostraBolinha();
  movimentoBolinha();
  limiteBorda();
  mostraRaquete1(xRaquete, yRaquete,
                 fill(color(100,100,255)));
  mostraRaquete1(xRaqueteOponente, yRaqueteOponente,
                 fill(color(255,100,100)));
  movimentaMinhaRaquete();
//  verificaColisaoRaquete(); já existe uma função 
  colisaoRaquete(xRaquete,yRaquete);
  colisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  desprenderBolinha();
  fimDeJogo();
}

// criação de funções:

function movimentoBolinha(){

xBolinha += velocidadexBolinha;
yBolinha += velocidadeyBolinha;   
}

function limiteBorda(){
if (xBolinha + raioBolinha > width ||
    xBolinha - raioBolinha < 0){ 
  velocidadexBolinha *= -1;
}
if (yBolinha + raioBolinha > height || 
    yBolinha - raioBolinha < 0){
  velocidadeyBolinha *= -1;
  }
}

function mostraBolinha(){
circle(xBolinha, yBolinha, diametroBolinha)
}

function mostraRaquete1(x,y){
rect(x, y, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

// função desativada no jogo, foi substituida.
function verificaColisaoRaquete(){
  if (xBolinha - raioBolinha < xRaquete + raqueteComprimento &&
      yBolinha - raioBolinha < yRaquete + raqueteAltura &&
      yBolinha - raioBolinha > yRaquete){
  velocidadexBolinha *= -1;
    raquetada.play();
      }    
}

function colisaoRaquete(x,y) {
  colidiu =  collideRectCircle(x,y,raqueteComprimento,raqueteAltura,
                               xBolinha,yBolinha,raioBolinha);
  if (colidiu){
    velocidadexBolinha *= -1
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 20;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}
function calculaChanceDeErrar() { 
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
      chanceDeErrar = 40;
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35
    }
  } 
}

function desprenderBolinha(){
  if (xBolinha >= 595){
    xBolinha = 575;    
  }
  if (xBolinha <=5){
    
    xBolinha = 25
  }
}

function incluiPlacar() {
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(100,100,255))
  rect(180,10,40,20);
  fill(255);
  text(meusPontos, 200, 26);
  fill(color(255,100,100))
  rect(420,10,40,20);
  fill(255);
  text(pontosOponente,440,26); 
}

function marcaPonto(){
  if(xBolinha > 590){
  meusPontos += 1
  ponto.play();
  }
  if(xBolinha < 10){
  pontosOponente += 1
    ponto.play();
  }
}

function fimDeJogo(){
  if (meusPontos == 5){
    textSize(50);
    fill(255);
    text('Você Venceu!',300,200);
    draw.stop();
}
  if (pontosOponente == 5){
    textSize(50);
    fill(255);
    text('Você Perdeu...',300,200);
    draw.stop();
  }
}
