var MsgListEnum=new Enum(["Idx", "Title", "Author", "State", "DtNew", "DtFix", "DtShow", "ClkNum", "Max"]);

var MsgListAry=
[//idx, title, author, state, created dt, modified dt, published dt, clicked numbers, 
1, "ABRAHAM THE FRIEND OF GOD", "Daniel K", "on", "2014-09-09T13:27:00-08:00", "2014-09-09T13:27:00-08:00", "2014-09-09T13:27:00-08:00", 0,
2, "A MESSAGE FROM GOD", "Daniel K", "on", "2014-09-09T16:15:00-08:00", "2014-09-09T16:15:00-08:00", "2014-09-09T16:15:00-08:00", 0,
3, "ANGEL MORPHIET AND ANGEL DARIUS", "Daniel K", "on", "2014-10-05T08:23:00-08:00", "2014-10-05T08:23:00-08:00", "2014-10-05T08:23:00-08:00", 0,
4, "THE 182 SPIRIT", "Daniel K", "on", "2014-10-08T08:12:00-08:00", "2014-10-08T08:12:00-08:00", "2014-10-08T08:12:00-08:00", 0,
5, "A MESSAGE FROM THE LORD OF HOSTS", "Daniel K", "on", "2014-10-25T06:03:00-08:00", "2014-10-25T06:03:00-08:00", "2014-10-25T06:03:00-08:00", 0,
6, "GOD THUNDERS", "Daniel K", "on", "2014-10-29T08:18:00-08:00", "2014-10-29T08:18:00-08:00", "2014-10-29T08:18:00-08:00", 0,
7, "IS THERE AN ANGEL OF DEATH?", "Daniel K", "on", "2014-11-07T11:47:00-08:00", "2014-11-07T11:47:00-08:00", "2014-11-07T11:47:00-08:00", 0,
8, "MESSAGE FROM THE LORD ON THE DAY OF TRUMPETS", "Daniel K", "on", "2014-11-18T06:46:00-08:00", "2014-11-18T06:46:00-08:00", "2014-11-18T06:46:00-08:00", 0,
9, "THE THREE ARKS OF GOD", "Daniel K", "on", "2014-11-22T04:29:00-08:00", "2014-11-22T04:29:00-08:00", "2014-11-22T04:29:00-08:00", 0,
10, "ED -THE GREAT AND MIGHTY SERVANT OF GOD", "Daniel K", "on", "2014-12-07T07:02:00-08:00", "2014-12-07T07:02:00-08:00", "2014-12-07T07:02:00-08:00", 0,
11, "PRAISE AND WORSHIP THROUGH SONG", "Daniel K", "on", "2014-09-09T09:59:00-08:00", "2014-09-09T09:59:00-08:00", "2014-09-09T09:59:00-08:00", 0,
12, "THE LORD SPEAKS TO CHILDREN", "Daniel K", "on", "2014-12-15T14:30:00-08:00", "2014-12-15T14:30:00-08:00", "2014-12-15T14:30:00-08:00", 0,
13, "OPPORTUNITY TO ASK QUESTION ABOUT HELL", "Daniel K", "on", "2014-12-18T07:36:00-08:00", "2014-12-18T07:36:00-08:00", "2014-12-18T07:36:00-08:00", 0,
14, "HELL (PART ONE)", "Daniel K", "on", "2014-12-21T07:04:00-08:00", "2014-12-21T07:04:00-08:00", "2014-12-21T07:04:00-08:00", 0,
15, "DOES FASTING SERVE ANY PURPOSE", "Daniel K", "on", "2014-09-09T12:05:00-08:00", "2014-09-09T12:05:00-08:00", "2014-09-09T12:05:00-08:00", 0,
16, "HELL (PART TWO)", "Daniel K", "on", "2014-12-22T05:41:00-08:00", "2014-12-22T05:41:00-08:00", "2014-12-22T05:41:00-08:00", 0,
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
		td.innerHTML = '<a href="1.html">'+MsgListAry[off+MsgListEnum.Title]+'</a>';
		td.style=this.TdTitleCss.CssGet();

		td=tr.insertCell(-1);
		td.style=this.TdGapCss.CssGet();
		
		td=tr.insertCell(-1);
		var date=new Date(MsgListAry[off+MsgListEnum.DtShow]);
		td.innerHTML = date.toLocaleString() ; //date.toString();
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