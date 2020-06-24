import { Injectable } from '@angular/core'; //Es un patron de diseño que requiere instancias de clases externas 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../modules/project';
import { Global } from './global';

@Injectable()
export class ProjectService {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = Global.url;
    }

    testService() {
        return 'Probando en servicio de Angular'
    }

    //Metodo que realiza una peticion post para guardar datos
    saveProject(project: Project): Observable<any> {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'save-project', params, { headers: headers });
    }

    //Metodo que nos trae los proyectos por medio de una peticion
    getProjects(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'projects', { headers: headers });
    }

    //Metodo que trae detalles de un proyecto
    getProject(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + 'project/' + id, { headers: headers });
    }

    //Metodo que elimina un proyecto
    deleteProject(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'deleteProject/' + id, { headers: headers });
    }

    //Metodo para modificar datos
    updateProject(project): Observable<any> {
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'updateproject/' + project._id, params, { headers: headers});
    }

}