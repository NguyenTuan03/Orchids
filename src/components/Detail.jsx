import { Link, useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { addDetailOrchid } from "./service/GetDetailOrchid";
import { viewOrchids } from "./service/ViewOrchids";
import Skeleton from "@mui/material/Skeleton";
export default function Detail() {
    const [detail, setDetail] = useState(null);
    const [relatedOrchids, setRelatedOrchids] = useState([]);
    const [loading, setLoading] = useState(true);
    AOS.init();
    const { id } = useParams();
    const context = useContext(ThemeContext);
    useEffect(() => {
        const fetchOrchidData = async () => {
            setLoading(true);
            try {
                const detailData = await addDetailOrchid(id);
                const allOrchids = await viewOrchids();
                const related = allOrchids.filter(
                    (orchid) =>
                        orchid.category === detailData.category &&
                        orchid.id !== detailData.id
                );

                setDetail(detailData);
                setRelatedOrchids(related);
            } catch (error) {
                console.error("Error fetching orchid data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrchidData();
        window.scrollTo(0, 0);
    }, [id]);
    return (
        <div className={context.theme}>
            <div className="container">
                <div className="row py-5">
                    {loading ? (
                        <>
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={400}
                                className="col-12 col-md-6"
                            />
                            <div className="col-12 col-md-6 info">
                                <Skeleton variant="text" height={80} />
                                <Skeleton variant="text" height={40} />
                                <Skeleton variant="text" height={40} />
                                <Skeleton variant="text" height={40} />
                                <Skeleton variant="text" height={40} />
                                <Skeleton variant="text" height={40} />
                            </div>
                        </>
                    ) : (
                        detail && (
                            <>
                                <img
                                    className="col-12 col-md-6"
                                    src={`${detail.img}`}
                                    alt={detail.name}
                                />
                                <div className="col-12 col-md-6 info">
                                    <h1 className="mb-3">{detail.name}</h1>
                                    <div className="fs-4 mb-3">
                                        Rating:
                                        {[...Array(detail.rating)].map(
                                            (_, i) => (
                                                <CiStar
                                                    color={"#764751"}
                                                    key={i}
                                                />
                                            )
                                        )}
                                        <span className="ms-3">
                                            {detail.rating} /5
                                        </span>
                                    </div>
                                    <div className="mb-3">
                                        Color:
                                        <span className="fw-bold">
                                            {detail.color}
                                        </span>
                                    </div>
                                    <div className="mb-3">
                                        Category:{" "}
                                        <span className="fw-bold">
                                            {detail.category}
                                        </span>
                                    </div>
                                    {detail.isSpecial ? (
                                        <div className="mb-3">
                                            Special: a <strong>special</strong>{" "}
                                            flower
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            It is just a <strong>normal</strong>{" "}
                                            flower
                                        </div>
                                    )}
                                    <p>
                                        Made in:{" "}
                                        <span className="fw-bold">
                                            {detail.origin}
                                        </span>
                                    </p>
                                </div>
                            </>
                        )
                    )}
                </div>
                <h3 className="text-center mb-5">Other orchids you may like</h3>
                <div className="row">
                    {
                    loading ? (
                        <>
                        <Skeleton
                                variant="rectangular"
                                width="100%"
                                height={400}
                                className="col-12 col-md-6"
                            />
                            <div className="col-12 col-md-6 info">
                                <Skeleton variant="text" height={80} />
                                <Skeleton variant="text" height={40} />
                                <Skeleton variant="text" height={40} />
                                <Skeleton variant="text" height={40} />
                                <Skeleton variant="text" height={40} />
                                <Skeleton variant="text" height={40} />
                            </div>  
                        </>
                    ) : 
                    relatedOrchids && 
                    relatedOrchids.map((orchid, i) => {
                        return (
                            <React.Fragment key={i}>
                                <div className="detail__item col-12 col-md-6 col-lg-3 mb-3">
                                    <div className="detail__img">
                                        <img
                                            src={`${orchid.img}`}
                                            className="w-100"
                                        />
                                    </div>
                                    <div className="detail__content">
                                        <div className="detail__left">
                                            <h4 className="my-3 text-center">
                                                {orchid.name}
                                            </h4>
                                            <Link
                                                className="hvr-float-shadow detail_btn"
                                                to={`/detail/${orchid.id}`}
                                            >
                                                Detail
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })
                    }
                </div>
            </div>
        </div>
    );
}
