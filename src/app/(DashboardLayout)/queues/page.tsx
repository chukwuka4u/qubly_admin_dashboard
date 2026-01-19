'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import QueueCard from '../components/queue-container/card';
import { useState, useEffect } from 'react';
import { get_admin_pos_queues } from '@/lib/requests';
import { Queue } from '@/types/queue';


const QueuesPage = () => {
    const [queues, setQueues] = useState([])

    useEffect(() => {
        (
            async function () {
                const result = await get_admin_pos_queues();
                if (result != undefined)
                setQueues(result)
            }
        )()
    })

    return (
        <PageContainer title="Queue Page" description="this is Sample page">
            <DashboardCard title="Queue Page">
                <Typography>{queues.length ?? 0} queues</Typography>
                {queues.map((q: Queue, i) =>
                    <QueueCard key={i} q={q} />
                )}
            </DashboardCard>
        </PageContainer>
    );
};

export default QueuesPage;

