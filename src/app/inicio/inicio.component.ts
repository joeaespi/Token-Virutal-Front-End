import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { Observable, Subject, timer } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  usuarios:{};


  constructor(public usuariosService: UsuariosService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerUsuarios();

  }

  obtenerUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = Object.values(data);
      console.log(this.usuarios);
    }, (error) => {
      console.error(error);
    })
  }

  onSelect(usuario,token): void {
    sessionStorage.setItem("usuario",usuario);
    sessionStorage.setItem("token"+usuario, token);
    console.log("voy a cambiar de ruta con este usuario",usuario)
    this.router.navigate(['/cliente',usuario]);

  }


}
