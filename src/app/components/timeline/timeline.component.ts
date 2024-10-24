import { Component, inject, OnInit, Renderer2, WritableSignal } from '@angular/core';
import { PostesService } from '../../core/services/postes.service';
import { IPosts } from '../../core/interfaces/Ipost';
import { DatePipe, NgClass } from '@angular/common';
import { CommentsComponent } from "../../shared/ui/comments/comments.component";
import { ShowCommentsComponent } from "../show-comments/show-comments.component";
import { InputCommentComponent } from "../input-comment/input-comment.component";
import { FormsModule } from '@angular/forms';
import { NavBlankComponent } from "../nav-blank/nav-blank.component";
import { CommentsService } from '../../core/services/comments.service';
@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [DatePipe, CommentsComponent, ShowCommentsComponent, InputCommentComponent, NgClass, FormsModule, NavBlankComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent implements OnInit{
  postList:IPosts[]=[] 
  postListAll:IPosts[]=[] 
  private readonly _PostesService = inject(PostesService)
  _CommentsService = inject(CommentsService)
  private readonly _Renderer2 = inject(Renderer2)
  showComments!:boolean
  load!:string
  post:IPosts = {} as IPosts
  id!:string
  img:string = ''
  content:string = ''
  msg:string = ''
  imgFile!:File
  loadPosts:boolean = false;
  ngOnInit(): void {
    this._PostesService.getAllePosts().subscribe({
      next:(res)=>{
        this.postListAll = res.posts.sort(() => Math.random() - 0.5);
        this._PostesService.getMyPosts().subscribe({
          next:(res)=>{
            this.postList = (res.posts.concat(this.postListAll)).sort(() => Math.random() - 0.5);
            console.log([res.posts[res.posts.length - 1]])
          },
          error:(err)=>{
            console.log(err)
          }
        })
        console.log(this.postListAll)
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
    this.loadPosts = true;
    const formData = new FormData();
    if(this.content)
      formData.append('body' , this.content);
    if(this.imgFile)
      formData.append('image' , this.imgFile);
    this._PostesService.createPost(formData).subscribe({
      next:(res)=>{
        console.log(res)
        this.img = '';
        this.content = '';
        this._PostesService.getMyPosts().subscribe({
          next:(res)=>{
            this.loadPosts = false;
            this.postList = [res.posts[res.posts.length - 1]].concat(this.postList)
            console.log([res.posts[res.posts.length - 1]])
          },
          error:(err)=>{
            this.loadPosts = false;
            console.log(err)
          }
        })
      },
      error:(err)=>{
        this.loadPosts = false;
        console.log(err)
      }
    })
    
  }
}
