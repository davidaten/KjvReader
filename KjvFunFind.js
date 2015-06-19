//KjvFunFind: find the matchs among BkAry and make div to show the found results.
function KjvFunFind () {
    DwxUiDiv.call(this);

    this.ColorStr = "hsl(0,0%,0%)";
    this.BkColorStr = "hsl(0,0%,100%)";
    this.HtColorStr = "hsl(248,100%,38%)";
    this.HtBkColorStr = "hsl(0,0%,100%)";
    this.FtSize = 16;
    this.BkAry = [];
    this.FindResAry = [];
    this.GbOn = 1;//Gb2312
    this.B5On = 1;//Big5
    var obj = this;

    this.BkTreeMake = function () {
	    var bk_idx = 1;
	    var tree_l1 = new DwxUiTree();
	    for (var l1 = 0; l1 < 2;l1 ++){
	        if (l1 == 0) 
	            tree_l1.NodeAdd(-1, "T-0", "Old Testament");
	        else
	            tree_l1.NodeAdd(-1, "T-1", "New Testament");

	        var tree_l2 = new DwxUiTree();
	        var c_off = l1*10;
	        for (var l2 = 0 ; l2 < 10 ; l2+=2) {
	            tree_l2.NodeAdd(-1, sprintf("C-%s", (c_off + l2) / 2), KjvCatMapAry[c_off + l2]);
	            var tree_l3 = new DwxUiTree();
	            tree_l3.DirX = 1;
	            //tree_l3.SubSignOn = 0;
	            for (var l3 = 0; l3 < KjvCatMapAry[c_off + l2 + 1]; l3++) {
	                var bk_obj = Kjv.Bk.ObjMake(bk_idx);
	                tree_l3.NodeAdd(-1, sprintf("B-%s", bk_idx), bk_obj.BkName);
	                bk_idx++;
	            }

	            if (((l1 == 0) && (l2 == 0)) || ((l1 == 1) && (l2 == 0)) || ((l1 == 1) && (l2 == 8)))
	                tree_l2.NodeAry[l2 / 2].SubStat = 1;
	            else
	                tree_l2.NodeAry[l2 / 2].SubStat = 0;
	            tree_l2.NodeSubSet(l2 / 2, tree_l3);
	        }
	        tree_l1.NodeSubSet(l1, tree_l2);
	    }
	    tree_l1.PreMake();
	    this.BkTree = tree_l1;
	}
    this.BkTreeMake();
    this.BkTreeScan = function () {
	    this.BkAry = [];
	    var bk_idx = 1;
	    var tree_l1 = this.BkTree;
	    for (var l1 = 0; l1 < tree_l1.NodeAry.length; l1++) {
	        var tree_l2 = tree_l1.NodeAry[l1].SubList;
	        for (var l2 = 0; l2 < tree_l2.NodeAry.length; l2++) {
	            var tree_l3 = tree_l2.NodeAry[l2].SubList;
	            for (var l3 = 0; l3 < tree_l3.NodeAry.length; l3++) {
	                if (tree_l3.NodeAry[l3].ChkStat)
	                    this.BkAry.push(bk_idx);
	                bk_idx++;
	            }
	        }
	    }
	}

    this.ActMenuCbFun = function (cb_obj, cb_tag, node_obj_tag, sec_obj_tag) {
	    switch (node_obj_tag) {
	        case "Find":
	            cb_obj.BkTreeScan();
	            cb_obj.Find();
	            cb_obj.ResDivMake();
	            return 0;
	            break;
	    }
	}

    this.ActMenuMake = function () {
	    var bk_idx = 1;
	    var tree_l1 = new DwxUiTree();
	    tree_l1.DirX = 1;
	    tree_l1.ChkSignOn = 0;
	    tree_l1.NodeAdd(-1, "Find", "Find");
	    tree_l1.NodeAdd(-1, "ClrBk", "Clear book ranges");
	    tree_l1.NodeAdd(-1, "ClrVer", "Clear verse conditions");
	    tree_l1.NodeAdd(-1, "ClrRes", "Clear searching results");
	    tree_l1.PreMake();
	    tree_l1.MsDnCb = CallbackSet(this.ActMenuCbFun, this, 0);
	    this.ActMenu = tree_l1;
	}
    this.ActMenuMake();

    this.FindRegMake = function (exp_str, flag_str) {

	    if (!flag_str)
	        flag_str = 'ig';

	    this.FindReg = new RegExp(exp_str, flag_str);
	    this.Pos0Str = sprintf('<span style="color:%s;background-color:%s;">', this.HtColorStr, this.HtBkColorStr);
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
    this.FindRplCb = function (match, $1) {
	    obj.FindRplCnt++;
	    var ary = [];
	    ary.push(obj.Pos0Str);
	    ary.push(match);
	    ary.push(obj.Pos1Str);
	    return ary.join("");
	}
    this.Find = function () {
	    this.FindResAry = [];
	    this.FindRegMake(this.VerDiv.value);
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


    this.TbCssGet = function () {
	    var ary = [];
	    ary.push("display: table");
	    //ary.push(sprintf("background-color: %s",this.BkColorStr));
	    ary.push("font-family: Verdana, Geneva, sans-serif");
	    ary.push(sprintf("font-size: %spx", this.FtSize));
	    ary.push("font-weight: 400");//400=Normal 700=bold,(100~900);
	    //ary.push(sprintf("color: %s",this.ColorStr));
	    return ary.join(";");
	}

    this.TrCssGet = function (ht) {
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

    this.TdCssGet = function () {
	    var ary = [];
	    ary.push("display: table-cell");
	    ary.push("vertical-align: top");
	    return ary.join(";");
	}

    this.MsDnEvt = function (idx) {
	    if (!obj.VerClickCb)
	        return;
	    var prm = {};
	    prm.BkIdx = obj.FindResAry[idx].BkIdx;
	    prm.ChpIdx = obj.FindResAry[idx].ChpIdx;
	    prm.VerIdx = obj.FindResAry[idx].VerIdx;
	    obj.VerClickCb.CbFun(obj.VerClickCb.CbObj, obj.VerClickCb.CbTag, prm);
	}
    this.MsDnSet = function (div, idx) {
	    div.addEventListener("mousedown",
        (function () {
            //var ver_idx = idx;
            var hnd = function () {
                obj.MsDnEvt(idx);
            }
            return hnd;
        })(), false);
	}

    this.ResDivMake = function () {
        var res_div = document.createElement('div');
        //this.HeaderSet(this.WrapDiv,bk_obj,chp_obj);
        if (this.VerDiv)
            res_div.innerHTML = sprintf("Total %s result(s) in %s book(s) for searching [%s]:",
                this.FindResAry.length, this.BkAry.length, this.VerDiv.value);
        else
            res_div.innerHTML = "No searching results here.";
        var tb = document.createElement('div');
        tb.style.cssText = this.TbCssGet();
        res_div.appendChild(tb);


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
        if (this.FindResAry.length == 0) {

        }


        var old = this.ResDiv;
        if (old)
            old.parentElement.replaceChild(res_div, old);
        this.ResDiv = res_div;
        //return this.WrapDiv;
        //Kjv.Bkmk.Ary[0].VerMax = chp_obj.VerNumInChp;
        //var div0 = document.getElementById("KjvVerListDiv");//KjvParsePce();
        //div0.parentElement.replaceChild(div, div0);
    }

    this.DivWalk = function (cb_obj, cb_tag, node) {
        var name = node.getAttribute("data-div-name");
        if (!name)
            return;
        var ary = name.split("-");
        switch (ary[0]) {
            case "bk":
                node.appendChild(cb_obj.BkTree.WrapDiv);
                break;
            case "ver":
                cb_obj.VerDiv=node;
                break;
            case "act":
                node.appendChild(cb_obj.ActMenu.WrapDiv);
                break;
            case "res":
                node.appendChild(cb_obj.ResDiv);
                break;
        }
    }

    this.DivMake = function () {
        this.BkTree.DivMake();
        this.ActMenu.DivMake();
        this.ResDivMake();
        var ary = [];
        ary.push('Range of books:');
        ary.push('<div data-div-name="bk"></div>');
        ary.push('<br>');
        ary.push('Conditions of verses:');
        ary.push('<br>');
        ary.push('<input data-div-name="ver" type="text"/>');
        ary.push('<br>');
        ary.push('<br>');
        ary.push('<div data-div-name="act"></div>');
        ary.push('<br>');
        ary.push('<div data-div-name="res"></div>');
        var div = document.createElement('div');
        div.innerHTML = ary.join("");

        var cb_obj = CallbackSet(this.DivWalk, this, 0);
        ElementWalk(div, cb_obj);

/*
        var div;
        div = document.createElement('div');
        this.BkTree.DivMake();
        div.appendChild(this.BkTree.WrapDiv);
*/
        this.WrapDiv = div;
        return div;
    }

    return obj;
}
http://www.kingjamesbibleonline.org/search-advanced.php
KjvFunFind.Demo = function () {

    var obj = new KjvFunFind();
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