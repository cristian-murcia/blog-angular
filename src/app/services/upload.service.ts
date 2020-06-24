import { Injectable } from '@angular/core';
import { Global } from './global';

@Injectable()
export class UploadService{
    public url: string;

    constructor(){
        this.url = Global.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){
        return new Promise(function(resolve, reject){
            var formData: any = new FormData(); //FormData() https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest/FormData
            var xhr = new XMLHttpRequest(); // XMLHttpRequest() https://developer.mozilla.org/es/docs/Web/API/XMLHttpRequest

            for(var i = 0; i < files.length; i++){
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if (xhr.status == 200){ //Comprueba el estado
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true); //open() inicia una solicitud
            xhr.send(formData); //send() envia la solicitud
        });
    }

}