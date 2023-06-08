import { useState } from "react"

export default function Breadcrumbs(props) {
    const [routeList, setRouteList] = useState({});

    return (
        <div class="breadcrumbs" data-aos="fade-down">
            <ul>
                <li><a href="/">Dashboard </a></li>
                <li><a href="/">My Profile</a></li>
                <li><a onClick={() => seteditcompany(false)} style={{ cursor: "pointer" }}><span> Company Information </span></a></li>
                <li><a href="#"><span> Edit Company Information </span></a></li>
            </ul>
        </div>
    )
}