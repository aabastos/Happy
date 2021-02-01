import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import DashboardOrphanage from '../components/DashboardOrphanage';

import '../styles/pages/dashboard.css';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

import { Context } from '../contexts/AuthContext';

interface Orphanage {
    id: number,
    name: string,
    latitude: number,
    longitude: number
}

export default function Dashboard() {
    const { authenticate } = useContext(Context);
    const { location, replace } = useHistory();

    const [pending, setPending] = useState(false);
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        const state = location.pathname === '/dashboard-pending';
        setPending(state);

        const route = state ? 'pending-orphanages' : 'approved-orphanages'
        api.get(route).then(response => {
            setOrphanages(response.data);
        }, (err) => {
            alert('Sessão finalizada!');
            authenticate(false);
            replace('/login');
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