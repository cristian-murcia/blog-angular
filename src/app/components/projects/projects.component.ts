import { Component, OnInit } from '@angular/core';
import { Project } from '../../modules/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Project[];
  public url: string;

  constructor(
    private _projectService: ProjectService
  ) { 
    this.url = Global.url;
  }

  //Este metodo se ejecuta cada vez que se ejecute el componene
  ngOnInit(): void {
    this.getProjects();
  }

  //Metodo que nos muestra los proyectos guardados
  getProjects(){
    this._projectService.getProjects().subscribe(
      response => {
        this.projects = response.projects;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
