	var g_wolf=new Array();
	
	function gw_(o){
		
		if(o!=undefined){
			if (typeof(o)!="string"){
				var temp=o.id;
			}
			else{
				var temp=o;
			}
		}
		else{
			o="GENERAL_REQ";
		}
	
		if(g_wolf[temp]==undefined){
			g_wolf[temp]=new greywolf(temp);
		}
		
		
		return g_wolf[temp];
	}
	
	function greywolf(obj){
		this.activeobject;
		this.graytimer=new Array();
		this.ajaxResponse;
		this.selectedValue;
		this.label;
		this.tempVar=new Array();
		//------------------------------------------
		this.label=obj;
		if(document.getElementById(obj)!=null){
			this.activeobject=document.getElementById(obj);
		}
		
	}
	greywolf.prototype.refresh=function(){
		
		this.activeobject=document.getElementById(this.label);
	}
	
	greywolf.prototype.SEND_POST=function(file,parameters,responseobject,responsefunct){
		parentclass=this;
		var ajreq=new this.ajax();
		var querystring="";
		for(key in parameters){
			querystring+=key+"="+encodeURI(parameters[key])+"&";
		}
		ajreq.open("POST", file, true);
		ajreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
		ajreq.setRequestHeader("Content-length", querystring.length);
		ajreq.setRequestHeader("Connection", "close");
		ajreq.onreadystatechange = function() {
			if(ajreq.readyState == 4 && ajreq.status == 200) {
				parentclass.ajaxResponse=ajreq.responseText;
				
				if((responseobject!=undefined)&&(responseobject!=false)){
					var ro=document.getElementById(responseobject);
					if(ro.type==undefined){
						ro.innerHTML=ajreq.responseText;
					}
					else{
						ro.value=ajreq.responseText;
					}
				}
				if((responsefunct!=undefined)&&(responsefunct!=false)){
					responsefunct(ajreq.responseText);
				}
			}
		}
		ajreq.send(querystring);
	}
	
	greywolf.prototype.SEND_GET=function(file,parameters,responseobject,responsefunct){
		parentclass=this;
		var ajreq=new this.ajax();
		var querystring="";
		for(key in parameters){
			querystring+=key+"="+encodeURI(parameters[key])+"&";
		}
		ajreq.open("GET", file+"?"+querystring, true);
		ajreq.onreadystatechange = function() {
			if(ajreq.readyState == 4 && ajreq.status == 200) {
				parentclass.ajaxResponse=ajreq.responseText;
				
				if((responseobject!=undefined)&&(responseobject!=false)){
					var ro=document.getElementById(responseobject);
					if(ro.type==undefined){
						ro.innerHTML=ajreq.responseText;
					}
					else{
						ro.value=ajreq.responseText;
					}
				}
				if((responsefunct!=undefined)&&(responsefunct!=false)){
					responsefunct(ajreq.responseText);
				}
			}
		}
		ajreq.send(null);
	}
	
	
	greywolf.prototype.fillWithAjax=function(file,parameters){
		this.SEND_POST(file,parameters,this.activeobject.id);
	}
	
	greywolf.prototype.object2text=function(){
		try{
			this.refresh();
			var parent=this.activeobject.parentNode;
			var tobj=document.createElement("input");
			with(tobj){
				tobj.value=this.activeobject.innerHTML;
				tobj.id=this.activeobject.id;
				tobj.name=this.activeobject.id;
			}
			
			parent.replaceChild(tobj,this.activeobject);
			return true;
		}
		catch(err){
			return false;
		}
		
		
		
	}
	
	greywolf.prototype.text2object=function(tag){
		try{
			this.refresh();
			var tagobj=document.createElement(tag);
			with(tagobj){
				tagobj.innerHTML=this.activeobject.value;
				tagobj.id=this.activeobject.id;
			}
			this.activeobject.parentNode.replaceChild(tagobj,this.activeobject);
			return true;
		}catch(err){
			return false;
		}
		
	}
	greywolf.prototype.openNoticeBox=function(boxid,xwidth,xheight,X,Y,inner){
		var box=document.createElement("div");
		box.id=boxid;
		if(inner!=undefined){
			box.innerHTML=inner;
		}
		with(box.style){
			position="absolute";
			width=xwidth+"px";
			height=xheight+"px";
			left=X+"px";
			top=Y+"px";
			backgroundColor="#FFEE99";
			border="1px solid orange";
			padding="5px";
			fontFamily="Tahoma";
			fontSize="12px";
			overflow="auto";
		}
		
		document.body.insertBefore(box,document.body.firstChild);
	}
	greywolf.prototype.findCoordinates=function(){
		obj=this.activeobject;
		
		var x;
        var y;
        x=obj.offsetLeft;
        y=obj.offsetTop;
        var parent=obj.offsetParent;
        while(parent!=undefined){
			x=x+parent.offsetLeft;
            y=y+parent.offsetTop;
            parent=parent.offsetParent;
        }
        var dataset={'X':x,'Y':y};
        return dataset;
    };
	greywolf.prototype.ajax=function() {
            var ajax = false;
            // Internet Explorer (5.0+)
            try {
                ajax = new ActiveXObject("Msxml2.XMLHTTP");  
            } catch (e) {
                try {
                    ajax = new ActiveXObject("Microsoft.XMLHTTP");  
                } catch (e) {
                    ajax = false;
                }
            }
            // Mozilla ve Safari
            if ( !ajax && typeof XMLHttpRequest != 'undefined' ) {
                try{
                    ajax = new XMLHttpRequest();
                }catch(e) {
                    ajax = false;
                }
            }

            // Diger
            if ( !ajax && window.createRequest ) {
                try{
                    ajax = window.createRequest();
                }catch(e) {
                    ajax = false;
                }
            }

            return ajax;
        };
	
	
	/* AUTOCOMPLETE */
	greywolf.prototype.autoComplete=function(file,params,userFunct){
		parentclass=this;
		this.tempVar.acUserFunct=userFunct;
		var targid=this.activeobject.id;
		
		this.me().onkeyup=function(){
			gw_(this).completeMe(file,params);
		}
	}
	greywolf.prototype.completeMe=function(file,params){
		parentclass=this;
		this.refresh();
		params["keyword"]=this.me().value
		this.SEND_POST(file,params,false,function(resp){gw_(parentclass.activeobject.id).processAutoCompleteResults()});
	}
	greywolf.prototype.getCssprop=function(o,p){
       return window.getComputedStyle(o).getPropertyValue(p);
    };
	greywolf.prototype.processAutoCompleteResults=function(){
		parentclass=this;
		if(this.me().value==""){
			
			if(document.getElementById(this.activeobject.id+"_completebox")!=null){
				gw_(this.activeobject.id+"_completebox").refresh();
				gw_(this.activeobject.id+"_completebox").removeIt();
			}
			
		}else{
		var koords=this.findCoordinates();
		var result=eval(this.ajaxResponse);
			if(document.getElementById(this.activeobject.id+"_completebox")!=null){
				document.body.removeChild(document.getElementById(this.activeobject.id+"_completebox"));
			}
			this.openNoticeBox(this.activeobject.id+"_completebox",this.activeobject.offsetWidth,100,koords.X,(koords.Y)+this.activeobject.offsetHeight);
			for(a in result){
				
				var tempobj=document.createElement("a");
				with(tempobj){
					style.textDecoration="none";
					style.color="black";
					href="#"+a;
					innerHTML=result[a].qresult;
					style.cursor="pointer";	
					onclick=function(){ document.body.removeChild(document.getElementById(parentclass.activeobject.id+"_completebox")); var index=(this.href.split("#")[1]*1); parentclass.tempVar.acUserFunct(result[index].qid,result[index].qresult); parentclass.activeobject.value=result[index].qresult;parentclass.selectedValue=result[index].qid; };
				}
				document.getElementById(this.activeobject.id+"_completebox").appendChild(tempobj);
				
				var splitdiv=document.createElement("div");
				splitdiv.style.height="5px";
				document.getElementById(this.activeobject.id+"_completebox").appendChild(splitdiv);
			}
	
		}
		
		
	}
	
	/* /AUTOCOMPLETE */
	
	/*  EFFECTS */
	greywolf.prototype.fadeItOut=function(userFunct){
		var targid=this.activeobject.id;
		this.activeobject.style.opacity="0.99";
		this.activeobject.style.filter="alpha(opacity=99)";
		this.graytimer["fadeOut"]={"callback":userFunct,"opacitypercent":0.99,"timer":window.setInterval(function(){ gw_(targid).fadeOutAction()},1)};
	}
	
	greywolf.prototype.fadeOutAction=function(){
	
		this.graytimer.fadeOut.opacitypercent=this.graytimer.fadeOut.opacitypercent-0.01;
		this.activeobject.style.opacity=this.graytimer.fadeOut.opacitypercent;
		this.activeobject.style.filter="alpha(opacity="+(this.graytimer.fadeOut.opacitypercent*100)+")";
		if(this.graytimer.fadeOut.opacitypercent<=0){
			this.graytimer.fadeOut.callback();
			window.clearInterval(this.graytimer.fadeOut.timer);
		}
	}
	
	greywolf.prototype.fadeItIn=function(userFunct){
		var targid=this.activeobject.id;
		this.activeobject.style.opacity="0.01";
		this.activeobject.style.filter="alpha(opacity=01)";
		this.graytimer["fadeIn"]={"callback":userFunct,"opacitypercent":0.01,"timer":window.setInterval(function(){ gw_(targid).fadeInAction()},1)};
	}
	
	greywolf.prototype.fadeInAction=function(){
	
		this.graytimer.fadeIn.opacitypercent=this.graytimer.fadeIn.opacitypercent+0.01;
		this.activeobject.style.opacity=this.graytimer.fadeIn.opacitypercent;
		this.activeobject.style.filter="alpha(opacity="+(this.graytimer.fadeIn.opacitypercent*100)+")";
		if(this.graytimer.fadeIn.opacitypercent>1){
			this.graytimer.fadeIn.callback();
			window.clearInterval(this.graytimer.fadeIn.timer);
		}
	}
	
	greywolf.prototype.enlarge=function(newWidth,newHeight,effectInterval,userFunct){
		if(this.graytimer.minimize.timer!=undefined){
			window.clearInterval(this.graytimer.minimize.timer);
		}
		var targid=this.activeobject.id;
		this.graytimer["enlarge"]={"callback":userFunct,"nw":newWidth,"nh":newHeight,"timer":window.setInterval(function(){gw_(targid).enlargeAction()},effectInterval)};
		
	}
	greywolf.prototype.enlargeAction=function(){
		var width=this.activeobject.offsetWidth*1;
		var height=this.activeobject.offsetHeight*1;
		
		if(this.graytimer.enlarge.nw!=false){
			if(width<this.graytimer.enlarge.nw){
				width=width+5;
				this.activeobject.style.width=width+"px";
			}
		}
		if(this.graytimer.enlarge.nh!=false){
			if(height<this.graytimer.enlarge.nh){
				height=height+5;
				this.activeobject.style.height=height+"px";
			}
		}
		
		if((this.graytimer.enlarge.nh==height)&&(this.graytimer.enlarge.nw==width)){
		      window.clearInterval(this.graytimer.enlarge.timer);
		      this.graytimer.enlarge.callback();
			
		}
		
	
	}
	
	
	greywolf.prototype.minimize=function(newWidth,newHeight,effectInterval,userFunct){
		if(this.graytimer.enlarge.timer!=undefined){
			window.clearInterval(this.graytimer.enlarge.timer);
		}
		var targid=this.activeobject.id;
		this.graytimer["minimize"]={"callback":userFunct,"nw":newWidth,"nh":newHeight,"timer":window.setInterval(function(){gw_(targid).minimizeAction()},effectInterval)};
		
	}
	
	greywolf.prototype.minimizeAction=function(){
		var width=this.activeobject.offsetWidth*1;
		var height=this.activeobject.offsetHeight*1;
		
		if(this.graytimer.minimize.nw!=false){
			if(width>this.graytimer.minimize.nw){
				width=width-5;
				this.activeobject.style.width=width+"px";
			}
		}
		if(this.graytimer.minimize.nh!=false){
			if(height>this.graytimer.minimize.nh){
				height=height-5;
				this.activeobject.style.height=height+"px";
			}
		}
		
		if((this.graytimer.minimize.nh==height)&&(this.graytimer.minimize.nw==width)){
			window.clearInterval(this.graytimer.minimize.timer);
			this.graytimer.minimize.callback();
		}
	
	}
	
	greywolf.prototype.move=function(newX,newY,effectInterval,userFunct){
	
		var targid=this.me().id;
		var myCoords=this.findCoordinates();
		this.me().style.position="absolute";
		if(newX!=false){
			if(newX>myCoords.X){XOP="+";}else{XOP="-";}
		}
		else{
			XOP="#";
		}
		if(newY!=false){
			if(newY>myCoords.Y){YOP="+";}else{YOP="-";}
		}
		else{
			YOP="#";
		}
		
		this.graytimer["move"]={"userFunct":userFunct,"nX":newX,"nY":newY,"XOP":XOP,"YOP":YOP,"cX":myCoords.X,"cY":myCoords.Y,"timer":window.setInterval(function(){gw_(targid).moveAction()},effectInterval)};
	}
	
	
	greywolf.prototype.movementFinished=function(targ,curr,OPERATOR){
		if(OPERATOR=="+"){
			if(curr>=targ){
				return true;
			}
			else{
				return false;
			}
		}
		
		if(OPERATOR=="-"){
			if(curr<=targ){
				return true;
			}
			else{
				return false;
			}
		}
	}
	greywolf.prototype.moveAction=function(){
		if(this.graytimer.move.XOP!="#"){
			if(this.graytimer.move.nX!=this.graytimer.move.cX){
				eval("this.graytimer.move.cX=this.graytimer.move.cX"+this.graytimer.move.XOP+"5"+";");
				if(!this.movementFinished(this.graytimer.move.nX,this.graytimer.move.cX,this.graytimer.move.XOP)){
					this.me().style.left=this.graytimer.move.cX+"px";
				}
				else{
					this.graytimer.move.XOP="#";
				}
			}
		}
		
		if(this.graytimer.move.YOP!="#"){
			if(this.graytimer.move.nY!=this.graytimer.move.cY){
				eval("this.graytimer.move.cY=this.graytimer.move.cY"+this.graytimer.move.YOP+"5"+";");
				if(!this.movementFinished(this.graytimer.move.nY,this.graytimer.move.cY,this.graytimer.move.YOP)){
					this.me().style.top=this.graytimer.move.cY+"px";
				}else{
					this.graytimer.move.YOP="#";
				}
			}
		}
		
		if((this.graytimer.move.YOP=="#")&&(this.graytimer.move.XOP=="#")){
			window.clearInterval(this.graytimer.move.timer);
			if((this.graytimer.move.userFunct!=undefined)&&(this.graytimer.move.userFunct!=false)){
				this.graytimer.move.userFunct();
			}
		}
		
	
			
	}
	
	/* /EFFECTS */
	
	greywolf.prototype.openCookie=function(cookie_name,content){
		document.cookie=cookie_name+"="+content;
	}
	greywolf.prototype.getCookie=function(cookie_name){
		var splitcookies=document.cookie.split(cookie_name+"=");
		splitdata=splitcookies[1].split(";");
		return splitdata[0];
	}
	greywolf.prototype.getArrayKeys=function(arr){
		ret=new Array();
		for(key in arr){
			ret.push(key);
		}
		return ret;
	}
	greywolf.prototype.removeIt=function(){
	
		this.activeobject.parentNode.removeChild(this.activeobject);
	}
	greywolf.prototype.getContent=function(){
		if(this.activeobject.tagName=="INPUT"){
			return this.activeobject.value;
		}
		else{
			return this.activeobject.innerHTML;
		}
	}
	greywolf.prototype.sizeInfo=function(){
		return {"width":this.activeobject.offsetWidth,"height":this.activeobject.offsetHeight};
	}
	
	greywolf.prototype.getParent=function(){
		return this.activeobject.parentNode;
	}
	greywolf.prototype.addChild=function(o){
		this.activeobject.appendChild(o);
	}
	greywolf.prototype.create=function(tag){
		var obj=document.createElement(tag);
		return obj;
	}
	greywolf.prototype.delChild=function(data){		
		if(typeof(data)=="number"){
			var Childs=this.getChilds();
			var RealChilds=new Array();
			for(a in Childs){
				if(typeof(Childs[a])=="object"){
					
					if(Childs[a]!="[object Text]"){
					    RealChilds.push(Childs[a]);
					}
				}
			}
			this.activeobject.removeChild(RealChilds[data-1]);
		}
		if(typeof(data)=="object"){
			this.activeobject.removeChild(data);
		}
	}
	greywolf.prototype.getChild=function(index){
		var Childs=this.getChilds();
			var RealChilds=new Array();
			for(a in Childs){
				if(typeof(Childs[a])=="object"){
					if(Childs[a]!="[object Text]"){
					    RealChilds.push(Childs[a]);
					}
				}
			}
		return RealChilds[index-1];
	}
	
	greywolf.prototype.getChilds=function(){
		var Childs=this.activeobject.childNodes;
			var RealChilds=new Array();
			for(a in Childs){
				if(typeof(Childs[a])=="object"){
					if(Childs[a]!="[object Text]"){
					    RealChilds.push(Childs[a]);
					}
				}
			}
			
		return RealChilds;
	}
	
	greywolf.prototype.me=function(){
		
		return this.activeobject;
	}
	
	greywolf.prototype.forEach=function(arr,userfunct){
		keys=this.getArrayKeys(arr);
		for(a in keys){
			userfunct(keys[a],arr[keys[a]]);
		}
	}
	
	greywolf.prototype.dragIt=function(dropobject,additional_data,drop_function){
		
		var targid=this.activeobject.id;
		
		this.tempVar["dropMeToThis"]=dropobject;
		this.tempVar["dragData"]=additional_data;
		this.tempVar["dropFunction"]=drop_function;
		this.activeobject.onmousedown=function(){   document.onmousemove=function(event){gw_(targid).dragAction(event)}; gw_(this.id).tempVar["drag_sit"]=true;};
		this.activeobject.onmouseup=function(){ gw_(this.id).tempVar["drag_sit"]=false;};
		
	}
	
	greywolf.prototype.dragAction=function(e){
	  
		try{
			clX=e.clientX;
			clY=e.clientY;
			
		}
		catch(err){
			clX=window.event.clientX;
			clY=window.event.clientY;
		}
		if(this.tempVar["drag_sit"]==true){
			 if (window.getSelection) {
				sel = window.getSelection();
			} else if (document.selection) {
				sel = document.selection.createRange();
			}
			if (sel.rangeCount) {
				sel.removeAllRanges();
				return;
			}

			if (sel.text > '') {
				document.selection.empty();
				return;
			}
			
			this.me().style.position="absolute";
			this.me().style.left=(clX-(this.me().offsetWidth/2))+"px";
			this.me().style.top=(clY-(this.me().offsetHeight/2))+"px";
			this.me().style.cursor="pointer";
			this.tempVar["currentLeft"]=(clX-(this.me().offsetWidth/2));
			this.tempVar["currentTop"]=(clY-(this.me().offsetHeight/2));
		}
		if(this.tempVar["drag_sit"]==false){
			
			this.me().style.cursor="";
			var targcoords=gw_(this.tempVar.dropMeToThis).findCoordinates();
			if((this.tempVar.currentLeft>=(targcoords.X))&&this.tempVar.currentLeft<=(targcoords.X+gw_(this.tempVar.dropMeToThis).me().offsetWidth)&&(this.tempVar.currentTop>=(targcoords.Y))&&this.tempVar.currentTop<=(targcoords.Y+gw_(this.tempVar.dropMeToThis).me().offsetHeight)){
				try{
					if(this.me()!=null){
						this.tempVar.dropFunction(this.tempVar.dragData.value,this.tempVar.dragData.title);
						this.removeIt();
						this.refresh();
					}
				}
				catch(err){
				}
			}
		}	
	}
	
	greywolf.prototype.linkify=function(){
		this.tempVar.foundedLinks=new Array();
		var splitted=this.me().innerHTML.split(" ");
		this.me().innerHTML="";
		for(a in splitted){
			if(splitted[a].search("http://")==0){
				this.me().innerHTML=this.me().innerHTML+" <a href='"+splitted[a]+"'>"+splitted[a]+"</a>";
				this.tempVar.foundedLinks.push(splitted[a]);
			}
			else{
				this.me().innerHTML=this.me().innerHTML+" "+splitted[a];
			}
		}
		
		return this.tempVar.foundedLinks;
	}
	
	
	greywolf.prototype.tubeIt=function(utube_hash,width,height){
		this.me().innerHTML='<iframe width="'+width+'" height="'+height+'" src="http://www.youtube.com/embed/'+utube_hash+'?rel=0" frameborder="0" allowfullscreen></iframe>';
	}
	
	greywolf.prototype.checkNumeric=function(userFunct){
		this.tempVar.NumericFunct=userFunct;
		this.me().onkeyup=function(){
			gw_(this).checkNumericAction();
		}
		
	}
	
	greywolf.prototype.checkNumericAction=function(){
		var x=this.me().value*1;
		
		if(isNaN(x)){
			this.tempVar.NumericFunct(false);
		}
		else{
			this.tempVar.NumericFunct(true);
		}
	}
	
	greywolf.prototype.autoLoad=function(userFunct){
		if(document.attachEvent){
			document.attachEvent("onreadystatechange", function(){
				if ( document.readyState === "complete" ) {
					userFunct();
				}
			});
		}
		document.addEventListener("DOMContentLoaded", userFunct);
	}
	
	greywolf.prototype.$_GET=function(whichkey){
		var url=document.URL;
		splitted=url.split("?");
		splitted=splitted[1].split("&");
		
		for(a in splitted){
			splitted2=splitted[a].split("=");
			if(splitted2[0]==whichkey){
				return splitted2[1];
			}
		}
	}
	
	greywolf.prototype.arraySearch=function(arr,keyword){
		for(a in arr){
			if(arr[a]==keyword){
				return true;
				break;
			}
		}
		return false;
	}
	greywolf.prototype.checkAndSubmit=function(requireds){
		var problem=false;
		var report=new Array();
		var childs=this.getChilds();
		for(a in childs){
			child=childs[a];
			if((typeof(child)=="object")&&(child.type!=undefined)){
				if(this.arraySearch(requireds,child.id)){
					if(((child.type=="text")||(child.type=="select-one"))&&(child.value=="")){
						child.style.backgroundColor="#FA5858";
						problem=true;
						report.push(child.id);
					}
					if(((child.type=="checkbox")||(child.type=="radio"))&&(child.checked==false)){
						child.style.backgroundColor="#FA5858";
						child.style.color="#FA5858";
						problem=true;
						report.push(child.id);
					}
					
				}
			}
		}
		
		if(!problem){
			this.me().submit();
		}
		else{
			return report;
		}
	}
	
	greywolf.prototype.setCss=function(rule,value){
		if(typeof(rule)!="object"){
			if(rule.indexOf("-")>-1){
				splitted=rule.split("-");
				var tempupper=splitted[1].substr(0,1).toUpperCase();
				var camel=tempupper+splitted[1].substr(1,100);
				eval("this.me().style."+splitted[0]+camel+"='"+value+"';");
			}else{
				eval("this.me().style."+rule+"='"+value+"';");
			}
		}
		else{
			for(a in rule){
				if(rule[a].style.indexOf("-")>-1){
				splitted=rule[a].style.split("-");
				var tempupper=splitted[1].substr(0,1).toUpperCase();
				var camel=tempupper+splitted[1].substr(1,100);
				eval("this.me().style."+splitted[0]+camel+"='"+rule[a].value+"';");
				}else{
					eval("this.me().style."+rule[a].style+"='"+rule[a].value+"';");
				}
			}
		}
	}
	
	greywolf.prototype.empty=function(data){
		
	}
	
	greywolf.prototype.addCell=function(row,userFunct){
		
		var newCell=this.me().rows[row-1].insertCell(this.me().rows[row-1].cells.length);
		if((userFunct!=false)&&(userFunct!=undefined)){
			userFunct(newCell);
		}
		
	}
	greywolf.prototype.getCell=function(row,column){
		
		return this.me().rows[row-1].cells[column-1];
		
	}
	
	greywolf.prototype.setGridData=function(row,column,content){
		this.me().rows[row-1].cells[column-1].childNodes[0].innerHTML=content;
	}
	greywolf.prototype.setCell=function(row,column,content){
		this.me().rows[row-1].cells[column-1].innerHTML=content;
	}
	
	greywolf.prototype.rowCount=function(){
		return this.me().rows.length;
	}
	greywolf.prototype.colCount=function(row){
		return this.me().rows[row-1].cells.length;
	}
	
	greywolf.prototype.makeItGrid=function(rows,cols,userFunct){
		this.me().onkeydown=function(event){ 
			var kc=(event==undefined)?window.event.keyCode:event.keyCode;
			if(kc==13){
				
				if(event==undefined){
					
					var target=window.event.srcElement;
				}
				else{
					var target=event.target;
				}
				if(gw_(target.id).text2object("div")){	
					gw_(target.id).refresh();
					gw_(target.id).me().onclick=function(){
						gw_(this).object2text()
						gw_(this).refresh();
						gw_(this).me().focus();
						gw_(this).setCss("cursor","pointer");
						gw_(this).setCss("border","1px solid #CCC");
						gw_(this).setCss("padding","3px");
						gw_(this).setCss("width","112px");
						gw_(this).setCss("font-family","tahoma");
						gw_(this).setCss("font-size","12px");
					};
					gw_(target.id).setCss("cursor","pointer");
					gw_(target.id).setCss("border","1px solid #CCC");
					gw_(target.id).setCss("padding","3px");
					gw_(target.id).setCss("width","112px");
					gw_(target.id).setCss("font-family","tahoma");
					gw_(target.id).setCss("font-size","12px");
				}
				
				if((userFunct!=undefined)&&(userFunct!=false)){
					var splitted=target.id.split("_");
					userFunct((splitted[1]*1),(splitted[2]*1),gw_(target.id).me().innerHTML);
				}
			}
		}
		parentclass=this;
		for(a=1;a<=rows;a++){
			this.me().insertRow(a-1);
			for(b=1;b<=cols;b++){
				if(b<=cols){
					this.addCell(a,function(cell){ 
						
						var newDiv=gw_().create("div");
						newDiv.innerHTML="";
						newDiv.id=parentclass.label+"_"+a+"_"+b;
						newDiv.innerHTML="";
						cell.appendChild(newDiv);
						gw_(newDiv.id).setCss("cursor","pointer");
						gw_(newDiv.id).setCss("border","1px solid #CCC");
						gw_(newDiv.id).setCss("padding","3px");
						gw_(newDiv.id).setCss("width","112px");
						gw_(newDiv.id).setCss("height","14px");
						gw_(newDiv.id).setCss("font-family","tahoma");
						gw_(newDiv.id).setCss("font-size","12px");
						gw_(newDiv.id).me().onclick=function(){							
							gw_(this).object2text();
							gw_(this).refresh();
							gw_(this).me().focus();
							gw_(this).setCss("cursor","pointer");
							gw_(this).setCss("border","1px solid #CCC");
							gw_(this).setCss("padding","3px");
							gw_(this).setCss("width","112px");
							gw_(this).setCss("font-family","tahoma");
							gw_(this).setCss("font-size","12px");
						}
						
					});
				}
			}
		}
	}
	
	greywolf.prototype.setGridSource=function(dataset){
		for(a in dataset){
			this.setGridData(dataset[a].row,dataset[a].col,dataset[a].data);
		}
	}
	
	
	greywolf.prototype.addOpt=function(dataset){	
		if(dataset.length==undefined){
			dataset=[dataset];
		}
		for(a in dataset){
			var o=this.create("option");
			o.innerHTML=dataset[a].opt;
			o.value=dataset[a].val;
			this.addChild(o);
		}
	}
	
	greywolf.prototype.eclipse=function(sit){
		if(sit){
			var eclipsediv=this.create("div");
			eclipsediv.id="GW_ECLIPSE";
			document.body.insertBefore(eclipsediv,document.body.firstChild);
			gw_("GW_ECLIPSE").setCss([
			{"style":"background-color","value":"black"},
			{"style":"width","value":"101%"},
			{"style":"height","value":"101%"},
			{"style":"opacity","value":"0.5"},
			{"style":"position","value":"fixed"},
			{"style":"margin-left","value":"-10px"},
			{"style":"margin-top","value":"-10px"},
			{"style":"filter","value":"alpha(opacity=80)"}
			]);
			gw_("GW_ECLIPSE").refresh();
			gw_("GW_ECLIPSE").me().onclick=function(){gw_().eclipse(false);};
		}else{
			
			
			gw_("GW_ECLIPSE").removeIt();
		}
		
	}
	
	greywolf.prototype.urlOpen=function(URL){
		var ifrm=this.create("iframe");
		ifrm.width=this.me().offsetWidth;
		ifrm.height=this.me().offsetHeight;
		ifrm.src=URL;
		this.addChild(ifrm);
	}
