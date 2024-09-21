import React from 'react'
import './Storage.scss'

const Storage = () => {
    const itemsArray = [1, 2, 3, 4];
    return (
        <div className='storage-main-container'>
            <div className='storage-container'>
                <div className='storage-wrapper'>
                    <Heading />
                    <div className='stats-overview-container'>
                        <div className='stats-overview-wrapper'>
                            <div className='numeric-stats-wrapper'>
                                <div className='numeric-stats-heading'>storage</div>
                                <div className='numeric-stats-percentage'>95%</div>
                                <div className='numeric-stats-description'>lorem ipsum</div>
                            </div>
                            <div className='list-of-elements-wrapper'>
                                {itemsArray.map((item) => <StatsItems />)}
                            </div>
                        </div>
                    </div>
                    <div className='stats-bar-wrapper'>
                        {itemsArray.map((item) => <div className={`stats-highlight ${item}`}></div>)}
                    </div>
                </div>
                <div class="folder">
                    <div class="folder-tab"></div>
                    <div class="folder-body"></div>
                </div>
            </div>


        </div>
        // <h1>hello world</h1>
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

const StatsItems = () => {
    return (

        <div className='list-of-elements-item'>
            <div className='element-dot'></div>
            <div className='element-name'>item</div>
        </div>
    )
}

export default Storage
