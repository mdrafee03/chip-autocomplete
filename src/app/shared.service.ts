import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
   }
  filterEventSource(event) {
    event.subscribe(this.reloadData)
  }
  reloadData(event) {
    console.log(event)
  }
}