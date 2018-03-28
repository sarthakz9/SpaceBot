//===================================================
//====Developed By Sarthak Sehgal=====================
//====mail:sarthaki.esw@gmail.com =========================

var currentstage=0,ST,frame,stage1,mist,portal=[],bot,meteor,thrust,smoke,land,base,planets=[],sponsors=[],fallvel=0,flyvel=0,grav=0.5,absoluteY=500,offset=0,levAng=0,spaceCoordinate=0,LengthContraction;
var stage1img=[],botimg=[],landimg,portalimg,sponsorimg=[],xoxo,controller=[];
var DeusXmaxim,WrathOfTitans=0,menu,Mfac=0;   //2nd wala timer for meteor creation.
var moveLeft=false,moveRight=true,flyFlag=false,menuFlag=false,HyperDrive=false,Mobile=false,TouchFlag=false;
var KEYCODE_LEFT = 37, KEYCODE_RIGHT = 39, KEYCODE_UP = 38, KEYCODE_DOWN = 40, KEYCODE_SPACE=32;
var messageField;

function checkOrientation()
{
	if(window.matchMedia("(orientation: portrait)").matches) {
		alert("Please switch to Landscape Mode");
	}
}
$(window).on("orientationchange",function(){
  if(window.orientation == 0) // Portrait
  {
	  checkOrientation();
  }
  else // Landscape
  {
	  window.location.reload(false);
  }
});

var stageLayout=[];
function init() {
	checkOrientation();
	frame = new createjs.Stage(document.getElementById("intro1"));
	window.addEventListener("resize", resize);

	W = window.innerWidth;
     H = window.innerHeight;
	document.getElementById("intro1").width = W;
	document.getElementById("intro1").height = H;
	if (createjs.BrowserDetect.isIOS || createjs.BrowserDetect.isAndroid || createjs.BrowserDetect.isBlackberry) {

		togglecontrol(0);
		Mfac=5;
		TouchFlag=true;
		Mobile=true;
		createjs.Touch.enable(frame);
		frame.enableMouseOver(10);
		frame.mouseMoveOutside = true;
		//alert("To play the game visit the site on desktop, also you can register on mobile via side menu.");
	}
	else {
		Mfac=10;
		TouchFlag=false;
		/*createjs.Touch.disable(frame);*/
	 	togglecontrol(1);
		Mobile=false;
	}
	//alert(W+" "+H);

	messageField = new createjs.Text("Loading", "bold 24px Arial", "#3030ff");
	messageField.maxWidth = 1000;
	messageField.textAlign = "center";
	messageField.textBaseline = "middle";
	messageField.x = W/2;
	messageField.y = H/2;
	frame.addChild(messageField);
	frame.update();

	manifest = [
	{src: "../resources/sky.jpg", id: "bg03"},
	{src: "../resources/mist2.png", id: "mist"},
	{src: "../resources/portal1.png", id: "portal"},
     {src: "../resources/ANDbot2.png", id: "bot"},
	{src: "../resources/thrust.png", id: "thrust"},
	{src: "../resources/smoke.png", id: "smoke"},
	{src: "../resources/land.png", id: "Land"},
	{src: "../resources/P01.png", id: "P01"},
	{src: "../resources/P02.png", id: "P02"},
	{src: "../resources/P04.png", id: "P04"},
	{src: "../resources/meteors.png", id: "meteor"},
	{src: "../resources/pointer.png", id: "pointer"},
	{src: "../Sponsors/s1.png", id: "s1"},
	{src: "../Sponsors/s2.png", id: "s2"},
	{src: "../Sponsors/s3.png", id: "s3"},
	{src: "../Sponsors/s4.png", id: "s4"},
	];
     preloader = new createjs.LoadQueue(false);
	$('#load').hide();
	preloader.addEventListener("complete", handleComplete);
	preloader.addEventListener("progress", updateLoading );
	preloader.loadManifest(manifest,true);
	//createjs.Ticker.interval=1000; //in ms
}

function loadLargeImages() {
  var preload = new createjs.LoadQueue();
  preload.addEventListener("fileload", handlePlacements);
  preload.loadFile({id:"spongebob", src:"../resources/spo.gif"});
}

function handlePlacements(event)
{
	document.getElementById("sponge").appendChild(event.result);
}



function updateLoading()
{
	messageField.text = "Loading " + (preloader.progress * 100 | 0) + "%";
	//frame.addChild(messageField);
	frame.update();
}

function Score(){
	var _score=-100;
	this._updateScore=function(){
		if(createjs.Ticker.getTime(true)-WrathOfTitans>5000 && createjs.Ticker.getTime(true)-WrathOfTitans<6000 )
		{
			_score+=100;
			ST.text="Score : "+_score.toString();
		}
	}
	this._getScore = function(){
		return _score;
	}
	this._nullify = function(){
		_score=0;
	}
}

var DoomsCard=new Score();
function handleComplete() {
	frame.update();
	$('#frbut').hide();
     resize();
     initFrameElements();
	positionFrame();
	constructStage(15);
	changeStage(0)
	createjs.Ticker.addEventListener("tick", gameloop);
	// create code using tween
	WrathOfTitans=createjs.Ticker.getTime();
	loadLargeImages();
}


function initFrameElements()
{
     //=======================================bg03==================================
     stage1img[0]=preloader.getResult("bg03");
     stage1 = new createjs.Shape();
     stage1.graphics.beginBitmapFill(stage1img[0]).drawRect(0, 0, stage1img[0].width, stage1img[0].height);
	//=======================================mist=================================
	stage1img[1] = preloader.getResult("mist");
	mist = new createjs.Shape();
	mist.graphics.beginBitmapFill(stage1img[1]).drawRect(0, 0, stage1img[1].width, stage1img[1].height);

     //=======================================bot==================================
	//1 body.
	botimg[0]=preloader.getResult("bot");
     var botSheet = new createjs.SpriteSheet({
     framerate: 15,
     images: [botimg[0]],
     frames: {width:193, height:109, count:2, regX:0, regY:0, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
     "still":[0,0,"still"],
     "boost": [1, 1,"boost"]
     }
     });
	bot = new createjs.Sprite(botSheet, "still");
	//2. thrust.
	botimg[1]=preloader.getResult("thrust");
     thrust = new createjs.Shape();
	thrust.graphics.beginBitmapFill(botimg[1]).drawRect(0, 0, botimg[1].width, botimg[1].height);
	//3. smoke
	botimg[2]=preloader.getResult("smoke");
     smoke = new createjs.Shape();
	smoke.graphics.beginBitmapFill(botimg[2]).drawRect(0, 0, botimg[2].width, botimg[2].height);
	//=======================================base==================================
     landimg=preloader.getResult("Land");
     land = new createjs.Shape();
     land.graphics.beginBitmapFill(landimg,"no-repeat").drawRect(0, 0, landimg.width,landimg.height);
	//=======================================portal===============================\
	// portalimg=preloader.getResult("portal");
	// portal = new createjs.Shape();
	// portal.graphics.beginBitmapFill(portalimg,"no-repeat").drawRect(0, 0, portalimg.width,portalimg.height);

	var portalSheet = new createjs.SpriteSheet({
     framerate: 15,
     images: [preloader.getResult("portal")],
     frames: {width:243.5, height:383, count:2, regX:60, regY:383, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
     "point":[0,1,"point",0.1]
     }
     });
	portal[0] = new createjs.Sprite(portalSheet, "point");


	//=========================================planets===========================
	var img=[],p=[];
	img[0] = preloader.getResult("P01"),img[1] = preloader.getResult("P02"),img[2] = preloader.getResult("P04");
	p[0] = new createjs.Shape(),p[1] = new createjs.Shape(),p[2] = new createjs.Shape();
	p[0].graphics.beginBitmapFill(img[0],"no-repeat").drawRect(0, 0, img[0].width,img[0].height);
	p[1].graphics.beginBitmapFill(img[1],"no-repeat").drawRect(0, 0, img[1].width,img[1].height);
	p[2].graphics.beginBitmapFill(img[2],"no-repeat").drawRect(0, 0, img[2].width,img[2].height);
	p[3]=p[1].clone(true),p[4]=p[0].clone(true);
	scaleElements(p[0],img[0],5,5,false);
	scaleElements(p[1],img[1],7,7,false);
	scaleElements(p[2],img[2],4,4,false);	//sun
	scaleElements(p[3],img[1],10,10,false);
	scaleElements(p[4],img[0],10,10,false);
	p[0].x=W*0.5;p[1].x=W*1.7;p[2].x=W*1.2;p[3].x=W*1;p[4].x=W*2.5;
	p[0].y=-30;p[1].y=+40;p[4].y=-50;p[2].y=-50;

	planets[0] = new createjs.Container();
	planets[0].addChildAt(p[0],0);planets[0].addChildAt(p[1],1);planets[0].addChildAt(p[4],2);
	planets[0].x=100;
	planets[1] = new createjs.Container();
	planets[1].addChildAt(p[3],0);planets[1].addChildAt(p[2],1);
	planets[1].x=10;
	//======================================meteor=======================================
	var meteorSheet = new createjs.SpriteSheet({
     framerate: 15,
     images: [preloader.getResult("meteor")],
     frames: {width:80, height:119, count:6, regX:0, regY:0, spacing:0, margin:0
     },
     // define two animations, run (loops, 1.5x speed) and jump (returns to run):
     animations: {
     "burn":[0,5,"burn",0.1]
     }
     });
	meteor = new createjs.Sprite(meteorSheet, "still");
	//==================================sponsors==================================
	sponsorimg[0]=preloader.getResult("s1");
	sponsors[0]=new createjs.Shape();
	sponsors[0].graphics.beginBitmapFill(sponsorimg[0],"no-repeat").drawRect(0, 0, sponsorimg[0].width,sponsorimg[0].height);
	sponsorimg[1]=preloader.getResult("s2");
	sponsors[1]=new createjs.Shape();
	sponsors[1].graphics.beginBitmapFill(sponsorimg[1],"no-repeat").drawRect(0, 0, sponsorimg[1].width,sponsorimg[1].height);
	sponsorimg[2]=preloader.getResult("s3");
	sponsors[2]=new createjs.Shape();
	sponsors[2].graphics.beginBitmapFill(sponsorimg[2],"no-repeat").drawRect(0, 0, sponsorimg[2].width,sponsorimg[2].height);
	sponsorimg[3]=preloader.getResult("s4");
	sponsors[3]=new createjs.Shape();
	sponsors[3].graphics.beginBitmapFill(sponsorimg[3],"no-repeat").drawRect(0, 0, sponsorimg[3].width,sponsorimg[3].height);
	//==================================Touch Setup================================
	xoxo=preloader.getResult("pointer");
	controller[0]= new createjs.Shape();
	controller[0].graphics.beginBitmapFill(xoxo,"no-repeat").drawRect(0, 0, xoxo.width, xoxo.height);


}

function constructStage(x){
	//setting up bot container DeusXmaxim.............................
	DeusXmaxim = new createjs.Container();
	// in case you are wondering :: DeusXmaxim ==> God from a macine
	DeusXmaxim.x=bot.regX/2;
	DeusXmaxim.addChildAt(bot,0);
	DeusXmaxim.addChildAt(thrust,1);
	DeusXmaxim.addChildAt(smoke,2);
	thrust.x =-1*bot.regX/4;
	thrust.y =bot.y+bot.regY/2.5;
	smoke.x=-1*bot.regX/3;
	smoke.y=absoluteY;
	stageLayout[0]={};
     stageLayout[0].obj = DeusXmaxim;
     stageLayout[0].pos=DeusXmaxim.x;
	//setting base.....................................................
	base = new createjs.Container();
     for(var i=0;i<x;i++)
     {
		var landclone = land.clone(true);
		landclone.x= (landimg.width*land.scaleX+100)*i;
		landclone.y=H-(landimg.height*land.scaleY);
		base.addChildAt(landclone,i);
     }
	stageLayout[1]={};
     stageLayout[1].obj = base;
	base.x=landimg.width*land.scaleX*0.7;
     stageLayout[1].pos=base.x;
	stageLayout[2]={};
	planets[0].y=H/2-100;
     stageLayout[2].obj = planets[0];
     stageLayout[2].pos=100;
	stageLayout[3]={};
	planets[1].y=H/10;
     stageLayout[3].obj = planets[1];
     stageLayout[3].pos=10;
	stageLayout[4]={};
	stageLayout[4].obj= mist;
	mist.x=0
	stageLayout[4].pos=0;
	//setting menu............................................
	var texty=["TECHTALK","HACKATHON","PAST EVENTS","","ABOUT US"];
	var delta=300+landimg.width*land.scaleX*3;
	menu=new createjs.Container();
	stageLayout[5]={};
	stageLayout[5].obj= menu;
	menu.x=0;menu.y=H;
	stageLayout[5].pos=menu.x;
	//portal.regX=portal.getBounds().width*portal.scaleX/2;//portal.regY=portalimg.height;
	texty.forEach(function(item,index){
		if(index==3)
		{
			placeSponsors(delta*(index+1));
			return;
		}
		portal[index+1]=portal[0].clone(true),ux=delta*(index+1);
		var headings = new createjs.Text(item, "bold 50px Arial", "#FFFFFF");
		portal[index+1].x=ux;portal[index+1].y=absoluteY-H+bot.regY/2;
		scaleElements(headings,headings.getBounds(),4,10,true);
		headings.x=ux-W/8;headings.y=-H/2;
		//enter text and place in container
		menu.addChild(portal[index+1],headings);
		lights(delta*(index+1)+20,menu,1000);
		lights(delta*(index+1)-20,menu,3000);
		lights(delta*(index+1)+30,menu,7000);
	});

	ST=new createjs.Text("Use Space and Arrow keys to play","bold 50px Arial","#86f6f9");
	//scaleElements(ST,ST.getBounds(),12,12,true);
	ST.x=50;ST.y=absoluteY-30;
}

var touchbox;
function setupTouch(){
	ST.text="Use arrow Keys To navigate.";
	scaleElements(controller[0],xoxo,7,7,false);
	controller[0].regX=controller[0].regY=50//(100*controller[0].scaleX)/2;
	controller[1]=controller[0].clone(true);controller[2]=controller[0].clone(true);controller[3]=controller[0].clone(true);
	controller[2].rotation=90;
	controller[3].rotation=-90;
	controller[1].on('mousedown', function (evt) {
			flyFlag=true;
			flyvel=Math.max(fallvel*0.8,1);
		});
	controller[1].on("pressup", function (evt) {
			flyFlag=false;
		});
	controller[2].on('mousedown', function (evt) {
		moveRight = true;
	  setanimation(bot,"boost",bot.currentAnimation);
		});
	controller[2].on("pressup", function (evt) {
		moveRight = false;
	  levAng=0;
	  setanimation(bot,"still",bot.currentanimation);
		});
	controller[3].on('mousedown', function (evt) {
		moveLeft = true;
	  setanimation(bot,"boost",bot.currentAnimation);
		});
	controller[3].on("pressup", function (evt) {
		moveLeft = false;
	  levAng=0;
	  setanimation(bot,"still",bot.currentanimation);
		});
	touchbox=new createjs.Container();
	touchbox.addChild(controller[1],controller[2],controller[3]);
	touchbox.x=W/2;touchbox.y=H/2;
	touchbox.addChild(controller[1],controller[2],controller[3]);
	var cwh=100*controller[1].scaleX;
	controller[1].x=-W/2+1.5*cwh;
	controller[2].x=+W/2-1.5*cwh;controller[3].x=+W/2-3*cwh;
	controller[2].y=+H/2-1.5*cwh;controller[3].y=+H/2-1.5*cwh;
	frame.addChild(touchbox);
}

function placeSponsors(xxx){
	//xxx=W/2;
	var heading = new createjs.Text("Our Sponsors", "bold 50px Arial", "#FFFFFF");
	scaleElements(sponsors[0],sponsorimg[0],4,4,false);
	scaleElements(sponsors[1],sponsorimg[1],3,3,false);
	scaleElements(sponsors[2],sponsorimg[2],4,4,false);
	scaleElements(sponsors[3],sponsorimg[3],3,3,false);
	heading.x=xxx-W/8;heading.y=-H/2;
	sponsors[0].regX=sponsorimg[0].width*sponsors[0].scaleX/2;
	sponsors[1].regX=sponsorimg[1].width*sponsors[1].scaleX/2;
	sponsors[2].regX=sponsorimg[2].width*sponsors[2].scaleX/2;
	sponsors[3].regX=sponsorimg[3].width*sponsors[3].scaleX/2;
	sponsors[0].x=xxx-W/2.6;sponsors[0].y=-H/1.12;
	sponsors[1].x=xxx-W/2.6;sponsors[1].y=-H/2.5;
	sponsors[2].x=xxx+W/4;sponsors[2].y=-H/3;
	sponsors[3].x=xxx+W/4;sponsors[3].y=-H/1.12;
	menu.addChild(heading,sponsors[0],sponsors[1],sponsors[2],sponsors[3]);

}

function lights(xx,menu,waittime)
{
   var circle = new createjs.Shape();
   circle.graphics.beginFill("yellow").drawCircle(0, 0, 5);
   circle.x = xx;
   circle.y = absoluteY-H;
   circle.alpha=0;
   menu.addChild(circle);
   createjs.Tween.get(circle, {loop: true})
   	.wait(waittime)
     .to({alpha: 1, y: -H/4}, 3000, createjs.Ease.getPowInOut(1))
	.to({alpha: 0, y: -H/2}, 3000,createjs.Ease.getPowInOut(1))
	.to({y: absoluteY-H}, 100, createjs.Ease.getPowInOut(2));

}

function updateXpos()
{
     if(offset<=W/2)
     {
          stageLayout[0].obj.x=((stageLayout[0].pos+offset))//+stageLayout[0].obj.x)/2;   //correction
     }
     else {
		stageLayout[1].obj.x=stageLayout[1].pos-offset+W/2;
		stageLayout[2].obj.x=stageLayout[2].pos-(offset-W/2)/3;
		stageLayout[3].obj.x=stageLayout[3].pos-(offset-W/2)/10;
		stageLayout[4].obj.x=stageLayout[4].pos-(offset-W/2)/2;
		stageLayout[5].obj.x=stageLayout[5].pos-offset+W/2;
     }

}

function changeStage(stageno)
{
	//frame.removeAllChildren();
	var stageobj;
	moveLeft=false;moveRight=false;
	if(currentstage==0)
	{
		stageobj=stage1;
	}
	stageobj.cache(0,0,W*2,H*2);
	mist.cache(0,0,W*7,H*2);
	meteor.x=meteor.y=100
     frame.addChild(stageobj,planets[1],planets[0],base,menu,DeusXmaxim,mist,ST);
	if(Mobile)
		setupTouch();
}


function scaleElements(obj,objImg,x,y,stretch,a=1,b=1)
{
	if(stretch)
	{
		obj.scaleX=W/(x*objImg.width)*a;
	     obj.scaleY=H/(y*objImg.height)*b;
	}
	else {
		var scl=Math.min(W/(x*objImg.width),H/(y*objImg.height));
		obj.scaleX=scl*a;
		obj.scaleY=scl*b;
	}
}

function positionFrame()
{
	document.getElementById("intro1").width = W;
	document.getElementById("intro1").height = H;
     scaleElements(stage1,stage1img[0],1,1,true);
	scaleElements(mist,stage1img[1],0.15,1,true);
	scaleElements(bot,bot.getBounds(),10,8,false,0.87,0.87);
	scaleElements(thrust,botimg[1],40,1,true);
	scaleElements(smoke,botimg[2],16,10,true);
	//setting rotation axis for bot
	bot.regX=bot.getBounds().width/2;// 68/2;
	bot.regY=bot.getBounds().height/2;;
	absoluteY=H-H/15;
	//bot.x=bot.regX/2;bot.y=bot.regY/2;
	thrust.regX=thrust.graphics.command.w/2;
	thrust.regY=5;
	smoke.regX=smoke.graphics.command.w/2;
	smoke.regY=smoke.graphics.command.y/2;
	scaleElements(land,landimg,2,10,false,1.5);
	scaleElements(portal[0],portal[0].getBounds(),3.5,3,false);
	frame.update();
}

function resize() {
     W = window.innerWidth;
     H = window.innerHeight-(window.innerHeight*0.1);
}

function play(ev)
{
	menuFlag=true;
	if(Mobile)
		TouchFlag=false;
	else
		togglecontrol(0);
	switch(ev)
	{
		case 1:$('#M1').modal('open');
		$('.modal-overlay').click(function(){
		   reboot();
		})
				break;
		case 2:$('#M2').modal('open');
		$('.modal-overlay').click(function(){
		   reboot();
		})
				break;
		case 3:$('#M3').css("display","flex");
			  $('#M3').show();
				break;
		case 5:$('#M4').modal('open');
		$('.modal-overlay').click(function(){
		   reboot();
		})
	}
}

function reboot(){
	if(!Mobile)
		togglecontrol(1);
	else
		TouchFlag=true;
	$('#M3').hide();
	$('.but').show();
	$('.suc').hide();
	$('.fai').hide();
	setTimeout(function(){
		menuFlag=false
	},3000);
	// after some time menuFlag=false;
}

function gameloop(event)
{
	if(!HyperDrive)
	{
		//=================touch input======================
		// if(Mobile && TouchFlag==true)
		// {
		//
		// }
		//=================locomotion========================
		if (moveLeft)
		{
			offset-=Mfac;
			offset-=Mfac;
			if(flyFlag)
			{
				levAng++;
				levAng=Math.min(levAng,10);
			}
			if(DeusXmaxim.scaleX>0)
			{
				DeusXmaxim.scaleX *= -1;
			}
		 }
	    else if (moveRight )
	    {
		    //setanimation(bot,"runf",bot.currentAnimation);
			//   bot.x += 10;
	            offset+=Mfac;
			  offset+=Mfac;
			  if(flyFlag)
			  {
				  levAng++;
				  levAng=Math.min(levAng,10);
			  }
			  if(DeusXmaxim.scaleX<0)
			  {
				  DeusXmaxim.scaleX *= -1;
			  }
	    }
	    if(flyFlag)
	    {
	         fly();
		    var l = (smoke.y-bot.y)/Math.cos(levAng*3.14/180)*1.05;
		    thrust.scaleY = l/botimg[1].height;
		    thrust.visible = true;
		    smoke.visible = true;
		    thrust.rotation=Math.min(levAng,10);
	    }
	    else {
	    		thrust.visible = false;
			smoke.visible = false;
	    }
	    gravity();
	    bot.y+=fallvel;
	    if(bot.y<30){bot.y=30;fallvel=0;}
	    thrust.y=bot.y+bot.regY/2.5
	    smoke.x=(-1*bot.regX/3)-(H-bot.y)*Math.tan(levAng*3.14/180);
		if(moveLeft||moveRight)
	    		updateXpos();
		//===============================Score Update==============
		if(!menuFlag)
			DoomsCard._updateScore();
		//================================meteors==================
		if(createjs.Ticker.getTime(true)-WrathOfTitans>5000 && !menuFlag)
		{
			WrathOfTitans=createjs.Ticker.getTime(true);
			CreateMeteor(1);
		}
	}
	else {
		for(var i=0;i<10;i++)
			{initiateJump(spaceCoordinate);
		updateXpos();}
	}
    frame.update(event);
    if(!menuFlag)
    {
	    var menu=confirmHit();
	    if(menu>0)
	    {
		    //alert(menu);
		    play(menu);
	    }
	}

}

function initiateJump(x)
{
	if(!HyperDrive && x>0)
	{
		var delta=300+landimg.width*land.scaleX*3;
		spaceCoordinate=delta*x;
		LengthContraction=offset<spaceCoordinate?Mfac:-Mfac;
		HyperDrive=true;
		bot.y=H/2;
	}
	else if(Math.abs(offset-x)>Mfac){
		offset+=LengthContraction;
	}
	else {
		//stageLayout[0].obj.x=((stageLayout[0].pos+W/2))+bot.regX/2;//+stageLayout[0].obj.x)/2
		//offset=x;
		//updateXpos();
		HyperDrive=false;
		spaceCoordinate=0;LengthContraction=0;
		return;
	}
	//setTimeout(initiateJump(spaceCoordinate),5000);
}


function handleKeyDown(e) {
    switch (e.keyCode) {
        case KEYCODE_SPACE:
        case 87:  // W
             flyvel=Math.max(fallvel*0.8,1);
             flyFlag=true;
             break;
        case KEYCODE_LEFT:
        case 65:  // A
            moveLeft = true;
		  setanimation(bot,"boost",bot.currentAnimation);
		  //bot.gotoAndPlay("runf");
            break;
        case KEYCODE_RIGHT:
        case 68:  // D
            moveRight = true;
		  setanimation(bot,"boost",bot.currentAnimation);
		  //bot.gotoAndPlay("runf");
            break;
	  case KEYCODE_DOWN:
       case 83:  // S
           break;
	 case KEYCODE_UP:
		  //bot.gotoAndPlay("runf");
          break;
    }

}

function handleKeyUp(e) {
    switch (e.keyCode) {
        case KEYCODE_LEFT:
        case 65:  // A
            moveLeft = false;
		  levAng=0;
		  setanimation(bot,"still",bot.currentanimation);
		// setTimeout(function(){moveLeft=false},2000);
            break;
        case KEYCODE_RIGHT:
        case 68:  // D
            moveRight = false;
		  levAng=0;
		  setanimation(bot,"still",bot.currentanimation);
		// setTimeout(function(){moveRight=false},2000);
            break;
	  case KEYCODE_DOWN:
	  case 83:  // S
               break;
       case KEYCODE_SPACE:
       case 87:  // W
               flyFlag=false;
               break;


    }
}

function togglecontrol(x)
{
	if(x===1 || document.onkeydown==null||document.onkeyup==null)
	{
		document.onkeydown = handleKeyDown;
		document.onkeyup = handleKeyUp;
	}
	else if(x==0){
		document.onkeydown = null;
		document.onkeyup = null;
		moveLeft=moveRight=flyFlag=false;
		setanimation(bot,"still",bot.currentanimation);
	}
}

function gravity()
{
     if (bot.y > absoluteY)
     {
          bot.y = absoluteY;
		thrust.y =bot.y+bot.regY/4;
          fallvel = 0;
          jumpflag = false;
     }
     else if(bot.y<absoluteY)//||jumpflag)
     {
          jumpflag=true;
          fallvel += grav;
          fallvel=fallvel>20?20:fallvel;
          //bot.y += fallvel;
     }

}


function fly()
{
     fallvel -= grav*3;
}

function setanimation(obj,set,old)
{
	if(set!=old)
	{
		obj.gotoAndPlay(set);
	}
}
var metRec = null;
function CreateMeteor(scl)
{
	if(menuFlag)
		return;
	var obj=meteor.clone(true);
	var sel=Math.floor(Math.random()*10)+1;
	obj.x=sel<=5?Math.floor(Math.random()*(W/4+1)):Math.floor(Math.random()*W/4)+1+3*W/4;
	var fx=sel<=5?Math.floor(Math.random()*W/2)+1+3*W/4:Math.floor(Math.random()*(W/2+1))+-W/4;
	obj.y =Math.floor(Math.random()*18)-40;
	var fy=H*1+100;
	obj.rotation = Math.atan2(fx-obj.x,fy-obj.y)*-1*180/3.14;
	obj.scaleX=obj.scaleX*scl;
	obj.scaleY=obj.scaleY*scl;
	frame.addChild(obj);
	var time=(Math.floor(Math.random()*3)+2)*1000;
	metRec=obj;
	createjs.Tween.get(obj, {loop: false})
	     .to({y:fy,x:fx}, time, createjs.Ease.getPowInOut(2)).call(function destroy(){
			frame.removeChild(obj);
		});

}

function confirmHit()
{
	//meteor Hit================================================
	var x=bot.getBounds().width/2*bot.scaleX,y=bot.getBounds().height/2*bot.scaleY;
	if(metRec!=null)
	{
		var m=metRec;
		var a=bot.localToLocal(x,y,m),b=bot.localToLocal(x,-y,m),c=bot.localToLocal(-x,-y,m),d=bot.localToLocal(-x,y,m);
		if(m.hitTest(a.x,a.y)||m.hitTest(b.x,b.y)||m.hitTest(c.x,c.y)||m.hitTest(d.x,d.y))
		{
			DoomsCard._nullify();
			ST.text="Score : "+DoomsCard._getScore();
			createjs.Tween.get(bot, {loop: false}).to({alpha:0},200).to({alpha:1},200).to({alpha:0},200).to({alpha:1},200)
			.to({alpha:0},300).to({alpha:1},300);
		}
	}
	//portal hit=================================================
	// var top = offset,bottom=(300+landimg.width*land.scaleX*3);
	// var i=top/bottom,ifl=Math.floor(i),err=0.005;
	// x=[1,2,3,5];
	// for(var it=0;it<x.length;it++){
	// 	if(Math.abs(x[it]-i)<err && bot.y>absoluteY-30)
	// 		{
	// 			//alert(i);
	// 			return x[it];
	// 		}
	// }
	menuItemav=[1,2,3,5];
	for(var it=0;it<menuItemav.length;it++){
		var a=bot.localToLocal(x,y,portal[menuItemav[it]]),b=bot.localToLocal(x,y,portal[menuItemav[it]]);
		if(portal[menuItemav[it]].hitTest(a.x,a.y)||portal[menuItemav[it]].hitTest(b.x,b.y))
			{
				//alert(i);
				return menuItemav[it];
			}
	}
	return -1;

}
