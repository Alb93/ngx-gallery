import {AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';

@Directive({
  // tslint:disable-next-line
  selector: '[enhanceBackgroundImage]'
})
export class EnhanceBackgroundDirective implements OnDestroy, AfterViewInit {
  @Input() fullSrc: string;
  @Input() errorSrc: string;
  @Input() enhanceBackgroundImage: string;
  @Output() loaded = new EventEmitter<boolean>();

  private nativeElement: HTMLElement;
  private cancelOnError: Function;
  private cancelOnLoad: Function;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.nativeElement = el.nativeElement;
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

  ngAfterViewInit(): void {
    this.addEvents();
  }

  private removeOnLoadEvent(): void {
    if (this.cancelOnLoad) {
      this.cancelOnLoad();
    }
  }

  private addEvents(): void {
    if (this.fullSrc) {
      const image = new Image();
      image.src = this.fullSrc;
      image.onload = () => {
        this.renderer.setStyle(this.nativeElement, 'background-image', `url('${this.fullSrc}')`);
      };
    }
    console.log('adding events enhance');
    if (this.enhanceBackgroundImage && this.errorSrc) {
      this.renderer.setStyle(this.nativeElement, 'background-image', `url('${this.enhanceBackgroundImage}')`);
      const image = new Image();
      image.src = this.enhanceBackgroundImage;
      image.onerror = () => {
        console.log('on image error enhance', this.errorSrc);
        this.renderer.setStyle(this.nativeElement, 'background-image', `url('${this.errorSrc}')`);
      };
    } else if (this.enhanceBackgroundImage) {
      this.renderer.setStyle(this.nativeElement, 'background-image', `url('${this.enhanceBackgroundImage}')`);

    }
  }
}
