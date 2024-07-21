import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css";
import { viewOrchids } from "./service/ViewOrchids";
import { addDetailOrchid } from "./service/GetDetailOrchid";
import { Button, Col, Row } from "react-bootstrap";

export default function Container() {
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);
    AOS.init();
    const context = useContext(ThemeContext);
    const nav = useNavigate();
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
    const handleDetailOrchid = async (id) => {
        try {
            const result = await addDetailOrchid(id);
            console.log(result);
            nav("/detail/" + id);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={context.theme}>
            <div className="container">
                <div className="banner">
                    <div className="overlay_dark"></div>
                    <div className="text">Dendrobium Species</div>
                    <button onClick={() => nav("/news")}>EXPLORE NOW</button>
                </div>
                <div className="title">
                    <div className="slider"></div>
                    <h3>List of Orchids</h3>
                </div>
                <div className="main row">
                    {!loading ? (
                        orchids.map((item) => {
                            return (
                                <React.Fragment key={item.id}>
                                    <div className="orchid col-12 col-md-6 col-lg-3">
                                        <div
                                            data-aos="fade-up"
                                            data-aos-duration="3000"
                                        >
                                            <img
                                            style={{borderRadius: '5px'}}
                                                className="img"
                                                src={item.img}
                                            />
                                            <h5 className="name">
                                                {item.name}
                                            </h5>
                                            <Button
                                                style={{
                                                    width: "100%",
                                                    transition:
                                                        "all 0.5s ease-in",
                                                }}
                                                className="hvr-float-shadow detail_btn"
                                                onClick={() =>
                                                    handleDetailOrchid(item.id)
                                                }
                                            >
                                                Detail
                                            </Button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })
                    ) : (
                        <Box sx={{ pt: 0.5 }} mb={"40px"}>
                            {Array.from(new Array(4)).map((_, i) => (
                                <Row key={i}>
                                    <Col xs={12} md={6} lg={3}>
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="100%"
                                            height={210}
                                            sx={{ marginBottom: 2 }}
                                        />
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="80%"
                                            height={20}
                                            sx={{
                                                marginBottom: 2,
                                                textAlign: "center",
                                            }}
                                        />
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="100%"
                                            height={40}
                                            sx={{
                                                marginBottom: 2,
                                                textAlign: "center",
                                            }}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} lg={3}>
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="100%"
                                            height={210}
                                            sx={{ marginBottom: 2 }}
                                        />
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="80%"
                                            height={20}
                                            sx={{
                                                marginBottom: 2,
                                                textAlign: "center",
                                            }}
                                        />
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="100%"
                                            height={40}
                                            sx={{
                                                marginBottom: 2,
                                                textAlign: "center",
                                            }}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} lg={3}>
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="100%"
                                            height={210}
                                            sx={{ marginBottom: 2 }}
                                        />
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="80%"
                                            height={20}
                                            sx={{
                                                marginBottom: 2,
                                                textAlign: "center",
                                            }}
                                        />
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="100%"
                                            height={40}
                                            sx={{
                                                marginBottom: 2,
                                                textAlign: "center",
                                            }}
                                        />
                                    </Col>
                                    <Col xs={12} md={6} lg={3}>
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="100%"
                                            height={210}
                                            sx={{ marginBottom: 2 }}
                                        />
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="80%"
                                            height={20}
                                            sx={{
                                                marginBottom: 2,
                                                textAlign: "center",
                                            }}
                                        />
                                        <Skeleton
                                            className="skeleton-dark"
                                            variant="rectangular"
                                            width="100%"
                                            height={40}
                                            sx={{
                                                marginBottom: 2,
                                                textAlign: "center",
                                            }}
                                        />
                                    </Col>
                                </Row>
                            ))}
                        </Box>
                    )}
                </div>
            </div>
        </div>
    );
}
