import React, { useEffect, useState } from 'react';

import { FiCheck, FiX } from 'react-icons/fi'
import { useHistory, useParams } from 'react-router-dom';
import deleteOrphanageImg from '../images/delete-orphanage.svg';
import api from '../services/api';

import '../styles/pages/delete-orphanage.css';

interface RouteParams {
    id: string
}

interface Orphanage {
    name: string
}

export default function DeleteOrphanage() {
    const { goBack } = useHistory();
    const params = useParams<RouteParams>();
    const [orphanage, setOrphanage] = useState<Orphanage>();

    function deleteOrphanage() {
        api.delete(`orphanages/${params.id}`).then(
            function () {
                goBack();
            }
        )
    }

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then(response => {
            setOrphanage(response.data);
        })
    }, [params.id])

    return (
        <div id="delete-orphanage-page">
            <main>
                <h1>Excluir!</h1>
                <p>Você tem certeza que quer excluir {orphanage?.name}?</p>

                <div className="confirm-buttons">
                    <button onClick={goBack}>
                        <FiX size={24} color="white" />
                        Não
                    </button>
                    <button onClick={deleteOrphanage}>
                        <FiCheck size={24} color="white" />
                        Sim
                    </button>
                </div>
            </main>

            <img src={deleteOrphanageImg} alt="Remover orfanato" />
        </div>
    )
}