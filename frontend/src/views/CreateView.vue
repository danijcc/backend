<template>
    <div class="row mt-3">   
        <div class="col-md-6 offset-md-3">
            <div class="card">
                <div class="card-header bg-dark text-white text-center">Crear Libros</div>
                    <div class="card-body">
                        <form v-on:submit="guardar">
                            <div class="input-group mb-3">
                                <span class="input-group-text"><i class="fa-solid fa-gift"></i></span>
                                <input type="text" v-model="title" id="title" class="form-control"
                                maxlength="50" placeholder="Nombre del libro" required>
                            </div>
                            <div class="d-grid col-6 mx-auto">
                                <button class="btn btn-success"><i class="fa-solid fa-floppy-disk"></i>Guardar</button>
                            </div>
                        </form>
                    </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import {show_alerta,enviarSolicitud} from '../funciones';
    export default{
        data(){
            return{
                title:'',url:'http://127.0.0.1:8000/api/books'
            } 
        }
        ,methods:{
            guardar(){
                event.preventDefault();
                if(this.title.trim() === ''){
                    show_alerta('Escribe el nombre','warning','nombre');
                }
                else{
                    var parametros = {title:this.title.trim()}
                    enviarSolicitud('POST',parametros,this.url,'Libro Guardado');
                }
            }
        }
    }
</script>
