import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/header/header.component';
import { FooterComponent } from 'src/app/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-body',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent,FormsModule],
  templateUrl: './article-body.component.html',
  styleUrls: ['./article-body.component.scss']
})
export class ArticleBodyComponent {
  @Input() item:any;

}
