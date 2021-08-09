import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'https://localhost:5001/api';


  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/File/uploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    var result = this.http.get(`${this.baseUrl}/File/getAllFiles`);
    return result;
  }

  downloadFile(fileName: string): Observable<any> {
    const url = `${this.baseUrl}/File/download/${fileName}`;
    return this.http.get(url, {
      responseType: 'blob'
    });
  }
}
