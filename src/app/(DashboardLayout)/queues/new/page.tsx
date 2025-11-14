'use client';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import { create_new_pos_queue } from '@/lib/requests';
import { useRouter } from 'next/navigation';
import React from 'react';


const NewQueuePage = () => {

    const status = [
        "active", "inactive", "pending"
    ]

    const [form, setForm] = React.useState({
        queue_name: "",
        queue_capacity: "",
        current_capacity: "",
        active: false
    });
    const [submitting, setSubmitting] = React.useState(false)

    const router = useRouter();

    async function submit() {
        if (!form.queue_name || !form.queue_capacity)
            window.alert("fields can't be empty")
        else
            try {
                const result = await create_new_pos_queue(form);
                console.log(result)
                router.push("/queues")
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setSubmitting(false)
            }
    }

    return (
        <PageContainer title="Queue Page" description="this is Sample page">
            <DashboardCard title="New Queue Page">
                <Typography>This is a sample page</Typography>
                <Box
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: 1, width: '60%' } }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined"
                            label="queue name"
                            value={form.queue_name}
                            onChange={(e: any) => {
                                setForm({ ...form, queue_name: e.target.value })
                            }}
                        />
                        <TextField
                            id="outlined"
                            label="queue capacity"
                            type="number"
                            onChange={(e: any) => {
                                setForm({ ...form, queue_capacity: e.target.value })
                            }}
                        />
                        <TextField
                            id="outlined"
                            label="current capacity"
                            type="number"
                            onChange={(e: any) => {
                                setForm({ ...form, current_capacity: e.target.value })
                            }}
                        />
                        <TextField
                            id="outlined-select"
                            select
                            defaultValue={status[0]}
                            // onSelect={}
                            helperText="Select status"
                        >
                            {status.map((v, i) =>
                                <MenuItem key={i}>
                                    {v}
                                </MenuItem>
                            )}
                        </TextField>
                    </div>

                    <Button

                        loading={submitting}
                        sx={{
                            opacity: submitting ? 0.5 : 1.0,
                        }}
                        onClick={() => submit()}
                        variant="contained"
                        disableElevation
                        color="primary" >
                        Create Queue
                    </Button>
                </Box>
            </DashboardCard>
        </PageContainer>
    );
};

export default NewQueuePage;