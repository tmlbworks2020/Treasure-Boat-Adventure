//Tresure_Boat ver1.4 (c) tmlb-works 2022.5

window.addEventListener("load",loadFunc,false);

setInterval(playerMove, 250);  

// ship parameter // 

var ship_th=1.6;
var handle_th=0;

var mvx=400; //start xy
var mvy=300;
var mvx1=800;//next xy
var mvy1=300;
var v_sp=0;

// enemy //
var torp= new Array(5);
torp[0]=new Array(5);
torp[1]=new Array(5);
torp[2]=new Array(5);

//? var score_fvr=new Array(200);

var rnd=Math.random();
var mvx2=400+300*Math.cos(rnd*6.3);//enemy start xy
var mvy2=300+300*Math.sin(rnd*6.3);
/*
var mvx3=400;
var mvy3=600;
var mvx4=400;
var mvy4=0;
*/

var vx_=0;
var vy_=0;
var vx__=0;
var vy__=0;
/*
var vx3=0;
var vy3=0;
var vx4=0;
var vy4=0;

var pondx1=Math.random()*800;
var pondy1=Math.random()*1000;
var pondx2=Math.random()*800;
var pondy2=Math.random()*1000;
var pondx3=Math.random()*800;
var pondy3=Math.random()*1000;
*/
var fd=0;// esa number
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

var sp_dr=0;
var v_wx=0;
var v_wy=0;
var d_w=0;
/*
var lv_handlever=0;
var lv_handle=0;
*/
var lv_flg=1;
var hd_flg=2;

//var enem_flag=0;

var cc=0;

//pond固定式に変更

var pornd=Math.round(16*Math.random());
pornd-=8;

/*
for(var i=0; i<5;i++){
pondx[i]=mvx+400+600*(Math.random()-0.5);
pondy[i]=mvy+250+300*(Math.random()-0.5);
pondr[i]=100*Math.random();
}
*/

pondx[0]=mvx+400+600*(Math.random()-0.5);
pondy[0]=mvy+250+300*(Math.random()-0.5);
pondr[0]=80;

pondx[1]=mvx+400+600*(Math.random()-0.5);
pondy[1]=mvy+250+300*(Math.random()-0.5);
pondr[1]=64;


//island
for(var i=5; i<10;i++){//10
/*
pondx[i]=mvx+400+Math.cos((i+2*Math.random())/15*6.3)* (256+30*(Math.random()-0.5));//player xy/2 
pondy[i]=mvy+250+Math.sin((i+2*Math.random())/15*6.3)* (256+30*(Math.random()-0.5))
*/
pondx[i]=mvx+400+Math.cos((i*6*Math.random())/6)* (360+10*Math.random());//player xy/2

var isly=Math.random();
if(isly<0.3){isly-=1;}


pondy[i]=mvy+250+isly*(360+10*Math.random());

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

var xc_=800-mvx;//400-(mvx-400)
var yc_=600-mvy;//300-(mvy-300)
var score_r=(mvx-xc_)*(mvx-xc_)+(yc_-mvy)*(yc_-mvy);

if(score_r<144400){

score++;
time_rec++;
if(score<0)score=0;

}


//pool
            ctx.beginPath();
            //ctx.arc (400+400-mvx,300+300-mvy,380,0, 6.3 * 2, false);
            ctx.arc (800-mvx,600-mvy,380,0, 6.3 * 2, false);
            ctx.fillStyle = '#77f';
            ctx.fill();
            ctx.closePath();

//pond
for(let i=0; i<2;i++){

          ctx.beginPath();
          ctx.arc (pondx[i]-mvx,pondy[i]-mvy,pondr[i],0, 6.3 * 2, false);
          ctx.fillStyle = '#9ff';
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
            ctx.arc (cc1+aax*i*150-mvx+c_s*wv1,cc2+aay*i*150-mvy+c_s*wv2,800,ag1,ag2,false);
           
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
          ctx.arc (pondx[i]-mvx,pondy[i]-mvy,pondr[i],0, 6.3 * 2, false);
          ctx.fillStyle = '#ffc';
          ctx.fill();
          ctx.closePath();

          ctx.beginPath();
          ctx.arc (pondx[i]-mvx+pornd,pondy[i]-mvy,pondr[i]-8,0, 6.3 * 2, false);

          ctx.fillStyle = '#3e3';

          ctx.fill();
          ctx.closePath();
          
          ctx.beginPath();
            
          ctx.arc (pondx[i]-mvx+pornd,pondy[i]-mvy+pornd,pondr[i]-20,0, 6.3 * 2, false);
          ctx.fillStyle = '#060';
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
//ctx.fillText((mvx2)+" "+(mvy2),10,10,100);
//ctx.fillText(Math.round(mvx)+" "+Math.round(mvy),10,30,100);
//ctx.fillText(array_ndx[0]+" "+array_ndy[0],10,50,100);

ctx.fillText(" "+score,180,570,100);

//ctx.fillText(ship_th+" "+score,10,10,100);
//ctx.fillText(""+v_sp,820,100,100);
//ctx.fillText(""+handle_th,820,100,100);
//ctx.fillText(""+lever_level,820,100,100);

/*
    }else if(game_end==1){
    ctx.fillText("CLEAR !",180,570,100);

    }else if(game_end==2){
    ctx.fillText("GAME OVER !",160,570,100);
    }
*/
 }else if(game_end==1){//gameを止めないと1000以下になる
    ctx.beginPath();
    var img = new Image();
img.src = "./pic/clear1.gif";
ctx.drawImage(img,200,200);
ctx.closePath();
    }else if(game_end==2){
    ctx.beginPath();
        var img = new Image();
img.src = "./pic/over1.gif";
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

if(catchchk(itemx-mvx,itemy-mvy,16)){score+=100;itemx=-1000;itemy=-1000;}

if(score>10 && score%100==0){
itemx=mvx+400+Math.cos(Math.random()*6.3)* (150+150*(Math.random()-0.5));
itemy=mvy+300+Math.sin(Math.random()*6.3)* (150+150*(Math.random()-0.5));
}

           ctx.beginPath();
           ctx.arc (itemx-mvx,itemy-mvy,10, 0, 6.3 * 2, false);
           ctx.fillStyle = '#f9f';
           ctx.fill();
           ctx.closePath();

           ctx.beginPath();
           ctx.arc (itemx-mvx,itemy-mvy+5,5, 0, 6.3 * 2, false);
           ctx.fillStyle = '#ff3';
           ctx.fill();
           ctx.closePath();

// fvr

for(let i=0; i<=fd;i++){

if(catchchk2(array_ndx[i],array_ndy[i],20)){
array_ndx[i]=-1000;
array_ndy[i]=-1000;
fishstop=1;
}

}


//player
if(hd_flg==0){if(handle_th<-0.075){handle_th-=0.015;}else{handle_th=-0.075;}}
else if(hd_flg==1){if(handle_th<-0.075){handle_th-=0.007;}else{handle_th=-0.025;}}
else if(hd_flg==2){if(handle_th<-0.075){handle_th=0;}else{handle_th=0;}}
else if(hd_flg==3){if(handle_th<0.075){handle_th+=0.007;}else{handle_th=0.075;}}
else if(hd_flg==4){if(handle_th<0.075){handle_th+=0.015;}else{handle_th=0.075;}}


ship_th+=handle_th;

var rectx_b = 30*Math.cos(ship_th);
var recty_b = 30*Math.sin(ship_th);

	var rectx_d = -10*Math.sin(ship_th);
	var recty_d = 10*Math.cos(ship_th);

	var rectx_c = rectx_d+rectx_b;
	var recty_c = recty_d+recty_b;

    ctx.beginPath();
	ctx.moveTo(mvx,mvy);
	ctx.lineTo(mvx+rectx_b,mvy+recty_b);
	ctx.moveTo(mvx+rectx_b,mvy+recty_b);
	ctx.lineTo(mvx+rectx_c,mvy+recty_c);
	ctx.moveTo(mvx+rectx_c,mvy+recty_c);
	ctx.lineTo(mvx+rectx_d,mvy+recty_d);
	ctx.moveTo(mvx+rectx_d,mvy+recty_d);
	ctx.lineTo(mvx,mvy);

	ctx.stroke();
	ctx.fillStyle ='#f93';
    ctx.closePath();

var mvx_lt=mvx+rectx_b;
var mvy_lt=mvy+recty_b;

    ctx.beginPath();
	ctx.arc (mvx_lt,mvy_lt,3, 0, 6.3 * 2, false);
    ctx.fillStyle = '#fcc';
    ctx.fill();

    ctx.closePath();


// fire & smoke

var mvx_ct2p=(rectx_b+rectx_c+rectx_d)/4;
var mvx_ct1=mvx+(rectx_d+mvx_ct2p)/3;
mvx_ct2=mvx+mvx_ct2p;//GLB
var mvx_ct3=mvx+(rectx_b+rectx_c+mvx_ct2p)/3;

var mvy_ct2p=(recty_b+recty_c+recty_d)/4;
var mvy_ct1=mvy+(recty_d+mvy_ct2p)/3;
mvy_ct2=mvy+mvy_ct2p;
var mvy_ct3=mvy+(recty_b+recty_c+mvy_ct2p)/3;

        ctx.beginPath();

	ctx.arc (mvx_ct1,mvy_ct1,5, 0, 6.3 * 2, false);
	ctx.arc (mvx_ct2,mvy_ct2,6, 0, 6.3*2 ,false);
	ctx.arc (mvx_ct3,mvy_ct3,5, 0, 6.3 * 2, false);
        ctx.fillStyle = '#960';
        ctx.fill();

        ctx.closePath();



// mast　202108

if(d_w==0){

var msx1=mvx+rectx_b/2;
var msy1=mvy+recty_b/2;
var msx2=mvx+(rectx_c+rectx_d)/2;
var msy2=mvy+(recty_c+recty_d)/2;

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

for(let i=0;i<3;i++){
hit_flag[i]=0;
hit_flag[i]=catchchk(torp[i][1],torp[i][2],10);
if(hit_flag[i]==1){score-=25;}
}


if(hit_flag[0]==1){
    ctx.beginPath();
	ctx.arc (mvx_ct1,mvy_ct1,6, 0, 6.3, false);
    ctx.fillStyle = '#d22';
    ctx.fill();
    ctx.closePath();
}

if(hit_flag[1]==1){
    ctx.beginPath();
	ctx.arc(mvx_ct2,mvy_ct2,6, 0, 6.3, false);
    ctx.fillStyle = '#d22';
    ctx.fill();
    ctx.closePath();
}

if(hit_flag[2]==1){
    ctx.beginPath();
	ctx.arc(mvx_ct3,mvy_ct3,6, 0, 6.3, false);
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

	swx[0]= mvx;
	swy[0]= mvy;
	swx[1]= mvx+rectx_b;
	swy[1]= mvy+recty_b;
	
	swx[5]= mvx+rectx_d;
	swy[5]= mvy+recty_d;
	swx[6]= mvx+rectx_c;
	swy[6]= mvy+recty_c;


///ship_wave

	var i_max=3;
	
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

//var w0=islechk2(mvx,mvy);

if(islechk2(mvx,mvy)){
mvx+=v_sp*Math.cos(ship_th)+v_wx;
mvy+=v_sp*Math.sin(ship_th)+v_wy;
}else{
mvx-=v_sp*Math.cos(ship_th)+v_wx;
mvy-=v_sp*Math.sin(ship_th)+v_wy;
}//ぶつかりタイミングでＲが効かない小バグ


//byoui
for(let i=0;i<=10;i++){
ctx.beginPath();
//x,yは中心
ctx.arc(array_ndx[i]-(mvx_ct3-array_ndx[i]),array_ndy[i]-(mvy_ct3-array_ndy[i]), 3, 0, 6.3, false);
ctx.rect(array_ndx[i]-(mvx_ct3-array_ndx[i]),array_ndy[i]-(mvy_ct3-array_ndy[i]), 1, 8, 6.3, false);
ctx.fillStyle = '#f66';
ctx.fill();
ctx.closePath();
}


//catch
var ct_=0;
//var ct=catchchk(mvx2,mvy2,15);

if(catchchk(mvx2,mvy2,15)){score-=50;ct_=1;}
if(ct_==1){

ctx.beginPath();
ctx.arc(mvx_ct2, mvy_ct2, 7, 0, 6.3 * 2, false);
ctx.fillStyle = '#aaa';
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(mvx_ct2, mvy_ct2, 6, 0, 6.3 * 2, false);
ctx.fillStyle = '#d22';
ctx.fill();
ctx.closePath();

mvx2=400+250*Math.cos(Math.random()*6.3);
mvy2=300+250*Math.sin(Math.random()*6.3);

}else{

//player 再描

}


//enem(Orca)
var enem=1;

if(score>5){//30

cc=catchchk(mvx2,mvy2,50);

var divd=1;
var dx=(mvx_ct2-mvx2);
if(dx==0){divd=1;}else{divd=dx;}

if(Math.abs(mvx_ct2-mvx2)>5){dx=2*(mvx_ct2-mvx2)/Math.abs(divd);}
var  dy=(mvy_ct2-mvy2);
if(dy==0){divd=1;}else{divd=dy;}
if(Math.abs(mvy_ct2-mvy2)>5){dy=2*(mvy_ct2-mvy2)/Math.abs(divd);}

if(sec%2==0){
vx__=dx-v_wx;//201805-balance?
vy__=dy-v_wy;
}


//var w=waterchk(mvx2,mvy2);

var a=0.6;
var b=0.6;
//if (SCORE > 100) {a=1;b=1;}
if (waterchk(mvx2, mvy2)==1){a=0.2;b=0.2;}


var xc=800-mvx;
var yc=600-mvy;
move_r2=(mvx2-xc)*(mvx2-xc)+(mvy2-yc)*(mvy2-yc);

if(move_r2<144400){//380

if(islechk2(mvx2,mvy2)==0){//これだけだと流れる

mvx2 += (dx*a+vx__*b);
mvy2 += (dy*a+vy__*b);
}else{//舟方向の流れ用
mvx2 -= (dx*a+vx__*b);
mvy2 -= (dy*a+vy__*b);
}

if(fishstop==1){

mvx2 -= 30*(dx*a+vx__*b);
mvy2 -= 30*(dy*a+vy__*b);
fishstop=0;
}

}else{
if(mvx2-xc>0){mvx2 -=3;}else{mvx2 +=3;}
if(mvy2-yc>0){mvy2 -=3;}else{mvy2 +=3;}
}


//?
var cd =mvy-mvy2;
var ab =mvx-mvx2;
var vt=cd/ab;
var ship_th2 = Math.atan(vt);
var ship_thd=ship_th;
if(ship_th<0){ship_thd*=-1;}

var rectx_b2 = 25*Math.cos(ship_thd);
var recty_b2 = 25*Math.sin(ship_thd);

var rectx_d2 = -15*Math.sin(ship_thd);
var recty_d2 = 15*Math.cos(ship_thd);

var rectx_c2 = rectx_d2+rectx_b2;
var recty_c2 = recty_d2+recty_b2;

//揺れ
mvx2+=3*(Math.random()-0.5);
mvy2+=3*(Math.random()-0.5);

var mvx2_lp0=mvx2+(rectx_d2)/2;
var mvy2_lp0=mvy2+(recty_d2)/2;

var mvx2_lp1=mvx2+(rectx_d2+rectx_c2)/2;
var mvy2_lp1=mvy2+(recty_d2+recty_c2)/2;

var mvx2_lp2=mvx2+(rectx_b2+rectx_c2)/2;
var mvy2_lp2=mvy2+(recty_b2+recty_c2)/2;

var mvx2_lp3=mvx2+(rectx_b2)/2;
var mvy2_lp3=mvy2+(recty_b2)/2;

//揺れる
    ctx.beginPath();
	ctx.moveTo(mvx2_lp0,mvy2_lp0);
	ctx.lineTo(mvx2_lp1,mvy2_lp1);
	ctx.moveTo(mvx2_lp1,mvy2_lp1);
	ctx.lineTo(mvx2_lp2,mvy2_lp2);
	ctx.moveTo(mvx2_lp2,mvy2_lp2);
	ctx.lineTo(mvx2_lp3,mvy2_lp3);
	ctx.moveTo(mvx2_lp3,mvy2_lp3);
	ctx.lineTo(mvx2_lp0,mvy2_lp0);
	ctx.strokeStyle = '#000'
	ctx.stroke();//black
    ctx.closePath();



var ft0 = Math.sqrt((mvx-mvx2_lp0)*(mvx-mvx2_lp0)+(mvy-mvy2_lp0)*(mvy-mvy2_lp0));
var ft1 = Math.sqrt((mvx-mvx2_lp2)*(mvx-mvx2_lp2)+(mvy-mvy2_lp2)*(mvy-mvy2_lp2));

if(ft0>ft1){

var dxt=(mvx2_lp0-mvx2_lp2)*0.3;
var dyt=(mvy2_lp0-mvy2_lp2)*0.3;

ctx.beginPath();

var tf=sec%6;

if(tf<2){
	ctx.arc (mvx2_lp0+dxt*1.8,mvy2_lp0+dyt*1.8,5, 6.3*0.2, 6.3*0.7 ,false);
}else{
	ctx.arc (mvx2_lp0+dxt*1.8,mvy2_lp0+dyt*1.8,5, 6.3*0.3, 6.3*0.8 ,false);
}
         ctx.fillStyle = '#222';
         ctx.fill();
         ctx.closePath();


}else{
var dxt=-(mvx2_lp0-mvx2_lp2)*0.3;
var dyt=-(mvy2_lp0-mvy2_lp2)*0.3;

    ctx.beginPath();
	ctx.arc (mvx2_lp2+dxt,mvy2_lp2+dyt,5,6.3*0.7,6.3*1.3,false);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.closePath();

}


var mvx2_ct2p=(rectx_b2+rectx_c2+rectx_d2)/4;
var mvx2_ct1=mvx2+(rectx_d2+mvx2_ct2p)/3;
mvx2_ct2=mvx2+mvx2_ct2p;
var mvx2_ct3=mvx2+(rectx_b2+rectx_c2+mvx2_ct2p)/3;

var mvy2_ct2p=(recty_b2+recty_c2+recty_d2)/4;
var mvy2_ct1=mvy2+(recty_d2+mvy2_ct2p)/3;
mvy2_ct2=mvy2+mvy2_ct2p;
var mvy2_ct3=mvy2+(recty_b2+recty_c2+mvy2_ct2p)/3;

    ctx.beginPath();
	ctx.arc (mvx2_ct2,mvy2_ct2,3, 0, 6.3*2 ,false);

    ctx.fillStyle = '#ddd';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
	ctx.arc (mvx2_ct1,mvy2_ct1,4, 0, 6.3 * 2, false);
	ctx.arc (mvx2_ct3,mvy2_ct3,3, 0, 6.3 * 2, false);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.closePath();

}//score 30


//

var dx=mvx-mvx1;
if(dx==0){divd=1;}else{divd=dx;}
if(Math.abs(mvx-mvx1)>7){dx=7*(mvx-mvx1)/Math.abs(divd);}
var dy=mvy-mvy1;
if(dy==0){divd=1;}else{divd=dy;}
if(Math.abs(mvy-mvy1)>7){dy=5*(mvy-mvy1)/Math.abs(divd);}

if(sec%2==0){
vx_=dx;
vy_=dy;
}

//var w=waterchk(mvx1,mvy1);

var a=0.7;
var b=0.2;
if(waterchk(mvx1,mvy1)){a=0.4;b=0.1;}//1

mvx1 += (dx*a+vx__*b)/2;


//201805
sp_dr=(dy*a+vy__*b)/2;

mvy1 += sp_dr;

} //sec%1?


//BG: for control

// handlever
            
ctx.beginPath();
ctx.rect(320,560,100,40);
ctx.fillStyle = '#960';
ctx.fill();
ctx.closePath();

ctx.font = "18px 'Arial'";

if(lv_flg==0){
ctx.fillStyle = '#f90';
ctx.fillText("R",325,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("N",350,570,20);
ctx.fillText("1",375,570,20);
ctx.fillText("2",400,570,20);
}else if(lv_flg==1){
ctx.fillStyle = '#fff';
ctx.fillText("R",325,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("N",350,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("1",375,570,20);
ctx.fillText("2",400,570,20);
}else if(lv_flg==2){
ctx.fillStyle = '#fff';
ctx.fillText("R",325,570,20);
ctx.fillText("N",350,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("1",375,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("2",400,570,20);
}else if(lv_flg==3){
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

if(hd_flg==0){
ctx.fillStyle = '#f90';
ctx.fillText("L",435,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("■",460,570,20);
ctx.fillText("■",485,570,20);
ctx.fillText("■",510,570,20);
ctx.fillText("R",535,570,20);
}else if(hd_flg==1){
ctx.fillStyle = '#fff';
ctx.fillText("L",435,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("■",460,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("■",485,570,20);
ctx.fillText("■",510,570,20);
ctx.fillText("R",535,570,20);
}else if(hd_flg==2){
ctx.fillStyle = '#fff';
ctx.fillText("L",435,570,20);
ctx.fillText("■",460,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("■",485,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("■",510,570,20);
ctx.fillText("R",535,570,20);
}else if(hd_flg==3){
ctx.fillStyle = '#fff';
ctx.fillText("L",435,570,20);
ctx.fillText("■",460,570,20);
ctx.fillText("■",485,570,20);
ctx.fillStyle = '#f90';
ctx.fillText("■",510,570,20);
ctx.fillStyle = '#fff';
ctx.fillText("R",535,570,20);
}else if(hd_flg==4){
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
else /*if(handle_th<0)*/{handle_th+=0.01}



// torp 

const flag = time_rec%100;

if(flag==30){
//    if ((time_rec % 100) == 30) {
let k=6.28*(Math.random()-1);
torp[0][1]=mvx_ct2+80*Math.cos(k/6.28);
torp[0][2]=mvy_ct2+80*Math.sin(k/6.28);
//torp[0][1]=mvx_ct2+(40+30*(Math.random()-1));
//torp[0][2]=mvy_ct2+(40+30*(Math.random()-1));
torp[0][3]=(torp[0][1]-mvx_ct2)/30;
torp[0][4]=(torp[0][2]-mvy_ct2)/30;

}else if(flag==20){
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

}else if(flag==70){

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

canvas.onmousedown
	= function(e){

var canvas = document.getElementById( "stage1" );
var ctx = canvas.getContext( "2d" );

mousedown=true;
}


canvas.onmousemove
	= function(e){
			if(mousedown){
			//draw(e.pageX,e.pageY);
			}
}

canvas.onmouseup
	=function(e){

		mousedown=false;
clx=e.pageX;
cly=e.pageY;

ctx.font = "18px 'Arial'";

if(cly>580 && cly<630){

if(clx>=345 && clx<=370){//motor
//R
v_sp=-0.5;	
//var w=waterchk(mvx,mvy);
//var a=10;
//if (waterchk(mvx, mvy)==1){a=5;}

lv_flg=0;

}else if(clx>370 && clx<=395){
//N
v_sp=0;
lv_flg=1;

}else if(clx>395 && clx<=420){
//V1
v_sp=1;		
//var w=waterchk(mvx,mvy);
//var a=10;
//if(w==1){a=5;}

lv_flg=2;

}else if(clx>420 && clx<=445){
//V2
v_sp=2;	
//var w=waterchk(mvx,mvy);
//var a=10;
//if(w==1){a=5;}

lv_flg=3;

}else if(clx>=455 && clx<=480){//handle
//L+

//var w=waterchk(mvx,mvy);

hd_flg=0;

}else if(clx>480 && clx<=505){
//L
//var w=waterchk(mvx,mvy);

hd_flg=1;

}else if(clx>505 && clx<=530){
//N

//	handle_th=0;
hd_flg=2;

}else if(clx>530 && clx<=555){
//R
	
hd_flg=3;

}else if(clx>555 && clx<=580){
//R+

hd_flg=4;

}else if(clx>600 && clx<=635){ // bait

ctx.font = "18px 'Arial'";
ctx.fillStyle = '#f00';
ctx.fillText("@",580,570,20);

if(score>=10){
    var fx = 0;//Math.random();
    var fy = 0;//Math.random();

//fx=0;fy=0;

array_ndx[fd]=mvx_ct2+(mvx_ct3-mvx_ct1)*(1+fx);
array_ndy[fd]=mvy_ct2+(mvy_ct3-mvy_ct1)*(1+fy);
fd++;
if(fd==5){fd=0;}

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
let r1=Math.sqrt(Math.pow(m-(pondx[i]-mvx),2)+Math.pow(n-(pondy[i]-mvy),2));
if(r1 < pondr[i])return 1;
}
return 0;
}


function islechk(m,n){

for(let i=5; i<10;i++){
let r1=Math.sqrt(Math.pow(m-pondx[i],2)+Math.pow(n-pondy[i],2));
if(r1 < pondr[i])return 1;
}
return 0;
}


function islechk2(m,n){

for(let i=5; i<10;i++){
let r1=Math.sqrt(Math.pow(m-(pondx[i]-mvx),2)+Math.pow(n-(pondy[i]-mvy),2));
if(r1 < pondr[i])return 1;
}
return 0;
}



function catchchk(x,y,ra){

let r=Math.pow(x-mvx_ct2,2)+Math.pow(y-mvy_ct2,2);
if (r < ra*ra) return 1;
return 0;
}


function catchchk2(x,y,ra){

let r=Math.pow(x-mvx2,2)+Math.pow(y-mvy2,2);

if (r < ra*ra) return 1;
return 0;
}

function mashrchk(x,y){ //buyoi

for(let i=0;i<=fd;i++){

let r = Math.pow(x - array_ndx[i], 2) + Math.pow(y - array_ndy[i], 2);
if (r < 9) { return 1;}
}
return 0;
}
