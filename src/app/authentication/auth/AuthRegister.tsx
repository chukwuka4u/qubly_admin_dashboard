import React, { useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { GoogleMap, useJsApiLoader, Autocomplete, Libraries } from '@react-google-maps/api';
import { isValidEmail, isValidPassword } from "@/constants/verify-inputs"

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';


const libraries = ['places'] as Libraries

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

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY!,
        libraries,
    });

    const autocompleteRef = useRef<google.maps.places.Autocomplete | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null)

    const [submitting, setSubmitting] = React.useState(false)

    const router = useRouter();
    async function submit() {
        if (!form.admin_name || !form.organization || !form.address || !form.email || !form.password || !form.password_confirmation || !form.ranking)
            window.alert("fields can't be empty")
        else if (!isValidEmail(form.email)) {
            window.alert("invalid email format")
        }
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
                    <CustomTextField value={form.admin_name} placeholder="your preferred admin name" onChange={(e: any) => {
                        setForm({ ...form, admin_name: e.target.value })
                    }} id="admin_name" variant="outlined" fullWidth />
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='address' mb="5px" mt="25px">Address</Typography>
                    {
                        isLoaded &&
                        <Autocomplete
                            fields={["adr_address", "name", "formatted_address"]}
                            types={["establishment"]}
                            onLoad={ref => (autocompleteRef.current = ref)}
                            onPlaceChanged={() => {
                                const event = new Event('input', { bubbles: false });
                                inputRef.current!.dispatchEvent(event);
                                console.log(inputRef.current!.value)
                                setForm({ ...form, address: inputRef.current!.value, organization: autocompleteRef.current!.getPlace().name! })
                                // console.log(form.address)
                            }}
                        >

                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="search for your organization"
                                style={{
                                    width: '100%',
                                    height: '50px',
                                    borderWidth: '1px',
                                    borderColor: 'rgb(229, 231, 235)',
                                    borderRadius: '0.3rem', // rounded-lg
                                    paddingLeft: '0.5rem',  // px-2 → padding-inline: 0.5rem
                                    paddingRight: '0.5rem',
                                    marginTop: '12px',      // my-[12px]
                                    marginBottom: '12px'
                                }}
                                onChange={(e) => {
                                    // console.log(e.target.value)
                                }}
                            />
                        </Autocomplete>
                    }
                    <Typography variant="subtitle1"
                        fontWeight={600} component="label" htmlFor='organization' mb="5px" mt="25px">Organization</Typography>
                    <CustomTextField value={form.organization} onChange={(e: any) => {
                        setForm({ ...form, organization: e.target.value })
                    }} id="organization" variant="outlined" fullWidth />

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

