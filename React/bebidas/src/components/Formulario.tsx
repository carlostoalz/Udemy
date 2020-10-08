import React, { useContext, useState } from 'react';
import { IngredientesContext } from '../context/IngredientesContext';
import { CategoriasContext } from '../context/CategoriasContext';
import { RecetasContext } from '../context/RecetasContext';
import { IBusqueda } from '../interfaces/IBusqueda';

const Formulario = () => {

    const { ingredientes } = useContext(IngredientesContext);
    const { categorias } = useContext(CategoriasContext);
    const { buscarReceta, guardarConsultar } = useContext(RecetasContext);

    const [ busqueda, guardarBusqueda ] = useState<IBusqueda>({
        nombre: '',
        categoria: ''
    });

    // Función para leer los contenidos
    const obtenerDatosReceta = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    };

    return (
        <form 
            className="col-12"
            onSubmit={ e => {
                    e.preventDefault();
                    buscarReceta(busqueda);
                    guardarConsultar(true);
                }
            }
        >
            <fieldset className="text-center">
                <legend>Busca bebidas por categoría o ingrediente</legend>
            </fieldset>
            <div className="row mt-4">
                <div className="col-md-4">
                    <select 
                        name="nombre"
                        className="form-control"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">-- Seleccione Ingrediente --</option>
                        {
                            (ingredientes as any[]).map((ingrediente: any, index: number) => (
                                <option 
                                    key={index} 
                                    value={ingrediente.strIngredient1}
                                >
                                        {ingrediente.strIngredient1}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <select 
                        name="categoria" 
                        className="form-control"
                        onChange={obtenerDatosReceta}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {
                            (categorias as any[]).map( (category:any,index:number) => (
                                <option 
                                    key={index} 
                                    value={category.strCategory}
                                >
                                        {category.strCategory}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-block btn-primary"
                        value="Buscar Bebidas"
                    />
                </div>
            </div>
        </form>
    );
};

export default Formulario;