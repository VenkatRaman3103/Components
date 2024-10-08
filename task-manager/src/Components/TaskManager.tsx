import React, { useState } from 'react'
import './TaskManager.scss'

const dummyData = [
    {
        id: 1,
        title: 'Personal Task',
        color: '#FFCC00', // Yellow
        task: {
            type: 'toDo',
            tasks: [
                {
                    content: 'lorem ipsum',
                    isChecked: false
                }
            ]
        }
    },
    {
        id: 2,
        title: 'Team Meeting',
        color: '#00CCFF', // Blue
        task: {
            type: 'meeting',
            tasks: [
                {
                    members: [{ name: 'name1', img: 'url' }],
                    notes: ['lorem ipsum', 'lorem ipsum']
                }
            ]
        }
    },
    {
        id: 3,
        title: 'Project Report',
        color: '#FF6600', // Orange
        task: {
            type: 'toDo',
            tasks: [
                {
                    content: 'Finish project report',
                    isChecked: true
                }
            ]
        }
    },
    {
        id: 4,
        title: 'Grocery Shopping',
        color: '#66FF66', // Green
        task: {
            type: 'toDo',
            tasks: [
                {
                    content: 'Buy groceries',
                    isChecked: false
                }
            ]
        }
    },
    {
        id: 5,
        title: 'Project Milestones Discussion',
        color: '#FF0099', // Pink
        task: {
            type: 'meeting',
            tasks: [
                {
                    members: [
                        { name: 'name2', img: 'url2' },
                        { name: 'name3', img: 'url3' }
                    ],
                    notes: ['Discuss project milestones', 'Allocate tasks']
                }
            ]
        }
    },
    {
        id: 6,
        title: 'Weekly Sync-Up',
        color: '#6600FF', // Purple
        task: {
            type: 'meeting',
            tasks: [
                {
                    members: [{ name: 'name4', img: 'url4' }],
                    notes: ['Weekly sync-up', 'Review previous actions']
                }
            ]
        }
    },
    {
        id: 7,
        title: 'Client Feedback Call',
        color: '#FF3333', // Red
        task: {
            type: 'toDo',
            tasks: [
                {
                    content: 'Call the client for feedback',
                    isChecked: false
                }
            ]
        }
    }
];

const TaskManager = () => {
    const [tasks, setTasks] = useState(dummyData)
    const [activeItem, setActiveItem] = useState<number | null>(null)
    const [isActive, setIsActive] = useState(false)

    console.log(activeItem, 'activeItem')
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
                <div className='current-week-section' >
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
                <div className='upcoming-tasks-section' style={{ height: isActive ? '80%' : '60%', top:isActive ? '-21%' : '0%' }}>
                    <div className='upcoming-tasks-wrapper'>
                        {tasks?.map((item, index) =>
                            <div className='task-component' style={{ order: activeItem == item.id ? 1 : index + 2 }} onClick={() => {
                                setActiveItem(item.id)
                                setIsActive(!isActive)
                            }}>
                                <div className='accent-strip' style={{ backgroundColor: item.color }}></div>
                                <div className='task-overview-wrapper'>
                                    <div className='task-timing'>12:30 PM - 01:00 PM</div>
                                    <div className='task-name'>{index + 1} {item.title} - {item.task.type}</div>
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
