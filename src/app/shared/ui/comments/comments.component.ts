import { Component, inject, Input, OnInit, computed, Signal } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { Icomments } from '../../../core/interfaces/icomments';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit{

  private readonly _CommentsService = inject(CommentsService)
  @Input({required:true}) postId!:string
  commentsForPosts:Signal<Icomments[]> = computed(()=>[])
  ngOnInit(): void {
      this._CommentsService.getPostComments(this.postId).subscribe({
        next:(res)=>{
          this._CommentsService.commentsForPost.set(res.comments)
          this.commentsForPosts = computed(()=>this._CommentsService.commentsForPost())
        },
      error:(err)=>{
        console.log(err)
      }
      })
  }
}
