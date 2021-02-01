import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { FiPlus, FiCheck, FiX } from "react-icons/fi";

import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from "../services/api";

import '../styles/pages/edit-orphanage.css';

interface Images {
    url: string,
    id: string
}

interface Orphanage {
    name: string,
    about: string,
    latitude: number,
    longitude: number,
    instructions: string,
    opening_hours: string,
    open_on_weekends: boolean,
    images: Images[]
}

interface RouteParams {
    id: string
}

interface PreviewImage {
    url: string,
    id: string,
    newImageIndex?: number
}

export default function CreateOrphanage() {
    const params = useParams<RouteParams>();
    const { replace, push, location, goBack } = useHistory();

    const [mode, setMode] = useState("create");

    const [currentPosition, setCurrentPosition] = useState({ latitude: 0, longitude: 0 });
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

    const [name, setName] = useState("");
    const [about, setAbout] = useState("");
    const [instructions, setInstructions] = useState("");
    const [opening_hours, setOpeningHours] = useState("");
    const [open_on_weekends, setOpenOnWeekends] = useState(true);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

    function handleMapClicker(event: LeafletMouseEvent) {
        const { lat, lng } = event.latlng;

        setPosition({
            latitude: lat,
            longitude: lng
        })
    }

    function handleSelectImage(event: ChangeEvent<HTMLInputElement>) {
        const fileList = event.target.files
        if (!fileList) return null;

        const selectedImages = Array.from(fileList)
        setImages([...images, ...selectedImages]);
        setPreviewImages([...previewImages, ...selectedImages.map(image => {
            return {
                url: URL.createObjectURL(image),
                id: 'new',
                newImageIndex: images.length
            }
        })])
    }

    function handleSubmit(event: FormEvent) {
        const { latitude, longitude } = position;

        const data = new FormData();
        data.append('name', name);
        data.append('about', about);
        data.append('instructions', instructions);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));
        images.forEach(image => data.append('images', image));

        if (mode === 'create')
            api.post('orphanages', data).then((response) => {
                if (response.status === 201) {
                    replace("/create-success");
                } else {
                    alert('Falha na realização do cadastro!');
                }
            }, (err) => {
                alert('Erro ao tentar cadastrar o orfanato. Verifique os dados preenchidos e tente novamente!');
            })
        else if (mode === 'edit')
            api.put(`orphanages/${params.id}`, data).then(() => goBack());

        event.preventDefault();
    }

    function handleApproveOrphanage() {
        const { latitude, longitude } = position;

        const data = new FormData();
        data.append('name', name);
        data.append('about', about);
        data.append('instructions', instructions);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('opening_hours', opening_hours);
        data.append('open_on_weekends', String(open_on_weekends));
        data.append('pending', String(false));


        //TODO: Tratativa de erros e Tela de Sucesso
        api.put(`orphanages/${params.id}`, data).then(() => goBack());
    }

    function handleReproveOrphanage() {
        //TODO: Tratativa de erros e Tela de Sucesso
        api.delete(`orphanages/${params.id}`).then(() => goBack());
    }

    function handleRemoveImage(image: PreviewImage, index: number) {
        if (image.id === 'new') {
            images.splice(image.newImageIndex || 0, 1);
            previewImages.splice(index, 1);
            setImages([...images]);
            setPreviewImages([...previewImages]);
        } else {
            api.delete(`images/${image.id}`).then((response) => {
                if (response.status === 200) {
                    previewImages.splice(index, 1);
                    setPreviewImages([...previewImages]);
                }
            })
        }
    }

    useEffect(() => {
        let m = '';

        if (location.pathname.includes('/orphanages/create')) m = 'create';
        else if (location.pathname.includes('/dashboard-approve-orphanage')) m = 'approve';
        else if (location.pathname.includes('/dashboard-edit-orphanage')) m = 'edit';
        else m = 'create';

        setMode(m);

        if (m === 'create') {
            navigator.geolocation.getCurrentPosition((position) => {
                if (position) {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ latitude, longitude });
                    setPosition({ latitude, longitude });
                }
            })
        } else {
            api.get(`orphanages/${params.id}`).then(response => {
                // setOrphanage(response.data);
                const orphanage: Orphanage = response.data;

                setName(orphanage.name);
                setAbout(orphanage.about);
                setInstructions(orphanage.instructions);
                setOpeningHours(orphanage.opening_hours);
                setOpenOnWeekends(orphanage.open_on_weekends);
                setPosition({ latitude: orphanage.latitude, longitude: orphanage.longitude });
                setCurrentPosition({ latitude: orphanage.latitude, longitude: orphanage.longitude });
                setPreviewImages(orphanage.images.map((image) => {
                    return {
                        url: image.url,
                        id: image.id
                    }
                }));
            })
        }
    }, [location.pathname])

    return (
        <div id="page-create-orphanage">
            <Sidebar />

            <main>
                <form onSubmit={handleSubmit} className="create-orphanage-form">
                    <fieldset>
                        <legend>Dados</legend>

                        <Map
                            center={[currentPosition.latitude, currentPosition.longitude]}
                            style={{ width: '100%', height: 280 }}
                            zoom={15}
                            onclick={handleMapClicker}
                        >
                            <TileLayer
                                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                            />

                            {(position.latitude !== 0 || position.longitude !== 0) && (
                                <Marker
                                    interactive={false}
                                    icon={mapIcon}
                                    position={[position.latitude, position.longitude]}
                                />
                            )}
                        </Map>

                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input
                                id="name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
                            <textarea
                                id="name"
                                maxLength={300}
                                value={about}
                                onChange={event => setAbout(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="images">Fotos</label>

                            <div className="images-container">
                                {
                                    previewImages.map((image, index) => {
                                        return (
                                            <div key={`${image.url}div`} className="image-container">
                                                <button type="button" key={`${image.url}button`} onClick={() => handleRemoveImage(image, index)}>x</button>
                                                <img key={`${image.url}image`} src={image.url} alt={name} />
                                            </div>
                                        )
                                    })
                                }
                                <label htmlFor="image[]" className="new-image">
                                    <FiPlus size={24} color="#15b6d6" />
                                </label>
                            </div>

                            <input
                                id="image[]"
                                multiple
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg"
                                style={{ display: "none" }}
                                onChange={handleSelectImage}
                            />

                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Visitação</legend>

                        <div className="input-block">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea
                                id="instructions"
                                value={instructions}
                                onChange={event => setInstructions(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="opening_hours">Horário de Funcionamento</label>
                            <input
                                id="opening_hours"
                                value={opening_hours}
                                onChange={event => setOpeningHours(event.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="open_on_weekends">Atende fim de semana</label>

                            <div className="button-select">
                                <button
                                    type="button"
                                    className={open_on_weekends ? "active" : ""}
                                    onClick={() => setOpenOnWeekends(true)}
                                >
                                    Sim
                                </button>
                                <button
                                    type="button"
                                    className={!open_on_weekends ? "not-active" : ""}
                                    onClick={() => setOpenOnWeekends(false)}
                                >
                                    Não
                                </button>
                            </div>
                        </div>
                    </fieldset>

                    {
                        mode === 'create' || mode === 'edit' ?
                            <button className="confirm-button" type="submit">
                                Confirmar
                            </button>
                            :
                            <div className="approve-buttons">
                                <button className="reprove-button" type="button" onClick={handleReproveOrphanage}>
                                    <FiX size={24} color={'white'} style={{ marginRight: 10 }} />
                                    Reprovar
                                </button>

                                <button className="approve-button" type="button" onClick={handleApproveOrphanage}>
                                    <FiCheck size={24} color={'white'} style={{ marginRight: 10 }} />
                                    Aprovar
                                </button>
                            </div>
                    }
                </form>
            </main>
        </div>
    );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
