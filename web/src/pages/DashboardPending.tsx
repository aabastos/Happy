import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardOrphanage from '../components/DashboardOrphanage';

import '../styles/pages/dashboard.css';
import api from '../services/api';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

export default function DashboardPending() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages?$filter=(pending=true)').then(response => {
            setOrphanages(response.data);
        })
    }, [])

    return (
        <div id="dashboard-page">
            <Sidebar dashboard={true} selectedMenu={1} />

            <main>
                <div className="orphanages-container">
                    {
                        orphanages.map(orphanage => <DashboardOrphanage key={orphanage.id} orphanage={orphanage} />)
                    }
                </div>
            </main>
        </div>
    )
}