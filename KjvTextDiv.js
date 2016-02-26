//http://www.redips.net/javascript/adding-table-rows-and-columns/
var KjvTextDiv = function (bk_obj,chp_obj) 
{
      
        //this.WrapDiv = document.createElement('div');
        //this.HeadDivMake(bk_obj,chp_obj);

        var tb = document.createElement('tb');
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