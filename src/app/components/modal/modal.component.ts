import { Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id?: string;
  isOpen = false;
  private element: any;

  constructor(private el: ElementRef,
              private modalService: ModalService
  ){
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
      this.modalService.add(this);

      document.body.appendChild(this.element);

      this.element.addEventListener('click',(el: any) => {
        if (el.target.className === 'modal')  {
          this.close();
        }
      });
  }

  ngOnDestroy(): void {
      this.modalService.remove(this);

      document.body.removeChild;
  }

  open() {
    //antes estaba a none
    this.element.style.display = "block";
    document.body.classList.add('modal-open');
    this.isOpen = true;
  }

  close() {
    this.element.style.display = "none";
    document.body.classList.remove("model-open");
    this.isOpen = false;
  }
}
