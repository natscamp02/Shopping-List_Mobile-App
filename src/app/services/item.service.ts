import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root'
})
export class ItemService {

    baseUrl: string = 'http://localhost:4000/api/v1/items';

    constructor(private http: HttpClient) { }

    getAll(): Observable<Item[]> {
        return this.http.get<Item[]>(this.baseUrl);
    }

    get(id: any): Observable<Item> {
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

    findByName(name: any): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.baseUrl}?name=${name}`);
    }
}
