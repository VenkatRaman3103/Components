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

                    <div class="folder">
                        <FolderIcon/>
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

const StatsItems = () => {
    return (

        <div className='list-of-elements-item'>
            <div className='element-dot'></div>
            <div className='element-name'>item</div>

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
