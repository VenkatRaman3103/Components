import React from 'react'
import './TaskManager.scss'

const TaskManager = () => {
    return (
        <div className='container'>
            <div className='wrapper'>
                <div className='current-date-section'>
                    <div className='current-date-section-wrapper'>
                        <div className='today-date'>31</div>
                        <div className='month-year-events-wrapper'>
                            <div className='current-month'>March</div>
                            <div className='day-of-the-week-event'>
                                <div className='day-of-week'>Wednesday</div>
                                <div className='day-of-week-and-events-divider'></div>
                                <div className='number-of-events'>3 Events</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='current-week-section'>
                    <div className='week-date-component'>
                        <div className='week-label'>Sun</div>
                        <div className='date-label'>01</div>
                        <div className='task-accent-circles-wrapper'>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                        </div>
                    </div>
                    <div className='week-date-component'>
                        <div className='week-label'>Sun</div>
                        <div className='date-label'>01</div>
                        <div className='task-accent-circles-wrapper'>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                        </div>
                    </div>
                    <div className='week-date-component'>
                        <div className='week-label'>Sun</div>
                        <div className='date-label'>01</div>
                        <div className='task-accent-circles-wrapper'>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                        </div>
                    </div>
                    <div className='week-date-component'>
                        <div className='week-label'>Sun</div>
                        <div className='date-label'>01</div>
                        <div className='task-accent-circles-wrapper'>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                        </div>
                    </div>
                    <div className='week-date-component'>
                        <div className='week-label'>Sun</div>
                        <div className='date-label'>01</div>
                        <div className='task-accent-circles-wrapper'>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                        </div>
                    </div>
                    <div className='week-date-component'>
                        <div className='week-label'>Sun</div>
                        <div className='date-label'>01</div>
                        <div className='task-accent-circles-wrapper'>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                        </div>
                    </div>
                    <div className='week-date-component'>
                        <div className='week-label'>Sun</div>
                        <div className='date-label'>01</div>
                        <div className='task-accent-circles-wrapper'>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                        </div>
                    </div>
                </div>
                <div className='upcoming-tasks-section'>
                    <div className='upcoming-tasks-wrapper'>
                        {Array.from({ length: 6 }).map((item, index) =>
                            <div className='task-component'>
                                <div className='accent-strip'></div>
                                <div className='task-overview-wrapper'>
                                    <div className='task-timing'>12:30 PM - 01:00 PM</div>
                                    <div className='task-name'>Meeting with Person {index}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='add-task-button'>
                        <div className='plus-strip-1'></div>
                        <div className='plus-strip-2'></div>
                    </div>
                    <div className='gradient-layer'></div>
                </div>
            </div>
            <div className='view-switcher'>
                <div className='year-view'></div>
                <div className='week-view'></div>
                <div className='month-view'></div>
            </div>
        </div>
    )
}

export default TaskManager
