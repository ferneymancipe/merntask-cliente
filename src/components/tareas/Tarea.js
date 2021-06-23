import React, {useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Tarea = ({ tarea }) => {

    //Extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;
    
    //Array destructuring para extraer el proyecto actual
    const [proyectoSeleccionado] = proyecto;

    //Obtener las funcion de eliminar tareas
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas, eliminarTarea, actualizarTarea, guardarTareaActual } = tareasContext;

    //Función que se ejecuta cuando elimina tarea
    const tareaEliminar = id => {
        eliminarTarea(id);
        obtenerTareas(proyectoSeleccionado._id);
    }

    //Función que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        tarea.estado = !tarea.estado;
        actualizarTarea(tarea)
    }

    //Agrega una tarea actual cuando desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {
                    tarea.estado ?
                        (<button
                            type="button"
                            className="completo"
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Completo
                        </button>)
                    :
                        (<button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >
                            Incompleto
                        </button>)

                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={ () => tareaEliminar(tarea._id)}
                >Eliminar</button>
            </div>
        </li>
    );
}
 
export default Tarea;