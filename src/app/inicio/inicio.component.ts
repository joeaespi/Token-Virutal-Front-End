import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { Observable, Subject, timer } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(public usuariosService: UsuariosService, private router: Router,) { }

  ngOnInit(): void {

    if(this.info == true){
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
    }
  }

  obtenerUsuarios() {
    this.usuariosService.getUsuarios().subscribe(data => {
      this.usuarios = Object.values(data);
      console.log(this.usuarios);
      /**if(this.info == true){
        console.log("la info se esta mostrando, por lo tanto se va actualiar cada 60 sg")
        setTimeout(() => {
          window.location.reload();
        }, 60000);
      }*/
    }, (error) => {
      console.error(error);
    })
  }

  onSelect(usuario,token): void {
    if(this.info){
      this.info = false;
      sessionStorage.setItem("info", this.info.toString())
    }
    sessionStorage.setItem("usuario",usuario);
    sessionStorage.setItem("token", token);
    this.usuariosService.getUsarToken(usuario,token).subscribe(data => {
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
    this.startTimer();
  }

  onSelect2(): void {
    this.pauseTimer();
    if(this.datos){
      this.datos = false;
      this.info = true;
      sessionStorage.setItem("datos", this.datos.toString())
      sessionStorage.setItem("info", this.info.toString())
      window.location.reload();
    }

  }

  oberserableTimer() {
    const source = timer(1000, 1000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer() {
    this.info =false;
    this.interval = setInterval(() => {
      if(this.timeLeft >0) {
        this.timeLeft--;
      } else {
        this.usuariosService.getGenerarToken(sessionStorage.getItem('usuario')).subscribe(data => {

          if(this.nombre == sessionStorage.getItem('usuario') ){
            this.token=data["token"];
            sessionStorage.setItem("token", data["token"]);
          }else{
            this.nombre=data["usuario"];
            this.token=data["token"];
            sessionStorage.setItem("usuario",data["usuario"]);
            sessionStorage.setItem("token", data["token"]);
          }
          this.timeLeft = 60;
        }, (error) => {
          console.error(error);
          //sessionStorage.removeItem(datos)
        })

      }
    },1000)

  }

  pauseTimer() {
    clearInterval(this.interval);
    this.timeLeft = 60;
  }

}
