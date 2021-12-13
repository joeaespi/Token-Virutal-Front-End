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
  nombre:String="";
  token:String="";
  btn =false;
  datos=false;
  info=true;

  timeLeft: number = 60;
  interval;
  subscribeTimer: any;

  constructor(public usuariosService: UsuariosService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerUsuarios();

    /*if(this.info == true){
      this.obtenerUsuarios();
      this.pauseTimer();
    }
    console.log(sessionStorage.getItem('datos'),sessionStorage.getItem('usuario'),sessionStorage.getItem('token'))
    if(sessionStorage.getItem('info')!=null){
      this.info=(sessionStorage.getItem('info') == "true")
    }
    if(sessionStorage.getItem('datos')!=null){
      this.datos=(sessionStorage.getItem('datos') == "true")
    }

    if(sessionStorage.getItem('usuario')!=null){
      this.nombre=sessionStorage.getItem('usuario');
    }
    if(sessionStorage.getItem('token')!=null){
      this.token=sessionStorage.getItem('token');
    }
    if(this.datos == true){
      this.timeLeft=60;
      this.onSelect(sessionStorage.getItem('usuario'),sessionStorage.getItem('token'));
      this.startTimer();
    }*/
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
    /**this.usuariosService.getUsarToken(usuario,token).subscribe(data => {
      console.log("Usuario: ",data["usuario"]," Token: ",data["token"]);
      if(!this.datos){
        this.nombre=data["usuario"];
        this.token=data["token"];
        this.datos =true;
        this.timeLeft=60;
        sessionStorage.setItem("datos", this.datos.toString())
      }else{
        if(this.nombre == sessionStorage.getItem('usuario')){
          this.token=data["token"];
          sessionStorage.setItem("token", data["token"]);
        }else{
          this.nombre=data["usuario"];
          this.token=data["token"];
          sessionStorage.setItem("usuario",data["usuario"]);
          sessionStorage.setItem("token", data["token"]);
        }
      }
    }, (error) => {
      console.error(error);
      //sessionStorage.removeItem(datos)
    })
    this.startTimer();**/
    console.log("voy a cambiar de ruta con este usuario",usuario)
    this.router.navigate(['/cliente',usuario]);
    //this.router.navigate(['/cliente/'], {
      //queryParams: { cliente: this.nombre, token: this.token }
   //});
    //this.router.navigate(['/cliente/', usuario]);
  }


}
