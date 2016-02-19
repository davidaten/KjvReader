// JavaScript source code
function ElementWalk(node, cb_obj) {

    if (node.nodeType == 1) {

        cb_obj.CbFun(cb_obj.CbObj, cb_obj.CbTag, node);

        node = node.firstChild;
        while (node) {
            ElementWalk(node, cb_obj);
            node = node.nextSibling;
        }
    }
}

function Enum(ary) 
{
	for (var i=0; i<ary.length; i++) 
	{
		var name = ary[i];
		this[name] = i;
	}
}

function DwxCssAry()
 {
    this.CssAry = [];
	this.AttSet = function(attstr) 
	{
		attstr.replace(";","");
		var att_ary=attstr.split(":");
		if (att_ary.length!=2)
			throw "DwxCssAry error";
		att_ary[0]=att_ary[0].trim();
		att_ary[1]=att_ary[1].trim();		

        for (var i = 0; i < this.CssAry.length; i += 2) {
            if (this.CssAry [i] !=att_ary[0])
                continue;
            this.CssAry[i + 1] = att_ary[1];
            return 1;
        }
         this.CssAry.push(att_ary[0]);
        this.CssAry.push(att_ary[1]);
        return 0;
	}
    this.CssGet = function () {
        var str = "";
        for (var i = 0; i < this.CssAry.length; i += 2) {
            str += this.CssAry[i];
            str += ":";
            str += this.CssAry[i + 1];
            str += ";";
        }
        return str;
    }
}
	

function DwxUiDiv()
 {
    this.WrapDiv = null;
    this.CssAttAry = [];
	this.AttAdd = function(attstr) 
	{
		attstr.replace(";","");
		var att_ary=att.split(":");
		if (att_ary.length!=2)
			throw "DwxCssAry error";
		att_ary[0]=att_ary[0].trim();
		att_ary[1]=att_ary[1].trim();		
        name = name.trim();
        value = value.trim();
        for (var i = 0; i < this.CssAttAry.length; i += 2) {
            if (CssAttAry [i] !=att_ary[0])
                continue;
            CssAttAry[i + 1] = att_ary[1];
            return 1;
        }
        CssAttAry.push(att_ary[0]);
        CssAttAry.push(att_ary[1]);
        return 0;
	}
    this.CssAttSet = function (name, value) {
        //str.replace(/^\s+|\s+$/g, '');
        name = name.trim();
        value = value.trim();
        for (var i = 0; i < this.CssAttAry.length; i += 2) {
            if (this.CssAttAry[i] != name)
                continue;
            this.CssAttAry[i + 1] = value;
            return 1;
        }
        this.CssAttAry.push(name);
        this.CssAttAry.push(value);
        return 0;
    }
    this.CssStrGet = function () {
        var str = "";
        for (var i = 0; i < this.CssAttAry.length; i += 2) {
            str += this.CssAttAry[i];
            str += ":";
            str += this.CssAttAry[i + 1];
            str += ";";
        }
        return str;
    }
    this.Show = function (on_off) {
        if (on_off == 0) {
            this.ShowSaved = [];
            this.ShowSaved.push(this.WrapDiv.style.position);
            this.ShowSaved.push(this.WrapDiv.style.top);
            this.ShowSaved.push(this.WrapDiv.style.left);
            this.WrapDiv.style.position = "fixed";
            this.WrapDiv.style.top = "-9999px";
            this.WrapDiv.style.left = "-9999px";
        }
        else {
            if (!this.ShowSaved)
                return;
            this.WrapDiv.style.position = this.ShowSaved[0];
            this.WrapDiv.style.top = this.ShowSaved[1];
            this.WrapDiv.style.left = this.ShowSaved[2];
            delete this.ShowSaved;
        }
    }
}
