//KjvFunMain: find the matchs among BkAry and make div to show the found results.
KjvFunMain = function () {
    var obj = {};
    this.ColorStr = "hsl(0,0%,0%)";
    this.BkColorStr = "hsl(0,0%,100%)";
    this.HtColorStr = "hsl(248,100%,38%)";
    this.HtBkColorStr = "hsl(0,0%,100%)";
    this.FtSize = 16;
    this.ColumnAry = [];
    
    DwxUiDiv.call(this);
    this.CssAttSet("font-family", "Verdana, Geneva, sans-serif");
    this.CssAttSet("font-size", sprintf("%spx", this.FtSize));
    this.CssAttSet("font-weight", sprintf("%s", 400));

    this.TdCssGet = function () {
        var ary = [];
        ary.push("display: table-cell");
        ary.push("vertical-align: top");
        ary.push("width: 50%");
        return ary.join(";");
    }
    this.FindResClickEvt = function (obj, tag, prm) {
        var find_obj = obj.ColumnAry[tag];
        var read_obj = obj.ColumnAry[tag+1];
        read_obj.BkIdx = prm.BkIdx;
        read_obj.ChpIdx = prm.ChpIdx;
        read_obj.VerIdx = prm.VerIdx;
        var old_div = read_obj.WrapDiv;
        read_obj.DivMake();
        old_div.parentElement.replaceChild(read_obj.WrapDiv, old_div);
    }

    this.MsDnEvt = function (idx) {

    }
    this.MsDnSet = function (div, idx) {
        div.addEventListener("mousedown",
        (function () {
            //var ver_idx = idx;
            var hnd = function () {
                this.MsDnEvt(idx);
            }
            return hnd;
        })(), false);
    }
 

    
    this.DivWalk = function (cb_obj, cb_tag, node) {
        var name = node.getAttribute("att-div-name");
        if (!name)
            return;
        var ary = name.split("-");
        switch (ary[0]) {
            case "bar":
                cb_obj.BarDiv = node;
                break;
            case "tb":
                cb_obj.TbDiv = node;
                break;
            case "tr":
                cb_obj.TrDiv = node;
                break;
            case "res":
                node.appendChild(cb_obj.ResDiv);
                break;
        }
    }
			        
    this.DivMake = function () {
        var ary = [];
        ary.push('<div att-div-name="bar"></div>');
        ary.push('<table att-div-name="tb">');
        ary.push('  <tr att-div-name="tr">');
        ary.push('  </tr>');
        ary.push('</table>');
        var div = document.createElement('div');
        div.innerHTML = ary.join("");
        this.WrapDiv = div;
        var cb_obj = CallbackSet(this.DivWalk, this, 0);
        ElementWalk(div, cb_obj);

        for (var i = 0; i < this.ColumnAry.length; i++) {
            var col_obj = this.ColumnAry[i];
            col_obj.DivMake();
            var td = document.createElement('td');
            td.style.cssText = sprintf("width: %s%", 100 / this.ColumnAry.length);
            td.appendChild(col_obj.WrapDiv);
            this.TrDiv.appendChild(td);
            //break;
        }//i

        return this.WrapDiv;
        //Kjv.Bkmk.Ary[0].VerMax = chp_obj.VerNumInChp;
        //var div0 = document.getElementById("KjvVerListDiv");//KjvParsePce();
        //div0.parentElement.replaceChild(div, div0);
    }
    var find_obj = Kjv.FunFind.ObjInit();
	find_obj.VerClickCb = CallbackSet(obj.FindResClickEvt, obj, 0);
	this.ColumnAry.push(find_obj);
    var read_obj = Kjv.FunRead.ObjInit();
    this.ColumnAry.push(read_obj);
}
KjvFunMain.Demo = function () {

    var obj = new KjvFunMain();
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