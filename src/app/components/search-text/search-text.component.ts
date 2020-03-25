import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Hilitor } from './text-hilitor';
declare var $: any;

@Component({ selector: 'search-text', templateUrl: './search-text.html', styleUrls: ['./search-text.css'] })
export class SearchTextComponent implements OnInit,
    AfterViewInit {
    @Input() public searchTextConfig: {
        id: string
    };
    public hilitor: Hilitor;
    public targetControl: HTMLElement;
    public self: SearchTextComponent;
    constructor() { };
    get getTargetControl(): HTMLElement {
        return document.getElementById(this.searchTextConfig.id);
    }
    ngAfterViewInit() {
        this.hilitor = new Hilitor(this.searchTextConfig.id, "span"); //  super.initialize(this.searchTextConfig.id);
        this.hilitor.id = this.searchTextConfig.id;
        this.targetControl = this.getTargetControl;
        this.initialize();
    }
    ngOnInit(): void { };
    previous = () => {
        this.hilitor.prevHit();
    };
    next = () => {
        this.hilitor.nextHit();
    };
    search = (e, keywords) => {
        var input = $(this.getTargetControl).children().find("input:text");
        var keyword = keywords || $(input).val();
        this.hilitor.setMatchType("left");
        var allWords = keyword
            .split(",").sort(function (a, b) {
                return b.length - a.length;
            });
        this.hilitor.remove();
        var hitCount = 0;
        $.each(allWords, (k: any, word: any) => {
            this.hilitor.apply(word);
            hitCount += this.hilitor.hitCount;
        });
        var msgCtrl = $(this.getTargetControl).children().find(".src-msg");
        if (hitCount === 0) {
            msgCtrl.text("No matches found!");
            msgCtrl.css({ color: "red" });
        } else {
            msgCtrl.text(hitCount + (hitCount === 1
                ? " match"
                : " match(es)"));
            msgCtrl.css({ color: "green" });
        }
    };
    initialize = () => {
        var events = [this.search, this.previous, this.next];
        $(this.targetControl).children().find(".btn-info")
            .each(function (i: string | number) {
                $(this).on("click", events[i]);
            });
        $(this.targetControl).children().find("input:text").bind({
            keypress: (e: { keyCode: number; target: { value: any; }; }) => {
                if (e.keyCode === 13) {
                    this.search(e, e.target.value);
                }
            }
        });
    };
    setText = (text: any) => {
        $(this.getTargetControl).find("pre").html(text);
    };
}
