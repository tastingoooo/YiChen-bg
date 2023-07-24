import { Article } from './article.interface';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  http :HttpClient = inject(HttpClient);
  url:string = `http://localhost:3000/articles`;

  constructor() {
  }

  async getArticle():Promise<Article[]>{
    return await lastValueFrom(this.http.get<Article[]>(this.url));
  }
  async removeArticle(item:Article){
    return await lastValueFrom(this.http.delete(`${this.url}/${item.id}`));
  }
  async modifyArticle(item:Article){
    return await lastValueFrom(this.http.patch(`${this.url}/${item.id}`,item));
  }
}
