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

const AFKOELTIMERSTART = 60;
const AFKOELTIMERBEGIN = 60;
var afkoeltimer = 0;

const KEY_LEFT = 65;
const KEY_RIGHT = 68;
const KEY_UP = 87;
const KEY_DOWN = 83;
const KEY_SPACE = 32;
const KEY_SHIFT = 16;
const KEY_LEFTARROW = 37;
const KEY_RIGHTARROW = 39;
const KEY_DOWNARROW = 40;
const KEY_UPARROW = 38;

var spelerX = 550; // x-positie van speler
var spelerY = 500; // y-positie van speler

var kogelX = 300;    // x-positie van kogel
var kogelY = 200;    // y-positie van kogel

var vijandX = 550;   // x-positie van vijand
var vijandY = 100;   // y-positie van vijand

var bulletX = 400;
var bulletY = 200;

var kogelsY = [];
var kogelsX = [];

var bulletsY = [];
var bulletsX = [];


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
  fill("black");
  rect(x+35,y+50,15,50);
  rect(x+38,y+100,8,10);
 

};


/**
 * Tekent de kogel of de bal
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenKogel = function(x, y) {
  fill("black");
  rect(x + 35,y - 45,8,25);


};

var tekenBullet = function(x, y) {
  fill("black");
  rect(x + 35,y + 60 ,8,25);


};


/**
 * Tekent de speler
 * @param {number} x x-coördinaat
 * @param {number} y y-coördinaat
 */
var tekenSpeler = function(x, y) {
  fill("salmon");
  rect(x, y,50,50);
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
  fill("black")
  rect(x+35,y-50,15,50);
  rect(x+38,y-60,8,10);
};





/**
 * Updatet globale variabelen met positie van vijand of tegenspeler
 */
var beweegVijand = function() {
    if(keyIsDown(KEY_RIGHTARROW)) {
      vijandX=vijandX+5;
    }

    if(keyIsDown(KEY_UPARROW)) {
      vijandY=vijandY-5;
    }

    if(keyIsDown(KEY_DOWNARROW)) {
      vijandY=vijandY+5;
    }
    
        if(keyIsDown(KEY_LEFTARROW)) {
      vijandX=vijandX-5;
    }
};


/**
 * Updatet globale variabelen met positie van kogel of bal
 */
var beweegKogel = function() {
  for (var i = 0; i < kogelsY.length; i++) {
        kogelsY[i] = kogelsY[i] - 6;
      };


if (afkoeltimer <= 0 ) {

 if(keyIsDown(KEY_SPACE)) {
 kogelsX.push(spelerX);
  kogelsY.push(spelerY);
 afkoeltimer = AFKOELTIMERSTART;
 }
}
afkoeltimer=afkoeltimer -1;
 

};

var  decoration = function() {
  fill("lightblue")
  rect(400,250,75,75)
  fill("grey")
  rect(300,150,75,75)
  fill("white")
  rect(1000,600,75,75)
  fill("lightgrey")
  rect(1150,200,75,75)
  rect(250,550,75,75)
  fill("Brown")
  rect(900,500,30,90)
  fill("darkgreen")
  circle(915,500,75)
  fill("Brown")
  rect(200,200,30,90)
  fill("darkgreen")
  circle(215,200,75)
}


var beweegBullet = function() {
   for (var j = 0; j < bulletsY.length; j++) {
        bulletsY[j] = bulletsY[j] + 6;
      };

if (afkoeltimer <= 0 ) {
if(keyIsDown(KEY_SHIFT)) {
 bulletsX.push(vijandX);
  bulletsY.push(vijandY);
  afkoeltimer = AFKOELTIMERBEGIN;
 }
}
afkoeltimer=afkoeltimer -1;

}


/**
 * Kijkt wat de toetsen/muis etc zijn.
 * Updatet globale variabele spelerX en spelerY
 */
var beweegSpeler = function() {
 if(keyIsDown(KEY_LEFT)) {
   spelerX=spelerX-5;
 }
 if(keyIsDown(KEY_RIGHT)) {
   spelerX=spelerX+5;
 }
  if(keyIsDown(KEY_UP)) {
   spelerY=spelerY-5;
 }
 if(keyIsDown(KEY_DOWN)) {
   spelerY=spelerY+5;
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
  for(var i = 0; i < bulletsX.length; i++) {
    if (bulletsX[i] > spelerX - 50 &&
    bulletsX[i] < spelerX + 37 &&
    bulletsY[i] > spelerY - 20 &&
    bulletsY[i] < spelerY + 50) {
      console.log ("geraakt!!");
      return true
    }
  }

    for(var i = 0; i < kogelsX.length; i++) {
    if (kogelsX[i] > vijandX - 50 &&
    kogelsX[i] < vijandX + 37 &&
    kogelsY[i] > vijandY - 20 &&
    kogelsY[i] < vijandY + 50) {
      console.log ("geraakt!!");
      return true
    }
  }
  
   
  
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
      beweegBullet();
      
      
      if (checkVijandGeraakt()) {
        // punten erbij
        // nieuwe vijand maken
      }
      
      if (checkSpelerGeraakt()) {
        // leven eraf of gezondheid verlagen
        // eventueel: nieuwe speler maken
      }

      tekenVeld();
      

      for (var i = 0; i < kogelsX.length; i++) {
        tekenKogel(kogelsX[i],kogelsY[i])
      };
       
      
      tekenKogel(kogelX, kogelY);
      tekenBullet(bulletX, bulletY);
      
      decoration();
      
      tekenVijand(vijandX, vijandY);
      tekenSpeler(spelerX, spelerY);
      
      
     

      for (var j = 0; j < bulletsX.length; j++) {
        tekenBullet(bulletsX[j],bulletsY[j])
      };
      
      

      if (checkGameOver()) {
        spelStatus = GAMEOVER;
      }
      break;


      case GAMEOVER:
      fill("white")
      textSize(40)
      text("Reload to start again!!",400,450)
      textSize(100)
      text("Game Over", 400,400)
      
  }
}



