import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiAlertCircle, FiMapPin, FiLogOut } from 'react-icons/fi';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

interface SidebarProps {
    dashboard?: boolean
    selectedMenu?: Number
}
export default function Sidebar(props: SidebarProps) {
    const { goBack, push } = useHistory();

    return (
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Happy" />

            {
                (props.dashboard) ? (
                    <div className="buttons">
                        <Link
                            to="/dashboard"
                            type="button"
                            style={props.selectedMenu === 0 ? { backgroundColor: '#FFD666' } : {}}
                        >
                            <FiMapPin size={24} color="#0089A5" />
                        </Link>

                        <Link
                            to="/dashboard-pending"
                            type="button"
                            style={props.selectedMenu === 1 ? { backgroundColor: '#FFD666' } : {}}
                        >
                            <FiAlertCircle size={24} color="#0089A5" />
                        </Link>
                    </div>
                ) : null
            }

            <footer>
                {
                    (props.dashboard) ?
                        <button type="button" onClick={() => push("/")}>
                            <FiLogOut size={24} color="#FFF" />
                        </button>
                        :
                        <button type="button" onClick={goBack}>
                            <FiArrowLeft size={24} color="#FFF" />
                        </button>

                }
            </footer>
        </aside >
    )
}