import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Article } from 'src/article-list/article.interface';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  visible: boolean = false;
  article: Article = {
    id: 0,
    href: '/',
    date: `${new DatePipe('en-US').transform(new Date(), 'YYYY/MM/dd HH:mm')}`,
    categoryLink: '/',
    author: '',
    category: '',
    summary: '',
    title: '',
  };
  @Output() add = new EventEmitter<Article>();

  showDialog() {
    this.visible = true;
  }

  cancelAddArticle() {
    this.visible = false;
  }

  doAddArticle() {
    this.add.emit(this.article);
  }

  setTitle(value: string) {
    this.article.title = value;
  }

  setAuthor(value: string) {
    this.article.author = value;
  }

  setCategory(value: string) {
    this.article.category = value;
  }

  setSummary(value: string) {
    this.article.summary = value;
  }
}
