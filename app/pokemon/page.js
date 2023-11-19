"use client";

import { useState, useEffect } from 'react'
import { GridItems } from '../components/GridItems'
import ModalData from '../components/Modal'
import ModalCatch from '../components/ModalCatch'
import ModalEdit from '../components/ModalEdit'
import { useAppDispatch, useAppSelector } from "../store"
import { getPokemonsList, getPokemonsDetail, storeCatchPokemon, updatePokemon, downloadPokemon } from "../../api/pokemons"
import { getMyPokemonsList, updateMyPokemon, storeReleasePokemon } from "../../api/my_pokemons"
import { setPokemons, setDetail } from "../store/pokemons/pokemonSlice";
import toast, { Toaster } from 'react-hot-toast';
import styles from './layout.module.css'

export default function Page() {
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingDetail, setIsLoadingDetail] = useState(false)
    const [isLoadingCatch, setIsLoadingCatch] = useState(false)
    const [isLoadingSave, setIsLoadingSave] = useState(false)
    const [isLoadingRefresh, setIsLoadingRefresh] = useState(false)
    const listPokemons = useAppSelector((state) => state.pokemons.data.result);
    const paramsPokemons = useAppSelector((state) => state.pokemons.params);
    const detailPokemon = useAppSelector((state) => state.pokemons.detail);
    const [tabActive, setTabActive] = useState('list');

    const dispatch = useAppDispatch();

    const fetchPokemons = async () => {
        setIsLoading(true)
        const response = await getPokemonsList(paramsPokemons)
        dispatch(setPokemons(response))
        setIsLoading(false)
    }

    const fetchMyPokemons = async () => {
        setIsLoading(true)
        const response = await getMyPokemonsList(paramsPokemons)
        dispatch(setPokemons(response))
        setIsLoading(false)
    }

    useEffect(() => {
        if(tabActive == 'list')
        {
            fetchPokemons()
        }else{
            fetchMyPokemons()
        }
    }, [tabActive])
    
    const [showModal, setShowModal] = useState(false)
    const [showModalCatch, setShowModalCatch] = useState(false)
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [editNickname, setEditNickname] = useState('')

    const detail = async (data) => {
        setShowModal(true)

        setIsLoadingDetail(true)
        const response = await getPokemonsDetail(data._id)
        dispatch(setDetail(response.result))
        setIsLoadingDetail(false)
    }

    const catchPokemon = async () => {
        setIsLoadingCatch(true)

        if(Math.random() > 0.5)
        {
            setShowModal(false)
            setShowModalCatch(true)
        }else{
            await updatePokemon(detailPokemon._id, {
                is_catched: 2
            })

            const response = await getPokemonsDetail(detailPokemon._id)
            dispatch(setDetail(response.result))

            toast.error("Pokemon failed catched !")
        }

        setIsLoadingCatch(false)
    }

    const releasePokemon = async () => {
        setIsLoadingCatch(true)

        try {
            const releaseResponse = await storeReleasePokemon(detailPokemon._id)
            console.log(releaseResponse);

            setShowModal(false)
            fetchMyPokemons()

            toast.success("Pokemon successfully released")
        } catch (error) {
            if(error.response) {
                toast.error(error.response.data.message)
                console.log(error.response);
            }
        }

        setIsLoadingCatch(false)
    }

    const savePokemon = async (nickname) => {
        setIsLoadingSave(true)

        const respCatch = await storeCatchPokemon(detailPokemon._id, {
            nickname: nickname
        })
        
        // const response = await getPokemonsDetail(detailPokemon._id)
        // dispatch(setDetail(response.result))
        fetchPokemons()

        setShowModalCatch(false)

        toast.success("Pokemon successfully catched, you can check on my pokemons page !")
        setIsLoadingCatch(false)
        setIsLoadingSave(false)
    }

    const updatePokemonNickname = async (nickname) => {
        setIsLoadingSave(true)

        await updateMyPokemon(detailPokemon._id, {
            nickname: nickname
        })
        
        fetchMyPokemons()

        setShowModalEdit(false)

        toast.success("Pokemon successfully updated")
        setIsLoadingSave(false)
    }

    const refreshData = async () => {
        setIsLoadingRefresh(true)

        toast("Please wait, downloading pokemons...")

        const response = await downloadPokemon()
        fetchPokemons()

        setIsLoadingRefresh(false)
    }

    return <>
        <nav className={styles.navbar}>
            <div className={tabActive == 'list' ? styles.navbarActive : styles.navbarMenu}
                onClick={() => setTabActive('list')}>
                List Pokemon
            </div>
            <div className={tabActive == 'my' ? styles.navbarActive : styles.navbarMenu}
                onClick={() => setTabActive('my')}>
                My Pokemon
            </div>
        </nav>
        <div className="container-fluid p-4">
            <div className="row d-flex justify-center">
                {
                    isLoading ? 
                    <>
                        <div className="d-flex justify-content-center">
                            <span>Loading...</span>
                        </div>
                    </> :
                    listPokemons.length == 0 && !isLoading ?
                    <>
                        <div className="d-flex justify-content-center align-self-center align-items-center flex-column w-100 gap-2">
                            <span>Empty data</span>
                            {
                                tabActive == 'list' ?
                                    isLoadingRefresh ? 
                                        <div className="spinner-border text-primary spinner-border-sm" role="status">
                                        </div>
                                    : 
                                        <span style={{ color: "blue", cursor: "pointer" }} onClick={() => refreshData()}>Click here to refresh data</span>
                                : ''
                            }
                        </div>
                    </> :
                    listPokemons.map((data, i) => {
                        return <GridItems 
                                    item={data} 
                                    key={i} 
                                    index={i} 
                                    click_detail={detail} 
                                />
                    })
                }
            </div>

            <div>
                <ModalData 
                    show={showModal} 
                    setShow={setShowModal}
                    data={detailPokemon}
                    isLoading={isLoadingDetail}
                    isLoadingCatch={isLoadingCatch}
                    handleCatch={catchPokemon}
                    handleRelease={releasePokemon}
                    tabActive={tabActive}
                    clickEdit={(nickname) => {
                        console.log(nickname);
                        setEditNickname(nickname)
                        setShowModal(false)
                        setShowModalEdit(true)
                    }} />

                <ModalCatch 
                    show={showModalCatch}
                    setShow={setShowModalCatch}
                    handleSave={savePokemon}
                    isLoading={isLoadingSave}
                    handleClose={() => {
                        setShowModalCatch(false)
                        setShowModal(true)
                    }}
                />

                <ModalEdit
                    show={showModalEdit}
                    setShow={setShowModalEdit}
                    handleSave={updatePokemonNickname}
                    isLoading={isLoadingSave}
                    nickname={editNickname}
                    handleClose={() => {
                        setShowModal(true)
                        setShowModalEdit(false)
                    }}
                />
            </div>

            <Toaster />
        </div>
    </>
}