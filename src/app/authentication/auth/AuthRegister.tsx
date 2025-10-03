import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

interface registerType {
    title?: string;
    subtitle?: React.ReactNode;
    subtext?: React.ReactNode;
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
    const { admin, signUp } = useAuth();

    const [form, setForm] = React.useState({
        admin_name: "",
        organization: "",
        address: "",
        email: "",
        password: "",
        password_confirmation: "",
        ranking: "admin"
    });
    const [submitting, setSubmitting] = React.useState(false)

    const router = useRouter();
    async function submit() {
        console.log(admin, "initial")
        if (!form.admin_name || !form.organization || !form.address || !form.email || !form.password || !form.password_confirmation || !form.ranking)
            window.alert("fields can't be empty")
        else {
            try {
                setSubmitting(true)
                const result = await signUp(form)
                console.log(result)
                router.push("/")
                console.log(admin)
            }
            catch (e) {
                console.log(e)
            }
            finally {
                setSubmitting(false)
            }
        }
    }

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}

            <Box>
                <Stack mb={3}>
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='admin_name' mb="5px">Admin Name</Typography>
                    <CustomTextField onChange={(e: any) => {
                        setForm({ ...form, admin_name: e.target.value })
                    }} id="admin_name" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='organization' mb="5px" mt="25px">Organization</Typography>
                    <CustomTextField onChange={(e: any) => {
                        setForm({ ...form, organization: e.target.value })
                    }} id="organization" variant="outlined" fullWidth />
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='address' mb="5px" mt="25px">Address</Typography>
                    <CustomTextField onChange={(e: any) => {
                        setForm({ ...form, address: e.target.value })
                    }} id="address" variant="outlined" fullWidth />
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                    <CustomTextField onChange={(e: any) => {
                        setForm({ ...form, email: e.target.value })
                    }} id="email" variant="outlined" fullWidth />

                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px">Password</Typography>
                    <CustomTextField onChange={(e: any) => {
                        setForm({ ...form, password: e.target.value })
                    }} id="password" variant="outlined" fullWidth />
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='confirm_password' mb="5px" mt="25px">Confirm Password</Typography>
                    <CustomTextField onChange={(e: any) => {
                        setForm({ ...form, password_confirmation: e.target.value })
                    }} id="confirm_password" variant="outlined" fullWidth />
                </Stack>
                <Button
                    sx={{
                        opacity: submitting ? 0.5 : 1.0,
                    }}
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    loading={submitting}
                    onClick={() => submit()}
                >
                    Sign Up
                </Button>
            </Box>
            {subtitle}
        </>
    );
}

export default AuthRegister;
