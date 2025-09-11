'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import QueueCard from '../components/queue-container/card';
import { useState, useEffect } from 'react';
import { get_admin_pos_queues } from '@/lib/requests';


const QueuesPage = () => {
    const [queues, setQueues] = useState([])

    useEffect(() => {
        (
            async function () {
                const result = await get_admin_pos_queues();
                console.log(result)
                setQueues(result)
            }
        )()
    }, [])

    return (
        <PageContainer title="Queue Page" description="this is Sample page">
            <DashboardCard title="Queue Page">
                <Typography>{queues.length} queues</Typography>
                {queues.map((q, i) =>
                    <a key={i} href='/queues/attend'>
                        <QueueCard q={q} />
                    </a>
                )}
            </DashboardCard>
        </PageContainer>
    );
};

export default QueuesPage;

