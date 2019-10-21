import {Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[srcFallback]'
})
export class SrcFallbackDirective implements OnDestroy {

  @Input() srcFallback: string;
  @Output() loaded = new EventEmitter<boolean>();

  private nativeElement: HTMLElement;
  private isApplied = false;
  private ERROR_EVENT_TYPE = 'error';
  private LOAD_EVENT_TYPE = 'load';
  private cancelOnError: Function;
  private cancelOnLoad: Function;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.nativeElement = el.nativeElement;
    this.addEvents();
  }

  ngOnDestroy(): void {
    this.removeErrorEvent();
    this.removeOnLoadEvent();
  }

  private removeErrorEvent(): void {
    if (this.cancelOnError) {
      this.cancelOnError();
    }
  }

  private removeOnLoadEvent(): void {
    if (this.cancelOnLoad) {
      this.cancelOnLoad();
    }
  }

  private addEvents(): void {
    this.cancelOnError = this.renderer.listen(this.nativeElement, this.ERROR_EVENT_TYPE, () => {
      if (this.nativeElement.getAttribute('src') !== this.srcFallback) {
        this.isApplied = true;
        this.renderer.setAttribute(this.nativeElement, 'src', this.srcFallback);
      } else {
        this.removeOnLoadEvent();
      }
    });
    this.cancelOnLoad = this.renderer.listen(this.nativeElement, this.LOAD_EVENT_TYPE, () => this.loaded.emit(this.isApplied));
  }
}
