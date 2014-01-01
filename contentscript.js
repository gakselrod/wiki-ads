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
    "    while (nodes.length)"+
   // "        pos.parentNode.appendChild(nodes[0]);"+
    "       adDiv.appendChild(nodes[0]);"+
    "};";
//});


/* //alternative document.write hook using HTMLParser.js that I never got working
docWrite2 = "    document.write = function(str) {"+
    " console.log(str);"+
    "HTMLtoDOM(str,document.getElementById(\"wikiAdDiv\"));"+
    " };";
*/

newDiv = document.createElement("div");
newDiv.setAttribute("id","wikiAdDiv");
newDiv.style.marginLeft="25px";
newDiv.style.float="left";

//insert the ad div.
var container = document.getElementById("mw-head");
if (container)
	container.insertBefore(newDiv,document.getElementById("right-navigation"));
else { //If we're not on Wikipedia.org, just insert it at the top of the body.
	newDiv.style.textAlign="center";
	document.body.insertBefore(newDiv,document.body.firstChild);
}
/*
var htmlParserScript = document.createElement("script");
htmlParserScript.setAttribute("type", "application/javascript");
htmlParserScript.setAttribute("src",chrome.extension.getURL("htmlParser.js"));

newDiv.appendChild(htmlParserScript);
*/

//construct the JS nodes to inject
var docWriteTag = document.createElement("script");
docWriteTag.setAttribute("type","application/javascript");
docWriteTag.textContent = docWrite;

var tc = "amazon_ad_tag = \"wiki-ads-20\"; amazon_ad_width = \"728\"; amazon_ad_height = \"90\"; amazon_ad_logo = \"hide\"; amazon_ad_link_target = \"new\"; amazon_ad_border = \"hide\"; amazon_color_border = \"C5C5C5\"; amazon_color_link = \"0B0080\"; amazon_color_logo = \"0B0080\";";

var scriptTag = document.createElement("script");
scriptTag.setAttribute("type", "application/javascript");
scriptTag.textContent = tc;

var scriptTag2 = document.createElement("script");
scriptTag2.setAttribute("type", "text/javascript");
scriptTag2.setAttribute("src","http://ir-na.amazon-adsystem.com/s/ads.js");

var scriptTag3 = document.createElement("script");
scriptTag3.setAttribute("type", "text/javascript");
scriptTag3.setAttribute("src","http://ir-na.amazon-adsystem.com/s/ads-common.js");

//run all the JS
newDiv.appendChild(docWriteTag);
newDiv.appendChild(scriptTag);
newDiv.appendChild(scriptTag2);
newDiv.appendChild(scriptTag3);

//fix up the header styling to make room for the banner
document.getElementById("mw-head").style.height="100px";
document.getElementById("mw-head-base").style.height="91px";
document.getElementById("p-namespaces").style.marginTop="11px";
document.getElementById("right-navigation").style.marginTop="51px";