import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environments';

@Injectable({
  providedIn: 'root'
})
export class PostesService {

  constructor(private _HttpClient:HttpClient) { }

  createPost(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseUrl}posts` , data)
  }
  getAllePosts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}posts?limit=100`)
  }
  getMyePosts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}users/664bcf3e33da217c4af21f00/posts?limit=2`)
  }
  getSinglPost(postId:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}posts/${postId}`)
  }
  updatePost(postId:string , data:object):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}posts/${postId}` , data)
  }
  deletePost(postId:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseUrl}posts/${postId}`)
  }
}
