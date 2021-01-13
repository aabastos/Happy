import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardOrphanage from '../components/DashboardOrphanage';

import '../styles/pages/dashboard.css';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

export default function Dashboard() {
    const { location } = useHistory();

    const [pending, setPending] = useState(false);
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        const state = location.pathname === '/dashboard-pending';
        setPending(state);
        api.get(`orphanages?$filter=pending=${state}`).then(response => {
            setOrphanages(response.data);
        })
    }, [location.pathname])

    return (
        <div id="dashboard-page">
            <Sidebar dashboard={true} selectedMenu={pending ? 1 : 0} />

            <main>
                <div className="orphanages-container">
                    {
                        orphanages.map(orphanage => <DashboardOrphanage key={orphanage.id} orphanage={orphanage} pending={pending} />)
                    }
                </div>
            </main>
        </div>
    )
}