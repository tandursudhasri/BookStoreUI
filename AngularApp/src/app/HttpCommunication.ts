import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
export class order {
  constructor(
    public orderId: number,
    public bookId: number,
    public quantity: number,
    public cost: number,
    public orderNo: number
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

export class orderDetails {
  constructor(
    public orderId: number,
    public bookId: number,
    public bookName: string,
    public authorName: string,
    public category: string,
    public quantity: number,
    public cost: number,
  ){}
}
export class appAuth {
  constructor(public userName: string, public password: string) {}
}

export class placeOrder {
  constructor(public bid: number, public quantity: number) {}
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
  abstract GetBookName(name: string): Observable<book[]>;
  abstract GetBookAuthor(name: string): Observable<book[]>;
  abstract UpdateAddress(userid: number, address: string): Observable<object>;
  abstract GetUserId(name: string): Observable<number>;
  abstract GenerateOrder(
    userid: number,
    items: Map<book, number>
  ): Observable<object>;
  abstract GetOrderIds(userid: number): Observable<number[]>;
  abstract GetOrder(orderId: number): Observable<orderDetails[]>;
  abstract GetBook(id: number): Observable<book>
}
@Injectable({ providedIn: 'root' })
export class HttpCommunication extends AbstractHttpCommunication {
  url = 'https://localhost:7076';
  items = new Map<book, number>();
  po: placeOrder[] = [];
  tosearch: string = '';
  constructor(private client: HttpClient) {
    super();
  }
  override GetAllBooks(): Observable<book[]> {
    let path = `${this.url}/Books`;
    const headers = { headers: new HttpHeaders({ observe: 'response' }) };
    var result = this.client.get<book[]>(path, headers); // make GET http request
    return result;
  }
  
  override DeleteBook(id: number): Observable<object> {
    let path = `${this.url}/Del_book/${id}`;
    var response = this.client.delete(path, { observe: 'response' });
    return response;
  }
  override Add(bk: book): Observable<object> {
    const path = `${this.url}/add`;
    const head = new HttpHeaders({ 'content-type': 'application/json' });
    var result = this.client.post(path, bk, {
      headers: head,
      observe: 'response',
    });
    return result;
  }
  override UpdateBook(bk: book): Observable<object> {
    const path = `${this.url}/Updt_book`;
    const head = new HttpHeaders({ 'content-type': 'application/json' });
    var result = this.client.put(path, bk, {
      headers: head,
      observe: 'response',
    });
    return result;
  }
  override GetBookCategory(name: string): Observable<book[]> {
    let path = `${this.url}/Book_category/${name}`;

    const headers = { headers: new HttpHeaders({ observe: 'response' }) };
    var result = this.client.get<book[]>(path, headers); // make GET http request
    return result;
  }
  override GetBookName(name: string): Observable<book[]> {
    let path = `${this.url}/Book_name/${name}`;

    const headers = { headers: new HttpHeaders({ observe: 'response' }) };
    var result = this.client.get<book[]>(path, headers); // make GET http request
    return result;
  }
  override GetBook(id: number): Observable<book> {
    let path = `${this.url}/Book_id/${id}`;

    const headers = { headers: new HttpHeaders({ observe: 'response' }) };
    var result = this.client.get<book>(path, headers); // make GET http request
    return result;
  }
  override GetBookAuthor(name: string): Observable<book[]> {
    let path = `${this.url}/Book_author/${name}`;

    const headers = { headers: new HttpHeaders({ observe: 'response' }) };
    var result = this.client.get<book[]>(path, headers); // make GET http request
    return result;
  }

  override GetUserId(name: string): Observable<number> {
    let path = `${this.url}/U_id/${name}`;

    const headers = { headers: new HttpHeaders({ observe: 'response' }) };
    var result = this.client.get<number>(path, headers);
    alert(result);
    return result;
  }
  override getTokenAndAccesProtectedResources(
    userName: string,
    password: string
  ): Observable<HttpResponse<TokenAndRole>> {
    const url = `${this.url}/login`;

    var credentials = new appAuth(userName, password);
    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    var result = this.client.post<TokenAndRole>(url, credentials, {
      headers: headers,
      observe: 'response',
    });
    alert(result);
    return result;
  }

  override SignUp(
    userName: string,
    userEmail: string,
    password: string,
    userContactNo: string
  ): Observable<object> {
    const url = `${this.url}/SignUp/${userName}/${userEmail}/${password}/${userContactNo}`;

    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    var result = this.client.post(url, {
      headers: headers,
      observe: 'response',
    });
    alert(result);
    return result;
  }

  override UpdateAddress(userid: number, address: string): Observable<object> {
    const url = `${this.url}/Updt_User/${userid}/${address}`;

    const headers = new HttpHeaders({ 'content-type': 'application/json' });
    var result = this.client.post(url, {
      headers: headers,
      observe: 'response',
    });
    alert(result);
    return result;
  }
  override GenerateOrder(
    userid: number,
    items: Map<book, number>
  ): Observable<object> {
    // const orderData = {
    //   userId: userid,
    //   orderDetails: items,
    // };
    this.items = items;
    for (let i of this.items) {
      this.po.push(new placeOrder(i[0].bookId, i[1]));
    }
    var res = this.PostOrder(this.po, userid);
    return res;
  }

  PostOrder(po: placeOrder[], userid: number): Observable<object> {
    const url = `${this.url}/Order/${userid}`;
    const head = new HttpHeaders({ 'content-type': 'application/json' });

    // const o = new placeOrder(this.items, userid);
    // var result=this.client.post(url,orderData, {headers:head,observe:'response'});
    var result = this.client.post(url, po, {
      headers: head,
      observe: 'response',
    });
    alert(result);
    alert('Order Placed');
    return result;
  }

  override GetOrderIds(userid: number): Observable<number[]> {
    let path = `${this.url}/Order_id/${userid}`;

    const headers = { headers: new HttpHeaders({ observe: 'response' }) };
    var result = this.client.get<number[]>(path, headers);
    // alert(result);
    return result;
  }

  override GetOrder(orderid: number): Observable<orderDetails[]> {
    let path = `${this.url}/Order_de/${orderid}`;

    const headers = { headers: new HttpHeaders({ observe: 'response' }) };
    var result = this.client.get<orderDetails[]>(path, headers);
    // alert(result);
    return result;
  }
}
