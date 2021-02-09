import { Component, OnInit } from '@angular/core';
import { lista } from 'src/app/shared/model/lista.model';
import { ListaService } from 'src/app/shared/service/lista.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  

  constructor(
    public listaService: ListaService
  ) { }

  ngOnInit(): void {
    this.getLista();
  }

  getLista(){
    this.listaService.getListaWithFlag('').subscribe(
      data => {
        //this.listadeUsuarios = data.content;
        console.log(this);

      }
    )
  }

}
