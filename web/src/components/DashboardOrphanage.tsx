import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiArrowLeft, FiArrowRight, FiEdit3, FiTrash2 } from 'react-icons/fi';

import mapIcon from '../utils/mapIcon';

import '../styles/components/dashboardOrphanage.css';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

interface DashboardOrphanageProps {
    orphanage: Orphanage,
    pending?: boolean
}

export default function DashboardOrphanage(props: DashboardOrphanageProps) {
    return (
        <div className="orphanage">
            <Map
                center={[props.orphanage.latitude, props.orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 227 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                <Marker
                    key={props.orphanage.id}
                    position={[props.orphanage.latitude, props.orphanage.longitude]}
                    icon={mapIcon}
                />
            </Map>

            <footer>
                <h3>{props.orphanage.name}</h3>

                {
                    props.pending ?
                        <div className="dashboard-orphanage-buttons">
                            <button type="button">
                                <FiArrowRight size={24} color="#29B6D1" />
                            </button>
                        </div>
                        :
                        <div className="dashboard-orphanage-buttons">
                            <button type="button">
                                <FiEdit3 size={24} color="#29B6D1" />
                            </button>
                            <button type="button">
                                <FiTrash2 size={24} color="#29B6D1" />
                            </button>
                        </div>
                }
            </footer>
        </div>
    )
}