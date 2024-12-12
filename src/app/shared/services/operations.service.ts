import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OperationsService {
  constructor(private http: HttpClient) {}
  // --------------------------------------------------------------------------------------------------------------------------------------------------
  getOperationsItems(endPoint:string, params='?'): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/${endPoint}${params}`);
  }
  // --------------------------------------------------------------------------------------------------------------------------------------------------
  getOperationItemById(endPoint:string, itemId: number): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/${endPoint}/${itemId}`);
  }
  // --------------------------------------------------------------------------------------------------------------------------------------------------
  getOperationSubItemByMainItemAndId(mainItemEndPoint:string, subItemEndPoint:string, itemId: number): Observable<any> {
    return this.http.get<any>(`${environment.API_URL}/${mainItemEndPoint}/${itemId}/${subItemEndPoint}`);
  }
  // --------------------------------------------------------------------------------------------------------------------------------------------------
  addNewOperationItem(endPoint:string, sentData: any) {
    return this.http.post<any>(`${environment.API_URL}/${endPoint}`, sentData);
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------
  updateOperationItem(endPoint:string, itemId: number,  sentData: any) {
    return this.http.put<any>(`${environment.API_URL}/${endPoint}/${itemId}`, sentData);
  }
  // ---------------------------------------------------------------------------------------------------------------------------------------------------
  deleteOperationItem(endPoint:string, itemId: number): Observable<any> {
    return this.http.delete<any>(`${environment.API_URL}/${endPoint}/${itemId}`, { observe: 'response' });
  }
  // -----------------------------------------------------------------------------------------------------------------------------------------------------
}