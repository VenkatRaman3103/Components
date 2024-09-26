import React, { useEffect, useRef, useState } from 'react'
import './Storage.scss'

const itemsArray = [
    {
        id: 1, value: 1, name: "Apples",
        subItems: [
            { id: 1, name: "Green Apple", value: 1 },
            { id: 2, name: "Red Apple", value: 1 },
            { id: 3, name: "Yellow Apple", value: 1 },
            { id: 4, name: "Golden Apple", value: 1 }
        ]
    },
    {
        id: 2, value: 2, name: "Bananas",
        subItems: [
            { id: 1, name: "Ripe Banana", value: 4 },
            { id: 2, name: "Unripe Banana", value: 1 },
            { id: 3, name: "Frozen Banana", value: 1 },
            { id: 4, name: "Dried Banana", value: 1 }
        ]
    },
    {
        id: 3, value: 2, name: "Oranges",
        subItems: [
            { id: 1, name: "Navel Orange", value: 1 },
            { id: 2, name: "Blood Orange", value: 1 },
            { id: 3, name: "Mandarin Orange", value: 1 },
            { id: 4, name: "Tangerine", value: 1 }
        ]
    },
    {
        id: 4, value: 3, name: "Berries",
        subItems: [
            { id: 1, name: "Blueberry", value: 2 },
            { id: 2, name: "Strawberry", value: 1 },
            { id: 3, name: "Raspberry", value: 4 }
        ]
    }
];

const baseColor = "#445266"

const n = itemsArray.length

const Storage = () => {
    const [cards, setCards] = useState(null)

    const [selectedArray, setSelectedArray] = useState(itemsArray)

    const [selectedItem, setSelectedItem] = useState(null)

    const [selectedItemId, setSelectedItemId] = useState(null)

    const statsBarWrapperRef = useRef(null)

    useEffect(() => {
        const clickedItem = itemsArray.filter((item) => item.id == selectedItemId)
        console.log(selectedItemId, clickedItem[0]?.subItems)
        if (clickedItem[0]) {
            setSelectedArray(clickedItem[0]?.subItems)
        }

        setSelectedItem(clickedItem[0])

        console.log(clickedItem, 'clickedItem')
    }, [selectedItemId])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target !== statsBarWrapperRef.current) {
                setSelectedArray(itemsArray)
                setSelectedItemId(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])


    function dynamicColor(n, index, item) {
        const statBarColor = { backgroundColor: `rgb(68, 82, 102, 0.${(n - index) + n})`, width: `${item.value}0%` }
        return statBarColor
    }

    return (
        <div className='storage-main-container'>
            <div className='storage-container'>
                <div className='storage-wrapper'>
                    <Heading />

                    <div className='stats-carousal-container'>
                        <div className='stats-carousal-wrapper'>
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

                            {itemsArray.map((item, index) => 
                            <div key={item.id} className={`stats-overview-container-item ${selectedItemId !== null ? "move-left" : ''}`} style={{left:`${index + 1}00%`}}>
                                <div className='stats-overview-wrapper'>
                                    <div className='numeric-stats-wrapper'>
                                        <div className='numeric-stats-heading'>{item?.name}</div>
                                        <div className='numeric-stats-percentage'>{item?.id}</div>
                                        <div className='numeric-stats-description'>lorem ipsum</div>
                                    </div>
                                    <div className='list-of-elements-wrapper'>
                                        {item.subItems.map((item, index) => <StatsItems n={n} index={index} item={item} />)}
                                    </div>
                                </div>
                            </div>)}



                        </div>
                    </div>
                    <div className='stats-bar-wrapper' ref={statsBarWrapperRef}>
                        {selectedArray.map((item, index) => <div className={`stats-highlight ${item}`} style={dynamicColor(n, index, item)} onClick={() => setSelectedItemId(item.id)}></div>)}
                    </div>

                    <div class="folder">
                        <FolderIcon />
                        <div className='content-container'>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

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

const StatsItems = ({ n, index, item }) => {
    return (

        <div className='list-of-elements-item'>
            <div className='element-dot' style={{ backgroundColor: `rgb(68, 82, 102, 0.${(n - index) + n})` }}></div>
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
