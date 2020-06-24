import { Component, OnInit } from '@angular/core';
import { Project } from '../../modules/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

  public title: string;
  public project: Project;
  public save_project;
  public status: string;
  public fileToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) {
    this.title = 'Crear proyecto';
    this.project = new Project('', '', '', '', 2020, '', '');
    this. url = Global.url;
  }

  ngOnInit(): void {
  }

  // Metodo que guarda los datos del formulario en la base de datos
  onSubmit(form) {
    // console.log(this.project);

    //Guardar datos
    this._projectService.saveProject(this.project).subscribe(
      response => {
        if (response.project) {

          //Subir la imagen
          this._uploadService.makeFileRequest(Global.url + 'upload-image/' + response.project._id, [], this.fileToUpload, 'image')
            .then((result) => {
              this.save_project = response.project;
              this.status = 'success';
              form.reset();
            });

          // console.log(response);
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
