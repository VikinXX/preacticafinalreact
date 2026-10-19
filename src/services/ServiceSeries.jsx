import React, { Component } from 'react'
import axios from 'axios'
import global from '../Global'

export default class ServiceSeries extends Component {

    getSeries() {
        return new Promise((resolve, reject) => {
            axios.get(global.urlSeries + "api/Series").then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    getSerie(id) {
        return new Promise((resolve, reject) => {
            axios.get(global.urlSeries + "api/Series/" + id).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    getReparto(id) {
        return new Promise(function(resolve, reject) {
            axios.get(global.urlSeries + "api/Series/PersonajesSerie/" + id).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    insertarPersonaje(personaje) {
        return new Promise((resolve, reject) => {
            axios.post(global.urlSeries + "api/Personajes", personaje).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    getPersonajes() {
        return new Promise((resolve, reject) => {
            axios.get(global.urlSeries + "api/Personajes").then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    actualizarPersonaje(idPersonaje, idSerie) {
        return new Promise((resolve, reject) => {
            axios.put(global.urlSeries + "api/Personajes/" + idPersonaje + "/" + idSerie).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

}
