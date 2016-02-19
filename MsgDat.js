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
	this.TrCss=new DwxCssAry();
	this.TrCss.AttSet("border-bottom: 1px solid rgb(224,228,233)");
	this.TdTitleCss=new DwxCssAry();
	this.TdTitleCss.AttSet("color: #0000ff");
 
	 var tb,tr,td;
	 tb = document.createElement('table');
	 for (var i=0; i<3;i++)
	 {
		tr=tb.insertRow(-1);
		tr.style=this.TrCss.CssGet();
		
		td=tr.insertCell(-1);
		td.innerHTML = Int2Str(i+1,10, 0);

		var off=i*MsgListEnum.Max;
		td=tr.insertCell(-1);
		td.innerHTML = MsgListAry[off+MsgListEnum.Title];
		td.style=this.TdTitleCss.CssGet();

		td=tr.insertCell(-1);
		td.innerHTML = MsgListAry[off+MsgListEnum.DtShow];

		td=tr.insertCell(-1);
		td.innerHTML = MsgListAry[off+MsgListEnum.Auther];
	}
	
	this.WrapDiv=tb;
}

function MsgListDemo()
{
	var Msg=new MsgList();
	document.body.appendChild(Msg.WrapDiv);
}