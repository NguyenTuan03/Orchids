import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { jwtDecode } from "jwt-decode";
import Avatar from "@mui/joy/Avatar";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function Navigation() {
    const nav = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const context = useContext(ThemeContext);
    const handleOpenSideBar = () => {
        setIsOpen(true);
    };
    const handleCloseSideBar = () => {
        setIsOpen(false);
    };
    const handleCredentialResponse = (response) => {
        var decoded = jwtDecode(response.credential);
        context.loginUser(decoded);
        console.log(decoded);
        document.getElementById("buttonDiv").hidden = true;
    };
    const handleLogOut = () => {
        context.logoutUser();
        window.location.reload();
        document.getElementById("buttonDiv").hidden = false;
    };

    useEffect(() => {
        /* global google*/
        window.onload = function () {
            google.accounts.id.initialize({
                client_id:
                    "1032521199225-actqc8n4030pd2jgtki9qfklj679kk92.apps.googleusercontent.com",
                callback: handleCredentialResponse,
            });
            google.accounts.id.renderButton(
                document.getElementById("buttonDiv"),
                { theme: "outline", size: "large" }
            );
            google.accounts.id.prompt();
        };
    }, []);
    
    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        "& .MuiSwitch-switchBase": {
            margin: 1,
            padding: 0,
            transform: "translateX(6px)",
            "&.Mui-checked": {
                color: "#fff",
                transform: "translateX(22px)",
                "& .MuiSwitch-thumb:before": {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        "#fff"
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                "& + .MuiSwitch-track": {
                    opacity: 1,
                    backgroundColor:
                        theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
                },
            },
        },
        "& .MuiSwitch-thumb": {
            backgroundColor:
                theme.palette.mode === "dark" ? "#003892" : "#001e3c",
            width: 32,
            height: 32,
            "&::before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    "#fff"
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        "& .MuiSwitch-track": {
            opacity: 1,
            backgroundColor:
                theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
            borderRadius: 20 / 2,
        },
    }));

    const handleThemeChange = () => {
        context.toggle();
    };
    return (
        <div className={context.theme}>
            <div className="container d-flex align-items-center justify-content-between d-block d-lg-none p-3">
                <FormControlLabel
                    className="mode"
                    control={
                        <MaterialUISwitch
                            checked={context.theme === "light"}
                            onChange={handleThemeChange}
                        />
                    }
                />

                <MdOutlineMenu
                    style={{ marginLeft: "20px" }}
                    onClick={handleOpenSideBar}
                    fontSize={"30px"}
                    cursor={"pointer"}
                />

                {isOpen && (
                    <>
                        <div
                            onClick={handleCloseSideBar}
                            className="over"
                        ></div>
                        <div className={context.theme}>
                            <ul className="list-lg mb-0 pt-2">
                                <li className="list_items-lg mb-3">
                                    <RxCross1 onClick={handleCloseSideBar} />
                                </li>
                                <li className="list_items-lg mb-3">
                                    <Avatar
                                        alt={context.user.given_name}
                                        src={context.user.picture}
                                    />
                                </li>
                                <li className="list_items-lg mb-3">
                                    <Link
                                        className="hvr-underline-from-left"
                                        onClick={handleCloseSideBar}
                                        to={"/"}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="list_items-lg mb-3">
                                    <Link
                                        className="hvr-underline-from-left"
                                        onClick={handleCloseSideBar}
                                        to={"/news"}
                                    >
                                        News
                                    </Link>
                                </li>
                                <li className="list_items-lg mb-3">
                                    <Link
                                        className="hvr-underline-from-left"
                                        onClick={handleCloseSideBar}
                                        to={"/about"}
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="list_items-lg mb-3">
                                    <Link
                                        className="hvr-underline-from-left"
                                        onClick={handleCloseSideBar}
                                        to={"/contact"}
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li className="list_items-lg mb-3">
                                    <Link
                                        className="hvr-underline-from-left"
                                        onClick={handleCloseSideBar}
                                        to={"/manage"}
                                    >
                                        Manage
                                    </Link>
                                </li>
                                {context.user && (
                                    <li className="list_items-lg mb-3">
                                        <Link
                                            className="hvr-underline-from-left"
                                            onClick={handleLogOut}
                                        >
                                            Log out
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </>
                )}
            </div>
            <div className="nav d-lg-flex d-none d-lg-block">
                <ul className="list mb-0 align-items-center">
                    <li className="list_items">
                        <Link className="hvr-underline-from-left" to={"/"}>
                            Home
                        </Link>
                    </li>
                    <li className="list_items">
                        <Link className="hvr-underline-from-left" to={"/news"}>
                            News
                        </Link>
                    </li>
                    <li className="list_items">
                        <Link className="hvr-underline-from-left" to={"/about"}>
                            About
                        </Link>
                    </li>
                    <li className="list_items">
                        <Link
                            className="hvr-underline-from-left"
                            to={"/contact"}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <FormControlLabel
                            control={
                                <MaterialUISwitch
                                    checked={context.theme === "light"}
                                    onChange={handleThemeChange}
                                />
                            }
                        />
                    </li>
                </ul>
                {Object.keys(context.user).length !== 0 ? (
                    <Dropdown>
                        <MenuButton>
                            <Avatar
                                alt={context.user.given_name}
                                src={context.user.picture}
                            />
                        </MenuButton>
                        <Menu>
                            <MenuItem onClick={() => nav("/manage")}>
                                Manage
                            </MenuItem>
                            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                        </Menu>
                    </Dropdown>
                ) : (
                    <div id="buttonDiv"></div>
                )}
            </div>
        </div>
    );
}
