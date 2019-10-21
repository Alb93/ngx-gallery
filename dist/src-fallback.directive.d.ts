import { ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
export declare class SrcFallbackDirective implements OnDestroy {
    private el;
    private renderer;
    srcFallback: string;
    loaded: EventEmitter<boolean>;
    private nativeElement;
    private isApplied;
    private ERROR_EVENT_TYPE;
    private LOAD_EVENT_TYPE;
    private cancelOnError;
    private cancelOnLoad;
    constructor(el: ElementRef, renderer: Renderer2);
    ngOnDestroy(): void;
    private removeErrorEvent();
    private removeOnLoadEvent();
    private addEvents();
}
