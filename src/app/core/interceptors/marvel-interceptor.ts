import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

import { DRXAVIER, MAGNETO } from '../services/api/api.endpoints';

@Injectable()
export class MarvelInterceptor implements HttpInterceptor {
    public intercept(req: HttpRequest<any>, next: HttpHandler) {
        const stamp = Date.now();
        const md5 = new Md5();

        const cloned = req.clone({
            params: req.params
                .append('ts', stamp.toString())
                .append('apikey', MAGNETO)
                .append(
                    'hash',
                    md5
                        .appendStr(stamp.toString() + DRXAVIER + MAGNETO)
                        .end()
                        .toString()
                )
                .append('limit', '56')
        });

        return next.handle(cloned);
    }
}
