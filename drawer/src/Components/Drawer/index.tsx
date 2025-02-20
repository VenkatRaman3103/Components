"use client";

import React, { useState, Dispatch, SetStateAction } from "react";
import "./index.scss";

type objectType = {
    type: "app" | "link" | "notes" | "search";
    label: string;
    content?: {
        icon: string;
        heading?: string;
        description: string;
    }[];
};

type dataType = objectType[];

const data: dataType = [
    {
        type: "app",
        label: "App",
        content: [
            {
                icon: "red",
                description: "incididunt ut labore et dolore magna aliqua",
            },
        ],
    },
    {
        type: "link",
        label: "Links",
        content: [
            {
                icon: "red",
                description: "incididunt ut labore et dolore magna aliqua",
            },
        ],
    },
    {
        type: "notes",
        label: "Notes",
        content: [
            {
                icon: "red",
                heading: "heading",
                description: "incididunt ut labore et dolore magna aliqua",
            },
        ],
    },
    {
        type: "search",
        label: "Search",
    },
];

export const Drawer = () => {
    const [activeOption, setActiveOption] = useState<null | number>(null);

    const [isMouseEnter, setIsMouseEnter] = useState<boolean>(true);

    return (
        <div className="container">
            <div className="wrapper">
                <div
                    className={`options-tray-container ${isMouseEnter ? "expand" : ""}`}
                    // onMouseEnter={() => setIsMouseEnter(true)}
                    // onMouseLeave={() => setIsMouseEnter(false)}
                >
                    <div
                        className={`content-wraper ${isMouseEnter ? "open" : ""}`}
                    >
                        <div className="divider"></div>
                    </div>
                    <div className="options-tray-wrapper">
                        {data.map((item: objectType, ind: number) => (
                            <Button
                                key={ind}
                                label={item.label}
                                activeOption={activeOption}
                                setActiveOption={setActiveOption}
                                index={ind}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

type ButtonPropType = {
    label: string;
    activeOption: null | number;
    setActiveOption: Dispatch<SetStateAction<null | number>>;
    index: number;
};
const Button: React.FC<ButtonPropType> = ({
    label,
    activeOption,
    setActiveOption,
    index,
}) => {
    return (
        <div
            className={`option ${activeOption == index ? "active" : ""}`}
            onClick={() => setActiveOption(index)}
        >
            {label}
        </div>
    );
};
