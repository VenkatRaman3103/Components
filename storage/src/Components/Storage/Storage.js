import React, { useEffect, useRef, useState } from 'react'
import './Storage.scss'

const itemsArray = [
    {
        id: 1, value: 1, name: "Apples",
        subItems: [
            {
                id: 1, name: "Green", value: 1,
                color: '#FF8B5A'
            },
            {
                id: 2, name: "Red", value: 1,
                color: '#FF8B5A'
            },
            {
                id: 3, name: "Yellow", value: 1,
                color: '#FF8B5A'
            },
            {
                id: 4, name: "Golden", value: 1,
                color: '#FF8B5A'
            }
        ],
        color: '#FF8B5A'
    },
    {
        id: 2, value: 2, name: "Bananas",
        subItems: [
            {
                id: 1, name: "Ripe", value: 4,
                color: '#FFB9B1'
            },
            {
                id: 2, name: "Unripe", value: 1,
                color: '#FFB9B1'
            },
            {
                id: 3, name: "Frozen", value: 1,
                color: '#FFB9B1'
            },
            {
                id: 4, name: "Dried", value: 1,
                color: '#FFB9B1'
            }
        ],
        color: '#FFB9B1'
    },
    {
        id: 3, value: 3, name: "Oranges",
        subItems: [
            {
                id: 1, name: "Navel", value: 1,
                color: '#FABC1D'
            },
            {
                id: 2, name: "Blood", value: 1,
                color: '#FABC1D'
            },
            {
                id: 3, name: "Mandarin", value: 1,
                color: '#FABC1D'
            },
            {
                id: 4, name: "Tangerine", value: 1,
                color: '#FABC1D'
            }
        ],
        color: '#FABC1D'
    },
    {
        id: 4, value: 4, name: "Berries",
        subItems: [
            {
                id: 1, name: "Blueberry", value: 2,
                color: '#BCCADE'
            },
            {
                id: 2, name: "Strawberry", value: 1,
                color: '#BCCADE'
            },
            {
                id: 3, name: "Raspberry", value: 4,
                color: '#BCCADE'
            }
        ],
        color: '#BCCADE'
    }
];

const baseColor = "#445266"

const n = itemsArray.length

const Storage = () => {
    const [cards, setCards] = useState(null)
    const [selectedArray, setSelectedArray] = useState(itemsArray);
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedItemId, setSelectedItemId] = useState(null);
    const statsBarWrapperRef = useRef(null);


    // to update selectedArray when an item is clicked
    useEffect(() => {
        const clickedItem = itemsArray.find((item) => item.id === selectedItemId);
        if (clickedItem) {
            setSelectedArray(clickedItem.subItems);
        }
    }, [selectedItemId]);

    // to handle clicks outside the stats bar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statsBarWrapperRef.current && !statsBarWrapperRef.current.contains(event.target)) {
                setSelectedArray(itemsArray);
                setSelectedItemId(null);
            }
            console.log(event.target);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    function dynamicColor(n, index, item) {
        const statBarColor = { backgroundColor: `rgb(68, 82, 102, 0.${(n - index) + n})`, width: `${item.value}0%` }
        return statBarColor
    }

    const calculateTotal = (items) => {
        return items.reduce((sum, item) => sum + item.value, 0);
    };

    const totalValue = calculateTotal(selectedArray);

    return (
        <div className='storage-main-container'>
            <div className='storage-container'>
                <div className='storage-wrapper'>
                    <Heading />
                    <div className='stats-carousal-container'>
                        <div className='stats-carousal-wrapper'>
                            <StatsOverview selectedItemId={selectedItemId} />

                            {itemsArray.map((item, index) => (
                                <StatsOverviewCard
                                    key={item.id}
                                    selectedItemId={selectedItemId}
                                    item={item}
                                    index={index}
                                    totalItems={itemsArray.length}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='stats-bar-wrapper' ref={statsBarWrapperRef}>
                        {selectedArray.map((item, index) => (
                            <>
                                <div
                                    key={item.id}
                                    className={`stats-highlight ${item.name}`}
                                    style={{ backgroundColor: `${item.color}`, width: `${item.value}0%`, '--percentage': `${item.value}0%`, opacity: `calc(1 - 0.${index+1})` }}
                                    onClick={() => setSelectedItemId(item.id)}
                                >
                                    <div className='percentage'>{item.value}0<span>%</span></div>
                                </div>
                            </>
                        ))}
                    </div>

                    <div className="folder">
                        <FolderIcon />
                        <div className='content-container'>
                            <div className='card-item-container'>
                                {itemsArray.map((item, index) => (
                                    <Card
                                        key={item.id}
                                        setSelectedItemId={setSelectedItemId}
                                        index={index}
                                        item={item}
                                        selectedItemId={selectedItemId}
                                        isSelected={item.id === selectedItemId}
                                        totalCards={itemsArray.length}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// StatsOverview component to display overall statistics
const StatsOverview = ({ selectedItemId }) => {
    return (
        <div className={`stats-overview-container ${selectedItemId !== null ? 'moveBackward' : ''}`}>
            <div className='stats-overview-wrapper'>
                <div className='numeric-stats-wrapper'>
                    <div className='numeric-stats-heading'>storage</div>
                    <div className='numeric-stats-percentage'>95%</div>
                    <div className='numeric-stats-description'>lorem ipsum</div>
                </div>
                <div className='list-of-elements-wrapper'>
                    {itemsArray.map((item, index) => <StatsItems n={n} index={index} item={item} />)}
                </div>
            </div>
        </div>
    )
}

// StatsOverviewCard component to display individual item statistics
const StatsOverviewCard = ({ selectedItemId, item, index, totalItems }) => {
    const isSelected = selectedItemId === item.id;
    const position = isSelected ? 1 : (selectedItemId === null ? index + 1 : index + 2);

    const style = {
        position: 'absolute',
        left: `${position * 100}%`,
        transition: 'all 0.5s ease-in-out',
        transform: `translateX(-${isSelected ? 100 : 0}%)`,
        opacity: isSelected || selectedItemId === null ? 1 : 0.5,
        pointerEvents: isSelected || selectedItemId === null ? 'auto' : 'none',
    };

    return (
        <div className="stats-overview-container-item" style={style}>
            <div className='stats-item-wrapper'>
                <div className='stats-content'>
                    <div className='stats-heading'>{item.name}</div>
                    <div className='list-of-elements-wrapper'>
                        {item.subItems.map((subItem, subIndex) => (
                            <StatsItems key={subItem.id} n={totalItems} index={subIndex} item={subItem} />
                        ))}
                    </div>
                </div>
                <div className='stats-visual'>
                    <div className='circle1'>
                        <div className='circle2'>
                            <div className='circle3'>
                                <div className='circle4'>
                                    {item.value}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Card component to display individual items
const Card = ({ setSelectedItemId, index, item, isSelected, totalCards, selectedItemId }) => {
    console.log(selectedItemId, 'selectedItemId')
    return (
        <div
            className={`card-item ${isSelected ? 'selected' : ''}`}
            style={{
                zIndex: `calc(${index < selectedItemId ? ((index - selectedItemId)) : (((selectedItemId) - index))} + ${selectedItemId == (index + 1) ? 10 : 0})`,
                marginTop: `${index < selectedItemId ? ((selectedItemId - index) * 10) : (((index + 1) - selectedItemId) * 10)}px`,
                background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, ${item.color} 100%)`,
                transition: 'all 0.3s ease',
                transform: isSelected ? 'translateY(-12px)' : 'none',

            }}
            onClick={() => setSelectedItemId(item.id)}
        >
            <div className='card-item-wrapper'>
                <div className='header-container'>
                    <div className='icon'></div>
                    <div className='header-content-wrapper'>
                        <div className='header-heading'></div>
                        <div className='header-description'></div>
                        <div className='header-description'></div>
                    </div>
                </div>
                <div className='card-item-content'></div>
            </div>
        </div>
    )
}

// Heading component for the storage section
const Heading = () => {
    return (
        <div className='header-container'>
            <div className='header-wrapper'>
                <div className='storage-icon'></div>
                <div className='storage-heading-wrapper'>
                    <div className='storage-heading'>Storage</div>
                    <div className='storage-heading-description'>lorem ipsum</div>
                </div>
            </div>
        </div>
    )
}

// StatsItems component to display individual statistic items
const StatsItems = ({ n, index, item }) => {
    return (

        <div className='list-of-elements-item'>
            <div className='element-dot' style={{ backgroundColor: `${item.color}`, opacity: `calc(1 - 0.${index+1})` }}></div>
            <div className='element-name'>{item.name}</div>
        </div>
    )
}

const FolderIcon = () => {
    return (
        <svg className='folder-icon' width="573" height="314" viewBox="0 0 573 314" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.852975 42.6487C0.852975 19.5656 19.5656 0.852975 42.6487 0.852975H249.038C258.111 0.852975 266.938 3.80531 274.185 9.2641L319.912 43.7075C327.455 49.3891 336.642 52.4619 346.085 52.4619H530.351C553.434 52.4619 572.147 71.1745 572.147 94.2577V271.351C572.147 294.434 553.434 313.147 530.351 313.147H42.6487C19.5656 313.147 0.852975 294.434 0.852975 271.351V42.6487Z" fill="#FAFAFA" stroke="#DCE0E4" stroke-width="1.70595" />
        </svg>
    )
}

export default Storage


//  translateY(-${selectedItemId !== null ? cards : ""}5px)