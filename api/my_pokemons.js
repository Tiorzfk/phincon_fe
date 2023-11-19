const BASE_API = process.env.BASE_API
import axios from 'axios';

export function getMyPokemonsList(params) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_API}/my-pokemons`, {params}).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })
}

export function getMyPokemonsDetail(id) {
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_API}/my-pokemons/${id}`).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })
}

export function storeReleasePokemon(id, data) {
    return new Promise((resolve, reject) => {
        axios.post(`${BASE_API}/my-pokemons/${id}/release`, data).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })
}

export function updateMyPokemon(id, data) {
    return new Promise((resolve, reject) => {
        axios.put(`${BASE_API}/my-pokemons/${id}`, data).then(function(response) {
            resolve(response.data)
        }).catch(function(error) {
            reject(error)
        })
    })
}