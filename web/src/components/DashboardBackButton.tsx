import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/components/dashboardBackButton.css';

interface Props {
    to: string
}

function DashboardBackButton(props: Props) {
    return (
        <Link to={props.to} className="back-button">
            <FiArrowLeft color="#15C3D6" />
        </Link>
    )
}

export default DashboardBackButton;