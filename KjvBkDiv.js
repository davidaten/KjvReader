var KjvCatMapAry = [
    "Law", 5, "History", 12, "Poetry/Wisdom", 5, "Major Prophets", 5, "Minor Prophets", 12,
    "Gospels", 4, "History", 1, "Paul's Letters", 14, "Other Letters", 7, "Prophecy", 1
];


var KjvBkInit = function(idx)
{
   	var off = (idx - 1) * 5;
	this.BkIdx = KjvBkListAry[off + 0];
	this.BkBrf = KjvBkListAry[off + 1];
	this.BkName = KjvBkListAry[off + 2];
	this.ChpOffInAll = KjvBkListAry[off + 3];
	this.ChpNumInBk = KjvBkListAry[off + 4];
}	

KjvBkDiv= function()
{

	var bk_idx = 1;
	var tree_l1 = new DwxUiTree();
	//First level: old and new testaments.
	for (var l1 = 0; l1 < 2;l1 ++)
	{
		if (l1 == 0) 
			tree_l1.NodeAdd(-1, "T-0", "Old Testament");
		else
			tree_l1.NodeAdd(-1, "T-1", "New Testament");

		var tree_l2 = new DwxUiTree();
		var c_off = l1*10;
		//Each first level has 5 catelogs.
		for (var l2 = 0 ; l2 < 10 ; l2+=2) 
		{
			tree_l2.NodeAdd(-1, sprintf("C-%s", (c_off + l2) / 2), KjvCatMapAry[c_off + l2]);
			var tree_l3 = new DwxUiTree();
			//tree_l3.DirX = 1;
			//tree_l3.SubSignOn = 0;
			for (var l3 = 0; l3 < KjvCatMapAry[c_off + l2 + 1]; l3++) {
				var bk_obj = new KjvBkInit(bk_idx);
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
	tree_l1.DivMake();
	document.body.appendChild(tree_l1.WrapDiv);
}