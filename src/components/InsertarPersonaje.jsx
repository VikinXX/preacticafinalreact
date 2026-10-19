import React, { Component } from 'react'
import ServiceSeries from '../services/ServiceSeries'
import { Navigate } from 'react-router-dom';

export default class InsertarPersonaje extends Component {

    service = new ServiceSeries();
    state = {
        series: [],
        insertado: false
    }

    nombre = React.createRef();
    imagen = React.createRef();
    serie = React.createRef();

    loadSeries = () => {
        this.service.getSeries().then(res => {
            this.setState({
                series: res
            })
        })
    }

    insertarPersonaje = (e) => {
        e.preventDefault();
        let personaje = {
            nombre: this.nombre.current.value,
            imagen: this.imagen.current.value,
            idSerie: parseInt(this.serie.current.value)
        }

        this.service.insertarPersonaje(personaje).then(res=> {
            this.setState({
                insertado: true
            })
        })
    }

    componentDidMount() {
        this.loadSeries();
    }

    render() {
        return (
        <div className="mx-auto max-w-lg px-4 py-8">
            {
                this.state.series.length !== 0 &&
                <form onSubmit={this.insertarPersonaje} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-2xl font-bold text-gray-900">
                        Insertar personaje
                    </h1>

                    <div className="mb-4">
                        <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            ref={this.nombre}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="imagen" className="mb-2 block text-sm font-medium text-gray-700">
                            Imagen
                        </label>
                        <input
                            id="imagen"
                            type="text"
                            ref={this.imagen}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="serie" className="mb-2 block text-sm font-medium text-gray-700">
                            Serie
                        </label>
                        <select
                            id="serie"
                            ref={this.serie}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                            {
                                this.state.series.map((serie, index) => {
                                    return(<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                                })
                            }
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Insertar personaje
                    </button>
                </form>
            }
            {
                this.state.insertado &&
                <Navigate to={"/reparto/" + this.serie.current.value}/>
            }
        </div>
        )
    }
}
