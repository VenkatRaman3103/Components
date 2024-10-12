/* eslint-disable eqeqeq */
import { useEffect, useRef, useState } from 'react';
import './TaskManager.scss';
import LongArrowMark from './LongArrowMark/LongArrowMark';

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
                },
                {
                    content: 'lorem ipsum',
                    isChecked: false
                },
                {
                    content: 'lorem ipsum',
                    isChecked: false
                },
                {
                    content: 'lorem ipsum',
                    isChecked: false
                },
                {
                    content: 'lorem ipsum',
                    isChecked: false
                },
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
                    members: [{ name: 'name1', img: 'url' }, { name: 'name1', img: 'url' }, { name: 'name1', img: 'url' }, { name: 'name1', img: 'url' }, { name: 'name1', img: 'url' }],
                    notes: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']
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
    const [tasks, setTasks] = useState(dummyData);
    const [activeItem, setActiveItem] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const listOfTasks = useRef(null);
    const [isAddTaskActive, setIsAddTaskActive] = useState(false);
    const [typeOfTask, setTypeOfTask] = useState(null);
    const [view, setView] = useState('days');
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [currentWeek, setCurrentWeek] = useState([]);


    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        updateCurrentWeek();
    }, [selectedYear, selectedMonth, selectedDate]);

    const updateCurrentWeek = () => {
        const selectedDateObj = new Date(selectedYear, selectedMonth, selectedDate);
        const startOfWeek = new Date(selectedDateObj);
        startOfWeek.setDate(selectedDateObj.getDate() - selectedDateObj.getDay());

        const week = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            week.push(day);
        }
        setCurrentWeek(week);
    };

    const renderCurrentWeekSection = () => {
        return (
            <div className='current-week-section'>
                {currentWeek.map((date, index) => (
                    <div
                        key={index}
                        className={`week-date-component ${date.toDateString() === new Date(selectedYear, selectedMonth, selectedDate).toDateString() ? 'today' : ''}`}
                        onClick={() => {
                            setSelectedDate(date.getDate());
                            setSelectedMonth(date.getMonth());
                            setSelectedYear(date.getFullYear());
                        }}
                    >
                        <div className='week-label'>{days[date.getDay()]}</div>
                        <div className='date-label'>{date.getDate().toString().padStart(2, '0')}</div>
                        <div className='task-accent-circles-wrapper'>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                            <div className='accent-circle'></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderMonthsView = () => {
        const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
        const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        const weeks = Math.ceil((firstDay + daysInMonth) / 7);
        const today = new Date().getDate()

        return (
            <div className="months-view">
                <div className='months-view-wrapper'>
                    <h3>{selectedYear}</h3>
                    <div className="list-of-months-wrapper">
                        {months.map((month, index) => (
                            <>
                                <div key={month} className="month-card">
                                    <h3>{month}</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sun</th>
                                                <th>Mon</th>
                                                <th>Tue</th>
                                                <th>Wed</th>
                                                <th>Thu</th>
                                                <th>Fri</th>
                                                <th>Sat</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(weeks)].map((_, weekIndex) => (
                                                <tr key={weekIndex}>
                                                    {[...Array(7)].map((_, dayIndex) => {
                                                        const day = weekIndex * 7 + dayIndex - firstDay + 1;
                                                        const isCurrentMonth = index === new Date().getMonth();
                                                        const isCurrentYear = selectedYear === new Date().getFullYear();
                                                        const isToday = isCurrentMonth && isCurrentYear && day === new Date().getDate();
                                                        return (
                                                            <td
                                                                key={dayIndex}
                                                                className={`${day > 0 && day <= daysInMonth ? 'valid-day' : 'invalid-day'} ${isToday ? 'current-day' : ''
                                                                    }`}
                                                                onClick={() => {
                                                                    if (day > 0 && day <= daysInMonth) {
                                                                        setSelectedDate(day);
                                                                        setSelectedMonth(index);
                                                                        setView('days');
                                                                    }
                                                                }}
                                                            >
                                                                {day > 0 && day <= daysInMonth ? day : ''}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className='divider'></div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        );
    };


    const renderYearsView = () => {
        const currentYear = new Date().getFullYear();
        const years = Array.from({ length: 20 }).map((_, i) => currentYear - 10 + i);

        return (
            <div className="years-view">
                <h2>Select a Year</h2>
                <div className="years-grid">
                    {years.map((year) => (
                        <div
                            key={year}
                            className={`year-card ${year === selectedYear ? 'selected' : ''}`}
                            onClick={() => {
                                setSelectedYear(year);
                                setView('months');
                            }}
                        >
                            {year}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderDaysView = () => {
        const selectedDateObj = new Date(selectedYear, selectedMonth, selectedDate);

        return (
            <div className="days-view">
                <div className={`current-date-section ${isAddTaskActive ? 'smaller' : ''}`}>
                    <div className={`current-date-section-wrapper ${isAddTaskActive ? 'makeStrip' : ''}`}>
                        <div className='today-date'>{selectedDate}</div>
                        <div className='month-year-events-wrapper'>
                            <div className='current-month'>{months[selectedMonth]}</div>
                            <div className='day-of-the-week-event'>
                                <div className='day-of-week'>{days[selectedDateObj.getDay()]}</div>
                                <div className='day-of-week-and-events-divider'></div>
                                <div className='number-of-events'>3 Events</div>
                            </div>
                        </div>
                        <div className={`date-strip-wrapper ${isAddTaskActive ? 'show' : ''}`}>
                            <div className='day-strip'>{months[selectedMonth]}</div>
                            <div className='month-strip'>{days[selectedDateObj.getDay()]}</div>
                        </div>
                    </div>
                </div>
                {renderCurrentWeekSection()}
                {/* <div className='current-week-section' >
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
                </div> */}
                <div className={`upcoming-tasks-section ${isAddTaskActive ? 'expand' : ''}`} ref={listOfTasks} style={{ height: isActive ? '81%' : '' }}>
                    <div className={`upcoming-tasks-wrapper ${isAddTaskActive ? 'hide' : ''}`} style={{ gap: isActive ? '0px' : '' }}>
                        {tasks?.map((item, index) =>
                            <div className={`task-component ${isActive == true && activeItem != item.id ? "hidden" : ''}`} onClick={() => {
                                setActiveItem(item.id)
                                setIsActive(!isActive)
                            }}>
                                <div className='task-preview-section'>
                                    <div className='accent-strip' style={{ backgroundColor: item.color }}></div>
                                    <div className='task-overview-wrapper'>
                                        <div className='task-timing'>12:30 PM - 01:00 PM</div>
                                        <div className='task-name'>{index + 1} {item.title} - {item.task.type}</div>
                                    </div>
                                </div>

                                <div className={`task-content-section ${isActive == true && activeItem == item.id ? 'show' : ''}`} >
                                    {item.task.type == 'meeting' ? (
                                        <div className='meeting-section-container'>
                                            <div className='divider'></div>
                                            <div className='meeting-wrapper'>
                                                <div className='title'>Meeting with</div>
                                                <div className='meeting-member-profiles' style={{ display: 'grid', gridTemplateColumns: `repeat(${item.task.tasks[0]?.members.length}, 35px)` }}>
                                                    {item.task.tasks[0]?.members.map((member) => <div className='profile'></div>)}
                                                </div>
                                            </div>
                                            <div className='divider'></div>
                                            <div className='meeting-notes-wrapper'>
                                                <div className='title'>Notes</div>
                                                <div className='notes-lits-wrapper'>
                                                    <ul>
                                                        {item.task.tasks[0]?.notes?.map((point) => <li>{point}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='to-do-section-container'>
                                            <div className='divider'></div>
                                            <div className='to-do-notes-wrapper'>
                                                <div className='title'>To Dos</div>
                                                <div className='notes-lits-wrapper'>
                                                    {item.task.tasks?.map((content, index) =>
                                                        <div className='checkbox-wrapper'>
                                                            <label className="custom-checkbox">
                                                                <input type="checkbox"
                                                                // checked={content.isChecked}
                                                                />
                                                                <span className="checkmark"></span>
                                                                {content.content}
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`add-task-container ${isAddTaskActive ? 'show' : ''}`}>

                        <div className='add-task-tittle-wrapper'>
                            <div className='accent-strip' ></div>
                            <div className='task-overview-wrapper'>
                                <div className='add-title-wrapper'>
                                    <input type='text' className='task-name' placeholder='Add Title' />
                                </div>
                                <div className='task-timing-wrapper'>
                                    <div className='task-timing'><span>12:30 PM</span> <LongArrowMark /> <span>01:00 PM</span></div>
                                </div>
                            </div>
                        </div>
                        <div className='divider'></div>
                        {typeOfTask == 'meeting' ? (
                            <>
                                <div className='add-member-wrapper'>
                                    <div className='title'>Meeting With</div>
                                    <div className='add-member-component'>
                                        <div className='add-icon'>
                                            <div className='plus-strip1'></div>
                                            <div className='plus-strip2'></div>
                                        </div>
                                        <div className='add-label'>Add Member</div>
                                    </div>
                                </div>
                                <div className='divider'></div>
                                <div className='add-notes-wrapper'>
                                    <div className='title'>notes</div>
                                    <ul>
                                        <li>Add Note</li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <div className='add-notes-wrapper'>
                                <div className='title'>notes</div>
                                <div className='checkbox-wrapper'>
                                    <label className="custom-checkbox">
                                        <input type="checkbox" />
                                        <span className="checkmark"></span>
                                        <label>
                                            <input type='text' />
                                            Add Todo
                                        </label>
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>

                    <AddTaskButton setIsAddTaskActive={setIsAddTaskActive} setTypeOfTask={setTypeOfTask} />
                    <div className='gradient-layer'></div>
                </div>
            </div>
        );
    };

    useEffect(() => {
        function outsideListOfTasks(event) {
            if (!listOfTasks?.current?.contains(event.target)) {
                setIsActive(false)
                setActiveItem(null)
                setIsAddTaskActive(false)
            }
        }

        document.addEventListener('mousedown', outsideListOfTasks)

        return () => { document.removeEventListener('mousedown', outsideListOfTasks) }
    }, [])

    console.log(activeItem, 'activeItem')
    console.log(listOfTasks, 'listOfTasks')
    return (
        <div className="container">
            <div className="wrapper">
                {view === 'days' && renderDaysView()}
                {view === 'months' && renderMonthsView()}
                {view === 'years' && renderYearsView()}
            </div>
            <div className="toggle-view-wrapper">
                <div className="years-btn" onClick={() => setView('years')}>Years</div>
                <div className="days-btn" onClick={() => setView('days')}>Days</div>
                <div className="months-btn" onClick={() => setView('months')}>Months</div>
            </div>
        </div>
    )
}

const AddTaskButton = ({ setIsAddTaskActive, setTypeOfTask }) => {
    const [isBtnActive, setIsBtnActive] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [transitionComplete, setTransitionComplete] = useState(false);

    function handleMouseEnter() {
        setIsBtnActive(true)
    }

    function handleMouseLeave() {
        setIsBtnActive(false)
        setShowOptions(false)
    }

    function handleTransitionEnd() {
        if (isBtnActive) {
            setTransitionComplete(true)
            setShowOptions(true)
        } else {
            setTransitionComplete(false)
        }
    }


    return (
        <div
            className={`add-task-button ${isBtnActive ? 'expand' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTransitionEnd={handleTransitionEnd}
        >
            <>
                <div className={`plus-strip-1 ${isBtnActive ? 'makeSmall' : ''}`}></div>
                <div className={`plus-strip-2 ${isBtnActive ? 'makeSmall' : ''}`}></div>
            </>

            <div
                className={`add-task-selection-wrapper ${transitionComplete && showOptions ? 'show' : ''}`}
                onClick={() => setIsAddTaskActive(true)}
            >
                <div className="add-task-option" onClick={() => setTypeOfTask('meeting')}>
                    <div className="task-icon"></div>
                    <div className="task-label">Meeting</div>
                </div>
                <div className="add-task-option" onClick={() => setTypeOfTask('todo')}>
                    <div className="task-icon"></div>
                    <div className="task-label">To Do</div>
                </div>
            </div>
        </div>
    );
};


export default TaskManager