import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({providedIn: 'root'})
export class LanguageService {
  languages$: Observable<any>;
  constructor(private http: HttpClient) {
    this.getLanguages();
  }

  getLanguages() {
    this.languages$ =this.http.get('https://demo4232492.mockable.io/languages')
    .pipe(
      map((res: {data: any[]}) => res.data),
      shareReplay(1)
    )
  }
} AbortController