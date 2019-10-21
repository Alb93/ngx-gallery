import { AfterViewInit, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
export declare class EnhanceBackgroundDirective implements OnDestroy, AfterViewInit {
    private el;
    private renderer;
    fullSrc: string;
    errorSrc: string;
    enhanceBackgroundImage: string;
    loaded: EventEmitter<boolean>;
    private nativeElement;
    private cancelOnError;
    private cancelOnLoad;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnDestroy(): void;
    private removeErrorEvent();
    ngAfterViewInit(): void;
    private removeOnLoadEvent();
    private addEvents();
}
