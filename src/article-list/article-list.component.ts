import { ArticleHeaderComponent } from './article-header/article-header.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleBodyComponent } from './article-body/article-body.component';
import { ArticleService } from './article.service';
import { HttpClientModule } from '@angular/common/http';
import { Article } from "./article.interface";


@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ArticleBodyComponent, ArticleHeaderComponent, HttpClientModule],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [ArticleService],
})
export class ArticleListComponent implements OnInit {

  public articleService: ArticleService = inject(ArticleService);

  articles = signal([] as Article[]);
  constructor() {
  }

  async ngOnInit(): Promise<void> {
    this.articles.set(await this.articleService.getArticle());
  }

  onRemoveArticle(article: Article) {
    try {
      //this.articleService.removeArticle(article);
      this.articles.mutate((v)=>v.filter((v)=>v.id!=article.id));
      console.log(this.articles());
    } catch (error) {
      console.log(error);
    }
  }

  onModifyArticle(event: Article) {
    try {
      this.articleService.modifyArticle(event);
    } catch (error) {
      console.log(error);
    }
  }
}
