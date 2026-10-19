import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import ServiceSeries from '../services/ServiceSeries'

export default class Menu extends Component {

    service = new ServiceSeries();
    state = {
        series: [],
        isMenuOpen: false,
        isSeriesOpen: false,
        error: null
    }

    loadSeries = () => {
        this.service.getSeries().then(res => {
            this.setState({
                series: res,
                error: null
            })
        }).catch(error => {
            console.error('No se pudieron cargar las series', error)
            this.setState({
                error: 'No se pudieron cargar las series.'
            })
        })
    }

    componentDidMount() {
        this.loadSeries();
    }

    closeMenu = () => {
        this.setState({
            isMenuOpen: false,
            isSeriesOpen: false
        })
    }

    toggleMenu = () => {
        this.setState(previousState => ({
            isMenuOpen: !previousState.isMenuOpen
        }))
    }

    toggleSeries = () => {
        this.setState(previousState => ({
            isSeriesOpen: !previousState.isSeriesOpen
        }))
    }

    render() {
        const { series, isMenuOpen, isSeriesOpen, error } = this.state

        return (
            <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
                    <NavLink to="/" onClick={this.closeMenu} className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-lg font-bold text-white">
                            S
                        </span>
                        <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
                            Series y personajes
                        </span>
                    </NavLink>

                    <button
                        type="button"
                        onClick={this.toggleMenu}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden dark:text-gray-400 dark:hover:bg-gray-700"
                        aria-controls="main-navigation"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Abrir menú principal</span>
                        <svg className="h-6 w-6" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div id="main-navigation" className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
                        <ul className="mt-4 flex flex-col gap-1 rounded-lg border border-gray-100 bg-gray-50 p-2 font-medium md:mt-0 md:flex-row md:items-center md:gap-2 md:border-0 md:bg-white md:p-0 dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900">
                            <li>
                                <NavLink to="/" end onClick={this.closeMenu} className={this.linkClassName}>
                                    Inicio
                                </NavLink>
                            </li>
                            <li className="relative">
                                <button
                                    type="button"
                                    onClick={this.toggleSeries}
                                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white md:w-auto"
                                    aria-expanded={isSeriesOpen}
                                    aria-controls="series-menu"
                                >
                                    Series
                                    <svg className={`ml-2 h-4 w-4 transition-transform ${isSeriesOpen ? 'rotate-180' : ''}`} aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div id="series-menu" className={`${isSeriesOpen ? 'block' : 'hidden'} mt-1 w-full rounded-lg border border-gray-100 bg-white py-2 shadow-lg md:absolute md:left-0 md:mt-2 md:w-56 dark:border-gray-700 dark:bg-gray-700`}>
                                    {error && <p className="px-4 py-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
                                    {!error && series.length === 0 && <p className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">Cargando series...</p>}
                                    {series.map(serie => (
                                        <NavLink
                                            key={serie.idSerie}
                                            to={`/serie/${serie.idSerie}`}
                                            onClick={this.closeMenu}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            {serie.nombre}
                                        </NavLink>
                                    ))}
                                </div>
                            </li>
                            <li>
                                <NavLink to="/insertarPersonaje" onClick={this.closeMenu} className={this.linkClassName}>
                                    Insertar personaje
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/modificarPersonaje" onClick={this.closeMenu} className={this.linkClassName}>
                                    Modificar personaje
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
