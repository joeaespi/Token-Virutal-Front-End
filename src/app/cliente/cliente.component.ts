import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicios/usuarios.service';
import { Observable, Subject, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  nombre:String="";
  token:String="";
  timeLeft: number = 60;
  interval;
  subscribeTimer: any;

  constructor(public usuariosService: UsuariosService, private router: Router,) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('usuario')!=null){
      this.nombre=sessionStorage.getItem('usuario');
    }
    if(sessionStorage.getItem('token'+this.nombre)!=null){
      this.token=sessionStorage.getItem('token'+this.nombre);
    }else{
      this.token = "";
    }
    this.cargaInicial(this.nombre,this.token);
  }

  cargaInicial(usuario,token): void {
    this.usuariosService.getUsarToken(usuario,token).subscribe(data => {
      console.log("Usuario: ",data["usuario"]," Token: ",data["token"]);
      if(usuario == data["usuario"]){
        this.token=data["token"];
        sessionStorage.setItem("token"+data["usuario"], data["token"]);
      }else{
        this.nombre=data["usuario"];
        this.token=data["token"];
        sessionStorage.setItem("usuario",data["usuario"]);
        sessionStorage.setItem("token"+data["usuario"], data["token"]);
      }
    }, (error) => {
      console.error(error);

    })
    this.startTimer();
  }

  onSelect2(): void {
    this.pauseTimer();
    this.router.navigate(['/inicio']);
    //sessionStorage.removeItem(datos)


  }

  oberserableTimer() {
    const source = timer(1000, 1000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer() {
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
