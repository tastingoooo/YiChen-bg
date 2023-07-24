import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article } from '../article.interface';

@Component({
  selector: 'app-article-header',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnChanges{
  @Input() item!: Article;

  @Output() delete = new EventEmitter<any>();
  @Output() titleChange = new EventEmitter<any>();

  isEdit:boolean=false;
  originItem!:Article;

  ngOnChanges({item}: SimpleChanges): void {
    if(item){
      this.originItem=item.currentValue;
      this.item = Object.assign({},item.currentValue);
    }
  }

  doDeleteArticle() {
    this.delete.emit(this.item);
  }

  cancelModifyArticle(){
    this.item = Object.assign({},this.originItem);
    this.isEdit=false;
  }

  doModifArticle(){
    this.titleChange.emit(this.item);
    this.isEdit=false;
  }
}
