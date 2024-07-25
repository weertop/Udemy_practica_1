import { Injectable } from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: ModalComponent[] = [];

  constructor() { }

  add(modal: ModalComponent) {
    if (!modal.id || this.modals.find(m => m.id == modal.id)){
      throw new Error('modal must have a unique id attribute');
      return console.log("error ya existe otro modal con ese id");
    }

    this.modals.push(modal);
  }

  remove(modal: ModalComponent) {
    this.modals.splice(this.modals.findIndex(m => m.id == modal.id),1);
    //this.modals = this.modals.filter(x => x !== modal);
  }

  open(id: string) {
    const modal = this.modals.find(m => m.id == id);

    if(!modal){
      throw new Error("no existe ese modal con id: " + id);
    }

    modal.open();
  }

  close() {
    const modal = this.modals.find(x => x.isOpen);
    modal?.close();
  }
}
