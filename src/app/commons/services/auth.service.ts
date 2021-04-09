import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRLogin, IRQLogin } from './../models/auth';
import { PathRest } from './../static/path-rest';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) {}
	//CHIKIS EN EL VIDEO POR ERROR PUSE EL MISMO MODELO DE DATOS COMO "RESPUESTA" PERO DEBERIA SER "IRLogin", MIL DISCULPAS
	login(login: IRQLogin): Observable<IRLogin> {
		return this.http.post<IRLogin>(PathRest.GET_LOGIN, login).pipe(
			catchError((error) => {
				console.log('Error en AuthService', error);
				return this.herrorHandler(error);
			})
		);
	}

	herrorHandler(error: HttpErrorResponse): Observable<never> {
		if (error instanceof HttpErrorResponse) {
			if (error.error instanceof ErrorEvent) {
				console.log('ERROR DE CLIENTE');
			} else {
				console.log('ERROR DE SERVIDOR');
				console.log(error.status);
				console.log(error.message);
			}
		} else {
			console.log('OTRO TIPO DE ERROR');
		}
		return throwError(error);
	}
}
