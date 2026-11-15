import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildApiUrl } from './api-url';

export interface ApiRequestOptions {
  headers?: HttpHeaders | Record<string, string | string[]>;
  params?: HttpParams | Record<string, string | number | boolean | readonly (string | number | boolean)[]>;
  context?: HttpContext;
  withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);

  get<T = unknown>(endpoint: string, options?: ApiRequestOptions): Observable<T> {
    return this.http.get<T>(buildApiUrl(endpoint), options);
  }

  post<T = unknown>(endpoint: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.http.post<T>(buildApiUrl(endpoint), body, options);
  }

  put<T = unknown>(endpoint: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.http.put<T>(buildApiUrl(endpoint), body, options);
  }

  patch<T = unknown>(endpoint: string, body: unknown, options?: ApiRequestOptions): Observable<T> {
    return this.http.patch<T>(buildApiUrl(endpoint), body, options);
  }

  delete<T = unknown>(endpoint: string, options?: ApiRequestOptions): Observable<T> {
    return this.http.delete<T>(buildApiUrl(endpoint), options);
  }
}
