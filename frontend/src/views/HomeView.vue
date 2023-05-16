<template>
    <div class="row">   
        <div class="col-lg-8 offset-lg-2">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead><tr><th>#</th><th>NOMBRE</th><th>DESCRIPCION</th><th>PRECIO</th><th>ACCIONES</th></tr></thead>
                    <tbody class="table-group-divider" id="contenido">
                        <tr v-for="book, i in books" :key="book.id">
                        <td>{{ (i+1) }}</td>
                        <td>{{ (book.title) }}</td>
                        <td>{{ (book.created_at) }}</td>
                        <td>{{ (book.updated_at) }}</td>
                            <td>
                                <RouterLink :to="{path:'edit/'+book.id}" class="btn btn-warning">
                                    <i class="fa-solid fa-edit"></i>
                                </RouterLink>
                                <button class="btn btn-danger" v-on:click="eliminar(book.id,book.title)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from "axios";
    import {show_alerta} from '../funciones';
    import Swal from "sweetalert2";
    
    export default{
        data(){
            return { 
                books:null
            }
        }, 
        mounted(){
            this.getBooks();
        },
        methods:{
            getBooks(){
                axios.get('http://127.0.0.1:8000/api/books/').then(
                    response =>(
                        this.books = response.data
                        
                    )
                ); 
            },
            // ELIMINAR ITEM
            eliminar(id,title){
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
                        axios.delete('http://127.0.0.1:8000/api/books/'+id)
                        .then( (response) => {
                            let status = response.status;
                            
                            if([200, 201, 204].includes(status)){
                                show_alerta('Se elimino correctamente', 'success');
                                this.getBooks()

                            }else{
                                var listado='';
                                var errores = respuesta.data.data[1]['errors'];
                                Object.keys(errores).forEach(
                                    key => listado += errores[key][0]+'.');
                                    show_alerta(listado,'error');
                            }
                        })
                    }else{
                       show_alerta('Operacion cancelada','info');
                    }
                })
                
            }
        }

    }
    
</script>
                    

