import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    baseUrl: string = 'http://localhost:4000/api/v1/categories';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl);
    }

    get(id: any): Observable<Category> {
        return this.http.get(`${this.baseUrl}/${id}`);
    }

    create(data: any): Observable<any> {
        return this.http.post(this.baseUrl, data);
    }

    update(id: any, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}`, data);
    }

    delete(id: any): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    deleteAll(): Observable<any> {
        return this.http.delete(this.baseUrl);
    }

    findByName(name: any): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.baseUrl}?name=${name}`);
    }
}
