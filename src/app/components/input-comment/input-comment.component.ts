import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommentsService } from '../../core/services/comments.service';
import { Icomments } from '../../core/interfaces/icomments';
import { NgClass } from '@angular/common';
import { PostesService } from '../../core/services/postes.service';

@Component({
  selector: 'app-input-comment',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './input-comment.component.html',
  styleUrl: './input-comment.component.scss'
})
export class InputCommentComponent {
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _CommentsService = inject(CommentsService)
  private readonly _PostesService = inject(PostesService)
  @Input({required:true}) idPost!:string
  commentForm!:FormGroup 
  load!:boolean
  ngOnInit(): void {
    this.commentForm = this._FormBuilder.group({
      content:[null , [Validators.required , Validators.minLength(2)]],
      post:[this.idPost]
    })
    this._CommentsService.numOfComments.set(0)
  }
  sendComment():void{
    this.load = true
    if(this.commentForm.controls['content'].value != null && this.commentForm.controls['content'].value.length > 1)
    {
      this._CommentsService.createComment(this.commentForm.value).subscribe({
        next:(res)=>{
          this._CommentsService.commentsForPost.set(res.comments)
          this.commentForm.get('content')?.reset()
          this.load = false
          this._CommentsService.numOfComments.set(res.comments.length)
          console.log(this._CommentsService.numOfComments())
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }
}

