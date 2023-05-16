import Swal from "sweetalert2";
import axios from "axios";

export function show_alerta(mensaje,icono,foco=''){
    if(foco !==''){
        document.getElementById(foco).focus();
    }
    Swal.fire({
        title:mensaje,
        icon:icono,
        customClass: {confirmButton: 'btn btn-primary', popup:'animated zoomIn' },
        buttonsStyling:false
    });
}

export function confirmar(id,title){
    var url = 'http://127.0.0.1:8000/api/foods/'+id;
    const swalWhitBootstrapButton= Swal.mixin({
        customClass:{
            confirmButton:'btn btn-success me-3',
            cancelButton:'btn btn-danger'
        },
        buttonsStyling:false
    });

    swalWhitBootstrapButton.fire({
        title: 'Seguro de eliminar el Item ' + title +" ?",
        text: 'Se perdera la informacion del producto',
        icon: 'question',
        showCancelButton:true,
        confirmButtonText:'<i class="fa-solid fa-check"></i> Si, eliminar',
        cancelButtonText:'<i class="fa-solid fa-ban"></i> Cancelar'
    })
    .then((ressult)=>{
        if(ressult.isConfirmed){
            enviarSolicitud('DELETE',{id:id},url,'Producto eliminado');
        }else{
            show_alerta('Operacion cancelada','info');
        }
    })
}

export function enviarSolicitud(metodo,parametros,url,mensaje){
    axios({method:metodo,url:url,data:parametros})
    
    .then(function(respuesta){
        console.log('resp->', respuesta)
        let status = respuesta.status;
        console.log('status->', status)
        if([200, 201, 204].includes(status)){
            show_alerta(mensaje,status);
            window.setTimeout(function(success){
            window.location.href='/';
            },1000);
        }else{
            var listado='';
            var errores = respuesta.data.data[1]['errors'];
            Object.keys(errores).forEach(
                key => listado += errores[key][0]+'.');
                show_alerta(listado,'error');
        }
        
    }).catch(function(error){
        show_alerta('Error en la solicitud','error');
        // window.setTimeout(function(){
        //     window.location.href='/';
        // },1000);
    
    });

}