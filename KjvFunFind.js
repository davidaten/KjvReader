//Kjv.FunFind: find the matchs among BkAry and make div to show the found results.
Kjv.FunFind = {};
Kjv.FunFind.ObjInit = function () {
    var obj = {};
    obj.ColorStr = "hsl(0,0%,0%)";
    obj.BkColorStr = "hsl(0,0%,100%)";
    obj.HtColorStr = "hsl(248,100%,38%)";
    obj.HtBkColorStr = "hsl(0,0%,100%)";
    obj.FtSize = 16;
    obj.BkAry = [];
    obj.FindResAry = [];
    obj.GbOn = 1;//Gb2312
    obj.B5On = 1;//Big5

    obj.TbCssGet = function () {
        var ary = [];
        ary.push("display: table");
        //ary.push(sprintf("background-color: %s",this.BkColorStr));
        ary.push("font-family: Verdana, Geneva, sans-serif");
        ary.push(sprintf("font-size: %spx", this.FtSize));
        ary.push("font-weight: 400");//400=Normal 700=bold,(100~900);
        //ary.push(sprintf("color: %s",this.ColorStr));
        return ary.join(";");
    }

    obj.TrCssGet = function (ht) {
        var ary = [];
        ary.push("display: table-row");
        if (ht == 0) {
            ary.push(sprintf("background-color: %s", this.BkColorStr));
            ary.push(sprintf("color: %s", this.ColorStr));
        }
        else {
            ary.push(sprintf("background-color: %s", this.HtBkColorStr));
            ary.push(sprintf("color: %s", this.HtColorStr));
        }
        return ary.join(";");
    }

    obj.TdCssGet = function () {
        var ary = [];
        ary.push("display: table-cell");
        ary.push("vertical-align: top");
        return ary.join(";");
    }

    obj.MsDnEvt = function (idx) {
        if (!obj.VerClickCb)
            return;
        var prm={};
        prm.BkIdx = obj.FindResAry[idx].BkIdx;
        prm.ChpIdx = obj.FindResAry[idx].ChpIdx;
        prm.VerIdx = obj.FindResAry[idx].VerIdx;
        obj.VerClickCb.CbFun(obj.VerClickCb.CbObj, obj.VerClickCb.CbTag,prm);
    }
    obj.MsDnSet = function (div, idx) {
        div.addEventListener("mousedown",
        (function () {
            //var ver_idx = idx;
            var hnd = function () {
                obj.MsDnEvt(idx);
            }
            return hnd;
        })(), false);
    }
    obj.HeaderSet = function (wrap_div,bk_obj,chp_obj) {
        var div = document.createElement('div');
        wrap_div.appendChild(div);
        var ary = [];
        ary.push("text-align: center");
        ary.push("white-space: pre");
        ary.push("font-family: Verdana, Geneva, sans-serif");
        ary.push(sprintf("font-size: %spx", this.FtSize*1.25));
        ary.push("font-weight: 400");//400=Normal 700=bold,(100~900);
        div.style.cssText = ary.join(";");
        div.innerHTML = sprintf("Book %s: %s(<small>%s</small>)    Chapter: %s", bk_obj.BkIdx, bk_obj.BkName, bk_obj.BkBrf, chp_obj.ChpIdxInBk);
    }
    obj.BtnBarSet = function (tb) {
        var tr, td;
        tr = document.createElement('div');
        tb.appendChild(tr);
        tr.style.cssText = this.TrCssGet(0);
        var btn_ary = ['&laquo;', '&lt;', 'Index', '&gt;', '&raquo;'];
        for (var i = 0; i < 5; i++) {
            td = document.createElement('div');
            tr.appendChild(td);
            td.innerHTML = btn_ary[i];
            td.style.cssText = this.TdCssGet(1);
        }
    }
    
	obj.FindRegMake= function (exp_str,flag_str){
	
	    if (!flag_str)
			flag_str='ig';
			
	    this.FindReg = new RegExp(exp_str, flag_str);
	    this.Pos0Str = sprintf('<span style="color:%s;background-color:%s;">',this.HtColorStr, this.HtBkColorStr);
	    this.Pos1Str = '</span>';
	}
    //var input = "A string with 3 numbers in it... 42 and 88.";
    //var number = /\b(\d+)\b/g;
    //var match;
    //while (match = number.exec(input))
    //    console.log("Found", match[1], "at", match.index);
    // → Found 3 at 14
    //   Found 42 at 33
    //   Found 88 at 40
    //string.replace callback: match,group1,group2,group3...,offset,string
	obj.FindRplCb = function(match,$1){
	    obj.FindRplCnt++;
	    var ary = [];
	    ary.push(obj.Pos0Str);
	    ary.push(match);
	    ary.push(obj.Pos1Str);
	    return ary.join("");
	}
	obj.Find = function () {
	    this.FindResAry = [];
		for (var i=0;i<this.BkAry.length;i++){
			var bk_obj = Kjv.Bk.ObjMake(this.BkAry[i]);
			for (var j=0;j<bk_obj.ChpNumInBk;j++){
				var chp_obj = Kjv.Chp.ObjMake(bk_obj.ChpOffInAll + j+1);
				for (var k=0;k<chp_obj.VerNumInChp;k++){
				    var ver_obj = Kjv.Ver.ObjMake(chp_obj.VerOffInAll + k + 1);
				    this.FindRplCnt = 0;
				    this.FindRplStr = ver_obj.VerText.replace(this.FindReg, this.FindRplCb);
					if (this.FindRplCnt==0)
						continue;
					var res_obj={};
					res_obj.BkIdx = bk_obj.BkIdx;
					res_obj.BkBrf = bk_obj.BkBrf;
					res_obj.ChpIdx=j+1;					
					res_obj.VerIdx=k+1;
					res_obj.Text=this.FindRplStr;
					this.FindResAry.push(res_obj);
				}
			}
		}
	}
			        
    obj.DivMake = function () {
        this.WrapDiv = document.createElement('div');
        //this.HeaderSet(this.WrapDiv,bk_obj,chp_obj);

        var tb = document.createElement('div');
        tb.style.cssText = this.TbCssGet();
        this.WrapDiv.appendChild(tb);

        for (var i = 0; i < this.FindResAry.length; i++) {
            var res_obj = this.FindResAry[i];
            tr = document.createElement('div');
            tb.appendChild(tr);
            this.MsDnSet(tr,i);
            tr.style.cssText = this.TrCssGet(0);

            for (var j = 0; j < 2; j++) {
                td = document.createElement('div');
                tr.appendChild(td);
                switch (j) {
                    case 0:
                        //td.innerHTML = sprintf("%s%s:%s<pre> </pre>", res_obj.BkBrf, res_obj.ChpIdx, res_obj.VerIdx);
                        td.innerHTML = sprintf("%s%s:%s", res_obj.BkBrf, res_obj.ChpIdx, res_obj.VerIdx);
                        break;
                    case 1:
                        td.innerHTML = res_obj.Text;
                        break;
                }
                td.style.cssText = this.TdCssGet(0);
            }//j
        }//i  
        return this.WrapDiv;
        //Kjv.Bkmk.Ary[0].VerMax = chp_obj.VerNumInChp;
        //var div0 = document.getElementById("KjvVerListDiv");//KjvParsePce();
        //div0.parentElement.replaceChild(div, div0);
    }

    return obj;
}
Kjv.FunFind.Demo = function () {

    var obj = Kjv.FunFind.ObjInit();
	obj.BkAry.push(66);
	obj.FindRegMake("jerusalem|temple|new");
	obj.Find();
	obj.DivMake();
    document.body.appendChild(obj.WrapDiv);
}

/*
//http://javascript.info/tutorial/keyboard-events
function KeyDown(evt) {
    if (evt.ctrlKey == true) {
        if (evt.keyCode == 188) {
            VerUpdn(-1);
        }
        if (evt.keyCode == 190) {
            VerUpdn(1);
        }
        console.log(evt.keyCode);
    }

    console.log(evt.keyCode);
    //evt = evt || window.event;
}

function KjvLoad() {

    //Kjv.Bk.Load();
    //Kjv.Chp.Load();	
    var body = document.body;
    body.style.backgroundColor = HtmlRgb(232, 232, 232);
    body.style.color = "black";
    KjvCatNameColor = HtmlRgb(0, 0, 0); 
    //KjvBkNameColor = HtmlRgb(37, 138, 175); //Blue ng
    //KjvBkNameColor = HtmlRgb(37, 154, 201);//Blue ok
    KjvBkNameColor = HtmlRgb(193, 46, 0);//red
    //KjvBkNameColor = HtmlRgb(153, 21, 21);//red
    //KjvBkNameColor = HtmlRgb(143, 187, 208);//Blue Light but not clear
    KjvBkDescColor = HtmlRgb(0, 0, 0);
    KjvChpNumColor = HtmlRgb(0, 196, 46);
    KjvVerSetColor = HtmlRgb(61, 87, 222);//Blue ok
    //KjvVerSetColor = HtmlRgb(37, 154, 201);//Blue ok
	
    //Kjv.Bkmk.Ary[0] = KjvPos.ObjLoad(KjvPos.Bkmk0);
	
    //KjvBkInit(KjvBkMapAry);
    //KjvChpInit(KjvChpMapAry);
	Kjv.Bkmk.AryLoad();	
    Kjv.Bkmk.BtnShow();	
    KjvBkListShow();
    KjvBkInfoShow();
    KjvChpListShow();
    KjvVerListShow();

    body.onkeydown = KeyDown;
}
*/