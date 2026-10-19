import React, { Component } from 'react'
import ServiceSeries from '../services/ServiceSeries'
import { Navigate } from 'react-router-dom'

export default class ModificarPersonaje extends Component {

    service = new ServiceSeries();
    state = {
        series: [],
        personajes: [],
        actualizado: false
    }

    personaje = React.createRef();
    serie = React.createRef();

    loadSeries = () => {
        this.service.getSeries().then(res => {
            this.setState({
                series: res
            })
        })
        
    }

    loadPersonajes = () => {
        this.service.getPersonajes().then(res => {
            this.setState({
                personajes: res
            })
        })
        console.log(this.serie.current);
        
    }

    actualizarPersonaje = (e) => {
        e.preventDefault();
        
        let idPersonaje = this.personaje.current.value;
        let idSerie = this.serie.current.value;
        this.service.actualizarPersonaje(idPersonaje, idSerie).then(res => {
            this.setState({
                actualizado: true
            })
        })
    }

    componentDidMount() {
        this.loadSeries();
        this.loadPersonajes();
    }

    render() {
        return (
        <div className="mx-auto max-w-lg px-4 py-8">
            {
                this.state.series.length > 0 &&
                <form onSubmit={this.actualizarPersonaje} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                    <h1 className="mb-6 text-2xl font-bold text-gray-900">
                        Modificar personaje
                    </h1>

                    <div className="mb-4">
                        <label htmlFor="serie" className="mb-2 block text-sm font-medium text-gray-700">
                            Seleccione una serie
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

                    <div className="mb-6">
                        <label htmlFor="personaje" className="mb-2 block text-sm font-medium text-gray-700">
                            Seleccione un personaje
                        </label>
                        <select
                            id="personaje"
                            ref={this.personaje}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        >
                        {
                            this.state.personajes.map((personaje, index) => {
                                return(<option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>)
                            })
                        }
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    >
                        Actualizar personaje
                    </button>
                    {
                        this.state.actualizado &&
                        <Navigate to={"/reparto/" + this.serie.current.value} />
                    }
                </form>
            }
        </div>
        )
    }
}
