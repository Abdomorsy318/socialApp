import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environments';
import { Icomments } from '../interfaces/icomments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
numOfComments:WritableSignal<number> = signal(0);
  constructor(private _HttpClient:HttpClient) { }
  commentsForPost:WritableSignal<Icomments[]> = signal([])
  createComment(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}comments` , data)
  }
  getPostComments(postId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}posts/${postId}/comments`)
  }
  updatePostComment(commentId:string , data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}comments/${commentId}` , data)
  }
  deleteComment(commentId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}comments/${commentId}`)
  }
}
