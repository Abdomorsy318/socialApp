import { Component, EventEmitter, inject, Input, Output, Renderer2 } from '@angular/core';
import { IPosts } from '../../core/interfaces/Ipost';
import { DatePipe} from '@angular/common';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { InputCommentComponent } from "../input-comment/input-comment.component";

@Component({
  selector: 'app-show-comments',
  standalone: true,
  imports: [DatePipe, CommentsComponent, InputCommentComponent],
  templateUrl: './show-comments.component.html',
  styleUrl: './show-comments.component.scss'
})
export class ShowCommentsComponent {

  private readonly _Renderer2 = inject(Renderer2)
  @Input({required:true}) post!:IPosts
  @Input({required:true}) closeCheck!:boolean
  @Output() x:EventEmitter<boolean> = new EventEmitter()

  close(e:EventTarget|null , span:HTMLSpanElement):void{
    if(e == span)
    {
      this.closeCheck = false
      this._Renderer2.removeClass(document.documentElement  , 'overflow-hidden')
      this._Renderer2.removeClass(document.body  , 'overflow-scroll')
    }
    this.x.emit(this.closeCheck)
  }
}
