import React from 'react'
import './Storage.scss'

const Storage = () => {
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
                                <div className='list-of-elements-item'>
                                    <div className='element-dot'></div>
                                    <div className='element-name'>item</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='stats-bar-wrapper'>
                        <div className='stats-highlight first'></div>
                        <div className='stats-highlight second'></div>
                        <div className='stats-highlight third'></div>
                        <div className='stats-highlight fourth'></div>
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

export default Storage
