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

type contentType = {
    icon?: string;
    url?: string;
    heading?: string;
    description: string;
};

type objectType = {
    type: "app" | "link" | "image" | "search";
    label: string;
    content?: contentType[];
};

type dataType = objectType[];

const data: dataType = [
    {
        type: "app",
        label: "Apps",
        content: [
            {
                icon: "red",
                heading: "heading 1",
                description: "1 incididunt ut labore et dolore magna aliqua",
            },
            {
                icon: "red",
                heading: "heading 2",
                description: "2 incididunt ut labore et dolore magna aliqua",
            },
            {
                icon: "red",
                heading: "heading 3",
                description: "3 incididunt ut labore et dolore magna aliqua",
            },
        ],
    },
    {
        type: "link",
        label: "Links",
        content: [
            {
                description: "2 incididunt ut labore et dolore magna aliqua",
            },
            {
                description: "21 incididunt ut labore et dolore magna aliqua",
            },
            {
                description: "22 incididunt ut labore et dolore magna aliqua",
            },
            {
                description: "23 incididunt ut labore et dolore magna aliqua",
            },
        ],
    },
    {
        type: "image",
        label: "Images",
        content: [
            {
                url: "red",
                description: "3 incididunt ut labore et dolore magna aliqua",
            },
            {
                url: "red",
                description: "3 incididunt ut labore et dolore magna aliqua",
            },
            {
                url: "red",
                description: "3 incididunt ut labore et dolore magna aliqua",
            },

            {
                url: "red",
                description: "3 incididunt ut labore et dolore magna aliqua",
            },
            {
                url: "red",
                description: "3 incididunt ut labore et dolore magna aliqua",
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
    const [activeOption, setActiveOption] = useState<number | null>(1);
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
                    left: left - wrapper?.left - (activeOption || 0) * 12,
                });
            }
        }
    }, [activeOption]);

    function renderContent(type: objectType["type"] | undefined) {
        if (!type || activeOption === null) return null;

        switch (type) {
            case "app":
                return data[activeOption]?.content?.map(
                    (item: contentType, ind: number) => (
                        <AppOption
                            key={ind}
                            heading={item.heading || ""}
                            description={item.description}
                            icon={item.icon}
                        />
                    ),
                );
            case "link":
                return data[activeOption]?.content?.map(
                    (item: contentType, ind: number) => (
                        <LinkOption key={ind} description={item.description} />
                    ),
                );
            case "image":
                return (
                    <div className="images-container">
                        {data[activeOption]?.content?.map(
                            (item: contentType, ind: number) => (
                                <div key={ind} className="note-item">
                                    {item.heading && <h3>{item.heading}</h3>}
                                    <p>{item.description}</p>
                                </div>
                            ),
                        )}
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div className="container">
            <div className="wrapper">
                <div
                    className={`options-tray-container ${isMouseEnter ? "expand" : ""}`}
                    onMouseEnter={() => setIsMouseEnter(true)}
                    onMouseLeave={() => {
                        setIsMouseEnter(true);
                        setOptionBtnDimension({ width: 0, height: 0 });
                        setOptionBtnPosition({
                            top: 100,
                            left: optionBtnPosition.left,
                        });
                        setActiveOption(null);
                    }}
                >
                    <div
                        className={`content-container ${isMouseEnter ? "open" : ""}`}
                    >
                        <div className="content-wrapper">
                            {activeOption !== null &&
                                renderContent(data[activeOption]?.type)}
                        </div>
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

const LinkOption = ({ description }: { description: string }) => {
    return <div className="link-item">{description}</div>;
};

type AppOptionProps = {
    heading: string;
    description: string;
    icon?: string;
};

const AppOption: React.FC<AppOptionProps> = ({
    heading,
    description,
    icon,
}) => {
    return (
        <div className="app-container">
            <div className="app-wrapper">
                <div
                    className="app-icon"
                    style={{ backgroundColor: icon }}
                ></div>
                <div className="app-content-wrapper">
                    <div className="heading">{heading}</div>
                    <div className="description">{description}</div>
                </div>
            </div>
        </div>
    );
};

type ButtonPropType = {
    label: string;
    activeOption: null | number;
    setActiveOption: Dispatch<SetStateAction<number | null>>;
    index: number;
    ref: Ref<HTMLDivElement>;
};

const Button: React.FC<ButtonPropType> = React.forwardRef<
    HTMLDivElement,
    Omit<ButtonPropType, "ref">
>(({ label, activeOption, setActiveOption, index }, ref) => {
    return (
        <div
            ref={activeOption === index ? ref : null}
            className={`option ${activeOption === index ? "active" : ""}`}
            onMouseEnter={() => setActiveOption(index)}
        >
            {label}
        </div>
    );
});

Button.displayName = "Button";
