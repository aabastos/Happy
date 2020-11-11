import React from 'react';

import marker from '../images/map-marker.svg';
import happy from '../images/happy.svg';

import '../styles/components/dashboardLanding.css';

function DashboardLanding() {
    return (
        <div className="logo-content">
            <img src={marker} alt="Happy" />
            <img src={happy} alt="Happy" />
            <strong>Belo Horizonte</strong>
            <span>Minas Gerais</span>
        </div>
    )
}

export default DashboardLanding;