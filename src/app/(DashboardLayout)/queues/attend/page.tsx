'use client';
import { Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import AttendQueue from '../../components/attend/attend-queue';


const QueuesPage = () => {
    return (
        <PageContainer title="Queue Page" description="this is Sample page">
            <DashboardCard title="Queue Page">
                <Typography>34 queues</Typography>
                <AttendQueue />
            </DashboardCard>
        </PageContainer>
    );
};

export default QueuesPage;

