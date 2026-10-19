import React, { Component } from 'react'
import ServiceSeries from '../services/ServiceSeries'


export default class RepartoSerie extends Component {

    service = new ServiceSeries();
    state = {
        reparto: []
    }

    loadreparto = (id) => {
        this.service.getReparto(id).then(res => {
            this.setState({
                reparto: res
            })
        })
    }

    componentDidMount() {
        this.loadreparto(this.props.idSerie);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.idSerie !== this.props.idSerie) {
            this.loadreparto(this.props.idSerie);
        }
    }

    render() {
        return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            {
                this.state.reparto.length !== 0 &&
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="w-full text-left text-sm text-gray-600">
                        <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-4">Personaje</th>
                                <th scope="col" className="px-6 py-4">Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.reparto.map((personaje, index) => {
                                    return(
                                        <tr key={index} className="border-t border-gray-200 bg-white hover:bg-gray-50">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                                                {personaje.nombre}
                                            </td>
                                            <td className="px-6 py-4">
                                                <img
                                                    src={personaje.imagen}
                                                    alt={personaje.nombre}
                                                    className="h-20 w-20 rounded-lg object-cover"
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
        )
    }
}
