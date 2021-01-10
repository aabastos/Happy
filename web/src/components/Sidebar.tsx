import React from 'react';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

interface SidebarProps {
    dashboard?: boolean
}
export default function Sidebar(props: SidebarProps) {
    const { goBack } = useHistory();

    return (
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Happy" />

            {
                (props.dashboard) ? (
                    <div className="buttons">
                        <button type="button" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>

                        <button type="button" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>
                    </div>
                ) : null
            }

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    )
}