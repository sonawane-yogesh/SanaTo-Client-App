import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseRepository } from './IBaseRepository';

@Injectable({
    providedIn: 'root'
})
export class BaseRepository<TSource> implements IBaseRepository<TSource> {
    constructor(protected httpClient: HttpClient) { }
    getAllItems(endPoint: string): Observable<TSource[]> {
        return this.httpClient.get<TSource[]>(endPoint);
    }
    getItemsByFilterQuery(endPoint: string, filterQuery: object): Observable<TSource[]> {
        return this.httpClient.post<TSource[]>(endPoint, filterQuery);
    }
    getItemWithFilter(endPoint: string, filterQuery: object): Observable<TSource> {
        throw new Error("Method not implemented.");
    }
    addItem(endPoint: string, t: TSource): Observable<TSource | Array<TSource>> {
        return this.httpClient.post<TSource | Array<TSource>>(endPoint, t);
    }
    getItem(endPoint: string): Observable<TSource> {
        return this.httpClient.get<TSource>(endPoint);
    }
    getDocument(endPoint: string, filterQuery?: object): Observable<TSource> {
        return this.httpClient.get<TSource>(endPoint, filterQuery);
    }
    findById(endPoint: string): Observable<TSource> {
        return this.httpClient.get<TSource>(endPoint);
    }
    updateItem(endPoint: string, t: TSource): Observable<TSource> {
        throw new Error("Method not implemented.");
    }
    updateItemById(endPoint: string, id: string, tSource: TSource): void {
        throw new Error("Method not implemented.");
    }
    deleteItem(endPoint: string, id: string): Observable<object> {
        return this.httpClient.delete(endPoint, { params: { "id": id } });
    }
    bulkInsert(endPoint: string, t: TSource[]): Observable<Number> {
        return this.httpClient.post<Number>(endPoint, t);
    }
    aggregate(endPoint: string, pipeline: Array<object>): Observable<TSource[]> {
        return this.httpClient.post<TSource[]>(endPoint, pipeline);
    }
    /**
     * This needs to call like jQuery     
    */
    executeAction(config: RequestConfig): Observable<TSource | Array<TSource>> {
        return this.httpClient[config.type]<TSource | Array<TSource>>(config.endPoint, config.data);
    }
}

export interface RequestConfig {
    type: string;
    endPoint: string;
    data?: any | null
}
