declare var $ : any;
export class Hilitor {
    id : string = "";
    preTagId : string = "";
    constructor(public preId : string, public tag : string) {
        this.id = preId;
        this.preTagId = preId;
    }
    targetNode = document.getElementById(this.preId) || document.body;
    hiliteTag = this.tag || "span";
    skipTags = new RegExp("^(?:" + this.hiliteTag + "|SCRIPT|FORM|SPAN)$");
    colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
    wordColor = [];

    openLeft : boolean;
    openRight : boolean;
    colorIdx = 0;
    matchRegex : RegExp;
    hitCount : number = 0;
    hits = {
        length: 0
    }
    setMatchType = function (type) {
        switch (type) {
            case "left":
                this.openLeft = false;
                this.openRight = true;
                break;
            case "right":
                this.openLeft = true;
                this.openRight = false;
                break;
            case "open":
                this.openLeft = this.openRight = true;
                break;
            default:
                this.openLeft = this.openRight = false;
        }
    };
    setRegex = function (input) {
        input = input.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        if (input) {
            var re = "(" + input + ")";
            this.matchRegex = new RegExp(re, "i");
            return true;
        }
        return false;
    };
    getRegex = function () {
        var retval = this
            .matchRegex
            .toString();
        retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
        retval = retval.replace(/\|/g, " ");
        return retval;
    };
    hiliteWords = function (node) {
        if (node === undefined || !node) 
            return;
        if (!this.matchRegex) 
            return;
        if (this.skipTags.test(node.nodeName)) 
            return;
        
        if (node.hasChildNodes()) {
            for (var i = 0; i < node.childNodes.length; i++) 
                this.hiliteWords(node.childNodes[i]);
            }
        if (node.nodeType === 3 || node.nodeType === 1) {
            var nv: any;
            var regs: any;
            if ((nv = node.nodeValue) && (regs = this.matchRegex.exec(nv))) {
                if (!this.wordColor[regs[0].toLowerCase()]) {
                    this.wordColor[regs[0].toLowerCase()] = this.colors[this.colorIdx++ % this.colors.length];
                }
                var match = document.createElement(this.hiliteTag);
                match.appendChild(document.createTextNode(regs[0]));
                match.style.backgroundColor = "#ff6";
                match.style.fontStyle = "inherit";
                match.style.color = "#000";
                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
                this.hitCount++;
            }
        }
    };
    remove = function () {
        var element = $(this.targetNode);
        var arr = $(element).find("span");
        for (var l = 0; l < arr.length; l++) {
            var el = arr[l];
            var parent = el.parentNode;
            if (el.firstChild === null || typeof el.firstChild === "undefined") 
                break;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
    };
    apply = function (input) {
        this.hitCount = 0;
        this.currHitIdx = 0;
        if (input === undefined || !input) 
            return;
        if (this.setRegex(input)) {
            this.hiliteWords(this.targetNode);
            this.hits = $("#" + this.id + " span");
            if (this.hits.length > 0) {
                var topPos = this.hits[0].offsetTop;
                document.getElementById(this.preTagId).scrollTop = topPos - 150;
                this.hits[0].style.backgroundColor = "#a0ffff";
                this.hits[0].scrollIntoView();
            }
        }
    };
    nextHit = function () {
        if (this.currHitIdx < this.hits.length - 1) {
            this.currHitIdx++;
            var currHit = this.hits[this.currHitIdx];
            currHit.style.backgroundColor = "#a0ffff";
            this.hits[this.currHitIdx - 1].style.backgroundColor = "#ff6";
            var topPos = currHit.offsetTop;
            document.getElementById(this.preTagId).scrollTop = topPos - 150;
            currHit.scrollIntoView();
        }
    };
    prevHit = function () {
        if (this.currHitIdx !== 0) {
            this.currHitIdx--;
            var currHit = this.hits[this.currHitIdx];
            currHit.style.backgroundColor = "#a0ffff";
            this.hits[this.currHitIdx + 1].style.backgroundColor = "#ff6";
            var topPos = currHit.offsetTop;
            document.getElementById(this.preTagId) .scrollTop = topPos - 150;
            currHit.scrollIntoView();
        }
    };
}