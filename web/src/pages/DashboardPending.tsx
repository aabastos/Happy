import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardOrphanage from '../components/DashboardOrphanage';

import '../styles/pages/dashboard.css';

export default function DashboardPending() {

    useEffect(() => {
    }, [])
    return (
        <div id="dashboard-page">
            <Sidebar dashboard={true} selectedMenu={1} />

            <main>
                <div className="orphanages-container">
                </div>
            </main>
        </div>
    )
}