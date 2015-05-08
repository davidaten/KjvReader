//Kjv.FunRead: make div to show the text of the assigned chapter.
Kjv.FunRead = {};
Kjv.FunRead.ObjInit = function () {
    var obj = {};
    obj.ColorStr = "hsl(0,0%,0%)";
    obj.BkColorStr = "hsl(0,0%,100%)";
    obj.HtColorStr = "hsl(248,100%,38%)";
    obj.HtBkColorStr = "hsl(0,0%,100%)";
    obj.FtSize = 16;
    obj.BkIdx = 1;
    obj.ChpIdx = 1;
    obj.VerIdx = 1;
    obj.GbOn = 1;//Gb2312
    obj.B5On = 0;//Big5
    obj.TrAry = [];//Big5

    obj.Update = function () {
        var old = this.WrapDiv;
        this.DivMake();
        old.parentElement.replaceChild(this.WrapDiv, old);
    }

    obj.MenuLangEvt = function (cb_obj, cb_tag, menu_tag) {
        switch (menu_tag) {
            case "gb":
                if (cb_obj.GbOn)
                    cb_obj.GbOn = 0;
                else
                    cb_obj.GbOn = 1;
                break;
            case "b5":
                if (cb_obj.B5On)
                    cb_obj.B5On = 0;
                else
                    //cb_obj.B5On = 1;
                break;
        }
        cb_obj.Update();
    }
    obj.MenuBkEvt = function (cb_obj, cb_tag, menu_tag) {
        switch (cb_tag) {
            case 0:
                switch (menu_tag) {
                    case "<<":
                        if (cb_obj.BkIdx == 1)
                            return;
                        cb_obj.BkIdx = 1;
                        break;
                    case ">>":
                        if (cb_obj.BkIdx == 66)
                            return;
                        cb_obj.BkIdx = 66;
                        break;
                    case "<":
                        if (cb_obj.BkIdx == 1) 
                            return;
                        cb_obj.BkIdx--;
                        break;
                    case ">":
                        if (cb_obj.BkIdx == 66) 
                            return;
                        cb_obj.BkIdx++;
                        break;
                    default:
                        return;
                }
                break;
            case 1:
                cb_obj.BkIdx = menu_tag;
                //var bk_obj = Kjv.Bk.ObjMake(menu_tag);
                break;
        }
        cb_obj.MenuChpMake();
        cb_obj.ChpIdx = 1;
        cb_obj.VerIdx = 1;
        cb_obj.Update();
    }
    obj.MenuBkMake = function () {
        var menu = DwxUiMenu.ObjInit();
        menu.DirX = 1;
        menu.ItemAryAdd(["<<", "<", "Books", ">", ">>"]);
        menu.MsDnCb = CallbackSet(obj.MenuBkEvt, obj, 0);
        this.MenuBk = menu;

        var bk_sub = DwxUiMenu.ObjInit();
        bk_sub.DirX = 1;
        for (var i = 0; i < 66; i++) {
            var bk_obj = Kjv.Bk.ObjMake(i + 1);
            bk_sub.ItemAdd(bk_obj.BkName, i + 1);
        }
        bk_sub.MsDnCb = CallbackSet(obj.MenuBkEvt, obj, 1);
        this.MenuBk.ItemSubSet(2, bk_sub, 0, 2);
    }
    obj.MenuChpEvt = function (cb_obj, cb_tag, menu_tag) {
        //cb_obj.BkIdx = menu_tag;
        var bk_obj = Kjv.Bk.ObjMake(cb_obj.BkIdx);
        switch (cb_tag) {
            case 0:
                switch (menu_tag) {
                    case "<<":
                        if (cb_obj.ChpIdx == 1)
                            return;
                        cb_obj.ChpIdx = 1;
                        break;
                    case ">>":
                        if (cb_obj.ChpIdx == bk_obj.ChpNumInBk)
                            return;
                        cb_obj.ChpIdx = bk_obj.ChpNumInBk;
                        break;
                    case "<":
                        if (cb_obj.ChpIdx == 1)
                            return;
                        cb_obj.ChpIdx--;
                        break;
                    case ">":
                        if (cb_obj.ChpIdx == bk_obj.ChpNumInBk)
                            return;
                        cb_obj.ChpIdx++;
                        break;
                    default:
                        return;
                }
                break;
            case 1:
                cb_obj.ChpIdx = menu_tag;
                break;
        };
        cb_obj.VerIdx = 1;
        cb_obj.Update();
    }
    obj.MenuChpMake = function () {
        var menu = DwxUiMenu.ObjInit();
        menu.DirX = 1;
        menu.ItemAryAdd(["<<", "<", "Chapters", ">", ">>"]);
        menu.MsDnCb = CallbackSet(obj.MenuChpEvt, obj, 0);
        this.MenuChp = menu;

        var chp_sub = DwxUiMenu.ObjInit();
        chp_sub.DirX = 1;
        var bk_obj = Kjv.Bk.ObjMake(this.BkIdx);
        for (var i = 0; i < bk_obj.ChpNumInBk; i++) {
            chp_sub.ItemAdd(i + 1 , i + 1);
        }
        chp_sub.MsDnCb = CallbackSet(obj.MenuChpEvt, obj, 1);
        this.MenuChp.ItemSubSet(2, chp_sub, 0, 2);
    }

    obj.MenuMake = function () {

        var menu = DwxUiMenu.ObjInit();
        menu.DirX = 1;
        menu.ItemAdd("简体", "gb");
        menu.ItemAdd("繁體", "b5");
        menu.MsDnCb = CallbackSet(obj.MenuLangEvt, obj, 0);
        this.MenuLang = menu;

        this.MenuBkMake();
        this.MenuChpMake();
    }
    //obj.HeadMenu.DivMake();


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
        var idx0 = obj.VerIdx;
        obj.TrAry[idx0-1].style.cssText = obj.TrCssGet(0);
        obj.VerIdx = idx;
        obj.TrAry[idx-1].style.cssText = obj.TrCssGet(1);
    }
    obj.MsDnSet = function (div, idx) {
        obj.TrAry.push(div);
        div.addEventListener("mousedown",
        (function () {
            //var ver_idx = idx;
            var hnd = function () {
                obj.MsDnEvt(idx);
            }
            return hnd;
        })(), false);
    }
    obj.DivWalk = function (cb_obj, cb_tag, node) {
        var name = node.getAttribute("KjvFunRead");
        if (!name)
            return;
        var ary = name.split("-");
        switch (ary[0]) {
            case "menu":
                switch (ary[1]) {
                    case "lang":
                        cb_obj.MenuLang.DivMake();
                        node.appendChild(cb_obj.MenuLang.WrapDiv);
                        break;
                    case "bk":
                        cb_obj.MenuBk.DivMake();
                        node.appendChild(cb_obj.MenuBk.WrapDiv);
                        break;
                    case "chp":
                        cb_obj.MenuChp.DivMake();
                        node.appendChild(cb_obj.MenuChp.WrapDiv);
                        break;
                }
                break;
            case "head":
                node.appendChild(cb_obj.HeadTxtDiv);
                break;
        }
    }
    obj.HeadDivMake = function (bk_obj, chp_obj) {
        var div;
        var ary = [];
        ary.push('<div style="display: table; width: 100%">');
        ary.push('    <div style="display: table-row; vertical-align: baseline">');
        ary.push('        <div KjvFunRead="head" style="display: table-cell; text-align:left;">');
        ary.push('        </div>');
        ary.push('        <div KjvFunRead="menu-lang" style="display: table-cell; text-align:right;">');
        ary.push('        </div>');
        ary.push('    </div>');
        ary.push('</div>');
        ary.push('<div style="display: table; width: 100%">');
        ary.push('    <div style="display: table-row; vertical-align: baseline">');
        ary.push('        <div KjvFunRead="menu-bk" style="display: table-cell; text-align:left;">');
        ary.push('        </div>');
        ary.push('        <div KjvFunRead="menu-chp" style="display: table-cell; text-align:right;">');
        ary.push('        </div>');
        ary.push('    </div>');
        ary.push('</div>');

        div = document.createElement('div');
        div.innerHTML = ary.join("");
        this.HeadDiv = div;

        div = document.createElement('div');
        div.innerHTML =sprintf("Book %s: %s(<small>%s</small>)    Chapter: %s", bk_obj.BkIdx, bk_obj.BkName, bk_obj.BkBrf, chp_obj.ChpIdxInBk);
        var ary = [];
        ary.push("white-space: pre");
        ary.push("font-family: Verdana, Geneva, sans-serif");
        ary.push(sprintf("font-size: %spx", this.FtSize * 1.25));
        ary.push("font-weight: 400");//400=Normal 700=bold,(100~900);
        div.style.cssText = ary.join(";");
        div.innerHTML = sprintf("Book %s: %s(<small>%s</small>)    Chapter: %s", bk_obj.BkIdx, bk_obj.BkName, bk_obj.BkBrf, chp_obj.ChpIdxInBk);
        this.HeadTxtDiv = div;

        this.MenuMake();
        //this.MenuAry[0].DivMake();

        var cb_obj = CallbackSet(this.DivWalk, this, 0);
        ElementWalk(this.HeadDiv, cb_obj);
        this.WrapDiv.appendChild(this.HeadDiv);
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
        var btn_ary = ['简体','繁體','&laquo;', '&lt;', 'Index', '&gt;', '&raquo;'];
        for (var i = 0; i < 5; i++) {
            td = document.createElement('div');
            tr.appendChild(td);
            td.innerHTML = btn_ary[i];
            td.style.cssText = this.TdCssGet(1);
        }
    }

    obj.DivMake = function () {
        var bk_obj = Kjv.Bk.ObjMake(this.BkIdx);
        var chp_obj = Kjv.Chp.ObjMake(bk_obj.ChpOffInAll + this.ChpIdx);
        this.WrapDiv = document.createElement('div');
        this.HeadDivMake(bk_obj,chp_obj);

        var tb = document.createElement('div');
        tb.style.cssText = this.TbCssGet();
        this.WrapDiv.appendChild(tb);

        if (bk_obj.BkBrf == "PSA") {//KjvPsaSubMapAry
            for (var i = 0; i < KjvPsaSubMapAry.length; i += 2) {
                if (chp_obj.ChpIdxInBk != KjvPsaSubMapAry[i])
                    continue;
                tr = document.createElement('div');
                tr.style.cssText = this.TrCssGet();
                tb.appendChild(tr);
                tr.innerHTML = KjvPsaSubMapAry[i + 1];
                break;
            }
        }

        for (var i = 0; i < chp_obj.VerNumInChp; i++) {
            if ((bk_obj.BkBrf == "PSA") && (chp_obj.ChpIdxInBk == 119) && ((i % 8) == 0)) {
                tr = document.createElement('div');
                tr.style.cssText = this.TrCssGet();
                tb.appendChild(tr);
                tr.innerHTML = KjvPsa119SubMapAry[i / 8];
            }

            for (var j = 0; j < 3; j++) {
                var ver_obj, txt;
                switch (j) {
                    case 0:
                        ver_obj = Kjv.Ver.ObjMake(chp_obj.VerOffInAll + i + 1, KjvVerMapAry);
                        txt = Kjv.Ver.EngFix(ver_obj.VerText);
                        break;
                    case 1:
                        if (this.GbOn == 0)
                            continue;
                        ver_obj = Kjv.Ver.ObjMake(chp_obj.VerOffInAll + i + 1, KjvVerGb2FixMapAry);
                        txt = Kjv.Ver.ChnFix(ver_obj.VerText, 0);
                        break;
                    case 2:
                        if (this.B5On == 0)
                            continue;
                        ver_obj = Kjv.Ver.ObjMake(chp_obj.VerOffInAll + i + 1, KjvVerB5FixMapAry);
                        txt = Kjv.Ver.ChnFix(ver_obj.VerText, 0);
                        break;

                }//case

                tr = document.createElement('div');
                tb.appendChild(tr);
                var ht = 0;
                if (j == 0) {
                    this.MsDnSet(tr,i+1);
                    if (ver_obj.VerIdxInChp == this.VerIdx) {
                        ht = 1;
                    }
                };
                tr.style.cssText = this.TrCssGet(ht);

                for (var k = 0; k < 2; k++) {
                    td = document.createElement('div');
                    tr.appendChild(td);
                    switch (k) {
                        case 0:
                            td.innerHTML = sprintf("%s:%s", ver_obj.ChpIdxInBk, ver_obj.VerIdxInChp);
                            break;
                        case 1:
                            td.innerHTML = txt;
                            break;
                    }
                    td.style.cssText = this.TdCssGet(0);
                }//k
            }//j
        }//i  
        return this.WrapDiv;
        //Kjv.Bkmk.Ary[0].VerMax = chp_obj.VerNumInChp;
        //var div0 = document.getElementById("KjvVerListDiv");//KjvParsePce();
        //div0.parentElement.replaceChild(div, div0);
    }



    return obj;
}
Kjv.FunRead.Demo = function () {

    var obj = Kjv.FunRead.ObjInit();
    obj.DivMake();
    document.body.appendChild(obj.WrapDiv);
}
function VerUpdn(cnt) {
    var ver_idx = Kjv.Bkmk.Ary[0].VerIdx + cnt;
    KjvVerSet(ver_idx);
}
function KjvVerClick() {

    var ver_idx = KjvTag2VerIdx(this.id);
    KjvVerSet(ver_idx);
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