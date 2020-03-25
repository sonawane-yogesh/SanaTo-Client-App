import { Observable } from 'rxjs';
import { RequestConfig } from './BaseRepository';

export interface IBaseRepository<TSource> {
    getAllItems(endPoint: string): Observable<Array<TSource>>;
    getItemsByFilterQuery(endPoint: string, filterQuery: object): Observable<TSource[]>;
    getItemWithFilter(endPoint: string, filterQuery: object): Observable<TSource>;
    addItem(endPoint: string, t: TSource): Observable<TSource | Array<TSource>>;
    getItem(endPoint: string): Observable<TSource>;
    getDocument(endPoint: string, filterQuery?: object): Observable<TSource>;
    findById(endPoint: string): Observable<TSource>;
    updateItem(endPoint: string, t: TSource): Observable<TSource>;
    updateItemById(endPoint: string, id: string, tSource: TSource): void;
    deleteItem(endPoint: string, id: string): void;
    bulkInsert(endPoint: string, t: Array<TSource>): Observable<Number>;
    aggregate(endPoint: string, pipeline: Array<object>): Observable<TSource[]>;
    executeAction(config: RequestConfig): Observable<TSource | Array<TSource>>;
}
