/* eslint-disable eqeqeq */
import { useEffect, useRef, useState } from 'react';
import './TaskManager.scss';
import LongArrowMark from './LongArrowMark/LongArrowMark';

const dummyData = {
    [new Date().toISOString().split("T")[0]]:
        [
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
        ]
}

const TaskManager = () => {
    const [taskData, setTaskData] = useState(dummyData)
    const [taskDate, setTaskDate] = useState(new Date().toISOString().split("T")[0])
    const [tasks, setTasks] = useState(taskData[taskDate] || []);
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
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskNotes, setNewTaskNotes] = useState([]);
    const [taskMembers, setTaskMembers] = useState([]);

    const [meetingMembers, setMeetingMembers] = useState([])

    const [isBtnActive, setIsBtnActive] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [transitionComplete, setTransitionComplete] = useState(false);

    const [isAddMemberActive, setIsAddMemberActive] = useState(false)

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    console.log(new Date().toISOString().split('T')[0], 'testDate')

    console.log(meetingMembers, 'taskMembers')

    const addMember = (member) => {
        setMeetingMembers(prevMembers => [...prevMembers, member]);
    };

    const removeMember = (memberToRemove) => {
        setMeetingMembers(prevMembers => prevMembers.filter(member => member.name !== memberToRemove.name));
    };

    useEffect(() => {
        if (activeItem) {
            const formattedDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;
            const currentTask = taskData[formattedDate].find(task => task.id === activeItem);
            if (currentTask && currentTask.task.type === 'meeting') {
                setTaskMembers(currentTask.task.tasks[0].members || []);
            }
        }
    }, [activeItem, taskData, selectedYear, selectedMonth, selectedDate]);

    useEffect(() => {
        function outsideListOfTasks(event) {
            if (!listOfTasks?.current?.contains(event.target)) {
                setIsActive(false)
                setActiveItem(null)
                setIsAddTaskActive(false)
                setTypeOfTask(null)
                setIsBtnActive(false)
                setShowOptions(false)
                setTransitionComplete(false)
                setIsAddMemberActive(false)
            }
        }

        document.addEventListener('mousedown', outsideListOfTasks)

        return () => { document.removeEventListener('mousedown', outsideListOfTasks) }
    }, [])


    useEffect(() => {
        updateCurrentWeek();
    }, [selectedYear, selectedMonth, selectedDate]);

    useEffect(() => {
        const formattedDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;
        setTasks(taskData[formattedDate] || []);
    }, [selectedYear, selectedMonth, selectedDate, taskData]);


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

    const addNewTask = () => {
        const formattedDate = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;
        const newTask = {
            id: Date.now(),
            title: newTaskTitle,
            color: '#FFCC00',
            task: {
                type: typeOfTask,
                tasks: typeOfTask === 'meeting'
                    ? [{ members: meetingMembers, notes: newTaskNotes }]
                    : newTaskNotes.map(note => ({ content: note, isChecked: false }))
            }
        };

        setTaskData(prevData => ({
            ...prevData,
            [formattedDate]: [...(prevData[formattedDate] || []), newTask]
        }));

        setTasks(prevTasks => [...prevTasks, newTask]);
        setIsAddTaskActive(false);
        setNewTaskTitle('');
        setNewTaskNotes([]);
        setMeetingMembers([]); // Reset meeting members after adding the task
    };

    console.log(taskDate, 'selectedDate')

    const renderCurrentWeekSection = () => {
        const isToday = (date) => date.toDateString() === new Date(selectedYear, selectedMonth, selectedDate).toDateString();
        return (
            <div className='current-week-section'>
                {currentWeek.map((date, index) => (
                    <div
                        key={index}
                        className={`week-date-component ${isToday(date) ? 'today' : ''}`}
                        onClick={() => {
                            setSelectedDate(date.getDate());
                            setSelectedMonth(date.getMonth());
                            setSelectedYear(date.getFullYear());
                        }}
                    >
                        <div className='week-label'>{days[date.getDay()]}</div>
                        <div className={`date-label ${isToday(date) ? 'highlight' : ''}`}>{date.getDate().toString().padStart(2, '0')}</div>
                        <div className='task-accent-circles-wrapper'>
                            {taskData[date.toISOString().split('T')[0]]?.map((_, i) => (
                                <div key={i} className='accent-circle'></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderMonthsView = () => {
        return (
            <div className="months-view">
                <div className='months-view-wrapper'>
                    <h3>{selectedYear}</h3>
                    <div className="list-of-months-wrapper">
                        {months.map((month, monthIndex) => {
                            const firstDay = new Date(selectedYear, monthIndex, 1).getDay();
                            const daysInMonth = new Date(selectedYear, monthIndex + 1, 0).getDate();
                            const weeks = Math.ceil((firstDay + daysInMonth) / 7);

                            return (
                                <div key={month} className="month-card">
                                    <h3>{month}</h3>
                                    <table>
                                        <thead>
                                            <tr>
                                                {days.map(day => <th key={day}>{day}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(weeks)].map((_, weekIndex) => (
                                                <tr key={weekIndex}>
                                                    {[...Array(7)].map((_, dayIndex) => {
                                                        const day = weekIndex * 7 + dayIndex - firstDay + 1;
                                                        const date = new Date(selectedYear, monthIndex, day);
                                                        const formattedDate = date.toISOString().split('T')[0];
                                                        const hasTask = taskData[formattedDate]?.length > 0;
                                                        const isCurrentMonth = monthIndex === new Date().getMonth();
                                                        const isCurrentYear = selectedYear === new Date().getFullYear();
                                                        const isToday = isCurrentMonth && isCurrentYear && day === new Date().getDate();
                                                        const isSelected = day === selectedDate && monthIndex === selectedMonth;
                                                        return (
                                                            <td
                                                                key={dayIndex}
                                                                className={`
                                                                    ${day > 0 && day <= daysInMonth ? 'valid-day' : 'invalid-day'}
                                                                    ${isToday ? 'current-day' : ''}
                                                                    ${isSelected ? 'selected-day' : ''}
                                                                    ${hasTask ? 'has-task' : ''}
                                                                `}
                                                                onClick={() => {
                                                                    if (day > 0 && day <= daysInMonth) {
                                                                        setSelectedDate(day);
                                                                        setSelectedMonth(monthIndex);
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
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const resetToToday = () => {
        const today = new Date();
        setSelectedYear(today.getFullYear());
        setSelectedMonth(today.getMonth());
        setSelectedDate(today.getDate());
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
                <div className={`upcoming-tasks-section ${isAddTaskActive ? 'expand' : ''}`} ref={listOfTasks} style={{ height: isActive ? '81%' : '' }}>
                    <div className={`upcoming-tasks-wrapper ${isAddTaskActive ? 'hide' : ''}`} style={{ gap: isActive ? '0px' : '' }}>
                        {tasks.map((item, index) => (
                            <div className={`task-component ${isActive == true && activeItem != item.id ? "hidden" : ''}`} key={item.id} onClick={() => {
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
                                                    {item.task.tasks[0]?.members.map((member, idx) => (
                                                        <div key={idx} className='profile' onClick={() => removeMember(member)}>
                                                            {member.name.charAt(0)}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className='divider'></div>
                                            <div className='meeting-notes-wrapper'>
                                                <div className='title'>Notes</div>
                                                <div className='notes-list-wrapper-meeting'>
                                                    <ul>
                                                        {item.task.tasks[0]?.notes?.map((point, idx) => <li key={idx}>{point}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='to-do-section-container'>
                                            <div className='divider'></div>
                                            <div className='to-do-notes-wrapper'>
                                                <div className='title'>To Dos</div>
                                                <div className='notes-list-wrapper-todo'>
                                                    <ul>
                                                        {item.task.tasks?.map((content, idx) => (
                                                            <li key={idx}>
                                                                <label className="custom-checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={content.isChecked}
                                                                        onChange={() => {
                                                                            const updatedTasks = [...tasks];
                                                                            updatedTasks[index].task.tasks[idx].isChecked = !content.isChecked;
                                                                            setTasks(updatedTasks);
                                                                        }}
                                                                    />
                                                                    <span className="checkmark"></span>
                                                                    {content.content}
                                                                </label>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={`add-task-container ${isAddTaskActive ? 'show' : ''}`}>
                        <div className='add-task-tittle-wrapper'>
                            <div className='accent-strip'></div>
                            <div className='task-overview-wrapper'>
                                <div className='add-title-wrapper'>
                                    <input
                                        type='text'
                                        className='task-name'
                                        placeholder='Add Title'
                                        value={newTaskTitle}
                                        onChange={(e) => setNewTaskTitle(e.target.value)}
                                    />
                                </div>
                                <div className='task-timing-wrapper'>
                                    <div className='task-timing'><span>12:30 PM</span> <LongArrowMark /> <span>01:00 PM</span></div>
                                </div>
                            </div>
                        </div>
                        <div className='divider'></div>
                        {typeOfTask === 'meeting' ? (
                            <>
                                <div className='add-member-wrapper'>
                                    <div className='title'>Meeting With</div>
                                    <div className='meeting-member-profiles' style={{ display: 'grid', gridTemplateColumns: `repeat(${meetingMembers.length}, 35px)` }}>
                                        {meetingMembers.map((member, index) =>
                                            <div key={index} className='profile' onClick={() => removeMember(member)}>
                                                {member.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className='add-member-component' onClick={() => setIsAddMemberActive(true)}>
                                        <div className='add-icon'>
                                            <div className='plus-strip1'></div>
                                            <div className='plus-strip2'></div>
                                        </div>
                                        <div className='add-label'>Add Member</div>
                                    </div>
                                </div>
                                <div className='divider'></div>
                                <div className='add-notes-wrapper'>
                                    <div className='title'>Notes</div>
                                    <div className='notes-list-wrapper-meeting'>
                                        <ul>
                                            {newTaskNotes.map((note, index) => (
                                                <li key={index}>{note}</li>
                                            ))}
                                            <li>
                                                <input
                                                    type='text'
                                                    placeholder='Add Note'
                                                    className='add-note'
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                                            setNewTaskNotes([...newTaskNotes, e.target.value.trim()]);
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='add-notes-wrapper-todo'>
                                <div className='title'>To Dos</div>
                                <div className='notes-list-wrapper-todo'>
                                    <ul>
                                        {newTaskNotes.map((todo, index) => (
                                            <li key={index}>
                                                <label className="custom-checkbox">
                                                    <input type="checkbox" />
                                                    <span className="checkmark"></span>
                                                    {todo}
                                                </label>
                                            </li>
                                        ))}
                                        <li className='add-take-li'>
                                            <label className="custom-checkbox">
                                                <span className="checkmark"></span>
                                            </label>
                                            <input
                                                type='text'
                                                placeholder='Add Todo'
                                                className='text-field'
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                                        setNewTaskNotes([...newTaskNotes, e.target.value.trim()]);
                                                        e.target.value = '';
                                                    }
                                                }}
                                            />

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>


                    <div className={`members-list ${isAddMemberActive ? 'show' : ''}`}>
                        {[
                            { name: 'Venkat', url: '' },
                            { name: 'John Doe', url: '' },
                            { name: 'Jane Smith', url: '' },
                            { name: 'Bob Johnson', url: '' }
                        ].map((member, index) => {
                            const isMemberAdded = meetingMembers.some(m => m.name === member.name);
                            return (
                                <div className='member-wrapper' key={index}>
                                    <div className='member-profile profile'>{member.name.charAt(0)}</div>
                                    <div className='name'>{member.name}</div>
                                    <button
                                        className={`action-btn ${isMemberAdded ? 'remove' : 'add'}`}
                                        onClick={() => isMemberAdded ? removeMember(member) : addMember(member)}
                                    >
                                        {isMemberAdded ? 'Remove' : 'Add'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    <AddTaskButton
                        addNewTask={addNewTask}
                        isBtnActive={isBtnActive}
                        setIsBtnActive={setIsBtnActive}
                        setIsAddTaskActive={setIsAddTaskActive}
                        setTypeOfTask={setTypeOfTask}
                        typeOfTask={typeOfTask}
                        showOptions={showOptions}
                        setShowOptions={setShowOptions}
                        transitionComplete={transitionComplete}
                        setTransitionComplete={setTransitionComplete}
                    />
                    <div className='gradient-layer'></div>
                </div>
            </div>
        );
    };


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
                <div className="months-btn" onClick={() => {
                    setView('months');
                    resetToToday();
                    setTimeout(() => {
                        const currentDayElement = document.querySelector('.current-day');
                        if (currentDayElement) {
                            currentDayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                    }, 0);
                }}>Months</div>
            </div>
        </div>
    );
}

const AddTaskButton = ({
    setIsAddTaskActive,
    setTypeOfTask,
    addNewTask,
    typeOfTask,
    isBtnActive,
    setIsBtnActive,
    showOptions,
    setShowOptions,
    transitionComplete,
    setTransitionComplete
}) => {

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
            className={`add-task-button ${isBtnActive && typeOfTask == null ? 'expand' : ''} ${typeOfTask ? 'expandForSave' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTransitionEnd={handleTransitionEnd}
        >


            {typeOfTask ? <button className='save-task-button' onClick={() => {
                addNewTask()
                setTypeOfTask(null)
            }}>Save</button> :
                <>
                    <div className={`plus-strip-1 ${isBtnActive ? 'makeSmall' : ''}`}></div>
                    <div className={`plus-strip-2 ${isBtnActive ? 'makeSmall' : ''}`}></div>

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
                </>
            }
        </div >
    );
};


export default TaskManager
