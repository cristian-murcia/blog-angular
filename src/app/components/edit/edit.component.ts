import { Component, OnInit } from '@angular/core';
import { Project } from '../../modules/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public fileToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.title = 'Crear proyecto';
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id;

      this.getProject(id);
    });
  }

  //Metodo que me trae los detalles de un proyecto
  getProject(id) {
    this._projectService.getProject(id).subscribe(
      response => {
        this.project = response.project;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // Metodo para la modificacion de datos
  onSubmit(form) {
    this._projectService.updateProject(this.project).subscribe(
      response => {
        if (response.project) {
          //Subir la imagen
          if (this.fileToUpload) {
            this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.fileToUpload, 'image')
              .then((result) => {
                this.save_project = response.project;
                this.status = 'success';
              });
              alert("Actualizado");
          } else {
            this.save_project = response.project;
            this.status = 'success';
            alert("Actualizado");
          }
        } else {
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  // Metodo que guarda la imagen con los datos cargados en el metodo onSubmit()
  fileChangeEvent(fileInput: any) {
    this.fileToUpload = <Array<File>>fileInput.target.files;
  }

}
