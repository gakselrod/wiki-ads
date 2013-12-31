function insertAndExecute(el, markup) {

    var sOld, sNew, scripts;
    var s;
//    var el = document.getElementById(id);

    if (el) {
        s = document.createElement('script');
        el.innerHTML = markup;
        scripts = el.getElementsByTagName('script');

        for (var i=0, iLen=scripts.length; i<iLen; i++) {
            sOld = scripts[i];
            sNew = s.cloneNode(true);
            sNew.type = sOld.type;

            if (sOld.src) {
                sNew.src = sOld.src;
            } else {
                sNew.text = sOld.text;
            }
            sOld.parentNode.replaceChild(sNew, sOld);
        }
    }
}
//$(document).ready(function() {
    var docWrite="    document.write = function(str) {"+
    " console.log(str);"+
    "    var moz = !window.opera && !/Apple/.test(navigator.vendor);"+
    "    if (str.match(/^<\\//))"+
    "        return;"+
    "    if (!window.opera)"+
    "        str = str.replace(/&(?![#a-z0-9]+;)/g, \"&amp;\");"+
    "    str = str.replace(/<([a-z]+)(.*[^\\/])>$/, \"<$1$2></$1>\");"+
    "    if (!moz)"+
    "        str = str.replace(/(<[a-z]+)/g, \"$1 xmlns='http://www.w3.org/1999/xhtml'\");"+
    "    var div = document.createElementNS(\"http://www.w3.org/1999/xhtml\", \"div\");"+
    "    div.innerHTML = str;"+
    "    var pos;"+
 /*   "    if (!moz) {"+
    "        pos = document.getElementsByTagName(\"*\");"+
    "        pos = pos[pos.length - 1];"+
    "    } else {"+
    "        pos = document;"+
    "        while (pos.lastChild && pos.lastChild.nodeType == 1)"+
    "            pos = pos.lastChild;"+
    "    }"+

  */
    "    var nodes = div.childNodes;"+
    " var adDiv = document.getElementById(\"wikiAdDiv\");"+
// " var adiframe = document.createElement(\"iframe\");<iframe src="http://rcm-na.amazon-adsystem.com/e/cm?t=wiki-ads-20&o=1&p=48&l=op1&pvid=DB…c=0B0080&ac=0B0080&pvc=6E6E6E&mp=1&hb=1&hl=1&tg=_blank&dsc=1&f=ifr&e=utf-8" marginwidth="0" marginheight="0" width="728" height="90" border="0" frameborder="0" style="border:none;" scrolling="no"></iframe>

    "    while (nodes.length)"+
   // "        pos.parentNode.appendChild(nodes[0]);"+
    "       adDiv.appendChild(nodes[0]);"+
    "};";
//});



docWrite2 = "    document.write = function(str) {"+
    " console.log(str);"+
    "HTMLtoDOM(str,document.getElementById(\"wikiAdDiv\"));"+
    " };";


newDiv = document.createElement("div");
newDiv.setAttribute("id","wikiAdDiv");
newDiv.style.marginLeft="25px";
var container = document.getElementById("mw-head");
if (container)
	container.insertBefore(newDiv,document.getElementById("right-navigation"));
else {
	newDiv.style.textAlign="center";
	document.body.insertBefore(newDiv,document.body.firstChild);
}
/*
var htmlParserScript = document.createElement("script");
htmlParserScript.setAttribute("type", "application/javascript");
htmlParserScript.setAttribute("src",chrome.extension.getURL("htmlParser.js"));

newDiv.appendChild(htmlParserScript);
*/

var docWriteTag = document.createElement("script");
docWriteTag.setAttribute("type","application/javascript");
docWriteTag.textContent = docWrite;

//docWriteTag.textContent = "document.write = function(str) { alert(str); };";

//var markup = "<script><!--alert(\"here\");amazon_ad_tag = \"wiki-ads-20\"; amazon_ad_width = \"728\"; amazon_ad_height = \"90\"; amazon_ad_logo = \"hide\"; amazon_ad_link_target = \"new\"; amazon_ad_border = \"hide\"; amazon_color_border = \"C5C5C5\"; amazon_color_link = \"0B0080\"; amazon_color_logo = \"0B0080\";//--></script>" + "<script type=\"text/javascript\" src=\"http://ir-na.amazon-adsystem.com/s/ads.js\">alert(\"here2\");</script>";
var tc = "amazon_ad_tag = \"wiki-ads-20\"; amazon_ad_width = \"728\"; amazon_ad_height = \"90\"; amazon_ad_logo = \"hide\"; amazon_ad_link_target = \"new\"; amazon_ad_border = \"hide\"; amazon_color_border = \"C5C5C5\"; amazon_color_link = \"0B0080\"; amazon_color_logo = \"0B0080\";";
//var tc = "alert(\"here\");";
//var markup2 =





var scriptTag = document.createElement("script");
var scriptTag2 = document.createElement("script");
scriptTag.setAttribute("type", "application/javascript");
scriptTag.textContent = tc;
scriptTag2.setAttribute("type", "text/javascript");

scriptTag2.setAttribute("src","http://ir-na.amazon-adsystem.com/s/ads.js");
//scriptTag2.setAttribute("src","http://wiki-ads.com/test.js");

//tc2 = "amazon_ad_o = 1;amazon_ad_rcm = \"rcm-na.amazon-adsystem.com\";amazon_ad_linkcode = \"op1\";";
//scriptTag2.textContent =



newDiv.appendChild(docWriteTag);
newDiv.appendChild(scriptTag);
//this adds the script tag, and it even seemed to run, but I saw no ad?


newDiv.appendChild(scriptTag2);

var scriptTag3 = document.createElement("script");
scriptTag3.setAttribute("type", "text/javascript");
scriptTag3.setAttribute("src","http://ir-na.amazon-adsystem.com/s/ads-common.js");


newDiv.appendChild(scriptTag3);
//var tcPostscribe = "$(function() { postscribe('#wikiAdDiv', '<script src=\"http://ir-na.amazon-adsystem.com/s/ads.js\"><\script>'); });"
////postscribe('#wikiAdDiv', "<script src='http://ir-na.amazon-adsystem.com/s/ads-common.js'><\/script>");
//var scriptTagPS = document.createElement("script");
//scriptTagPS.setAttribute("type","text/javascript");
//scriptTagPS.textContent = tcPostscribe;
//newDiv.appendChild(scriptTagPS);
////document.write("<script>alert(\"here\");</script>");

//This worked but blanked the whole page first
//document.write("<scr"+"ipt src='"+window.location.protocol+"//ir-na.amazon-adsystem.com/s/ads.js' type='text/javascr"+"ipt'></scr"+"ipt>");

//can't use executeScript here... background.html page only?
//chrome.tabs.executeScript(null,{file:"http://ir-na.amazon-adsystem.com/s/ads.js"});

//newDiv.textContent = "<script type=\"text/javascript\"><!--amazon_ad_tag = \"wiki-ads-20\"; amazon_ad_width = \"728\"; amazon_ad_height = \"90\"; amazon_ad_logo = \"hide\"; amazon_ad_link_target = \"new\"; amazon_ad_border = \"hide\"; amazon_color_border = \"C5C5C5\"; amazon_color_link = \"0B0080\"; amazon_color_logo = \"0B0080\";//--></script><script type=\"text/javascript\" src=\"http://ir-na.amazon-adsystem.com/s/ads.js\"></script>";
//insertAndExecute(newDiv,markup);
//insertAndExecute(newDiv,markup2);


//document.body.appendChild(newDiv);
document.getElementById("mw-head").style.height="100px";
document.getElementById("mw-head-base").style.height="91px";
document.getElementById("p-namespaces").style.marginTop="11px";
document.getElementById("right-navigation").style.marginTop="51px";

newDiv.style.float="left";



//newDiv.innerHTML = "<a href='http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=brd&FlightID=5631686&Page=&PluID=0&Pos=5879' target='_blank'><img src='http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=bsr&FlightID=5631686&Page=&PluID=0&Pos=5879' border=0 width=728 height=90></a></span>";


/*var newLi = document.getElementById("p-namespaces").childNodes[3].appendChild(document.createElement("li"));
newLi.innerHTML = "<span style=>"<a href='http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=brd&FlightID=5631686&Page=&PluID=0&Pos=5879' target='_blank'><img src='http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=bsr&FlightID=5631686&Page=&PluID=0&Pos=5879' border=0 width=728 height=90></a></span>";
rsb&c=28&pli=5631686&PluID=0&w=728&h=90&ord=[timestamp]&ifrm=-1&ucm=true'></script><noscript><a href='http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=brd&FlightID=5631686&Page=&PluID=0&Pos=5879' target='_blank'><img src='http://bs.serving-sys.com/BurstingPipe/adServer.bs?cn=bsr&FlightID=5631686&Page=&PluID=0&Pos=5879' border=0 width=728 height=90></a></noscript></span>";
*/