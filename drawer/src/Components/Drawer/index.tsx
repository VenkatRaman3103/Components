"use client";

import React, { useState } from "react";
import "./index.scss";

export const Drawer = () => {
    const [isMouseEnter, setIsMouseEnter] = useState<boolean>(true);

    return (
        <div className="container">
            <div className="wrapper">
                <div
                    className={`options-tray-container ${isMouseEnter ? "expand" : ""}`}
                    // onMouseEnter={() => setIsMouseEnter(true)}
                    // onMouseLeave={() => setIsMouseEnter(true)}
                >
                    <div
                        className={`content-wraper ${isMouseEnter ? "open" : ""}`}
                    >
                        <div className="divider"></div>
                    </div>
                    <div className="options-tray-wrapper">
                        <div className="option">App</div>
                        <div className="option">App</div>
                        <div className="option">App</div>
                        <div className="option">App</div>
                        <div className="option">App</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
