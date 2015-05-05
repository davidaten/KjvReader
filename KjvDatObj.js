var Kjv = {};
//In the bellow codes, rules are applied: 
//Idx=1~n, Off=0~n-1; 
//---------------------------------------------------------------------------
//Book
Kjv.Bk = {}; 
Kjv.Bk.MapAryDesc = "//BkIdx, BkBrf, BkName, ChpOffInAll, ChpNumInBk.";
Kjv.Bk.ObjInit = function(){
    var obj = {};
	obj.BkIdx = 0;
	obj.ChpOffInAll = 0;
	obj.ChpNumInBk = 0;
	return obj;	
}
Kjv.Bk.MapAryGet = function (bk) {
    return sprintf('%s,"%s","%s",%s, %s', bk.BkIdx, bk.BkBrf, bk.BkName, bk.ChpOffInAll, bk.ChpNumInBk);
}
Kjv.Bk.ObjMake = function (idx,ary){

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
//---------------------------------------------------------------------------
//Chapter
Kjv.Chp = {};
Kjv.Chp.MapAryDesc = "//ChpIdxInAll, BkBrf, ChpIdxInBk, VerOffInAll, VerNumInChp.";
Kjv.Chp.ObjInit = function(){
   	var obj = {};
	obj.ChpIdxInAll = 0;
	obj.ChpIdxInBk = 0;
	obj.VerOffInAll = 0;
	obj.VerNumInChp = 0;
	return obj;	
}
Kjv.Chp.MapAryGet = function (chp) {
    return sprintf('%s,"%s",%s,%s,%s', chp.ChpOffInAll + 1, chp.BkBrf, chp.ChpIdxInBk, chp.VerOffInAll, chp.VerNumInChp);
};
Kjv.Chp.ObjMake = function (idx){
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
//---------------------------------------------------------------------------
//Verse
Kjv.Ver = {};
Kjv.Ver.MapAryDesc = "//VerIdxInAll, BkBrf, ChpIdxInBk, VerIdxInChp, VerText.";
Kjv.Ver.Init = function(){
	var obj = {};
	obj.VerIdxInAll = 0;
	obj.ChpIdxInBk = 0;
	obj.VerIdxInChp = 0;
	return obj;	
}
Kjv.Ver.MapAryGet = function (ver) {
    return sprintf('%s,"%s",%s,%s,"%s"', ver.VerOffInAll + 1, ver.BkBrf, ver.ChpIdxInBk, ver.VerIdxInChp, ver.VerText);
};
Kjv.Ver.ObjMake = function (idx,ary){

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
var KjvPsa119SubMapAry = [
"א ALEPH", "ב BETH", "ג GIMEL", "ד DALETH", "ה HE", "ו VAU", "ז ZAIN","ח CHETH", "ט TETH", "י JOD", "כ CAPH", 
"ל LAMED", "מ MEM", "נ NUN", "ס SAMECH", "ע AIN", "פ PE", "צ TZADDI", "ק KOPH", "ר RESH", "ש SCHIN", "ת TAU"
];
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