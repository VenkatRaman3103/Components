"use client";

import React, {
    useState,
    Dispatch,
    SetStateAction,
    useRef,
    useEffect,
    Ref,
} from "react";
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

type btnDimensionType = {
    width: number;
    height: number;
};

type btnPositionType = {
    top: number | undefined;
    left: number | undefined;
};

export const Drawer = () => {
    const [isMouseEnter, setIsMouseEnter] = useState<boolean>(true);

    const [activeOption, setActiveOption] = useState<null | number>(null);

    const optionRef = useRef<HTMLDivElement>(null);

    const [optionBtnDimension, setOptionBtnDimension] =
        useState<btnDimensionType>({ width: 0, height: 0 });

    const [optionBtnPosition, setOptionBtnPosition] = useState<btnPositionType>(
        { top: 0, left: 0 },
    );

    useEffect(() => {
        if (optionRef.current) {
            const { width, height, top, left } =
                optionRef.current.getBoundingClientRect();
            const wrapper = document
                .querySelector(".options-tray-wrapper")
                ?.getBoundingClientRect();

            if (wrapper) {
                setOptionBtnDimension({ width, height });
                setOptionBtnPosition({
                    top: top - wrapper?.top - 2,
                    left: left - wrapper?.left - activeOption * 12,
                });
            }
        }
    }, [activeOption]);

    console.log(optionBtnDimension, optionBtnPosition);

    return (
        <div className="container">
            <div className="wrapper">
                <div
                    className={`options-tray-container ${isMouseEnter ? "expand" : ""}`}
                    onMouseEnter={() => setIsMouseEnter(true)}
                    onMouseLeave={() => setIsMouseEnter(true)}
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
                                ref={optionRef}
                            />
                        ))}
                        <div
                            className="highlight"
                            style={{
                                height: optionBtnDimension.height,
                                width: optionBtnDimension.width,
                                top: optionBtnPosition.top,
                                left: optionBtnPosition.left,
                            }}
                        ></div>
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
    ref: Ref<HTMLDivElement>;
};
const Button: React.FC<ButtonPropType> = ({
    label,
    activeOption,
    setActiveOption,
    index,
    ref,
}) => {
    return (
        <div
            ref={activeOption == index ? ref : null}
            className={`option ${activeOption == index ? "active" : ""}`}
            onClick={() => setActiveOption(index)}
        >
            {label}
        </div>
    );
};
