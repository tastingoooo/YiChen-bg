import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article } from '../article.interface';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-article-header',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogComponent],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss'],
})
export class ArticleHeaderComponent implements OnChanges {
  @Input() item!: Article;

  @Output() delete = new EventEmitter<Article>();
  @Output() titleChange = new EventEmitter<Article>();
  @Output() add = new EventEmitter<Article>();

  isEdit: boolean = false;
  originItem!: Article;

  ngOnChanges({ item }: SimpleChanges): void {
    if (item) {
      this.originItem = item.currentValue;
      this.item = Object.assign({}, item.currentValue);
    }
  }

  doDeleteArticle() {
    this.delete.emit(this.item);
  }

  cancelModifyArticle() {
    this.item = Object.assign({}, this.originItem);
    this.isEdit = false;
  }

  doModifArticle() {
    this.titleChange.emit(this.item);
    this.isEdit = false;
  }

  doAddArticle(article: Article) {
    this.add.emit(article);
  }
}
