import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { PostesService } from '../../core/services/postes.service';
import { IPosts } from '../../core/interfaces/Ipost';
import { DatePipe, NgClass } from '@angular/common';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { ShowCommentsComponent } from "../show-comments/show-comments.component";
import { InputCommentComponent } from "../input-comment/input-comment.component";
import { FormsModule } from '@angular/forms';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";
declare var $:any;
@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [DatePipe, CommentsComponent, ShowCommentsComponent, InputCommentComponent, NgClass, FormsModule, NavBlankComponent],
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
  img:string = ''
  content:string = ''
  msg:string = ''
  imgFile!:File
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
        this.load = '';
        this.post = res.post;
        this.id = id;
      this._Renderer2.addClass(document.documentElement  , 'overflow-hidden')
      this._Renderer2.addClass(document.body  , 'overflow-scroll')
      this.showComments = true
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  changeImg(e:Event):void{
  const input = e.target as HTMLInputElement
  if(input.files && input.files.length > 0)
  {
    this.imgFile = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.onload=(event:any)=>{
      this.img = event.target.result
    }
    input.value=''
  }
  }
  onRemove() {
    this.img = ''
  }
  creatPost():void{
    const formData = new FormData();
    formData.append('body' , this.content);
    formData.append('image' , this.imgFile);
    this._PostesService.createPost(formData).subscribe({
      next:(res)=>{
        console.log(res)
        this.img = '';
        this.content = '';
        // $('#authentication-modal').modal('hide');
        this._PostesService.getAllePosts()
      },
      error:(err)=>{
        console.log(err)
      }
    })
    
  }
}
