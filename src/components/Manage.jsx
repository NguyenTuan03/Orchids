import { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { viewOrchids } from "./service/ViewOrchids";
import {
    Button,
    Col,
    Container,
    Image,
    OverlayTrigger,
    Row,
    Tooltip,
    Form,
    Pagination,
    Dropdown 
} from "react-bootstrap";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { Skeleton, Stack } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { deleteOrchid } from "./service/DeleteOrchid";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { updateOrchid } from "./service/UpdateOrchid";
import { useFormik } from "formik";
import Switch from "@mui/material/Switch";
import * as Yup from "yup";
import { ThemeContext } from "./ThemeContext";
export default function Manage() {
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedOrchidId, setSelectedOrchidId] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editOrchidId, setEditOrchidId] = useState(null);
    const context = useContext(ThemeContext);
    const nav = useNavigate();
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    //Sort
    const [sortBy, setSortBy] = useState(null);
    const [asc, setAsc] = useState(true); 
    useEffect(() => {
        console.log(orchids);
        const fetchApi = async () => {
            try {
                const result = await viewOrchids();
                setOrchids(result);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);

    const handleOpenModal = (id) => {
        setSelectedOrchidId(id);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedOrchidId(null);
    };
    const handleDeleteOrchid = async () => {
        try {
            setOpen(false);
            await deleteOrchid(selectedOrchidId);
            setOrchids((prevOrchids) =>
                prevOrchids.filter((orchid) => orchid.id !== selectedOrchidId)
            );
            toast.success("Delete Successful", {
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
        } catch (error) {
            console.error("Failed to delete orchid:", error);
            toast.error("Delete failed. Try again later", {
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
    const handleEdit = (orchid) => {
        setEditOrchidId(orchid.id);
        setEditMode(true);
        formik.setValues({
            name: orchid.name,
            rating: orchid.rating,
            isSpecial: orchid.isSpecial,
            img: orchid.img,
            color: orchid.color,
            origin: orchid.origin,
            category: orchid.category,
        });
    };
    const handleCancelEdit = () => {
        setEditMode(false);
        setEditOrchidId(null);
        formik.resetForm();
    };
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
        validationSchema: Yup.object({
            name: Yup.string()
                .required("Required.")
                .min(1, "Must be 1 character or more"),
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
                .min(1, "Must be 1 character or more"),
            origin: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
            category: Yup.string()
                .required("Required.")
                .min(2, "Must be 2 characters or more"),
        }),
        onSubmit: async (values) => {
            await handleSaveOrchid(values);
        },
    });
    const handleSave = () => {
        formik.handleSubmit();
        if (Object.keys(formik.errors).length) {
            toast.error("Validation errors. Please check your input.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    const handleSaveOrchid = async (values) => {
        try {
            const updatedOrchid = await updateOrchid(editOrchidId, values);
            setOrchids((prevOrchids) =>
                prevOrchids.map((orchid) =>
                    orchid.id === updatedOrchid.id ? updatedOrchid : orchid
                )
            );
            toast.success("Update Successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setEditMode(false);
            setEditOrchidId(null);
        } catch (error) {
            console.error("Failed to update orchid:", error);
            toast.error("Update failed. Try again later", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const sortedOrchids = [...orchids].sort((a, b) => {
        const fieldA = typeof a[sortBy] === "string" ? a[sortBy].toUpperCase() : a[sortBy];
        const fieldB = typeof b[sortBy] === "string" ? b[sortBy].toUpperCase() : b[sortBy];
        
        if (asc) {
            if (fieldA < fieldB) {
                return -1;
            }
            if (fieldA > fieldB) {
                return 1;
            }
            return 0;
        } else {
            if (fieldA > fieldB) {
                return -1;
            }
            if (fieldA < fieldB) {
                return 1;
            }
            return 0;
        }
    });

    const paginatedOrchids = sortedOrchids.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(sortedOrchids.length / itemsPerPage);

    const handleSort = (field) => {
        if (sortBy === field) {
            setAsc(!asc);
        } else {
            setSortBy(field);
            setAsc(true);
        }
    };

    return (
        <div className={context.theme}>
            <Container style={{ paddingTop: "50px" , paddingBottom:"50px"}}>
                <ToastContainer />
                <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} mb={"30px"}>
                    <Button
                        className="addBtn"
                        onClick={() => nav("/add")}
                        variant="primary"
                        style={{ padding: "12px 24px", marginRight:"12px" }}
                    >
                        <FaPlus style={{ marginRight: "12px" }} />
                        Add new Orchids
                    </Button>
                    {/* Add sort */}
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            Sort
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSort("name")}>
                                Name {sortBy === "name" && (asc ? "↑" : "↓")}
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSort("rating")}>
                                Rating {sortBy === "rating" && (asc ? "↑" : "↓")}
                            </Dropdown.Item>
                            {/* Add more items for other fields if needed */}
                        </Dropdown.Menu>
                    </Dropdown>
                </Stack>

                <Table bordered hover size="sm" style={{ marginBottom: 0, background: context.theme === 'dark' ? '#333' : '#fff', color: context.theme === 'dark' ? '#fff' : '#000' }}>
                    <thead className="" style={{ textAlign: "center" }}>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>isSpecial</th>
                            <th>img</th>
                            <th>color</th>
                            <th>origin</th>
                            <th>category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from(new Array(7)).map((_, i) => (
                                <tr key={i}>
                                    <td>
                                        <Skeleton
                                            variant="rectangular"
                                            width={"100%"}
                                            height={30}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </td>
                                    <td>
                                        <Skeleton
                                            variant="rectangular"
                                            width={"100%"}
                                            height={30}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </td>
                                    <td>
                                        <Skeleton
                                            variant="rectangular"
                                            width={"100%"}
                                            height={30}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </td>
                                    <td>
                                        <Skeleton
                                            variant="rectangular"
                                            width={"100%"}
                                            height={30}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </td>
                                    <td>
                                        <Skeleton
                                            variant="rectangular"
                                            width={"100%"}
                                            height={30}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </td>
                                    <td>
                                        <Skeleton
                                            variant="rectangular"
                                            width={"100%"}
                                            height={30}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </td>
                                    <td>
                                        <Skeleton
                                            variant="rectangular"
                                            width={"100%"}
                                            height={30}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </td>
                                    <td>
                                        <Skeleton
                                            variant="rectangular"
                                            width={"100%"}
                                            height={30}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </td>
                                    <td>
                                        <Skeleton
                                            variant="rectangular"
                                            width={"100%"}
                                            height={30}
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </td>
                                </tr>
                            ))
                            : paginatedOrchids.map((item, i) => {
                                return (
                                    <tr key={i} style={{ textAlign: "center" }}>
                                        <td>{item.id}</td>
                                        <td>
                                            {editMode &&
                                            editOrchidId === item.id ? (
                                                <>
                                                    <Form.Control
                                                        type="text"
                                                        name="name"
                                                        value={formik.values.name}
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={formik.handleBlur}
                                                        isInvalid={
                                                            formik.touched.name &&
                                                            formik.errors.name
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.name}
                                                    </Form.Control.Feedback>
                                                </>
                                            ) : (
                                                item.name
                                            )}
                                        </td>
                                        <td>
                                            {editMode &&
                                            editOrchidId === item.id ? (
                                                <>
                                                    <Form.Control
                                                        type="number"
                                                        name="rating"
                                                        value={
                                                            formik.values.rating
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={formik.handleBlur}
                                                        isInvalid={
                                                            formik.touched
                                                                .rating &&
                                                            formik.errors.rating
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.rating}
                                                    </Form.Control.Feedback>
                                                </>
                                            ) : (
                                                item.rating
                                            )}
                                        </td>
                                        <td>
                                            {editMode &&
                                            editOrchidId === item.id ? (
                                                <Form.Check
                                                    type="checkbox"
                                                    name="isSpecial"
                                                >
                                                    <Switch
                                                        checked={
                                                            formik.values
                                                                .isSpecial
                                                        }
                                                        onChange={(event) => {
                                                            formik.setFieldValue(
                                                                "isSpecial",
                                                                event.target
                                                                    .checked
                                                            );
                                                        }}
                                                        inputProps={{
                                                            "aria-label":
                                                                "controlled",
                                                        }}
                                                    />
                                                </Form.Check>
                                            ) : item.isSpecial ? (
                                                "true"
                                            ) : (
                                                "false"
                                            )}
                                        </td>
                                        <td>
                                            {editMode &&
                                            editOrchidId === item.id ? (
                                                <>
                                                    <Form.Control
                                                        type="text"
                                                        name="img"
                                                        value={formik.values.img}
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={formik.handleBlur}
                                                        isInvalid={
                                                            formik.touched.img &&
                                                            formik.errors.img
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.img}
                                                    </Form.Control.Feedback>
                                                </>
                                            ) : (
                                                <Image
                                                    width={"40px"}
                                                    height={"40px"}
                                                    src={item.img}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {editMode &&
                                            editOrchidId === item.id ? (
                                                <>
                                                    <Form.Control
                                                        type="text"
                                                        name="color"
                                                        value={
                                                            formik.values.color
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={formik.handleBlur}
                                                        isInvalid={
                                                            formik.touched
                                                                .color &&
                                                            formik.errors.color
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.color}
                                                    </Form.Control.Feedback>
                                                </>
                                            ) : (
                                                item.color
                                            )}
                                        </td>
                                        <td>
                                            {editMode &&
                                            editOrchidId === item.id ? (
                                                <>
                                                    <Form.Control
                                                        type="text"
                                                        name="origin"
                                                        value={
                                                            formik.values.origin
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={formik.handleBlur}
                                                        isInvalid={
                                                            formik.touched
                                                                .origin &&
                                                            formik.errors.origin
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.origin}
                                                    </Form.Control.Feedback>
                                                </>
                                            ) : (
                                                item.origin
                                            )}
                                        </td>
                                        <td>
                                            {editMode &&
                                            editOrchidId === item.id ? (
                                                <>
                                                    <Form.Control
                                                        type="text"
                                                        name="category"
                                                        value={
                                                            formik.values.category
                                                        }
                                                        onChange={
                                                            formik.handleChange
                                                        }
                                                        onBlur={formik.handleBlur}
                                                        isInvalid={
                                                            formik.touched
                                                                .category &&
                                                            formik.errors.category
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.category}
                                                    </Form.Control.Feedback>
                                                </>
                                            ) : (
                                                item.category
                                            )}
                                        </td>
                                        <td>
                                            <Row
                                                style={{
                                                    margin: "0 -2px",
                                                    justifyContent:
                                                        "space-around",
                                                }}
                                            >
                                                <Col
                                                    lg="5"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    {editMode &&
                                                    editOrchidId === item.id ? (
                                                        <Button
                                                            className="addBtn"
                                                            variant="success"
                                                            onClick={handleSave}
                                                            style={{
                                                                textAlign:
                                                                    "center",
                                                            }}
                                                        >
                                                            Save
                                                        </Button>
                                                    ) : (
                                                        <OverlayTrigger
                                                            placement={"top"}
                                                            overlay={
                                                                <Tooltip
                                                                    id={`tooltip-top-edit-${item.id}`}
                                                                >
                                                                    Edit
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button
                                                                className="addBtn"
                                                                variant="primary"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <MdEdit color="#FFC107" />
                                                            </Button>
                                                        </OverlayTrigger>
                                                    )}
                                                </Col>
                                                <Col
                                                    lg="5"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                    }}
                                                >
                                                    {editMode &&
                                                    editOrchidId === item.id ? (
                                                        <Button
                                                            className="addBtn"
                                                            variant="success"
                                                            onClick={
                                                                handleCancelEdit
                                                            }
                                                        >
                                                            Cancel
                                                        </Button>
                                                    ) : (
                                                        <OverlayTrigger
                                                            placement={"top"}
                                                            overlay={
                                                                <Tooltip
                                                                    id={`tooltip-top`}
                                                                >
                                                                    Delete
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <Button
                                                                className="addBtn"
                                                                onClick={() =>
                                                                    handleOpenModal(
                                                                        item.id
                                                                    )
                                                                }
                                                            >
                                                                <FaTrash color="#E34724" />
                                                            </Button>
                                                        </OverlayTrigger>
                                                    )}
                                                </Col>
                                            </Row>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
                <Pagination className="justify-content-center" style={{ marginTop: "20px" }}>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages).keys()].map((page) => (
                        <Pagination.Item
                            key={page + 1}
                            active={page + 1 === currentPage}
                            onClick={() => handlePageChange(page + 1)}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={handleCloseModal}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            maxWidth: 500,
                            borderRadius: "md",
                            p: 3,
                            boxShadow: "lg",
                        }}
                    >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography
                            component="h2"
                            id="modal-title"
                            level="h4"
                            textColor="inherit"
                            fontWeight="lg"
                            mb={1}
                        >
                            Confirm Deletion
                        </Typography>
                        <Typography
                            id="modal-desc"
                            textColor="text.tertiary"
                            mb={2}
                        >
                            Are you sure you want to delete this orchid?
                        </Typography>
                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-end"
                        >
                            <Button
                                variant="outlined"
                                color="neutral"
                                onClick={handleCloseModal}
                            >
                                No
                            </Button>
                            <Button
                                variant="solid"
                                color="danger"
                                onClick={handleDeleteOrchid}
                            >
                                Yes
                            </Button>
                        </Stack>
                    </Sheet>
                </Modal>
            </Container>
        </div>
    );
}
