
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormProvider, FTextField } from "../components/form";
import { Button, Stack, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, display } from "@mui/system";


const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
});
const defaultValues = {
  username: "",
};


function LoginPage() {

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(LoginSchema),
  });
  const { handleSubmit } = methods;


  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    auth.login(data.username, () => {
      navigate(-1);

    });
  };

  return (

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 1,
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ width: { md: "350px", xs: "200px" } }}>
            <Typography variant="h4" textAlign="center" color="#00b4cc">
              Login
            </Typography>
            <FTextField name="username" label="Username" />
            <FTextField name="password" label="Password" />
            <Button type="submit" variant="contained" bgcolor="#00b4cc">
              Login
            </Button>
          </Stack>
        </FormProvider>
      </Box>
    </Box>
  );
}


export default LoginPage;
