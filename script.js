/// @ts-check
/// <reference path=".gitpod/p5.global-mode.d.ts" />
"use strict";

/* 14 april tips van gee
* 1: zorg dat speler getekend wordt op plek x
*2 : test door aanpassen van spelerX en spelerY
*3: pas spelerX en spelerY aan bij toetsindruk
*/


/* Game opdracht
   Informatica - Emmauscollege Rotterdam
   Template voor een game in JavaScript met de p5 library

   Begin met dit template voor je game opdracht,
   voeg er je eigen code aan toe.
 */




/* ********************************************* */
/* globale variabelen die je gebruikt in je game */
/* ********************************************* */

const UITLEG = 0;
const SPELEN = 1;
const GAMEOVER = 2;
var spelStatus = SPELEN;

const KEY_LEFT = 65;
const KEY_RIGHT = 68;
const KEY_UP = 87;
const KEY_DOWN = 83;

var spelerX = 400; // x-positie van speler
var spelerY = 500; // y-positie van speler

var kogelX = 300;    // x-positie van kogel
var kogelY = 200;    // y-positie van kogel

var vijandX = 500;   // x-positie van vijand
var vijandY = 100;   // y-positie van vijand

var score = 0; // aantal behaalde punten





/* ********************************************* */
/*      functies die je gebruikt in je game      */
/* ********************************************* */


/**
 * Tekent het speelveld
 */
var tekenVeld = function () {
  fill("green");
  rect(20, 20, width - 2 * 20, height - 2 * 20);
};


/**
 * Tekent de vijand
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenVijand = function(x, y) {
      fill("salmon");
  rect(x,y, 50, 50);
  fill("Brown");
  rect(x,y,50,40);
  fill("salmon");
  rect(x+25,y+50,20,35);
  fill("salmon");
  rect(x+50,y+10,20,60);
   fill("red");
  rect(x+25,y+50,20,20);
   fill("red");
  rect(x+50,y+10,20,50); 

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
  fill("black");
  rect(450,y,10,25);


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill("salmon");
  rect(x, y, 50, 50);
  fill("Brown");
  rect(x,y+10,50,40);
  fill("salmon");
  rect(x+25,y-35,20,35);
  fill("salmon");
  rect(x+50,y-20,20,60);
   fill("lime");
  rect(x+25,y-20,20,20);
   fill("lime");
  rect(x+50,y-5,20,50); 
};


/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {
  kogelY = kogelY - 3

};


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
 if(keyIsDown(KEY_LEFT)) {
   spelerX=spelerX-4;
 }
 if(keyIsDown(KEY_RIGHT)) {
   spelerX=spelerX+4;
 }
  if(keyIsDown(KEY_UP)) {
   spelerY=spelerY-4;
 }
 if(keyIsDown(KEY_DOWN)) {
   spelerY=spelerY+4;
 }



};


/**
 * Zoekt uit of de vijand is geraakt
 * @returns {boolean} true als vijand is geraakt
 */
var checkVijandGeraakt = function() {

  return false;
};


/**
 * Zoekt uit of de speler is geraakt
 * bijvoorbeeld door botsing met vijand
 * @returns {boolean} true als speler is geraakt
 */
var checkSpelerGeraakt = function() {
    
  return false;
};


/**
 * Zoekt uit of het spel is afgelopen
 * @returns {boolean} true als het spel is afgelopen
 */
var checkGameOver = function() {
    
  return false;
};


/**
 * setup
 * de code in deze functie wordt één keer uitgevoerd door
 * de p5 library, zodra het spel geladen is in de browser
 */
function setup() {
  // Maak een canvas (rechthoek) waarin je je speelveld kunt tekenen
  createCanvas(1280, 720);

  // Kleur de achtergrond blauw, zodat je het kunt zien
  background('blue');
}


/**
 * draw
 * de code in deze functie wordt meerdere keren per seconde
 * uitgevoerd door de p5 library, nadat de setup functie klaar is
 */
function draw() {
  switch (spelStatus) {
    case SPELEN:
      beweegVijand();
      beweegKogel();
      beweegSpeler();
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      tekenVijand(vijandX, vijandY);
      tekenKogel(kogelX, kogelY);
      tekenSpeler(spelerX, spelerY);

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;
  }
}
