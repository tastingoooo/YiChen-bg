import { ArticleHeaderComponent } from './article-header/article-header.component';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleBodyComponent } from './article-body/article-body.component';
import { ArticleService } from './article.service';
import { HttpClientModule } from '@angular/common/http';
import { Article } from './article.interface';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    CommonModule,
    ArticleBodyComponent,
    ArticleHeaderComponent,
    HttpClientModule,
    DialogComponent
  ],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  providers: [ArticleService],
})
export class ArticleListComponent implements OnInit {
  public articleService: ArticleService = inject(ArticleService);

  articles = signal([] as Article[]);
  constructor() {}

  async ngOnInit(): Promise<void> {
    this.articles.set(await this.articleService.getArticle());
  }

  onDeleteArticle(article: Article) {
    try {
      this.articleService.deleteArticle(article);
      this.articles.update((v) => v.filter((v) => v.id != article.id));
    } catch (error) {
      console.log(error);
    }
  }

  onUpdateArticle(event: Article) {
    try {
      this.articleService.updateArticle(event);
    } catch (error) {
      console.log(error);
    }
  }

  onAddArticle(article: Article) {
    try {
      article.id = this.articles().length + 1;
      this.articles.mutate((v) => v.push(article));
      this.articleService.addArticle(article);
    } catch (error) {
      console.log(error);
    }
  }
}
