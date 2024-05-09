import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Bottleneck from 'bottleneck';
import { environment } from 'environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
    //----------------------------------------------------------------//
    //                           Properties
    //----------------------------------------------------------------//

    private readonly baseUrl = environment.baseUrl + environment.backendPort;
  private headers: HttpHeaders;
      private readonly throttleTimeMs = 500;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Cache-Control', 'no-cache');
    }
  
    //----------------------------------------------------------------//
    //                           Public
    //----------------------------------------------------------------//
  
      public async get<T>(endpoint: string): Promise<T> {
    await this.delay(this.throttleTimeMs);
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers: this.headers })
      .pipe(
        catchError((error) => {
          return throwError(() => new Error('get enpoint: ' + endpoint + ' failed. ' + error))
        })
      )
      .toPromise();
  }
  
    public async post<T>(endpoint: string, data: T): Promise<T> {
      await this.delay(this.throttleTimeMs);
      return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers: this.headers }).pipe(
        catchError((error) => {
          return throwError(() => new Error('post enpoint: ' + endpoint + ' failed. ' + error))
        })
      ).toPromise();
    }

    //----------------------------------------------------------------//
    //                           Private
    //----------------------------------------------------------------//
    
    private delay(ms: number): Promise<void> {
      return new Promise<void>(resolve => setTimeout(resolve, ms));
    }

  }