
var KjvChpInit = function(idx)
{
	var off = (idx - 1) * 5;
	this.ChpIdxInAll =  KjvChpListAry[off + 0];
	this.BkBrf =  KjvChpListAry[off + 1];
	this.ChpIdxInBk =  KjvChpListAry[off + 2];
	this.VerOffInAll =  KjvChpListAry[off + 3];
	this.VerNumInChp =  KjvChpListAry[off + 4];
}	

KjvChpDiv= function(bk_obj)
{
	var tree_l1 = new DwxUiTree();
	tree_l1.ChkSignOn = 0;
	var l1_num=parseInt(bk_obj.ChpNumInBk/10);
	if (bk_obj.ChpNumInBk%10)
		l1_num++;
	//First level: old and new testaments.
	for (var l1 = 0; l1 < l1_num; l1++)
	{
		var c1=l1*10+1;
		var c2=l1*10+10;
		if (c2>bk_obj.ChpNumInBk)
			c2=bk_obj.ChpNumInBk;
		tree_l1.NodeAdd(-1, sprintf("T-%s", c1), sprintf("%s~%s", c1, c2) );
		if (l1==0)
			tree_l1.NodeAry[l1].SubStat = 1; //Show sublist 
		else
			tree_l1.NodeAry[l1].SubStat = 0; //Hide sublist
		
		var tree_l2 = new DwxUiTree();
		tree_l1.NodeSubSet(l1, tree_l2);
		tree_l2.ChkSignOn = 0;
		var l2_num=c2-c1+1;
		//Each first level has 5 catelogs.
		for (var l2 = 0; l2 < l2_num; l2++) 
		{
			tree_l2.NodeAdd(-1, sprintf("C-%s", c1+l2), c1+l2);
			//tree_l2.NodeAry[l2].SubStat = 1; //Packed
		}
	}
	
	tree_l1.PreMake();
	tree_l1.DivMake();
	document.body.appendChild(tree_l1.WrapDiv);
}