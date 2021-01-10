import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardOrphanage from '../components/DashboardOrphanage';

import '../styles/pages/dashboard.css';
function Dashboard() {
    return (
        <div id="dashboard-page">
            <Sidebar dashboard={true} />

            <main>
                <div className="orphanages-container">
                    <DashboardOrphanage />
                    <DashboardOrphanage />
                    <DashboardOrphanage />
                </div>
            </main>
        </div>
    )
}

export default Dashboard;