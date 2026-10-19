import React, { Component } from 'react'
import ServiceSeries from '../services/ServiceSeries'
import { NavLink } from 'react-router-dom'

export default class DetallesSerie extends Component {
    
    service = new ServiceSeries();
    state = {
        serie: []
    }

    loadSerie = (id) => {
        this.service.getSerie(id).then(res => {
            this.setState({
                serie: res
            })
        })
    }

    componentDidMount() {
        this.loadSerie(this.props.idSerie);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.idSerie !== this.props.idSerie) {
            this.loadSerie(this.props.idSerie);
        }
    }
    
    render() {
        return (
        <div className="mx-auto max-w-lg px-4 py-8">
            {
                this.state.serie.length !== 0 &&
                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <img
                        src={this.state.serie.imagen}
                        alt={this.state.serie.nombre}
                        className="h-64 w-full object-cover"
                    />
                    <div className="p-6">
                        <h3 className="mb-2 text-2xl font-bold text-gray-900">
                            {this.state.serie.nombre}
                        </h3>
                        <p className="mb-6 text-gray-600">
                            Puntuación: <span className="font-semibold text-gray-900">{this.state.serie.puntuacion}</span>
                        </p>
                        <NavLink
                            className="inline-block rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            to={"/reparto/" + this.state.serie.idSerie}
                        >
                            Ver reparto
                        </NavLink>
                    </div>
                </div>
            }
        </div>
        )
    }
}
