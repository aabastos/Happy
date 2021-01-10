import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { FiArrowLeft } from 'react-icons/fi';

import '../styles/components/dashboardOrphanage.css';

export default function DashboardOrphanage() {
    return (
        <div className="orphanage">
            <Map
                center={[-19.8273332, -43.9341399]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
            </Map>

            <footer>
                <h3>Orfanato Esperança</h3>

                <div className="dashboard-orphanage-buttons">
                    <button type="button">
                        <FiArrowLeft size={24} color="#FFF" />
                    </button>
                    <button type="button">
                        <FiArrowLeft size={24} color="#FFF" />
                    </button>
                </div>
            </footer>
        </div>
    )
}