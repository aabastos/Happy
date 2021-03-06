import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import { FiArrowRight, FiPlus } from 'react-icons/fi'

import marker from '../images/map-marker.svg';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/orphanagesMap.css';
import 'leaflet/dist/leaflet.css';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages?$filter=pending=false').then(response => {
            setOrphanages(response.data);
        })
    }, [])
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={marker} alt="Happy" />

                    <h2>Escolha um orfanato no mapa.</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Belo Horizonte</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <Map
                center={[-19.8273332, -43.9341399]}
                zoom={15}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker
                                key={orphanage.id}
                                position={[orphanage.latitude, orphanage.longitude]}
                                icon={mapIcon}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="mapPopup">
                                    {orphanage.name}
                                    <Link to={`/orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })
                }
            </Map>

            <Link to="/orphanages/create" className="createOrphanage" >
                <FiPlus size={26} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;