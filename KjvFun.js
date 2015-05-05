// JavaScript source code
//---------------------------------------------------------------------------
var Kjv = {};
/*var KjvCatMapAry = [
    "Law", 5, "History_1", 7, "History_2", 5, "Poetry/Wisdom", 5, "Major Prophets", 5, "Minor Prophets_1", 6, "Minor Prophets_2", 6,
    "Gospels", 4, "History", 1, "Paul's Letters_1", 5, "Paul's Letters_2", 4, "Paul's Letters_3", 5, "Other Letters", 7, "Prophecy", 1
];*/
//---------------------------------------------------------------------------
//Book 
Kjv.Bk = {};
Kjv.Bk.Init = function(){
    var obj = {};
	obj.BkIdx = 0;
	obj.ChpOffInAll = 0;
	obj.ChpNumInBk = 0;
	return obj;	
}	
Kjv.Bk.ObjGet = function (idx,ary){

	if (arguments.length<2){
		ary = KjvBkMapAry;
	}
	var obj = {};
	var off = (idx - 1) * 5;
	obj.BkIdx = ary[off + 0];
	obj.BkBrf = ary[off + 1];
	obj.BkName = ary[off + 2];
	obj.ChpOffInAll = ary[off + 3];
	obj.ChpNumInBk = ary[off + 4];

	return obj;	
}
Kjv.Bk.MapAryDesc = "//BkIdx, BkBrf, BkName, ChpOffInAll, ChpNumInBk.";
Kjv.Bk.MapAryOne = function (bk) {
    return sprintf('%s,"%s","%s",%s, %s', bk.BkIdx, bk.BkBrf, bk.BkName, bk.ChpOffInAll, bk.ChpNumInBk);
}
//---------------------------------------------------------------------------
//Chapter
Kjv.Chp = {};
Kjv.Chp.Init = function(){
   	var obj = {};
	obj.ChpIdxInAll = 0;
	obj.ChpIdxInBk = 0;
	obj.VerOffInAll = 0;
	obj.VerNumInChp = 0;
	return obj;	
}	
Kjv.Chp.ObjGet = function (idx){

    ary = KjvChpMapAry;
	
	var obj = {};
	var off = (idx - 1) * 5;
	obj.ChpIdxInAll = ary[off + 0];
	obj.BkBrf = ary[off + 1];
	obj.ChpIdxInBk = ary[off + 2];
	obj.VerOffInAll = ary[off + 3];
	obj.VerNumInChp = ary[off + 4];
	return obj;	
}
Kjv.Chp.MapAryDesc = "//ChpIdxInAll, BkBrf, ChpIdxInBk, VerOffInAll, VerNumInChp.";
Kjv.Chp.MapAryOne = function (chp) {
	return sprintf('%s,"%s",%s,%s,%s', chp.ChpOffInAll + 1, chp.BkBrf, chp.ChpIdxInBk, chp.VerOffInAll, chp.VerNumInChp);
};
//---------------------------------------------------------------------------
//Verse
Kjv.Ver = {};
Kjv.Ver.Init = function(){
	var obj = {};
	obj.VerIdxInAll = 0;
	obj.ChpIdxInBk = 0;
	obj.VerIdxInChp = 0;
	return obj;	
}	
Kjv.Ver.ObjGet = function (idx,ary){

    if (arguments.length<2){
		ary = KjvVerMapAry;
	}
	var obj = {};
	var off = (idx - 1) * 5;
	obj.VerIdxInAll = ary[off + 0];
	obj.BkBrf = ary[off + 1];
	obj.ChpIdxInBk = ary[off + 2];
	obj.VerIdxInChp = ary[off + 3];
	obj.VerText = ary[off + 4];
	return obj;	
}
Kjv.Ver.MapAryDesc = "//VerIdxInAll, BkBrf, ChpIdxInBk, VerIdxInChp, VerText.";
Kjv.Ver.MapAryOne = function (ver) {
    return sprintf('%s,"%s",%s,%s,"%s"',ver.VerOffInAll + 1, ver.BkBrf, ver.ChpIdxInBk, ver.VerIdxInChp, ver.VerText);
};
Kjv.Ver.EngFix = function (txt) {
    return txt.replace(/<p>/, "&para;");//"¶ 
}
Kjv.Ver.ChnFix = function (txt,cmp) {

	if (arguments.length<2){
		cmp=0;
	}
	//var txt0 = txt.substring(0, off);
	if (cmp) {
		txt = txt.replace(/<HY>/g, "<span style=\'border-bottom:2px dotted\'>");
		txt = txt.replace(/<\/HY>/g, "</span>");
	} else {
		txt = txt.replace(/<HY>/g, "");
		txt = txt.replace(/<\/HY>/g, "");
		//txt = removeEnglish(txt, 0);
	}
	return txt;
}
var KjvCatMapAry = [
    "Law", 5, "History", 12, "Poetry/Wisdom", 5, "Major Prophets", 5, "Minor Prophets", 12,
    "Gospels", 4, "History", 1, "Paul's Letters", 14, "Other Letters", 7, "Prophecy", 1
];
var KjvCatNameColor, KjvBkNameColor, KjvBkDescColor, KjvChpNumColor, KjvVerSetColor;
var KjvOldBkgdColor, KjvOldColor;
var KjvPsa119SubMapAry = [
"א ALEPH", "ב BETH", "ג GIMEL", "ד DALETH", "ה HE", "ו VAU", "ז ZAIN","ח CHETH", "ט TETH", "י JOD", "כ CAPH", 
"ל LAMED", "מ MEM", "נ NUN", "ס SAMECH", "ע AIN", "פ PE", "צ TZADDI", "ק KOPH", "ר RESH", "ש SCHIN", "ת TAU"
];
function KjvMouseEnter(evt) {
    KjvOldBkgdColor = this.style.backgroundColor;
    KjvOldColor = this.style.color;

    this.style.backgroundColor = "#000000";
    this.style.color = "#ffffff";  
}  
function KjvMouseLeave(evt) {

    this.style.backgroundColor = KjvOldBkgdColor;
    this.style.color = KjvOldColor;
}
/*
var KjvBkAry = [];
function KjvBkInit(map_ary){

    if (KjvBkAry.length > 0)
        return;
    for (var i=0;i<66;i++){
        var bk=KjvBk();
        bk.AryObjGet(i+1,map_ary);
        KjvBkAry.push(bk);
    }
}
function KjvBk() {
    var obj = {
        BkIdx: 0,
        BkBrf: "",
        BkName: "",
        ChpOffInAll: 0,
        ChpNumInBk: 0,
        BkDesc: "",
    };
    obj.AryGetMap = function () {
        return "//BkIdx, BkBrf, BkName, ChpOffInAll, ChpNumInBk, BkDesc.";
    };
    obj.AryGetOne = function () {
        return sprintf('%s,"%s","%s",%s, %s,"%s"',
            this.BkIdx, this.BkBrf, this.BkName, this.ChpOffInAll, this.ChpNumInBk, this.BkDesc);
    };
	obj.AryObjGet = function (idx,ary) {
		var ary_off = (idx - 1) * 6;
		this.BkIdx = ary[ary_off + 0];
		this.BkBrf = ary[ary_off + 1];
		this.BkName = ary[ary_off + 2];
		this.ChpOffInAll = ary[ary_off + 3];
		this.ChpNumInBk = ary[ary_off + 4];
		this.BkDesc = ary[ary_off + 5];
	}

    obj.JsonGet = function () {
        return sprintf("{BkIdx: %s, BkBrf: %s, BkName: %s, ChpNumInBk: %s, ChpOffInAll: %s, BkDesc: %s}",
            this.BkIdx, this.BkBrf, this.BkName, this.ChpNumInBk, this.ChpOffInAll, this.BkDesc);
    };
    obj.Log = function () {
		return;
        console.log(this.JsonGet());
    };

    return obj;
};
//---------------------------------------------------------------------------
var KjvChpAry = [];
function KjvChpInit(map_ary) {
    
    if (KjvChpAry.length > 0)
        return;
    for (var i = 0; i < map_ary.length/5; i++) {
        var chp = KjvChp();
        chp.AryObjGet(i + 1, map_ary);
        KjvChpAry.push(chp);
    }
}
function KjvChp() {
    var obj = {
        ChpOffInAll: 0,
        BkBrf: "",
        ChpIdxInBk: 0,
        VerOffInAll: 0,
        VerNumInChp: 0
    };
		
    obj.AryGetMap = function () {
        return "//ChpIdxInAll, BkBrf, ChpIdxInBk, VerOffInAll, VerNumInChp.";
    };
    obj.AryGetOne = function () {
        return sprintf('%s,"%s",%s,%s,%s',
            this.ChpOffInAll + 1, this.BkBrf, this.ChpIdxInBk, this.VerOffInAll, this.VerNumInChp);
    };
	obj.AryObjGet = function (idx,ary) {
		var ary_off = (idx - 1) * 5;
		this.ChpIdxInAll = ary[ary_off + 0];
		this.BkBrf = ary[ary_off + 1];
		this.ChpIdxInBk = ary[ary_off + 2];
		this.VerOffInAll = ary[ary_off + 3];
		this.VerNumInChp = ary[ary_off + 4];
	};

    obj.JsonGet = function () {
        return sprintf("{ChpIdxInAll: %s, BkBrf: %s, ChpIdxInBk: %s, VerNumInChp: %s, VerOffInAll: %s}",
            this.ChpOffInAll + 1, this.BkBrf, this.ChpIdxInBk, this.VerNumInChp, this.VerOffInAll);
    }
    obj.Log = function () {
        return;
        console.log(this.JsonGet());
    }
    
    return obj;
};
//---------------------------------------------------------------------------
function KjvVer() {
    var obj = {
        VerOffInAll: 0,
        BkBrf: "",
        ChpIdxInBk: 0,
        VerIdxInChp: 0,
        VerText: ""
    };

    obj.AryGetMap = function () {
        return "//VerIdxInAll, BkBrf, ChpIdxInBk, VerIdxInChp, VerText.";
    };
    obj.AryGetOne = function () {
        return sprintf('%s,"%s",%s,%s,"%s"',
            this.VerOffInAll + 1, this.BkBrf, this.ChpIdxInBk, this.VerIdxInChp, this.VerText);
    };
	obj.AryObjGet = function(idx,ary) {
		var ary_off = (idx - 1) * 5;
		this.VerIdxInAll = ary[ary_off + 0];
		this.BkBrf = ary[ary_off + 1];
		this.ChpIdxInBk = ary[ary_off + 2];
		this.VerIdxInChp = ary[ary_off + 3];
		this.VerText = ary[ary_off + 4];
	}
		
	obj.JsonGet = function () {
        return sprintf("{VerIdxInAll: %s, BkBrf: %s, ChpIdxInBk: %s, VerIdxInChp: %s, VerText: %s}",
            this.VerOffInAll + 1, this.BkBrf, this.ChpIdxInBk, this.VerIdxInChp, this.VerText);
    }
    obj.Log = function () {
        return;
        console.log(this.JsonGet());
    }

    //sResult = sResult.replace("[", "<i>");
    //sResult = sResult.replace("]", "</i>");
    obj.EngFix = function () {
        //var txt0 = sprintf("%s%s:%s", this.BkBrf, this.ChpIdxInBk, this.VerIdxInChp);
        var txt0 = sprintf("%s:%s", this.ChpIdxInBk, this.VerIdxInChp);
        var txt1 = this.VerText.replace(/<p>/, "&para;");//"¶ 

        var txt_ary = [];
        txt_ary.push(txt0);
        txt_ary.push(txt1);
        return txt_ary;
    }
    obj.ChnFix = function (cmp) {
        if (arguments.length<1){
            cmp=0;
        }
        var txt0 = sprintf("%s%s:%s", this.BkBrf, this.ChpIdxInBk, this.VerIdxInChp);
        //var txt0 = txt.substring(0, off);
        var txt1 = this.VerText;
        if (cmp) {
            txt1 = txt1.replace(/<HY>/g, "<span style=\'border-bottom:2px dotted\'>");
            txt1 = txt1.replace(/<\/HY>/g, "</span>");
        } else {
            txt1 = txt1.replace(/<HY>/g, "");
            txt1 = txt1.replace(/<\/HY>/g, "");
            //txt = removeEnglish(txt, 0);
        }

        var txt_ary = [];
        txt_ary.push(txt0);
        txt_ary.push(txt1);
        return txt_ary;
    }
    return obj;
};
*/
//---------------------------------------------------------------------------
//King James Version, Bookmark
Kjv.Bkmk = { Id: "KjvBkmk", IdxMax: 9, ListOn: 0};
Kjv.Bkmk.BtnShow = function (){

    this.ListOn = 0;

    //if (this.ListOn == 0){
	var div = document.createElement('div');
	div.id = this.MakeId("ListDiv")
	div.innerHTML ='<button type="button" onclick="Kjv.Bkmk.ListShow()">Boorkmarks</button><br>';
	ElementReplace(div);
}

Kjv.Bkmk.ObjInit = function(){
	var obj = {
		Desc: "Desc",
		BkIdx: 1,
		ChpIdx: 1,
		VerIdx: 1
	}
	return obj;
}
Kjv.Bkmk.ObjCopy = function(idx){
	var obj = {};
	obj.Desc = this.Ary[idx].Desc;
	obj.BkIdx = this.Ary[idx].BkIdx;
	obj.ChpIdx = this.Ary[idx].ChpIdx;
	obj.VerIdx = this.Ary[idx].VerIdx;
	return obj;
}
Kjv.Bkmk.ObjCheck = function(bkmk){

    var bk,chp,ver;
	if ((bkmk.BkIdx>=1)&&(bkmk.BkIdx<=66))
	    bk=Kjv.Bk.ObjGet(bkmk.BkIdx,Kjv.Bk.MapAry);
	else{
	    bkmk.Res = sprintf("[%s] out of book range 1~%s",Int2Str(bkmk.BkIdx),66);
		return -1;
	}
	if ((bkmk.ChpIdx>=1)&&(bkmk.ChpIdx<=bk.ChpNumInBk))		
		chp=Kjv.Chp.ObjGet(bk.ChpOffInAll+bkmk.ChpIdx);	
	else{
		bkmk.Res = sprintf("Book: %s_%s, [%s] out of chapter range 1~%s",Int2Str(bkmk.BkIdx),bk.BkName,bkmk.ChpIdx,bk.ChpNumInBk);
		return -2;
	}
	if ((bkmk.VerIdx>=1)&&(bkmk.VerIdx<=chp.VerNumInChp)){
	    ver=Kjv.Ver.ObjGet(chp.VerOffInAll+bkmk.VerIdx);	
		bkmk.Res = sprintf("%s_%s, %s:%s %s",Int2Str(bk.BkIdx),bk.BkName,chp.ChpIdxInBk,ver.VerIdxInChp,Kjv.Ver.EngFix(ver.VerText));
		return 0;
	}
	else{
	    bkmk.Res = sprintf("Book: %s_%s, Chapter: %s, [%s] is out of verse range 1~%s",Int2Str(bkmk.BkIdx),bk.BkName,bkmk.ChpIdx,bkmk.VerIdx,chp.VerNumInChp);
		return -3;
	}
}
Kjv.Bkmk.MakeId = function(str,idx){

    var txt = this.Id+str;
    if (arguments.length>1)
	    txt += Int2Str(idx,10,2);
    return txt;

}
Kjv.Bkmk.Id2Idx = function(str){

	var matches = str.match(/\d+$/);
    return Str2Int(matches[0]);
}


Kjv.Bkmk.Ary = [];
Kjv.Bkmk.AryLoad = function () {

    var key = this.MakeId("AryLen");
    var txt = window.localStorage.getItem(key);
    var num = Str2Int(txt);
    if (num == 0)
        num = 1;
    
    for (var i = 0; i < num; i++) {
        key = this.MakeId("Ary",i);
        txt = window.localStorage.getItem(key);
        var obj;
        try {
            obj = JSON.parse(txt);
            if (obj == null)
                obj = this.ObjInit();
        }
        catch (e) {
            obj = this.ObjInit();
        }
        this.Ary.push(obj);
    }
	this.Ary[0].Desc="Current reading position";
}
Kjv.Bkmk.ArySaveOne = function (idx) {

    var key = this.MakeId("Ary",idx);
    var obj = this.Ary[idx];
    var txt = sprintf('{"Desc":"%s","BkIdx":%s,"ChpIdx":%s,"VerIdx":%s}',
	    obj.Desc,Int2Str(obj.BkIdx), Int2Str(obj.ChpIdx), Int2Str(obj.VerIdx));
    window.localStorage.setItem(key, txt);
}
Kjv.Bkmk.ArySaveAll = function () {

    var key = this.MakeId("AryLen");
    var txt = Int2Str(this.Ary.length);
    window.localStorage.setItem(key, txt);

    for (var i = 0; i < this.Ary.length; i++) 
        this.ArySaveOne(i);
}

Kjv.Bkmk.ListTbCssId = "KjvBkmkListTbCss";
Kjv.Bkmk.ListGoto = function (idx) {

	this.BtnShow();
    if (idx==0)
		return;

    var valid=this.ObjCheck(this.Ary[idx]);
    if (valid < 0)
		return;

    this.Ary[0].BkIdx = this.Ary[idx].BkIdx; 	
    this.Ary[0].ChpIdx = this.Ary[idx].ChpIdx; 	
    this.Ary[0].VerIdx = this.Ary[idx].VerIdx; 		
    this.ArySaveOne(0);
	
    KjvBkListShow();
    KjvBkInfoShow();
    KjvChpListShow();
    KjvVerListShow();
}

Kjv.Bkmk.ListCopy = function (idx) {

	if (this.EditIdx)
		return;
	if (this.Ary.length >= (1+this.IdxMax))
		return;
    var obj=this.ObjCopy(0);
	if (idx==0){
		obj.Desc = "Copy of current position";
		this.Ary.push(obj);
		this.ArySaveAll();
	}
	else{
		obj.Desc = this.Ary[idx].Desc;
		this.Ary[idx] = obj;
		this.ArySaveOne(idx);
	}
    this.ListShow();	
}

Kjv.Bkmk.ListEdit = function (idx) {
    
	if (this.EditIdx)
		return;
    if (idx==0) 
		return;
	Kjv.Bkmk.EditShow(idx);
}

Kjv.Bkmk.ListTbCss = function () {

    var css_id = this.ListTbCssId  ;
	
	var css_txt = "";
    css_txt+="width: 100%;"; 
	css_txt+="background: #cacaca;";
	css_txt+="margin: 0;";
	css_txt+="box-sizing: border-box;";
    
	var style = document.createElement("style");
	style.id = css_id;
	style.innerHTML = sprintf(".%s{%s}",css_id ,css_txt);
	
	var style0 = document.getElementById(css_id);
	if (style0==null)
		document.head.appendChild(style);
	else
		document.head.replaceChild(style, style0);
		
	return css_id;
}
Kjv.Bkmk.ListTrGet = function (idx){

	var bkmk = this.Ary[idx];	
	var valid = this.ObjCheck(bkmk);
	var btn0,btn1;
	if (idx==0){
	    btn0="Back";
		btn1="Copy";
	}
	else{
	    btn0="Goto";
		btn1="Update";
	}
	var txt=sprintf('<td><button onclick="Kjv.Bkmk.ListGoto(%s)">%s</button>',Int2Str(idx),btn0) +
			sprintf('<button onclick="Kjv.Bkmk.ListCopy(%s)">%s</button></td>',Int2Str(idx),btn1) +
			sprintf('<td onclick="Kjv.Bkmk.ListEdit(%s)">%s</td>',idx,bkmk.Desc) +
			sprintf('<td onclick="Kjv.Bkmk.ListEdit(%s)">%s</td>',idx,bkmk.Res); 
			
	var tr = document.createElement('tr');	
    tr.id = this.MakeId("ListTr",idx);			
    tr.innerHTML = txt;
	
	return tr;
}
	
Kjv.Bkmk.ListShow = function (){
	//this.ListTbCss();
	
	var div = document.createElement('div');
    div.id = this.MakeId("ListDiv")
    var table = document.createElement('table');
    div.appendChild(table);
    //table.className = this.ListTbCssId;
    table.className = this.ListTbCss();
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);
    //table.style.border = "none";

	var tr;
	tr = document.createElement('tr');	
    tbody.appendChild(tr);
	tr.innerHTML = '<td>Actions</td><td>Description</td><td>Position</td>';

	var btn_ary=["Back","Copy","Goto","Update"];
	for (var i=0;i<this.Ary.length;i++){
		tr = this.ListTrGet(i);	
	    tbody.appendChild(tr);
	}
	
	ElementReplace(div);
}
//---------------------------------------------------------------------------
//Kjv.Bkmk.Edit
Kjv.Bkmk.EditIdx = 0;
Kjv.Bkmk.EditUpdn = function (tag, chg, obj) {

    switch (tag) {
    case 0:
        this.Edit.BkIdx += chg;
        break;
    case 1:
        this.Edit.ChpIdx += chg;
        break;
    case 2:
        this.Edit.VerIdx += chg;
        break;
    };
    Kjv.Bkmk.EditTxtUpd();
}
Kjv.Bkmk.EditKeyEnd = function(evt, tag, obj) {

	if (evt.keyCode != 13)
		return;

    switch(tag){
	case 0:
	    this.Edit.BkIdx = Str2Int(obj.value);
		break;
	case 1:
	    this.Edit.ChpIdx = Str2Int(obj.value);
		break;
	case 2:
	    this.Edit.VerIdx = Str2Int(obj.value);
		break;
	};
	
	Kjv.Bkmk.EditTxtUpd();
}
Kjv.Bkmk.EditResGet = function() {
	
	var bkmk=this.Edit;
	var res=null;
	var bk,chp,ver;
	if (res==null){
		if ((bkmk.BkIdx>=1)&&(bkmk.BkIdx<=66))
		    bk=Kjv.Bk.ObjGet(bkmk.BkIdx);
		else
			res=sprintf("[%s] out of book range 1~%s",Int2Str(bkmk.BkIdx),66);
	}
	if (res==null){
		if ((bkmk.ChpIdx>=1)&&(bkmk.ChpIdx<=bk.ChpNumInBk))		
			chp=Kjv.Chp.ObjGet(bk.ChpOffInAll+bkmk.ChpIdx);	
		else
			res=sprintf("Book: %s_%s, [%s] out of chapter range 1~%s",Int2Str(bkmk.BkIdx),bk.BkName,bkmk.ChpIdx,bk.ChpNumInBk);
	}
	if (res==null){
		if ((bkmk.VerIdx>=1)&&(bkmk.VerIdx<=chp.VerNumInChp))
			ver=Kjv.Ver.ObjGet(chp.VerOffInAll+bkmk.VerIdx);	
		else
			res=sprintf("Book: %s_%s, Chapter: %s, [%s] is out of verse range 1~%s",Int2Str(bkmk.BkIdx),bk.BkName,bkmk.ChpIdx,bkmk.VerIdx,chp.VerNumInChp);
	}
	if (res==null)
	    res=sprintf("%s_%s, %s:%s %s",Int2Str(bk.BkIdx),bk.BkName,chp.ChpIdxInBk,ver.VerIdxInChp,Kjv.Ver.EngFix(ver.VerText));

	return res;
}
Kjv.Bkmk.EditTxtUpd = function() {
    
	var id;
	var id_hd="Edit";
	id=this.MakeId(id_hd+"BkBox");
	document.getElementById(id).value =Int2Str(this.Edit.BkIdx);
	id=this.MakeId(id_hd+"ChpBox");
	document.getElementById(id).value =Int2Str(this.Edit.ChpIdx);	
	id=this.MakeId(id_hd+"VerBox");
	document.getElementById(id).value =Int2Str(this.Edit.VerIdx);	
	id=this.MakeId(id_hd+"Res");
    document.getElementById(id).innerHTML = this.EditResGet();
}
Kjv.Bkmk.EditShow = function (idx){
    
	var id_hd="Edit";
	//this.ListTbCss();
	this.Edit = this.ObjCopy(idx);
	this.EditIdx = idx;
	var bkmk=this.Edit;	
	var txt;
	var div = document.createElement('div');
    div.id = this.MakeId("EditDiv");
	div.className = this.ListTbCss();

	var div_1 = document.createElement('div');
	div.appendChild(div_1);
	txt = sprintf('<span>Description: </span><input type="text" id="%s" value="%s" size="50" maxlength=255><br>', this.MakeId("EditDesc"), bkmk.Desc); 
    div_1.innerHTML= txt;
    //Table		
    var table = document.createElement('table');
    div.appendChild(table);
    //table.className = this.ListTbCssId;
    //table.className = this.ListTbCss();
    var tbody = document.createElement('tbody');
    table.appendChild(tbody);		
	//Row 
	var tr,td;
	tr = document.createElement('tr');	
	tbody.appendChild(tr);
    var hd_ary=["Book","Chapter","Verse"];		
	for (var j=0;j<hd_ary.length;j++){
		td = document.createElement('td');
		tr.appendChild(td);			
		td.innerHTML = hd_ary[j];
	}	
	//Row 
	tr = document.createElement('tr');	
	tbody.appendChild(tr);
	var id_ary=["Bk","Chp","Ver"];
	var idx_ary=[bkmk.BkIdx,bkmk.ChpIdx,bkmk.VerIdx];	
	for (var i=0;i<hd_ary.length;i++){
		td = document.createElement('td');
        tr.appendChild(td);
	    var id=id_hd+id_ary[i];
		txt=sprintf('<button id="%s" onclick="Kjv.Bkmk.EditUpdn(%s,-1,this)"> &laquo; </button>', this.MakeId(id+"Dn"), i) +
			sprintf('<input type="text" id="%s" value="%s" size="3" maxlength="3" onkeypress="Kjv.Bkmk.EditKeyEnd(event,%s,this)" >',
				this.MakeId(id+"Box"),Int2Str(idx_ary[i]), i) +
			sprintf('<button id="%s" onclick="Kjv.Bkmk.EditUpdn(%s,1,this)"> &raquo; </button>', this.MakeId(id + "Up"), i);
		td.innerHTML = txt;
	}

	var div_3 = document.createElement('div');
	div.appendChild(div_3);
	txt = sprintf('<span id="%s">%s</span><br><br>',this.MakeId("EditRes"),this.EditResGet()) +
		sprintf('<input type="checkbox" id="%s" > Submit will delete this bookmark.<br>',this.MakeId("EditDel")) +
		sprintf('<button id="%s" onclick="Kjv.Bkmk.EditExit(1)"> Submit </button>', this.MakeId(id_hd+"Ok")) +
		sprintf('<button id="%s" onclick="Kjv.Bkmk.EditExit(0)"> Cancel </button>', this.MakeId(id_hd+"Ng"));
    div_3.innerHTML= txt;
		
    ElementReplace(div);			
}
Kjv.Bkmk.EditExitClr = function (){

	this.EditIdx = 0;
	ElementEmpty(this.MakeId("EditDiv"));
	this.ListShow();
}
Kjv.Bkmk.EditExit = function(chg) {
	
	if (chg==0){
		this.EditExitClr();
		return;
	}

	var bkmk = this.Edit;
	var idx = this.EditIdx;
	var del_box = document.getElementById(this.MakeId("Edit"+"Del"));
	if (del_box.checked){
		this.Ary.splice(idx, 1);
		this.ArySaveAll();
		this.EditExitClr();
		return;
	}

	var desc_box = document.getElementById(this.MakeId("Edit"+"Desc"));	
	this.Ary[idx].Desc = desc_box.value;
	this.Ary[idx].BkIdx = bkmk.BkIdx;	
	this.Ary[idx].ChpIdx = bkmk.ChpIdx;		
	this.Ary[idx].VerIdx = bkmk.VerIdx;			
    this.ArySaveOne(idx);
	this.EditExitClr();
}
function KjvBkIdx2Tag(bk_idx) {

    return sprintf("%s%s", "KjvBk", PadInt(bk_idx, 10, 2));
}
function KjvTag2BkIdx(tag) {

    return parseInt(StrSub(tag,5, 2));
}
function KjvChpIdx2Tag(chp_idx) {

    return sprintf("%s%s", "KjvChp", PadInt(chp_idx, 10, 3));
}
function KjvTag2ChpIdx(tag) {

    return parseInt(StrSub(tag, 6, 3));
}
function KjvVerIdx2Tag(chp_idx) {

    return sprintf("%s%s", "KjvVer", PadInt(chp_idx, 10, 3));
}
function KjvTag2VerIdx(tag) {

    return parseInt(StrSub(tag, 6, 3));
}

function KjvBkClick() {
    var bk_idx = KjvTag2BkIdx(this.id);
    if (bk_idx == Kjv.Bkmk.Ary[0].BkIdx) 
        return;

    var bk_node = document.getElementById(KjvBkIdx2Tag(Kjv.Bkmk.Ary[0].BkIdx));
    bk_node.style.fontWeight = "normal";
    this.style.fontWeight = "bolder";
    Kjv.Bkmk.Ary[0].BkIdx = bk_idx;
    Kjv.Bkmk.Ary[0].ChpIdx = 1;
    Kjv.Bkmk.Ary[0].VerIdx = 1;
    Kjv.Bkmk.ArySaveOne(0);
	
    KjvBkInfoShow();
    KjvChpListShow();
    KjvVerListShow();
}
function KjvBkListShow() {

    var div = document.createElement("div");
    div.id ="BkListDiv";

    var tb = document.createElement("table");
    div.appendChild(tb);
    tb.style.border = "none";
    var bk_idx = 1;
    var bk_obj;
    for (var i = 0; i < KjvCatMapAry.length; i += 2) {
        var tr = document.createElement("tr");
        tb.appendChild(tr);

        var td0 = document.createElement("td");
        tr.appendChild(td0);
        var txt = sprintf("%s:", KjvCatMapAry[i]);
        td0.innerHTML = txt;
        td0.style.verticalAlign = "Top";
        td0.style.color = KjvCatNameColor;

        var td1 = document.createElement("td");
        tr.appendChild(td1);
        td1.style.verticalAlign = "Top";

        var ul = document.createElement('ul');
        td1.appendChild(ul);
        ul.style.listStyle = "none";
        ul.style.width = "auto";
        ul.style.margin = "0em";
        ul.style.padding = "0em"; 
        for (var j = 0; j < KjvCatMapAry[i + 1]; j++) {
            var li = document.createElement('li');
            ul.appendChild(li);
            bk_obj=Kjv.Bk.ObjGet(bk_idx, KjvBkMapAry);
            bk_idx++;
            var txt = sprintf("%s. %s", PadInt(bk_obj.BkIdx), StrCap(bk_obj.BkName));
            li.innerHTML = txt;
            li.id = sprintf("%s%s", "KjvBk", PadInt(bk_obj.BkIdx, 10, 2));
            li.onclick = KjvBkClick;
            li.addEventListener("mouseenter", KjvMouseEnter);
            li.addEventListener("mouseleave", KjvMouseLeave);

            if (bk_obj.BkIdx == Kjv.Bkmk.Ary[0].BkIdx)
                li.style.fontWeight = "bolder";
            else
                li.style.fontWeight = "normal";
            li.style.display = "inline-block";
            li.style.padding = "0.0em 0.5em 0.0em 0.5em";
            li.style.color = KjvBkNameColor;
            //li.setAttribute("BkIdx", bk_obj.BkIdx); // 
        };//li->ul
    };

    ElementReplace(div);
}
function KjvChpClick() {

    var chp_idx = KjvTag2ChpIdx(this.id);
    if (chp_idx == Kjv.Bkmk.Ary[0].ChpIdx)
        return;

    var bk_node = document.getElementById(KjvChpIdx2Tag(Kjv.Bkmk.Ary[0].ChpIdx));
    bk_node.style.fontWeight = "normal";
    this.style.fontWeight = "bolder";
    Kjv.Bkmk.Ary[0].ChpIdx = chp_idx;
    Kjv.Bkmk.Ary[0].VerIdx = 1;
    Kjv.Bkmk.ArySaveOne(0);
	
    KjvVerListShow();
}
function KjvBkInfoShow() {

    var bk_obj = Kjv.Bk.ObjGet(Kjv.Bkmk.Ary[0].BkIdx, KjvBkMapAry);

    var div = document.createElement('div');
    div.id = "BkNameDiv";
    var p = document.createElement('p');
    div.appendChild(p);
    var txt = sprintf("Book No.: %s, Name: %s, Chapter(s): %s.", PadInt(bk_obj.BkIdx, 10), StrCap(bk_obj.BkName), PadInt(bk_obj.ChpNumInBk, 10));
    p.innerHTML = txt;
    p.style.color = KjvBkDescColor;

    var div0 = document.getElementById("BkNameDiv");
    div0.parentElement.replaceChild(div, div0);

    if (Kjv.Bkmk.Ary[0].ChpIdx <= 0)
        Kjv.Bkmk.Ary[0].ChpIdx = 1;
    if (Kjv.Bkmk.Ary[0].ChpIdx > bk_obj.ChpNumInBk)
        Kjv.Bkmk.Ary[0].ChpIdx = bk_obj.ChpNumInBk;

}
function KjvChpListShow() {

    var bk_obj = Kjv.Bk.ObjGet(Kjv.Bkmk.Ary[0].BkIdx, KjvBkMapAry);

    var div = document.createElement('div');
    div.id = "BkChpListDiv";
    var ul = document.createElement('ul');
    div.appendChild(ul);
    ul.style.listStyle = "none";
    ul.style.width = "auto";
    ul.style.margin = "0em";
    ul.style.padding = "0em";

    //Kjv.Bkmk.Ary[0].ChpIdx = 1;
    var num = bk_obj.ChpNumInBk;
    for (var i = 0; i < num; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
        var chp_idx = i + 1;
        var txt = PadInt(chp_idx,10,3);
        li.innerHTML = txt;
        li.id = KjvChpIdx2Tag(chp_idx);
        li.onclick = KjvChpClick;
        li.addEventListener("mouseenter", KjvMouseEnter);
        li.addEventListener("mouseleave", KjvMouseLeave);

        li.style.display = "inline-block"; 
        li.style.padding = " 0em 0.25em 0em 0.25em";
        li.style.color = KjvChpNumColor;
        if (chp_idx == Kjv.Bkmk.Ary[0].ChpIdx)
            li.style.fontWeight = "bolder";
        else
            li.style.fontWeight = "normal";
    }//li->ul

    var div0 = document.getElementById("BkChpListDiv");
    div0.parentElement.replaceChild(div, div0);
}

function KjvVerListShow(){

    var bk_obj = Kjv.Bk.ObjGet(Kjv.Bkmk.Ary[0].BkIdx, KjvBkMapAry);
    var chp_obj = Kjv.Chp.ObjGet(bk_obj.ChpOffInAll + Kjv.Bkmk.Ary[0].ChpIdx, KjvChpMapAry);

    var div = document.createElement('div');
    div.id = "KjvVerListDiv";
    var table = document.createElement('TABLE');
    div.appendChild(table);
    var tbody = document.createElement('TBODY');
    table.appendChild(tbody);
    table.style.border = "none";

    var ver;
    var tr = document.createElement('TR');
    tbody.appendChild(tr);

	if (bk_obj.BkBrf=="PSA"){
	    for (var i=0;i<KjvPsaSubMapAry.length;i+=2){
		    if (chp_obj.ChpIdxInBk!=KjvPsaSubMapAry[i])
			    continue;
			tr = document.createElement('TR');
			tbody.appendChild(tr);
			tr.innerHTML = sprintf('<td colspan="2">%s</td>',KjvPsaSubMapAry[i+1]);
			break;
		}
	}
	
    for (var i = 0; i < chp_obj.VerNumInChp; i++) {

		if ((bk_obj.BkBrf=="PSA")&&(chp_obj.ChpIdxInBk==119)&&((i%8)==0)){
			tr = document.createElement('TR');
			tbody.appendChild(tr);
			tr.innerHTML = sprintf('<td colspan="2">%s</td>',KjvPsa119SubMapAry[i/8]);
		}

        for (var j = 0; j < 2; j++) {
			var txt;
            switch (j) {
                case 0:
                    ver=Kjv.Ver.ObjGet(chp_obj.VerOffInAll + i + 1, KjvVerMapAry);
                    txt = Kjv.Ver.EngFix(ver.VerText);
                    break;
                case 1:
                    ver=Kjv.Ver.ObjGet(chp_obj.VerOffInAll + i + 1, KjvVerGb2FixMapAry);
					txt = Kjv.Ver.EngFix(ver.VerText);
                    break;
            }//case
			
            tr = document.createElement('TR');
            tbody.appendChild(tr);
            if (j == 0) {
                tr.id = KjvVerIdx2Tag(ver.VerIdxInChp);
                tr.onclick = KjvVerClick;
                if (ver.VerIdxInChp == Kjv.Bkmk.Ary[0].VerIdx) {
                    tr.style.color = KjvVerSetColor;
                    tr.style.fontWeight = "bolder";
                }
            }

            
            var td0 = document.createElement('TD');
            tr.appendChild(td0);
            td0.innerHTML = sprintf("%s:%s", ver.ChpIdxInBk, ver.VerIdxInChp);
            td0.style.verticalAlign = "Top";
            var td1 = document.createElement('TD');
            tr.appendChild(td1);
            td1.innerHTML = txt;
            td1.style.verticalAlign = "Top";
        }//j
    }//i  
    Kjv.Bkmk.Ary[0].VerMax = chp_obj.VerNumInChp;
    var div0 = document.getElementById("KjvVerListDiv");//KjvParsePce();
    div0.parentElement.replaceChild(div, div0);
}
function KjvVerSet(ver_idx) {
    if (ver_idx <= 0) 
        ver_idx = 1;
    if (ver_idx > Kjv.Bkmk.Ary[0].VerMax)
        ver_idx = Kjv.Bkmk.Ary[0].VerMax;

	if (ver_idx == Kjv.Bkmk.Ary[0].VerIdx)
		return;
		
    var node0 = document.getElementById(KjvVerIdx2Tag(Kjv.Bkmk.Ary[0].VerIdx));
    node0.style.color = "black";
    node0.style.fontWeight = "normal";
    var node1 = document.getElementById(KjvVerIdx2Tag(ver_idx));
    node1.style.color = KjvVerSetColor;
    node1.style.fontWeight = "bolder";
    Kjv.Bkmk.Ary[0].VerIdx = ver_idx;
	Kjv.Bkmk.ArySaveOne(0);
	
    if (isScrolledIntoView(node1) == false)
        node1.scrollIntoView();
}
function VerUpdn(cnt) {
    var ver_idx = Kjv.Bkmk.Ary[0].VerIdx + cnt;
    KjvVerSet(ver_idx);
}
function KjvVerClick() {

    var ver_idx = KjvTag2VerIdx(this.id);
    KjvVerSet(ver_idx);
}
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
//http://www.ssiddique.info/jquery-and-editable-html-table.html
//http://psoug.org/snippet/Javascript-Click-to-edit-Table-Cell_121.htm
//http://www.vanseodesign.com/css/tables/
//http://www.freshdesignweb.com/free-css-tables.html
//http://www.codeproject.com/Tips/170049/Pure-HTML-CSS-Modal-Dialog-Box-no-JavaScript //z_order
//http://adactio.com/journal/4780/   //Table auto adjust to screen size
//http://demosthenes.info/blog/554/Build-An-Accessible-HTML-Table
//http://www.webcodingtech.com/javascript/spinner.php
//<button onclik="fun(this)"> : button.onclick=fun;
//http://www.quirksmode.org/js/this.html
//various info of input
//http://www.w3.org/TR/html-markup/input.number.html#input.number
//Special symbols
//http://www.degraeve.com/reference/specialcharacters.php
//Popup
//http://www.pat-burt.com/web-development/how-to-do-a-css-popup-without-opening-a-new-window/