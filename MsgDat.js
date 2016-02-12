var MsgList=[
1, "ABRAHAM THE FRIEND OF GOD", "Daniel K", "2014-02-01T09:28:56.321-10:00", "2014-02-01T09:28:56.321-10:00"
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
	
}