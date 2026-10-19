import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Menu from './Menu'
import Home from './Home'
import DetallesSerie from './DetallesSerie'
import { useParams } from 'react-router-dom'
import RepartoSerie from './RepartoSerie'
import InsertarPersonaje from './InsertarPersonaje'
import ModificarPersonaje from './ModificarPersonaje' 

function GetIdSerie() {
    let { idSerie } = useParams();

    return(<DetallesSerie idSerie={idSerie} />)
}

function GetIdReparto(){
    let { idSerie } = useParams();

    return(<RepartoSerie idSerie={idSerie} />)
}

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
            <Menu />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/serie/:idSerie" element={<GetIdSerie />} />
                    <Route path="/reparto/:idSerie" element={<GetIdReparto />} />
                    <Route path="/insertarPersonaje" element={<InsertarPersonaje/>} />
                    <Route path="/modificarPersonaje" element={<ModificarPersonaje/>} />
                </Routes>
            </BrowserRouter>
        )
    }
}
