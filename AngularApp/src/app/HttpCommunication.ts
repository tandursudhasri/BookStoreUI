import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
export class book {
  constructor(
    public bookName: string,
    public bookId: number,
    public authorName: string,
    public bookPrice: number,
    public stock: number,
    public category: string
  ) {}
}

export class TokenAndRole {
  constructor(public token: string, public role: string) {}
}
export class appUser {
  constructor(
    public userName: string,
    public userEmail: string,
    public userContactNo: string,
    public userPass: string
  ) {}
}

export class appAuth {
  constructor(public userName: string, public password: string) {}
}
export abstract class AbstractHttpCommunication {
  abstract GetAllBooks(): Observable<book[]>;
  abstract DeleteBook(id: number): Observable<object>;
  abstract GetBookCategory(name: string): Observable<book[]>;
  abstract getTokenAndAccesProtectedResources(
    userName: string,
    password: string
  ): Observable<HttpResponse<TokenAndRole>>;
  abstract Add(bk: book): Observable<object>;
  abstract UpdateBook(bk: book): Observable<object>;
  abstract SignUp(
    userName: string,
    password: string,
    userEmail: string,
    userContactNo: string
  ): Observable<object>;
}
@Injectable({ providedIn: 'root' })
export class HttpCommunication extends AbstractHttpCommunication {
  url = 'https://localhost:7076';
  items : book[] = [];
  constructor(private client: HttpClient) {
    super();
  }
  override GetAllBooks(): Observable<book[]> {
    let path = `${this.url}/Books`;
    const headers = { headers: new HttpHeaders({ observe: 'response' }) };
    var result = this.client.get<book[]>(path, headers); // make GET http request
    return result;
  }
  }
}
