import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { PostesService } from '../../core/services/postes.service';
import { IPosts } from '../../interfaces/Ipost';
import { DatePipe } from '@angular/common';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { ShowCommentsComponent } from "../show-comments/show-comments.component";
import { InputCommentComponent } from "../input-comment/input-comment.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [DatePipe, CommentsComponent, ShowCommentsComponent, InputCommentComponent , ReactiveFormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit{
  postList:IPosts[]=[] 
  private readonly _PostesService = inject(PostesService)
  private readonly _Renderer2 = inject(Renderer2)
  showComments!:boolean
  load!:string
  post:IPosts = {} as IPosts
  id!:string
  imgInput!:any
  ngOnInit(): void {
    this._PostesService.getAllePosts().subscribe({
      next:(res)=>{
        this.postList = res.posts
        console.log(res.posts)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  getPost(id:string):void{
    this.id = ''
    this.load = id
    this._PostesService.getSinglPost(id).subscribe({
      next:(res)=>{
        this.load = ''
        this.post = res.post
        this.id = id
      this._Renderer2.addClass(document.documentElement  , 'overflow-hidden')
      this._Renderer2.addClass(document.body  , 'overflow-scroll')
      this.showComments = true
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  changeImg(e:any):void{
    this.imgInput = e.target.files[0].name
    console.log(this.imgInput)
  }
}
