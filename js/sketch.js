let estage;
let pea;
let time=0;
let points2=0;

const energy  = [];
let veces=0;
let x1=331;
let y1=92;
let x2=0,y2=0;
let pasto = [];
let plantas =[];
let Jsn;
let a1=0;
let ancho=95;
let largo=99;
let aux=0;
let aux2=0;
let cont1=0;
let select=0;
const url = 'map.json';
//cartas
let peaP;
let giraP;
let peas = [];
let sunflower = [];
let bullet = [];
let zombs = [];
let girasoles = [];
let sungira = [];
let podadoras = [];
let podadeiras = [];
let zombieCono = [];
let conosZombie = [];
let sun;
let chicharop;
let auxP=0;
let time2=0;
let aux4=0;
let aux3=0,cont=1,aux5=0,cont2=0,cont3=1,aux6=0,aux7=0,cont4=1,pzc=0,aux8=0,cont5=0;
let b1=0,b2=0,b3=0;
let tabla;
//zombie elements:
let avanzaZombie=0.3;
let iniZombie=0,iniZombie2=0;
let tz=0,z1=0,w1=0,w2=0,tz2=0,w11=0,w22=0,z12=0;
let zombies = [];
let v1=0,v2=0,v11=0;
let cLife=0;
let cLife2=0;
let posZ=70;
let playSong;
let linea=0,linea1=0,linea2=0,linea3=0,linea4=0;
//arrasatrar cartas
let arrX1=900,arrY1=18,arrX2=952,arrY2=18,auxX=0,auxY=0,auxX2=0,auxY2=0;
let soundtrack;
//posicion podadoras
let px1=331;
let py1=92;
let auxPo=0,pp=0,ppp=0,ppp2=0,timeIniCono=0;
let winLose=0,perdiste,endgame=0,ganaste,endgame2=0,gg=0;
function setup(){
	createCanvas(windowWidth,windowHeight);
	frameRate(60);
	maps();
	podadoraPosition();
}

function preload(){
	//sonidos------------------
	soundtrack = loadSound("sound/fondoSound.mp3");
	//--------------------------------
	Jsn=loadJSON(url);
	estage = loadImage("img/patio2.png");
	perdiste = loadImage("img/youLose.png");
	ganaste = loadImage("img/youWin.png");
	pea = loadImage("img/peaShooter.png");
	sun = loadImage("img/sun.png");
	peaP = loadImage("img/peaP.png");
	giraP = loadImage("img/giraP.png");
	chicharop = loadImage("img/guisante.png");
	tabla = loadImage("img/GUI.png");

	//rellenado del arreglo con las imagenes de la planta lanza chicharos.
	for(let i=0; i<147; i++){
	if(aux3==3){
		aux3=0;
		cont++;
	}
		peas[i] = loadImage(`img/peasOP/${cont}.png`);
		aux3++;
	}

	//rellenado del arreglo con las imagenes del zombie.
	for(let i=0; i<80; i++){
		if(aux5==5){
		aux5=0;
		cont2++;
	}
		zombs[i] = loadImage(`img/zombie/${cont2}.png`);
		aux5++;
	}




	//rellenado del arreglo con las imagenes de los girasoles.
	for(let i=0; i<147; i++){
		if(aux6==3){
		aux6=0;
		cont3++;
	}
		girasoles[i] = loadImage(`img/girasoles/${cont3}.png`);
		aux6++;
	}

	for(let i=0; i<15; i++){
		if(aux7==5){
		aux7=0;
		cont4++;
	}
		podadoras[i] = loadImage(`img/podas/${cont4}.png`);
		aux7++;
	}

	//rellenado del arreglo con las imagenes del zombie.
	for(let i=0; i<255; i++){
		if(aux8==5){
		aux8=0;
		cont5++;
	}
		conosZombie[i] = loadImage(`img/zombieCono/${cont5}.png`);
		aux8++;
	}
}

function draw(){

	if(playSong==0){
		soundtrack.play();
		playSong++;
	}
	if(soundtrack.isPlaying()){

	}else{
		playSong=0;
	}
	arrastra();
	background(estage);
	if(endgame>=14400){
		gg=2;
	}else{
		endgame++;
	}
	if(gg!=2){
		if(winLose!=1){
		table();
		Createcoins();
		goCoins();
		points();
		plants();
		if(endgame>=7200){
			zombie();
			zombie();
			zombie2();
		}
		//printPlane();
		zombie();
		if(timeIniCono>=3600){
			zombie2();
		}else{
			timeIniCono++;
		}
		
		check();
		shoot();
		goCoins2();
		pintaPodadoras();
		muevePodadora();
		}else{
			youLose();
		}
	}else{
		youWin();
	}
	

	text(timeIniCono,300,300);

	//collision();
	//console.log(bullet.length);
}

function youLose(){
	image(perdiste,0,0,windowWidth,windowHeight);
}

function youWin(){
	image(ganaste,0,0,windowWidth,windowHeight);
}

function goCoins(){
	if(energy.length>0){
		for(let i=0; i<energy.length; i++){
			image(sun,energy[i].x,energy[i].y,energy[i].size,energy[i].size);
			if(energy[i].estate==true&&energy[i].y<=500){
				energy[i].y+=5;
			}else if(energy[i].estate==false){
				energy.splice(i,1);
			}
		}
	}
}

function podadora(){

}


function shoot(){
	//este metodo verifica si ya se crearon balas, si es asi , entra a un for
	//que recorre el arreglo donde se guardaron las balas y aumenta de 5 en 5 las x de su posicion.
	if(bullet.length>0){
		//procedimiento para restarle la vida a un zombie normal--------------------------------------
		for(let i=0; i<bullet.length; i++){
				image(chicharop,bullet[i].x,bullet[i].y,23,22);
					bullet[i].x+=5;
					 if(bullet[i].x>=1300){
							bullet.splice(i,1);
							break;
					}
					if(zombies.length>0){
						if(v1<zombies.length){
							 if(bullet[i].x>=zombies[v1].x&&bullet[i].x<=zombies[v1].x+80&&bullet[i].y>=zombies[v1].y&&bullet[i].y<=zombies[v1].y+119){
								bullet.splice(i,1);
								zombies[v1].life--;
								if(zombies[v1].life<=0){
									zombies.splice(v1,1);
								}
								
							}
						}else{
							v1=zombies.length-1;
						}	
					}

					//pasos para restarle la vida a un zombie de cono-------------------------------
					if(zombieCono.length>0){
						if(v11<zombieCono.length&&bullet[i]!=undefined){
							 if(bullet[i].x>=zombieCono[v11].x&&bullet[i].x<=zombieCono[v11].x+80&&bullet[i].y>=zombieCono[v11].y&&bullet[i].y<=zombieCono[v11].y+119){
								bullet.splice(i,1);
								zombieCono[v11].life--;
								if(zombieCono[v11].life<=0){
									zombieCono.splice(v11,1);
								}
								
							}
						}else{
							v11=zombieCono.length-1;
						}	
					}
					//-----------------------------------------------------------------------------
		}
		v1++;
		if(v1>=zombies.length){
			v1=0;
		}
			v11++;
		if(v11>=zombieCono.length){
			v11=0;
		}	
		

		
	}
}
	



function plants(){
	//arrX1=900,arrY1=18
		image(peaP,arrX1,arrY1,50,60);
		//rect(800,18,50,50);
		image(giraP,arrX2,arrY2,50,60);
		//rect(800,18,50,50);
}

// funcion que muestra los puntos actuales
function points(){
	textSize(20);
	text(points2,820,84);
}

function check(){
	if(b1===peas.length){
			b1=0;
	}

	if(b2===girasoles.length){
			b2=0;
	}

	if(auxP===plantas.length){
			auxP=0;
	}
	//si hay algo en el arreglo de plantas
	//entra al for y aumenta el tiempo de cada planta para realizar el disparo una vez el tiempo
	//llegue a 100. si llega a cero se crea un objeto chicharo y se mete al arreglo bullet. despues se reinicia
	//el temporizador a 0
	if(plantas.length>0){
		for(let i=0; i<plantas.length; i++){
			//push();
			//fill(255,0,0,128);
			text(plantas[i].life,plantas[i].x,plantas[i].y);
			//pop();
			image(peas[b1], plantas[i].x,plantas[i].y,plantas[i].w,plantas[i].h);
			if(plantas[i].time==100){
				let chicharou={
					x:plantas[i].x+20,
					y:plantas[i].y+18,
					state:false
				}
				bullet.push(chicharou);
			}
			if(plantas[i].time<100){
				plantas[i].time++;
			}else if(plantas[i].time>=100){
				plantas[i].time=0;
			}	
		}
		b1++;
	}


		if(sunflower.length>0){
			for(let i=0; i<sunflower.length; i++){
				text(sunflower[i].life,sunflower[i].x,sunflower[i].y);
				//rect(sunflower[i].x,sunflower[i].y,sunflower[i].w,sunflower[i].h);
				image(girasoles[b2], sunflower[i].x,sunflower[i].y,sunflower[i].w,sunflower[i].h);
				if(sunflower[i].time==1500){
					let sol={
					x:sunflower[i].x+25,
					y:sunflower[i].y-18,
					size: 30,
					state:false,
					time: 1200
					}
					sungira.push(sol);
				}

				if(sunflower[i].time<1500){
					sunflower[i].time++;
				}else if(sunflower[i].time>=1500){
					sunflower[i].time=0;
				}	
			}
			b2++;
		}
}
function eliminaGiraPlantas(){
	if(sungira.length>0){
		for(let i=0; i<sungira.length; i++){
			if(sungira[i].time<=0){
				sungira.splice(i,1);
			}else{
				sungira[i].time--;
			}
		}
	}
}
function goCoins2(){
	if(sungira.length>0){
		for(let i=0; i<sungira.length; i++){
			image(sun,sungira[i].x,sungira[i].y,30,30);
		}
	}
}
	
function arrastra(){
	if(select==1&&points2>=100){
		arrY1=mouseY-27;
		arrX1=mouseX-22;
	}
	if(select==2&&points2>=50){
		arrY2=mouseY-27;
		arrX2=mouseX-22;
	}
	
}
function  mouseClicked(){
	if(mouseX>=900&&mouseX<=900+50&&mouseY>=18&&mouseY<=18+60&&points2>=100){
		select=1;	
	}
	//arrX2=952,arrY2=18;
	if(mouseX>=952&&mouseX<=952+50&&mouseY>=18&&mouseY<=18+60&&points2>=50){
		select=2;
	}

	if(select==1){
		for(let i=0; i<pasto.length; i++){
		if(mouseX>=pasto[i].x&&mouseX<=pasto[i].x+ancho&&mouseY>=pasto[i].y&&mouseY<=pasto[i].y+largo&&select==1&&pasto[i].estate==true){
			if(points2>=100){
					points2-=100;
					let planta={
							time:0,
							img:peas,
							w:90,
							h:85,
							x:pasto[i].x,
							y:pasto[i].y,
							life: 10
					}
					plantas.push(planta);
					pasto[i].estate=false;
					select=0;
					arrX1=900;
					arrY1=18;
				}
			}
		}
	}

if(select==2){
	//alert("entro a 2");
	for(let i=0; i<pasto.length; i++){
	if(mouseX>=pasto[i].x&&mouseX<=pasto[i].x+ancho&&mouseY>=pasto[i].y&&mouseY<=pasto[i].y+largo&&select==2&&pasto[i].estate==true){
		if(points2>=50){
				points2-=50;
				let plantau={
						time:0,
						img:girasoles,
						w:90,
						h:85,
						x:pasto[i].x,
						y:pasto[i].y,
						life: 10
				}
				sunflower.push(plantau);
				pasto[i].estate=false;
				select=0;
				arrX2=952;
				arrY2=18;
			}
		}
	}
}

	if(energy.length>0){
		for(let i=0; i<energy.length; i++){
			if(mouseX<=energy[i].x+energy[i].size&&mouseX>=energy[i].x&&mouseY<=energy[i].y+energy[i].size&&mouseY>=energy[i].y){
				energy[i].estate=false;
				points2+=25;
			}
		}	
	}


	if(sungira.length>0){
		for(let i=0; i<sungira.length; i++){
			if(mouseX<=sungira[i].x+sungira[i].size&&mouseX>=sungira[i].x&&mouseY<=sungira[i].y+sungira[i].size&&mouseY>=sungira[i].y){
				points2+=25;
				sungira.splice(i,1);
			}
		}	
	}
	console.log("x="+mouseX+"\n"+"y="+mouseY);
}

function printPlane(){
	for(let i=0;  i<45; i++){
		push();
		fill(255,0,0,128);
		rect(pasto[i].x,pasto[i].y,pasto[i].w,pasto[i].h);
		pop();
	}
}
function table(){
	image(tabla,800,0,472,93);
}

//funcion para el zombie normal-------
function zombie(){
	if(tz>3600){
		iniZombie=Math.floor(random(0,5));
		switch(iniZombie){
		case 0:
			let zom={
						life:10,
						x:1400,
						y:posZ-15+26,
						estate: true
				}
				zombies.push(zom);
		break;

		case 1:
		let zom1={
						life:10,
						x:1400,
						y:posZ-15+(largo*1)+30,
						estate: true
				}
				zombies.push(zom1);
		break;

		case 2:
		let zom2={
						life:10,
						x:1400,
						y:posZ-15+(largo*2)+42,
						estate: true
				}
				zombies.push(zom2);
		break;

		case 3:
		let zom3={
						life:10,
						x:1400,
						y:posZ-15+(largo*3)+42,
						estate: true

				}
				zombies.push(zom3);
		break;

		case 4:
		let zom4={
						life:10,
						x:1400,
						y:posZ-15+(largo*4)+52,
						estate: true
				}
				zombies.push(zom4);
		break;

		default:
		console.log("no funciono");
		}
		tz=0;
	}
	tz++;
	
	if(zombies.length>0){
		if (z1==zombs.length){z1=0}
			peaCondition();
			giraCondition();
			for(let i=0; i<zombies.length; i++){
				if (zombies[i].estate==true){
					zombies[i].x-=0.3;
				}else{
					zombies[i].x-=0;
				}
				push();
				fill(0,255,0,120);
				//rect(zombies[i].x,zombies[i].y,76,119);
				text(zombies[i].estate+" "+zombies[i].life,zombies[i].x,zombies[i].y);
				pop();
				image(zombs[z1],zombies[i].x,zombies[i].y,76,119);
				if(zombies[i].x<=235){
					winLose=1;
				}
			}
		z1++;	
	}
}

//-----------------------------------

//funcion zombie cono----------------------

function zombie2(){
	if(tz2>3600){
		iniZombie2=Math.floor(random(0,5));
		switch(iniZombie2){
		case 0:
			let zom={
						life:20,
						x:1400,
						y:posZ-15+26,
						estate: true
				}
				zombieCono.push(zom);
		break;

		case 1:
		let zom1={
						life:20,
						x:1400,
						y:posZ-15+(largo*1)+30,
						estate: true
				}
				zombieCono.push(zom1);
		break;

		case 2:
		let zom2={
						life:20,
						x:1400,
						y:posZ-15+(largo*2)+42,
						estate: true
				}
				zombieCono.push(zom2);
		break;

		case 3:
		let zom3={
						life:20,
						x:1400,
						y:posZ-15+(largo*3)+42,
						estate: true

				}
				zombieCono.push(zom3);
		break;

		case 4:
		let zom4={
						life:20,
						x:1400,
						y:posZ-15+(largo*4)+52,
						estate: true
				}
				zombieCono.push(zom4);
		break;

		default:
		console.log("no funciono");
		}
		tz2=0;
	}
	tz2++;
	
	if(zombieCono.length>0){
		if (z12==conosZombie.length){z12=0}
			peaCondition2();
			giraCondition2();
			for(let i=0; i<zombieCono.length; i++){
				if (zombieCono[i].estate==true){
					zombieCono[i].x-=0.3;
				}else{
					zombieCono[i].x-=0;
				}
				push();
				fill(0,255,0,120);
				//rect(zombieCono[i].x,zombieCono[i].y,120,146);
				text(zombieCono[i].estate+" "+zombieCono[i].life,zombieCono[i].x,zombieCono[i].y);
				pop();
				image(conosZombie[z12],zombieCono[i].x,zombieCono[i].y,120,146);
				if(zombieCono[i].x<=235){
					winLose=1;
				}
			}
		z12++;	
	}
}

//funciones para ver si los zombies con cono chocan con alguna planta------------------
function peaCondition2(){
	//peaShooter---------------------------
		//for para verificar si un zombie esta tocando una planta y asi mismo bajarle vida a la planta
		for(let i=0; i<zombieCono.length; i++){
			if(plantas[w11]!=undefined){
				if(zombieCono[i].estate==false&&zombieCono[i].x<=plantas[w11].x+96&&zombieCono[i].y<plantas[w11].y&&zombieCono[i].y+119>plantas[w11].y+96){
					if(plantas[w11].life<=0){
						auxX=plantas[w11].x;
						auxY=plantas[w11].y;
						//alert("auxX="+auxX+" "+"auxY="+auxY);
						plantas.splice(w11,1);
						zombieCono[i].estate=true;
						
					}else{
						plantas[w11].life--;
					}
				}
			}
				
		}

		for(let i=0; i<pasto.length; i++){
			if(auxX>=pasto[i].x&&auxX<=pasto[i].x+ancho&&auxY>=pasto[i].y&&auxY<=pasto[i].y+largo){
				pasto[i].estate=true;
			}
		}

		for(let i=0; i<zombieCono.length; i++){
			//condicion para verificar si el zombie puede seguir avanzando
			if(pasto[w11]!=undefined){
				if(zombieCono[i].x<=pasto[w11].x+96&&zombieCono[i].x>=pasto[w11].x&&zombieCono[i].y<pasto[w11].y&&zombieCono[i].y+119>pasto[w11].y+96){
					if(pasto[w11].estate==true){
					zombieCono[i].estate=true;
					}else{
					zombieCono[i].estate=false;
					}		
				}
			}
		}
			w11++;		
			if(w11>=pasto.length){
				w11=0;
			}
	//-------------------------------------	
}
function giraCondition2(){
	if (zombieCono.length>0){
		//girasoles---------------------------
			for(let i=0; i<zombieCono.length; i++){
			if(sunflower[w22]!=undefined){
				if(zombieCono[i].estate==false&&zombieCono[i].x<=sunflower[w22].x+96&&zombieCono[i].y<sunflower[w22].y&&zombieCono[i].y+119>sunflower[w22].y+96){
					if(sunflower[w22].life<=0){
						auxX2=sunflower[w22].x;
						auxY2=sunflower[w22].y;
						//alert("auxX="+auxX+" "+"auxY="+auxY+"se borra girasol");
						sunflower.splice(w22,1);
						zombieCono[i].estate=true;
					}else{
						sunflower[w22].life--;
					}
				}
			}
				
		}

		for(let i=0; i<pasto.length; i++){
			if(auxX2>=pasto[i].x&&auxX2<=pasto[i].x+ancho&&auxY2>=pasto[i].y&&auxY2<=pasto[i].y+largo){
				pasto[i].estate=true;
			}
		}

		for(let i=0; i<zombieCono.length; i++){
			//condicion para verificar si el zombie puede seguir avanzando
			if(pasto[w22]!=undefined){
				if(zombieCono[i].x<=pasto[w22].x+96&&zombieCono[i].x>=pasto[w22].x&&zombieCono[i].y<pasto[w22].y&&zombieCono[i].y+119>pasto[w22].y+96){
					if(pasto[w22].estate==true){
					zombieCono[i].estate=true;
					}else{
					zombieCono[i].estate=false;
					}		
				}
			}
		}

		w22++;
		if(w22>=pasto.length){
			w22=0;
		}	
		//------------------------------
	}
	
}
//-----------------------------------------------------------------

//funciones para ver si los zombies normales chocan con alguna planta------------------
function peaCondition(){
	//peaShooter---------------------------
		//for para verificar si un zombie esta tocando una planta y asi mismo bajarle vida a la planta
		for(let i=0; i<zombies.length; i++){
			if(plantas[w1]!=undefined){
				if(zombies[i].estate==false&&zombies[i].x<=plantas[w1].x+96&&zombies[i].y<plantas[w1].y&&zombies[i].y+119>plantas[w1].y+96){
					if(plantas[w1].life<=0){
						auxX=plantas[w1].x;
						auxY=plantas[w1].y;
						//alert("auxX="+auxX+" "+"auxY="+auxY);
						plantas.splice(w1,1);
						zombies[i].estate=true;
						
					}else{
						plantas[w1].life--;
					}
				}
			}
				
		}

		for(let i=0; i<pasto.length; i++){
			if(auxX>=pasto[i].x&&auxX<=pasto[i].x+ancho&&auxY>=pasto[i].y&&auxY<=pasto[i].y+largo){
				pasto[i].estate=true;
			}
		}

		for(let i=0; i<zombies.length; i++){
			//condicion para verificar si el zombie puede seguir avanzando
			if(pasto[w1]!=undefined){
				if(zombies[i].x<=pasto[w1].x+96&&zombies[i].x>=pasto[w1].x&&zombies[i].y<pasto[w1].y&&zombies[i].y+119>pasto[w1].y+96){
					if(pasto[w1].estate==true){
					zombies[i].estate=true;
					}else{
					zombies[i].estate=false;
					}		
				}
			}
		}
			w1++;		
			if(w1>=pasto.length){
				w1=0;
			}
	//-------------------------------------	
}
function giraCondition(){
	if (zombies.length>0){
		//girasoles---------------------------
			for(let i=0; i<zombies.length; i++){
			if(sunflower[w2]!=undefined){
				if(zombies[i].estate==false&&zombies[i].x<=sunflower[w2].x+96&&zombies[i].y<sunflower[w2].y&&zombies[i].y+119>sunflower[w2].y+96){
					if(sunflower[w2].life<=0){
						auxX2=sunflower[w2].x;
						auxY2=sunflower[w2].y;
						//alert("auxX="+auxX+" "+"auxY="+auxY+"se borra girasol");
						sunflower.splice(w2,1);
						zombies[i].estate=true;
					}else{
						sunflower[w2].life--;
					}
				}
			}
				
		}

		for(let i=0; i<pasto.length; i++){
			if(auxX2>=pasto[i].x&&auxX2<=pasto[i].x+ancho&&auxY2>=pasto[i].y&&auxY2<=pasto[i].y+largo){
				pasto[i].estate=true;
			}
		}

		for(let i=0; i<zombies.length; i++){
			//condicion para verificar si el zombie puede seguir avanzando
			if(pasto[w2]!=undefined){
				if(zombies[i].x<=pasto[w2].x+96&&zombies[i].x>=pasto[w2].x&&zombies[i].y<pasto[w2].y&&zombies[i].y+119>pasto[w2].y+96){
					if(pasto[w2].estate==true){
					zombies[i].estate=true;
					}else{
					zombies[i].estate=false;
					}		
				}
			}
		}

		w2++;
		if(w2>=pasto.length){
			w2=0;
		}	
		//------------------------------
	}
	
}
//-----------------------------------------------------------------

function podadoraPosition(){
	for(let i=0; i<5; i++){
		//rect(x1+=ancho,y1,ancho,largo);
		py1=pasto[auxPo].y;
		let pody={
						w:99,
						h:91,
						x:px1-99,
						y:py1,
						estate: false,
						size: 30
				}
				podadeiras.push(pody);
		auxPo+=9;
	}

	
}

function pintaPodadoras(){
	if (pp==podadoras.length){pp=0}
		if(podadeiras.length>0){
		for(let i=0; i<podadeiras.length; i++){
			if(podadeiras[i].estate==true){
				podadeiras[i].x+=7;
			}
			image(podadoras[pp],podadeiras[i].x,podadeiras[i].y,99,91);
			if(podadeiras[i].x>=1300){
				podadeiras.splice(i,1);
			}
			}
			pp++;
		}
	
}
function muevePodadora(){
	if(zombies.length>0){
		//--------------------------------------
		for(let i=0; i<zombies.length; i++){
				if(podadeiras[ppp]!=undefined){
					if(zombies[i].x<=podadeiras[ppp].x+96&&zombies[i].x>=podadeiras[ppp].x&&zombies[i].y<podadeiras[ppp].y&&zombies[i].y+119>podadeiras[ppp].y+96){
						podadeiras[ppp].estate=true;
						zombies.splice(i,1);
					}
				}
				//
		}
			ppp++;		
			if(ppp>=podadeiras.length){
				ppp=0;
			}
		//---------------------------------------
	}

	if(zombieCono.length>0){
			for(let i=0; i<zombieCono.length; i++){
				if(podadeiras[ppp2]!=undefined){
					if(zombieCono[i].x<=podadeiras[ppp2].x+96&&zombieCono[i].x>=podadeiras[ppp2].x&&zombieCono[i].y<podadeiras[ppp2].y&&zombieCono[i].y+119>podadeiras[ppp2].y+96){
						podadeiras[ppp2].estate=true;
						zombieCono.splice(i,1);
					}
				}
		}
			ppp2++;		
			if(ppp2>=podadeiras.length){
				ppp2=0;
			}
	}
	
	
}

function borraSoles(){
	if(energy.length>0){
		for(let i=0; i<energy.length; i++){
			if(energy[i].time<=0){
				energy.splice(i,1);
			}else{
				energy[i].time--;
			}
		}
	}
	
}

function maps(){
	for(let i=0; i<45; i++){
		
		if(aux2==9){
			aux2=0;
			x1=331;
			y1+=largo+8;
		}
		//rect(x1+=ancho,y1,ancho,largo);
		let lugar={
						w:ancho,
						h:largo,
						x:x1,
						y:y1,
						estate: true,
						size: 30
				}
				pasto.push(lugar);
		x1+=ancho+12;
		aux2++;
	}
}

//los soles salen cada 10 segundos
//600 10 segundos
function Createcoins(){
		 time++;
			if(time==600){
				let coin={
						x:random(300,800),
						y:200,
						estate: true,
						size: 30,
						time: 1200
				}
				energy.push(coin);
			}else if(time>600){
				time=0;
			}
		
}