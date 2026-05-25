import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  Icon,
} from "@mui/material";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import { IconEye, IconEyeOff } from '@tabler/icons-react';

interface loginType {
  title?: string;
  subtitle?: React.ReactNode;
  subtext?: React.ReactNode;
}


const AuthLogin = ({ title, subtitle, subtext }: loginType) => {

  const { admin, signIn } = useAuth();
  const [form, setForm] = React.useState({
    email: "",
    password: ""
  })
  const [seePassword, setSeePassword] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const router = useRouter();
  async function submit() {
    console.log(admin, "initial")
    if (!form.email || !form.password)
      window.alert("fields can't be empty")
    else {
      try {
        setSubmitting(true)
        const result = await signIn(form)
        console.log(result)
        if (result)
        router.replace("/")
      else
        window.alert("Incorrect email or password")
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

      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField onChange={(e: any) => {
            setForm({ ...form, email: e.target.value })
          }} variant="outlined" fullWidth />
        </Box>
        <Box mt="25px"
          sx={{
              position: "relative",
            }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField onChange={(e: any) => {
            setForm({ ...form, password: e.target.value })
          }} type={seePassword ? "text" : "password"} variant="outlined" fullWidth />
          <Button
            onClick={() => setSeePassword(!seePassword)}
            sx={{
              position: "absolute",
              right: 0,
              top: "40%",
            }}
          >
            {seePassword ? <IconEyeOff /> : <IconEye />}
          </Button>
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Remeber this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            href="/"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
      </Stack>
      <Box>
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
          Sign In
        </Button>
      </Box>
      {subtitle}
    </>
  );
}

export default AuthLogin;