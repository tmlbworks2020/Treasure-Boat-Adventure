//Tresure_Boat ver1.4 (c) tmlb-works 2022.5

window.addEventListener( "load", loadFunc, false );

setInterval(playerMove, 250);

// ship parameter //

var ship_th=1.6;
var handle_th=0;

var movex=400; //start xy
var movey=300;
var movex1=800;//next xy
var movey1=300;
var v_ship=0;

// enemy //
var torp= new Array(5);
torp[0]=new Array(5);
torp[1]=new Array(5);
torp[2]=new Array(5);

var rnd=Math.random();
var movex2=400+300*Math.cos(rnd*6.3);//enemy start xy
var movey2=300+300*Math.sin(rnd*6.3);

var vx_=0;
var vy_=0;
var vx__=0;
var vy__=0;

var fvr_c=0;// esa number
var array_ndx = new Array(200);
var array_ndy= new Array(200);

var score=0;
var time_rec=0;

var game_end=0;

var pondx= new Array(12);
var pondy= new Array(12);
var pondr= new Array(12);

var swx=new Array(10);//ship wave
var swy=new Array(10);

var mvx_ct2=400;//ship position for draw
var mvy_ct2=300;
var lever_level=0;
var move_r2=0;

var itemx=0;
var itemy=0;
var fishstop=0;

var ship_dir=0;
var v_wx=0;
var v_wy=0;
var d_w=0;

var lv_flag=1;
var hd_flag=2;

var cc=0;
var a=0;
var b=0;

//pond固定式に変更

var pornd=Math.round(16*Math.random());
pornd-=8;

pondx[0]=movex+400+600*(Math.random()-0.5);
pondy[0]=movey+250+300*(Math.random()-0.5);
pondr[0]=80;

pondx[1]=movex+400+600*(Math.random()-0.5);
pondy[1]=movey+250+300*(Math.random()-0.5);
pondr[1]=64;


//island
for (let i = 5; i < 10; i++){

pondx[i]=movex+400+Math.cos((i*6*Math.random())/6)* (360+10*Math.random());//player xy/2

var isly=Math.random();
if(isly<0.3){isly-=1;}


pondy[i]=movey+250+isly*(360+10*Math.random());

pondr[i]=20+60*Math.random();//30


}



function playerMove() {

var canvas = document.getElementById( "stage1" );
var ctx = canvas.getContext( "2d" );

            var elm = document.getElementById('target');
            var sec =new Date().getSeconds();


if(sec%1==0){

//BG: Screen

            ctx.beginPath();
            ctx.rect(0,0,850,650);//10,10,580,480
            ctx.fillStyle = '#30f';

            ctx.fill();
            ctx.closePath();


//

var xc_=800-movex;//400-(movex-400)
var yc_=600-movey;//300-(movey-300)
var score_r=(movex-xc_)*(movex-xc_)+(yc_-movey)*(yc_-movey);

if(score_r<144400){

score++;
time_rec++;
if(score<0)score=0;

}


//pool
            ctx.beginPath();
            //ctx.arc (400+400-movex,300+300-movey,380,0, 6.3 * 2, false);
            ctx.arc (800-movex,600-movey,380,0, 6.3 * 2, false);
            ctx.fillStyle = '#77f';
            ctx.fill();
            ctx.closePath();

//pond
for(let i=0; i<2;i++){

          ctx.beginPath();
          ctx.arc (pondx[i]-movex,pondy[i]-movey,pondr[i],0, 6.3 * 2, false);
          ctx.fillStyle = '#def';
          ctx.fill();
          ctx.closePath();

}

/*
//wind_wave
var c_s = sec%20;
var wv=0;
var wv_1=0;
var wv_2=0;
var ag1=0;
var ag2=0;

var p1=0;
var cc1=0;
var cc2=0;
var aax=0;
var aay=0;

if(d_w!=0){

if(d_w==1){ 
p1=3.5;
cc1=800;
cc2=1000;
wv_1=0;
wv_2=-1;
aax=0;
aay=1;
 }//up
else if(d_w==2){ 
p1=-1;
cc1=-440;
cc2=600;
wv_1=1;
wv_2=0;
aax=1;
aay=0;
 }//right
else if(d_w==3){ 
p1=-0.5;
cc1=800;
cc2=-800;
wv_1=0;
wv_2=1;
aax=0;
aay=1;
 }//down
else if(d_w==4){
p1=2.5;
cc1=1300;
cc2=700;
wv_1=-1;
wv_2=0;
aax=1;
aay=0;
 }//left



for(let i=0; i<8;i++){

if(sec%10==0){
wv1=wv_1*3;
wv2=wv_2*3;
}

for(let j=0; j<4;j++){


ag1=p1+0.2*i+0.5*j;
ag2=ag1+0.3;

			ctx.beginPath();
            ctx.arc (cc1+aax*i*150-movex+c_s*wv1,cc2+aay*i*150-movey+c_s*wv2,800,ag1,ag2,false);
           
            ctx.strokeStyle = '#fff'
            ctx.stroke();
            ctx.closePath();
}
}

}//no wind_wave
*/

//isle

for(let i=5; i<8;i++){

          ctx.beginPath();
          ctx.arc (pondx[i]-movex,pondy[i]-movey,pondr[i],0, 6.3 * 2, false);
          ctx.fillStyle = '#963';
          ctx.fill();
          ctx.closePath();

          ctx.beginPath();
          ctx.arc (pondx[i]-movex+pornd,pondy[i]-movey,pondr[i]-8,0, 6.3 * 2, false);

          ctx.fillStyle = '#630';

          ctx.fill();
          ctx.closePath();
          
          ctx.beginPath();
            
          ctx.arc (pondx[i]-movex+pornd,pondy[i]-movey+pornd,pondr[i]-20,0, 6.3 * 2, false);
          ctx.fillStyle = '#eee';
          ctx.fill();
          ctx.closePath();


}


// score refresh

ctx.fillStyle = '#efe';
ctx.font = "20px 'Arial'"; //Times New Roman

//Game Ending
if(score<=0){game_end=2;}
else if(score>=500){game_end=1;}

//BUG Check 用
if(game_end==0){
//3回目でアウトのようにする？Clearを500ぐらいにｓるとか
//ctx.fillText((movex2)+" "+(movey2),10,10,100);
//ctx.fillText(Math.round(movex)+" "+Math.round(movey),10,30,100);
//ctx.fillText(array_ndx[0]+" "+array_ndy[0],10,50,100);

ctx.fillText(" "+score,180,570,100);

//ctx.fillText(ship_th+" "+score,10,10,100);
//ctx.fillText(""+v_ship,820,100,100);
//ctx.fillText(""+handle_th,820,100,100);
//ctx.fillText(""+lever_level,820,100,100);

    }else if(game_end==1){//gameを止めないと1000以下になる
    ctx.beginPath();
    var img = new Image();
img.src = "./pic/clear2.gif";
ctx.drawImage(img,200,200);
ctx.closePath();
    }else if(game_end==2){
    ctx.beginPath();
        var img = new Image();
img.src = "./pic/over2.gif";
ctx.drawImage(img,200,200);
 ctx.closePath();
    }


// Wind-meter 201806
ctx.beginPath();
ctx.arc (290,580,24, 0, 6.3 * 2, false);
ctx.fillStyle = '#960';
ctx.fill();
ctx.closePath();

ctx.fillStyle = '#efe';
ctx.font = "30px 'Arial'";

if(d_w==0){ ctx.fillText("●",282,560,100); }
else if(d_w==1){ ctx.fillText("↑",282,560,100); }
else if(d_w==2){ ctx.fillText("→",282,560,100); }
else if(d_w==3){ ctx.fillText("↓",282,560,100); }
else if(d_w==4){ ctx.fillText("←",282,560,100); }



// ITEM

if(catchchk(itemx-movex,itemy-movey,16)){score+=200;itemx=-1000;itemy=-1000;}
//==1
if(score%100==0 && score>10){
itemx=movex+400+Math.cos(Math.random()*6.3)* (150+150*(Math.random()-0.5));
itemy=movey+300+Math.sin(Math.random()*6.3)* (150+150*(Math.random()-0.5));
}

           ctx.beginPath();
           ctx.arc (itemx-movex,itemy-movey,10, 0, 6.3 * 2, false);
           ctx.fillStyle = '#c0f';
           ctx.fill();
           ctx.closePath();

           ctx.beginPath();
           ctx.arc (itemx-movex,itemy-movey+5,5, 0, 6.3 * 2, false);
           ctx.fillStyle = '#ff3';
           ctx.fill();
           ctx.closePath();

// fvr

for(let i=0; i<=fvr_c;i++){

if(catchchk2(array_ndx[i],array_ndy[i],20)==1){
array_ndx[i]=-1000;
array_ndy[i]=-1000;
fishstop=1;
}

}


//player 
if(hd_flag==0){if(handle_th<-0.075){handle_th-=0.015;}else{handle_th=-0.075;}}
else if(hd_flag==1){if(handle_th<-0.075){handle_th-=0.007;}else{handle_th=-0.025;}}//負偏？
else if(hd_flag==2){if(handle_th<-0.075){handle_th=0;}else{handle_th=0;}}
else if(hd_flag==3){if(handle_th<0.075){handle_th+=0.007;}else{handle_th=0.075;}}
else if(hd_flag==4){if(handle_th<0.075){handle_th+=0.015;}else{handle_th=0.075;}}

ship_th+=handle_th;

var rectx_b = 30*Math.cos(ship_th);
var recty_b = 30*Math.sin(ship_th);

	var rectx_d = -10*Math.sin(ship_th);
	var recty_d = 10*Math.cos(ship_th);

	var rectx_c = rectx_d+rectx_b;
	var recty_c = recty_d+recty_b;

    ctx.beginPath();
	ctx.moveTo(movex,movey);
	ctx.lineTo(movex+rectx_b,movey+recty_b);
	ctx.moveTo(movex+rectx_b,movey+recty_b);
	ctx.lineTo(movex+rectx_c,movey+recty_c);
	ctx.moveTo(movex+rectx_c,movey+recty_c);
	ctx.lineTo(movex+rectx_d,movey+recty_d);
	ctx.moveTo(movex+rectx_d,movey+recty_d);
	ctx.lineTo(movex,movey);

	ctx.stroke();

	ctx.fillStyle ='#f93';
    ctx.closePath();

var movex_lt=movex+rectx_b;
var movey_lt=movey+recty_b;

        ctx.beginPath();
	ctx.arc (movex_lt,movey_lt,3, 0, 6.3 * 2, false);
        ctx.fillStyle = '#fcc';
        ctx.fill();

        ctx.closePath();


// fire & smoke

var mvx_ct2p=(rectx_b+rectx_c+rectx_d)/4;
var movex_ct1=movex+(rectx_d+mvx_ct2p)/3;
mvx_ct2=movex+mvx_ct2p;//GLB
var movex_ct3=movex+(rectx_b+rectx_c+mvx_ct2p)/3;

var mvy_ct2p=(recty_b+recty_c+recty_d)/4;
var movey_ct1=movey+(recty_d+mvy_ct2p)/3;
mvy_ct2=movey+mvy_ct2p;
var movey_ct3=movey+(recty_b+recty_c+mvy_ct2p)/3;

        ctx.beginPath();

	ctx.arc (movex_ct1,movey_ct1,5, 0, 6.3 * 2, false);
	ctx.arc (mvx_ct2,mvy_ct2,6, 0, 6.3*2 ,false);
	ctx.arc (movex_ct3,movey_ct3,5, 0, 6.3 * 2, false);
        ctx.fillStyle = '#960';
        ctx.fill();

        ctx.closePath();



// mast　202108

if(d_w==0){

var msx1=movex+rectx_b/2;
var msy1=movey+recty_b/2;
var msx2=movex+(rectx_c+rectx_d)/2;
var msy2=movey+(recty_c+recty_d)/2;

	ctx.beginPath();

ctx.moveTo(msx1,msy1);
	ctx.lineTo(msx2,msy2);
	ctx.strokeStyle = '#fff' 
    ctx.stroke();
            
	/* hokake
	ctx.fillStyle = '#eee';
	ctx.fillRect(mvx_ct2-8,mvy_ct2-6,16,2);
    //ctx.arc(mvx_ct2-12,mvy_ct2-6,16, 0,1.5 ,false);
    //ctx.fillStyle = '#eee';
    ctx.fill();
    */
    ctx.closePath();

}else if(d_w==1){
	ctx.beginPath();
	ctx.arc(mvx_ct2,mvy_ct2,8, 0,3 ,true);
    ctx.fillStyle = '#eee';
    ctx.fill();
    ctx.closePath();

}else if(d_w==2){
    ctx.beginPath();
	ctx.arc(mvx_ct2,mvy_ct2,8, 1.5,4.5,true);
    ctx.fillStyle = '#eee';
    ctx.fill();
    ctx.closePath();

}else if(d_w==3){
    ctx.beginPath();
	ctx.arc(mvx_ct2,mvy_ct2,8, 3,6,true);
    ctx.fillStyle = '#eee';
    ctx.fill();
    ctx.closePath();

}else if(d_w==4){
    ctx.beginPath();
	ctx.arc(mvx_ct2,mvy_ct2,8, 1.5,4.5,false);
    ctx.fillStyle = '#eee';
    ctx.fill();
    ctx.closePath();

}


var hit_flag= new Array(3);

for(let i=0; i<3;i++){
hit_flag[i]=0;
hit_flag[i]=catchchk(torp[i][1],torp[i][2],10);

if(hit_flag[i]==1){score-=25;}
}


if(hit_flag[0]==1){
    ctx.beginPath();
	ctx.arc (movex_ct1,movey_ct1,6, 0, 6.3, false);
    ctx.fillStyle = '#d22';
    ctx.fill();
    ctx.closePath();
}

if(hit_flag[1]==1){
    ctx.beginPath();
	ctx.arc (mvx_ct2,mvy_ct2,6, 0, 6.3, false);
    ctx.fillStyle = '#d22';
    ctx.fill();
    ctx.closePath();
}

if(hit_flag[2]==1){
    ctx.beginPath();
	ctx.arc (movex_ct3,movey_ct3,6, 0, 6.3, false);
    ctx.fillStyle = '#d22';//30f
    ctx.fill();
    ctx.closePath();
}


// ship_wave //

    for(let i=3; i>=0 ; i--){
    swx[i+1]= swx[i];
	swy[i+1]= swy[i];
	}
	
	for(let i=8; i>=5 ; i--){
    swx[i+1]= swx[i];
	swy[i+1]= swy[i];
	}

// ship_wave position //

	swx[0]= movex;
	swy[0]= movey;
	swx[1]= movex+rectx_b;
	swy[1]= movey+recty_b;
	
	swx[5]= movex+rectx_d;
	swy[5]= movey+recty_d;
	swx[6]= movex+rectx_c;
	swy[6]= movey+recty_c;


///ship_wave

	const i_max=3;
	
	for(let i=0 ;i<=i_max; i++){
	
	ctx.beginPath();
            
	ctx.moveTo(swx[i],swy[i]);
	ctx.lineTo(swx[i+1],swy[i+1]);
	ctx.moveTo(swx[i+5],swy[i+5]);
	ctx.lineTo(swx[i+6],swy[i+6]);
	ctx.strokeStyle = '#fff' 
    ctx.stroke();
    ctx.closePath(); 
	}
///


//Wind Speed

if(sec%30==0){

let f = Math.random();

if(f<0.4){d_w=0;v_wx = 0;v_wy = 0;}
else if(f<0.55){d_w=1;v_wx=0;v_wy = 0.8;}
else if(f<0.7){d_w=2;v_wx=-0.8;v_wy = 0;}
else if(f<0.85){d_w=3;v_wx=0;v_wy = -0.8;}
else if(f<1){d_w=4;v_wx=0.8;v_wy = 0;}

}

//auto move

if(islechk2(movex,movey)){
	movex+=v_ship*Math.cos(ship_th)+v_wx;
	movey+=v_ship*Math.sin(ship_th)+v_wy;
}else{
	movex-=v_ship*Math.cos(ship_th)+v_wx;
	movey-=v_ship*Math.sin(ship_th)+v_wy;
}
/*
var w0=islechk2(movex,movey);

	if(w0==0){
	movex-=v_ship*Math.cos(ship_th)+v_wx;
	movey-=v_ship*Math.sin(ship_th)+v_wy;
}else{
	movex+=v_ship*Math.cos(ship_th)+v_wx;
	movey+=v_ship*Math.sin(ship_th)+v_wy;
}//ぶつかりタイミングでＲが効かない小バグ
*/

//byoui
for(let i=0;i<=10;i++){
ctx.beginPath();
//x,yは中心
ctx.arc(array_ndx[i]-(movex_ct3-array_ndx[i]),array_ndy[i]-(movey_ct3-array_ndy[i]), 3, 0, 6.3, false);
ctx.rect(array_ndx[i]-(movex_ct3-array_ndx[i]),array_ndy[i]-(movey_ct3-array_ndy[i]), 1, 8, 6.3, false);
ctx.fillStyle = '#f66';
ctx.fill();
ctx.closePath();
}

//catch

//var ct_=0;
//var ct=catchchk(movex2,movey2,15);

//if(ct==1){score-=50;ct_=1;}

if(catchchk(movex2,movey2,15)){
score-=50;
            ctx.beginPath();
            ctx.arc(mvx_ct2, mvy_ct2, 7, 0, 6.3 * 2, false);
            ctx.fillStyle='#aaa';
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(mvx_ct2, mvy_ct2, 6, 0, 6.3 * 2, false);
            ctx.fillStyle = '#d22';
            ctx.fill();
            ctx.closePath();

movex2=400+250*Math.cos(Math.random()*6.3);
movey2=300+250*Math.sin(Math.random()*6.3);;



}else{

//player 再描

}


/////
//enem (squid)
var enem=1;

if(score>5){

cc=catchchk(movex2,movey2,50);

var divd=1;
var dx=(mvx_ct2-movex2);
if(dx==0){divd=1;}else{divd=dx;}

if(Math.abs(mvx_ct2-movex2)>5){dx=2*(mvx_ct2-movex2)/Math.abs(divd);}
var dy=(mvy_ct2-movey2);
if(dy==0){divd=1;}else{divd=dy;}
if(Math.abs(mvy_ct2-movey2)>5){dy=2*(mvy_ct2-movey2)/Math.abs(divd);}


if(sec%2==0){
vx__=dx-v_wx;//201805-balance?
vy__=dy-v_wy;
}

//var w=waterchk(movex2,movey2);

////
a=0.6;
b=0.6;
if(cc==1 || waterchk(movex2,movey2)==1){a=0.2;b=0.2;}


var xc=800-movex;
var yc=600-movey;
move_r2=Math.sqrt((movex2-xc)*(movex2-xc)+(movey2-yc)*(movey2-yc));

if(move_r2<380){

if(islechk2(movex2,movey2)==0){//これだけだと流れる

movex2 += (dx*a+vx__*b);
movey2 += (dy*a+vy__*b);
}else{//舟方向の流れ用
movex2 -= (dx*a+vx__*b);
movey2 -= (dy*a+vy__*b);
}

if(fishstop==1){

movex2 -= 10*(dx*a+vx__*b);
movey2 -= 10*(dy*a+vy__*b);
fishstop=0;
}

}else{
if(movex2-xc>0){movex2 -=3;}else{movex2 +=3;}
if(movey2-yc>0){movey2 -=3;}else{movey2 +=3;}
}



//?
var cd =movey-movey2;
var ab =movex-movex2;
if(ab==0)ab=1;
var vt=cd/ab;
var ship_th2 = Math.atan(vt);
var ship_thd=ship_th;
if(ship_th<0){ship_thd*=-1;}

var rectx_b2 = 20*Math.cos(ship_thd);
var recty_b2 = 20*Math.sin(ship_thd);

var rectx_d2 = -20*Math.sin(ship_thd);
var recty_d2 = 20*Math.cos(ship_thd);

var rectx_c2 = rectx_d2+rectx_b2;
var recty_c2 = recty_d2+recty_b2;

//揺れ
movex2+=3*(Math.random()-0.5);
movey2+=3*(Math.random()-0.5);

var movex2_lp0=movex2+(rectx_d2)/2;
var movey2_lp0=movey2+(recty_d2)/2;

var movex2_lp1=movex2+(rectx_d2+rectx_c2)/2;
var movey2_lp1=movey2+(recty_d2+recty_c2)/2;

var movex2_lp2=movex2+(rectx_b2+rectx_c2)/2;
var movey2_lp2=movey2+(recty_b2+recty_c2)/2;

var movex2_lp3=movex2+(rectx_b2)/2;
var movey2_lp3=movey2+(recty_b2)/2;


//ica body
ctx.beginPath();
ctx.moveTo(movex2,movey2);
ctx.lineTo(movex2_lp3,movey2_lp3);
ctx.moveTo(movex2,movey2);
ctx.lineTo(movex2_lp0,movey2_lp0);
ctx.moveTo(movex2_lp0,movey2_lp0);
ctx.lineTo(movex2_lp3,movey2_lp3);

//legs
ctx.moveTo(movex2,movey2);
ctx.lineTo(movex2_lp1,movey2_lp1);
ctx.moveTo(movex2,movey2);
ctx.lineTo(movex2_lp2,movey2_lp2);

ctx.strokeStyle = "rgba(250, 250, 250 ,0.5)";//RGBA
ctx.lineWidth = 3;
ctx.stroke();
ctx.closePath();


//eyes
ctx.beginPath();
ctx.arc (movex2_lp1,movey2_lp1,2,0,6.28,false);
ctx.arc (movex2_lp2,movey2_lp1,2,0,6.28,false);

ctx.fillStyle = '#222';
ctx.fill();
ctx.closePath();
ctx.strokeStyle = "rgba(0, 0, 0 ,0.5)";//R,G,B,A


//if(ft0>ft1){
if(true){//向きを無視

// メロンの茎のようでも良い

/*
var dxt=(movex2_lp0-movex2_lp2)*0.3;
var dyt=(movey2_lp0-movey2_lp2)*0.3;
*/
            ctx.beginPath(); //(1)

//	ctx.rect (movex2_lp0,movey2_lp0,dxt,dyt);

//var tf=sec%6;

//if(tf<6){
if(true){
if(cc==1){  // ica catch

if(score%5!=0 || score%6!=0 || score%7!=0 || score%8!=0 || score%9!=0){

v_ship=0;
lv_flag=1;
}

//var r1=3*Math.random();

let rdd=15*Math.random();
let rdd_=15*Math.random();

//	ctx.rect (movex2_lp0,movey2_lp0,dxt,dyt);
ctx.arc (mvx_ct2+rdd,mvy_ct2+rdd_,15,1.5,3,false);
ctx.arc (mvx_ct2+rdd_,mvy_ct2+rdd,15,4.5,6,true);

score--;
}
////	ctx.arc (movex2_lp0+dxt*1.8,movey2_lp0+dyt*1.8,5, Math.PI*0.2, Math.PI*0.7 ,false);//たまに出ている黒い円弧
//}else if(tf<4){
//	ctx.rect (movex2_lp0,movey2_lp0,dxt,dyt);
//	ctx.arc (movex2_lp0+dxt*1.8,movey2_lp0+dyt*1.8,5, Math.PI*0.3, Math.PI*0.8 ,false);

}else{
//	ctx.rect (movex2_lp0,movey2_lp0,dxt,dyt);
//12	ctx.arc (movex2_lp0+dxt*1.8,movey2_lp0+dyt*1.8,5, Math.PI*0.3, Math.PI*0.8 ,false);

}

ctx.fillStyle = '#ddd';
ctx.fill();
ctx.closePath();//(1)


//catcharm

//if(cc==1){

//var rdd=10*Math.random();
//var rdd=10
       //     ctx.beginPath();
//ctx.arc (movex,movey,30,0,6.28,true);
//ctx.arc (movex2+rdd,movey2+rcd,30,3,4.5,false);

         //   ctx.fillStyle = '#ddd';
         //ctx.fill();
           // ctx.closePath();
//}




}else{ //tf1~tf2
/*
var dxt=-(movex2_lp0-movex2_lp2)*0.3;
var dyt=-(movey2_lp0-movey2_lp2)*0.3;

            ctx.beginPath();
	ctx.arc (movex2_lp2+dxt,movey2_lp2+dyt,5,  Math.PI*0.7, Math.PI*1.3 ,false);
            ctx.fillStyle = '#222';
           ctx.fill();
            ctx.closePath();
*/
}


}//score 30


//

var dx=movex-movex1;
if(dx==0){divd=1;}else{divd=dx;}
if(Math.abs(movex-movex1)>7){dx=7*(movex-movex1)/Math.abs(divd);}
var dy=movey-movey1;
if(dy==0){divd=1;}else{divd=dy;}
if(Math.abs(movey-movey1)>7){dy=5*(movey-movey1)/Math.abs(divd);}

if(sec%2==0){
vx_=dx;
vy_=dy;
}

//var w=waterchk(movex1,movey1);

//var a=0.7;
//var b=0.2;
a=0.7;
b=0.2;
if(waterchk(movex1,movey1)){a=0.4;b=0.1;}

movex1 +=(dx*a+vx__*b)/2;


//201805
ship_dir=(dy*a+vy__*b)/2;

movey1 +=ship_dir;

/////

} //sec%1?


//BG: for control

// handlever
            
ctx.beginPath();
ctx.rect(320,560,100,40);
ctx.fillStyle = '#960';
ctx.fill();
ctx.closePath();

ctx.font = "18px 'Arial'";

if(lv_flag==0){
ctx.fillStyle = '#f90';
ctx.fillText("R",325,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("N",350,570,20);
ctx.fillText("1",375,570,20);
ctx.fillText("2",400,570,20);
}else if(lv_flag==1){
ctx.fillStyle = '#fff';
ctx.fillText("R",325,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("N",350,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("1",375,570,20);
ctx.fillText("2",400,570,20);
}else if(lv_flag==2){
ctx.fillStyle = '#fff';
ctx.fillText("R",325,570,20);
ctx.fillText("N",350,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("1",375,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("2",400,570,20);
}else if(lv_flag==3){
ctx.fillStyle = '#fff';
ctx.fillText("R",325,570,20);
ctx.fillText("N",350,570,20);
ctx.fillText("1",375,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("2",400,570,20);
}


// handle  201806

ctx.beginPath();
ctx.rect(430,560,125,40);
ctx.fillStyle = '#960';//eee
ctx.fill();
ctx.closePath();

ctx.font = "18px 'Arial'";

if(hd_flag==0){
ctx.fillStyle = '#f90';
ctx.fillText("L",435,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("■",460,570,20);
ctx.fillText("■",485,570,20);
ctx.fillText("■",510,570,20);
ctx.fillText("R",535,570,20);
}else if(hd_flag==1){
ctx.fillStyle = '#fff';
ctx.fillText("L",435,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("■",460,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("■",485,570,20);
ctx.fillText("■",510,570,20);
ctx.fillText("R",535,570,20);
}else if(hd_flag==2){
ctx.fillStyle = '#fff';
ctx.fillText("L",435,570,20);
ctx.fillText("■",460,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("■",485,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("■",510,570,20);
ctx.fillText("R",535,570,20);
}else if(hd_flag==3){
ctx.fillStyle = '#fff';
ctx.fillText("L",435,570,20);
ctx.fillText("■",460,570,20);
ctx.fillText("■",485,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("■",510,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("R",535,570,20);
}else if(hd_flag==4){
ctx.fillStyle = '#fff';
ctx.fillText("L",435,570,20);
ctx.fillText("■",460,570,20);
ctx.fillText("■",485,570,20);
ctx.fillText("■",510,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("R",535,570,20);
}


//bait button 
ctx.beginPath();
ctx.rect(570,560,40,40);
ctx.fillStyle = '#960';
ctx.fill();
ctx.closePath();

ctx.font = "18px 'Arial'";
ctx.fillStyle = '#fff';
ctx.fillText("@",580,570,20);

//コードの簡略化をしているところ

//Rear
if(handle_th>0){handle_th-=0.01;}
else{handle_th+=0.01;} /*if(handle_th<0)*/



//torp 
const flag = time_rec%100;
console.log(time_rec);
if(flag==30){
let k=6.28*(Math.random()-1);
torp[0][1]=mvx_ct2+80*Math.cos(k/6.28);
torp[0][2]=mvy_ct2+80*Math.sin(k/6.28);
//    if ((time_rec % 100) == 30) {
//torp[0][1]=mvx_ct2+(40+30*(Math.random()-1));
//torp[0][2]=mvy_ct2+(40+30*(Math.random()-1));
torp[0][3]=(torp[0][1]-mvx_ct2)/30;
torp[0][4]=(torp[0][2]-mvy_ct2)/30;

}else if(flag==40){

torp[1][1]=-100;
torp[1][2]=-100;

}else if(flag==60){
torp[1][1]=mvx_ct2+(40+40*(Math.random()-0.6));
torp[1][2]=mvy_ct2+(40+40*(Math.random()-0.6));
torp[1][3]=(torp[1][1]-mvx_ct2)/30;
torp[1][4]=(torp[1][2]-mvy_ct2)/30;

}else if(flag==70){

torp[2][1]=-100;
torp[2][2]=-100;

}else if(flag==90){
let k=6.28*(Math.random()-1);
torp[2][1]=mvx_ct2+60*Math.cos(k/6.28);
torp[2][2]=mvy_ct2+60*Math.sin(k/6.28);
//torp[2][1]=mvx_ct2+(40+40*(Math.random()-0.4));
//torp[2][2]=mvy_ct2+(40+40*(Math.random()-0.4));
torp[2][3]=(torp[2][1]-mvx_ct2)/25;
torp[2][4]=(torp[2][2]-mvy_ct2)/25;

}else if(flag==100){

torp[0][1]=-100;
torp[0][2]=-100;
}

for(let i=0; i<3;i++){

if(islechk2(torp[i][1],torp[i][2])){//これだけだと流れる
torp[i][1]+=torp[i][3];
torp[i][2]+=torp[i][4];
}else{
torp[i][1]-=torp[i][3];
torp[i][2]-=torp[i][4];
}

}

ctx.beginPath();

ctx.rect(torp[0][1],torp[0][2],10,2);
ctx.rect(torp[1][1],torp[1][2],10,2);
ctx.rect(torp[2][1],torp[2][2],10,2);

ctx.fillStyle = '#222';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.rect(torp[0][1],torp[0][2]+2,10,2);
ctx.rect(torp[1][1],torp[1][2]+2,10,2);
ctx.rect(torp[2][1],torp[2][2]+2,10,2);

ctx.fillStyle = '#eee';
ctx.fill();
ctx.closePath();


//mouse control 201806

canvas.onmousedown=function(e){

var canvas = document.getElementById( "stage1" );
var ctx = canvas.getContext( "2d" );

mousedown=true;
}

canvas.onmousemove=function(e){
if(mousedown){//draw(e.pageX,e.pageY);
}
}

canvas.onmouseup=function(e){

mousedown=false;
clx=e.pageX;
cly=e.pageY;

ctx.font = "18px 'Arial'";

if(cly>580 && cly<630){

if(clx>=345 && clx<=370){//motor
//R
	v_ship=-0.5;	
//var w=waterchk(movex,movey);
//var a=10;
//if (waterchk(movex, movey)==1){a=5;}

lv_flag=0;

}else if(clx>370 && clx<=395){
//N
v_ship=0;
lv_flag=1;


}else if(clx>395 && clx<=420){
//V1
v_ship=1;		
//var w=waterchk(movex,movey);
//var a=10;
//if(w==1){a=5;}

lv_flag=2;

}else if(clx>420 && clx<=445){
//V2
v_ship=1.6;	
//var w=waterchk(movex,movey);
//var a=10;
//if(w==1){a=5;}

lv_flag=3;

}else if(clx>=455 && clx<=480){//handle
//L+

//var w=waterchk(movex,movey);
hd_flag=0;

}else if(clx>480 && clx<=505){
//L
//var w=waterchk(movex,movey);

hd_flag=1;

}else if(clx>505 && clx<=530){
//N

//	handle_th=0;
hd_flag=2;

}else if(clx>530 && clx<=555){
//R
	
hd_flag=3;

}else if(clx>555 && clx<=580){
//R+

hd_flag=4;

}else if(clx>600 && clx<=635){ // bait

ctx.font = "18px 'Arial'";
ctx.fillStyle = '#f00';
ctx.fillText("@",580,570,20);

if(score>=10){
var fx = 0;//Math.random();
var fy = 0;//Math.random();
array_ndx[fvr_c]=mvx_ct2+(movex_ct3-movex_ct1)*(1+fx);
array_ndy[fvr_c]=mvy_ct2+(movey_ct3-movey_ct1)*(1+fy);

if(++fvr_c==5)fvr_c=0;

score-=10;

}

}//bait

}//CLY

}// mouse

}//class 



function loadFunc() {
var canvas = document.getElementById( "stage1" );
var ctx = canvas.getContext( "2d" );
/*
var elm = document.getElementById('target');

var year=new Date().getYear();
var month=new Date().getMonth()+1;
var day=new Date().getDay();
	
*/
ctx.fillStyle = "blue";
ctx.font = "20px 'Arial'";
ctx.textAlign = "left";
ctx.textBaseline = "top";
ctx.fillText("Tresure WindBoat ver1.3 ",10,10,150);
}


function waterchk(m,n){
for(let i=0; i<2;i++){
let r1=Math.pow(m-(pondx[i]-movex),2)+Math.pow(n-(pondy[i]-movey),2);
if (r1 < pondr[i]*pondr[i])return 1;
}
return 0;
}


function islechk(m,n){
for(let i=5; i<10;i++){
let r1=Math.pow(m-pondx[i],2)+Math.pow(n-pondy[i],2);
if (r1 < pondr[i]*pondr[i]) return 1;
}
return 0;
}


function islechk2(m,n){
for(let i=5; i<10;i++){
let r1=Math.pow(m-(pondx[i]-movex),2)+Math.pow(n-(pondy[i]-movey),2);
if (r1 < pondr[i]*pondr[i])return 1;
}
return 0;
}


function catchchk(x,y,ra){
let r=Math.pow(x-mvx_ct2,2)+Math.pow(y-mvy_ct2,2);
if(r < ra*ra)return 1;
return 0;
}


function catchchk2(x,y,ra){
let r=Math.pow(x-movex2,2)+Math.pow(y-movey2,2);
if (r < ra*ra)return 1;
return 0;
}


function mashrchk(x,y){//buyoi
for(let i=0;i<=fvr_c;i++){
let r = Math.pow(x - array_ndx[i], 2) + Math.pow(y - array_ndy[i],2);
if(r<9)return 1;
}
return 0;
}
