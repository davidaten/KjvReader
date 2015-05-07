//Kjv.FunMain: find the matchs among BkAry and make div to show the found results.
Kjv.FunMain = {};
Kjv.FunMain.ObjInit = function () {
    var obj = {};
    obj.ColorStr = "hsl(0,0%,0%)";
    obj.BkColorStr = "hsl(0,0%,100%)";
    obj.HtColorStr = "hsl(248,100%,38%)";
    obj.HtBkColorStr = "hsl(0,0%,100%)";
    obj.FtSize = 16;
    obj.ColumnAry = [];
    
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
        return ary.join(";");
    }

    obj.TdCssGet = function () {
        var ary = [];
        ary.push("display: table-cell");
        ary.push("vertical-align: top");
        ary.push("width: 100%");
        return ary.join(";");
    }
    obj.FindResClickEvt = function (obj, tag, prm) {
        var find_obj = obj.ColumnAry[tag];
        var read_obj = obj.ColumnAry[tag+1];
        read_obj.BkIdx = prm.BkIdx;
        read_obj.ChpIdx = prm.ChpIdx;
        read_obj.VerIdx = prm.VerIdx;
        var old_div = read_obj.WrapDiv;
        read_obj.DivMake();
        old_div.parentElement.replaceChild(read_obj.WrapDiv, old_div);
    }

    obj.MsDnEvt = function (idx) {

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
    
			        
    obj.DivMake = function () {
        this.WrapDiv = document.createElement('div');
        //this.HeaderSet(this.WrapDiv,bk_obj,chp_obj);
        var tb,tr,td;
        tb = document.createElement('div');
        tb.style.cssText = this.TbCssGet();
        this.WrapDiv.appendChild(tb);

        tr = document.createElement('div');
        tb.appendChild(tr);
        tr.style.cssText = this.TrCssGet();

        for (var i = 0; i < this.ColumnAry.length; i++) {
            var col_obj = this.ColumnAry[i];
            td=col_obj.DivMake();
            tr.appendChild(td);
            td.style.cssText = this.TdCssGet();
        }//i

        return this.WrapDiv;
        //Kjv.Bkmk.Ary[0].VerMax = chp_obj.VerNumInChp;
        //var div0 = document.getElementById("KjvVerListDiv");//KjvParsePce();
        //div0.parentElement.replaceChild(div, div0);
    }
    var find_obj = Kjv.FunFind.ObjInit();
    for (var i = 1; i < 66; i++)
        find_obj.BkAry.push(i);
	//find_obj.BkAry.push(66);
	find_obj.FindRegMake("thy neighbour");
	find_obj.Find();
	find_obj.VerClickCb = CallbackSet(obj.FindResClickEvt, obj, 0);
	//obj.ColumnAry.push(find_obj);
    var read_obj = Kjv.FunRead.ObjInit();
    obj.ColumnAry.push(read_obj);
    return obj;
}
Kjv.FunMain.Demo = function () {

    var obj = Kjv.FunMain.ObjInit();
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