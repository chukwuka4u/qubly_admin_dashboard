'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';
import { useEffect, useState } from 'react';
import { total_per_annum } from '@/lib/requests';
import { stat } from 'fs';

const Dashboard = () => {
  const [stats, setStats] = useState({people_count: 0, revenue: 0})

  useEffect(() => {
    (async function () {
                const dt = await total_per_annum()
                if (dt != undefined)
                setStats({people_count: dt.people_count, revenue: dt.revenue})
            })()
  }, [])
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <SalesOverview />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <Grid container spacing={3}>
              <Grid size={12}>
                <YearlyBreakup people_count={stats.people_count} />
              </Grid>
              <Grid size={12}>
                <MonthlyEarnings revenue={stats.revenue}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;

{/* <Grid
            size={{
              xs: 12,
              lg: 4
            }}>
            <RecentTransactions />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 8
            }}>
            <ProductPerformance />
          </Grid>
          <Grid size={12}>
            <Blog />
          </Grid> */}
