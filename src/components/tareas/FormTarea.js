import React, { useContext, useState, useEffect } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //Extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    const [tarea, guardarTarea] = useState({
        nombre: ''
    });

    //Extraer datos del state
    const { nombre } = tarea;

    //Obtener las funcion de agregar tareas
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, obtenerTareas, agregarTarea, validarTarea, actualizarTarea, limpiarTarea } = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null) {
            guardarTarea(tareaseleccionada);
        } else {
            guardarTarea({
                nombre: ''
            });
        }
    }, [tareaseleccionada])

    //Si no hay proyecto seleccionado
    if (!proyecto)
        return null;

    //Array destructuring para extraer el proyecto actual
    const [proyectoSeleccionado] = proyecto;

    //Leer nombre del formulario
    const handleChangeForm = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitTareas = e => {
        e.preventDefault();

        //Validar el form
        if (nombre.trim() === ''){
            validarTarea();
            return;
        }

        //Revisar si es edición o nueva tarea
        if (tareaseleccionada === null) {
            //Agregar tarea al State de Tareas
            tarea.proyecto = proyectoSeleccionado._id;
            agregarTarea(tarea);
        } else {
            actualizarTarea(tarea);
            limpiarTarea();
        }

        //Obtener y filtrar las tareas
        obtenerTareas(proyectoSeleccionado._id);

        //Reiniciar el form
        guardarTarea({
            nombre: ''
        })

    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmitTareas}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChangeForm}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
                    />
                </div>
            </form>
            {
                errortarea ? 
                    <p className="mensaje error">El nombre de la tarea es obligatorio</p>
                : null
            }
        </div>
    );
}
 
export default FormTarea;