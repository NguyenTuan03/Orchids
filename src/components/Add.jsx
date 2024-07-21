import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addOrchid } from "./service/AddOrchid";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export default function Add() {
    const nav = useNavigate();
    const context = useContext(ThemeContext)
    const formik = useFormik({
        initialValues: {
            name: "",
            rating: 0,
            isSpecial: false,
            img: "",
            color: "",
            origin: "",
            category: "",
        },
        onSubmit: async (values) => {
            if (!formik.isValid) {
                toast.error("Please fix the errors in the form before submitting.", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
                return;
            }
            await handleAddOrchid(values);
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Required.")
                .min(1, "Must be 1 characters or more"),
            rating: Yup.number()
                .integer()
                .min(1, "Rating must be at least 1")
                .max(5, "Rating must be at most 5")
                .required("Required."),
            img: Yup.string()
                .required("Required.")
                .min(3, "Must be 3 characters or more"),
            color: Yup.string()
                .required("Required.")
                .min(1, "Must be 1 characters or more"),
            origin: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            category: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
        }),
    });
    const handleAddOrchid = async (values) => {
        const { name, rating, isSpecial, img, color, origin, category } =
            values;
        try {
            const result = await addOrchid(
                name,
                rating,
                isSpecial,
                img,
                color,
                origin,
                category
            );
            toast.success("Add Successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                onClose: () => nav("/manage"),
            });
            console.log(result);
        } catch (error) {
            console.error("Failed to add orchid:", error);
            toast.error("Add failed. Try again later", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    };
    return (
        <div className={context.theme}>
            <Container maxWidth="sm">
                <ToastContainer />
                <h2 style={{ textAlign: "center", paddingTop: "30px" }}>
                    Add an orchid
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            classes: {
                                root: "dark_text", 
                            },
                        }}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <Typography variant="caption" color="red">
                            {formik.errors.name}
                        </Typography>
                    )}
                    <TextField
                        margin="dense"
                        name="rating"
                        label="Rating"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            classes: {
                                root: "dark_text", 
                            },
                        }}
                    />
                    {formik.touched.rating && formik.errors.rating && (
                        <Typography variant="caption" color="red">
                            {formik.errors.rating}
                        </Typography>
                    )}
                    <Box>
                        <Typography variant="caption" fontSize={"14px"}>Is special</Typography>
                            <Switch
                                checked={formik.values.isSpecial}
                                onChange={(event) =>
                                    formik.setFieldValue("isSpecial", event.target.checked)
                                }
                                name="isSpecial"
                                inputProps={{ "aria-label": "isSpecial" }}
                            />  
                    </Box>
                    <TextField
                        margin="dense"
                        name="img"
                        label="URL of image"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.img}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            classes: {
                                root: "dark_text", 
                            },
                        }}
                    />
                    {formik.touched.img && formik.errors.img && (
                        <Typography variant="caption" color="red">
                            {formik.errors.img}
                        </Typography>
                    )}
                    <TextField
                        margin="dense"
                        name="color"
                        label="Color"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            classes: {
                                root: "dark_text", 
                            },
                        }}
                    />
                    {formik.touched.color && formik.errors.color && (
                        <Typography variant="caption" color="red">
                            {formik.errors.color}
                        </Typography>
                    )}
                    <TextField
                        margin="dense"
                        name="origin"
                        label="Origin"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.origin}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            classes: {
                                root: "dark_text", 
                            },
                        }}
                    />
                    {formik.touched.origin && formik.errors.origin && (
                        <Typography variant="caption" color="red">
                            {formik.errors.origin}
                        </Typography>
                    )}
                    <TextField
                        multiline
                        rows={2}
                        margin="dense"
                        name="category"
                        label="Category"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        InputLabelProps={{
                            classes: {
                                root: "dark_text", 
                            },
                        }}
                    />
                    {formik.touched.category && formik.errors.category && (
                        <Typography variant="caption" color="red" display="block">
                            {formik.errors.category}
                        </Typography>
                    )}
                    <Stack direction="row" justifyContent="flex-end" pb={"57px"}>
                        <Button
                            className="addBtn"
                            style={{ marginTop: "30px" }}
                            variant="contained"
                            size="small"
                            type="submit"
                        >
                            Add
                        </Button>
                    </Stack>
                </form>
            </Container>
        </div>
    );
}
