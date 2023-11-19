const BASE_API = process.env.BASE_API
import axios from 'axios';

export function getPokemonsList(params) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_API}/pokemons`, {params}).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })
}

export function getPokemonsDetail(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_API}/pokemons/${id}`).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })
}

export function storeCatchPokemon(id, data) {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_API}/pokemons/${id}/catch`, data).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })
}

export function updatePokemon(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_API}/pokemons/${id}`, data).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })
}

export function downloadPokemon(params) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_API}/pokemons/download`, { params }).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })
}