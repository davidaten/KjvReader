var MsgListEnum=new Enum(["Idx", "Title", "Author", "State", "DtNew", "DtFix", "DtShow", "ClkNum", "Max"]);

var MsgListAry=
[//idx, title, author, state, created dt, modified dt, published dt, clicked numbers, 
1, "ABRAHAM THE FRIEND OF GOD", "Daniel K", "on", "2014-02-01T09:28:56.321-10:00", "2014-02-01T09:28:56.321-10:00", "2014-02-01T09:28:56.321-10:00", 0,
2, "ABRAHAM THE FRIEND OF GOD", "Daniel K", "on", "2014-02-01T09:28:56.321-10:00", "2014-02-01T09:28:56.321-10:00", "2014-02-01T09:28:56.321-10:00", 0,
3, "ABRAHAM THE FRIEND OF GOD", "Daniel K", "on", "2014-02-01T09:28:56.321-10:00", "2014-02-01T09:28:56.321-10:00", "2014-02-01T09:28:56.321-10:00", 0
];
// date=new Date("2014-02-01T09:28:56.321-10:00");
// date.toISOString()="2016-02-12T03:46:22.870Z" missing zone info
function DateToZiso (date)
{
	if (arguments.length==0)
		date=new Date();
	
	var date_str=sprintf("%s-%s-%sT%s:%s:%s%s%s",
		Int2Str(date.getFullYear(), 10, 4),
		Int2Str(date.getMonth()+1, 10, 2),
		Int2Str(date.getDate(), 10, 2));
	var time_str=sprintf("T%s:%s:%s",
		Int2Str(date.getHours(), 10, 2),
		Int2Str(date.getMinutes(), 10, 2),
		Int2Str(date.getSeconds(), 10, 2));
	var zdm=date.getTimezoneOffset;
	if (zdm<0)
		zdm_sign="+";
	{
		zdm_sign="-";
		zdm=-zdm;
	}
	var zdm_str=sprintf("%s%s:%s", zdm_sign, zdm/60, zdm%60);
	var str=date_str+"T"+time_str + zdm_str;
	return str;
}

function MsgList ()
{
	this.TbCss=new DwxCssAry();
	this.TbCss.AttSet("color: rgb(116,116,116)");
	this.TbCss.AttSet("line-height: 30px");
	this.TbCss.AttSet("border-collapse: collapse");//Important: it is needed to style tr border.
	this.TrCss=new DwxCssAry();
	this.TrCss.AttSet("border-bottom: 1px solid rgb(224,228,233)");
	this.TdTitleCss=new DwxCssAry();
	this.TdTitleCss.AttSet("font-weight: bold");
	this.TdTitleCss.AttSet("color: #0000ff");
	this.TdGapCss=new DwxCssAry();
	this.TdGapCss.AttSet("width: 30px");
	
	
	 var tb,tr,td;
	 tb = document.createElement('table');
	 tb.style=this.TbCss.CssGet();
	 for (var i=0; i<3;i++)
	 {
		var off=i*MsgListEnum.Max;
		
		tr=tb.insertRow(-1);
		tr.style=this.TrCss.CssGet();
		
		td=tr.insertCell(-1);
		td.style=this.TdGapCss.CssGet();
		
		td=tr.insertCell(-1);
		td.innerHTML = Int2Str(i+1,10, 0);

		td=tr.insertCell(-1);
		td.style=this.TdGapCss.CssGet();
		
		td=tr.insertCell(-1);
		td.innerHTML = MsgListAry[off+MsgListEnum.Title];
		td.style=this.TdTitleCss.CssGet();

		td=tr.insertCell(-1);
		td.style=this.TdGapCss.CssGet();
		
		td=tr.insertCell(-1);
		td.innerHTML = MsgListAry[off+MsgListEnum.DtShow];
		td.style="font-weight: bold;color: rgb(46, 50, 54)";
		
		td=tr.insertCell(-1);
		td.style=this.TdGapCss.CssGet();
		
		td=tr.insertCell(-1);
		td.innerHTML = MsgListAry[off+MsgListEnum.Author];

		td=tr.insertCell(-1);
		td.style=this.TdGapCss.CssGet();		
	}
	
	this.WrapDiv=tb;
}

function MsgListDemo()
{
	var Msg=new MsgList();
	document.body.appendChild(Msg.WrapDiv);
}