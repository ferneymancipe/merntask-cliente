import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //State para el Nuevo Proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: ''
    });

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        });
    }

    //Guardar datos del formulario Proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //Validar el proyecto
        if (nombre === '') {
            mostrarError();
            return;
        }

        //Agregar al State
        agregarProyecto(proyecto);

        //Reiniciar el form
        guardarProyecto({
            nombre: ''
        });
    }

    //Mostrar el Formulario
    const onClickFormulario = () => {
        mostrarFormulario();
    }

    const { nombre } = proyecto;


    return (
        <Fragment>
            <button
                className="btn btn-block btn-primario"
                type="button"
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </button>
            {
                formulario ? 
                (
                    <form 
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProyecto}
                    >
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />
                        <input 
                            type="submit" 
                            className="btn btn-block btn-primario"
                            value="Agregar Proyecto"
                        />
                    </form>
                ) : null
            }
            {
                errorformulario ?
                    <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                :
                    null
            }
        </Fragment>
    );
}
 
export default NuevoProyecto;