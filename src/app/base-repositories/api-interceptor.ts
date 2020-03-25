import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { apiBaseAddress } from '../utils/base-address';

export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*
            var headers = req.headers;
            headers = headers.append("authorization", "{user: username, pass: password}");
            headers = headers.append("x-auth-token", "bearer sample-token");
        */
        const apiReq: HttpRequest<any> = req.clone({
            url: `${apiBaseAddress}${req.url}`,
            // url: req.url.startsWith("https") ? req.url : `${apiBaseAddress}${req.url}`,            
            // headers: headers
        });
        return next.handle(apiReq);
    }
}
