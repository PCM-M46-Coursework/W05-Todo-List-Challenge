import HeaderBar from './components/HeaderBar';
import SideBar from './components/SideBar';

import './App.css';
import { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function App()
{
    //localStorage.removeItem('currentTaskListId');
    if (localStorage.currentTaskListId === undefined)
    {
        const defaultData = [
            {
                id: "22de0ed3-c2fb-4415-a6c5-7670ae24e59a",
                title: "Kanban Board",
                description: "A Kanban style To Do list",
                selected: true
            },
            {
                id: "34765de7-cff5-4016-86c5-f1150dca7ce6",
                title: "My New List",
                description: "A new, default list.",
                selected: false
            }
        ];

        // Persist data.
        localStorage.storeObject('taskLists', defaultData);
        localStorage.currentTaskListId = defaultData[0].id;
    }

    const [taskLists, setTaskLists] = useState(() => localStorage.getObject('taskLists', []));
    const [archiveSelected, setArchiveSelected] = useState(false);

    function setSelectedTaskList(list)
    {
        setArchiveSelected(list === null);
        list ??= { id: '' };
        setTaskLists(p =>
        {
            const newList = p.map(item =>
            {
                return ({
                    ...item,
                    selected: item.id === list.id
                });
            });

            localStorage.currentTaskListId = list.id;
            localStorage.storeObject('taskLists', newList);
            return newList;
        });
    }

    function addTaskList(data)
    {
        setTaskLists(p =>
        {
            const updatedList = p.map(item =>
            {
                return ({
                    ...item,
                    selected: false
                });
            });

            const newList = {
                id: crypto.randomUUID(),
                title: data.title,
                description: data.description,
                selected: true
            };

            updatedList.push(newList);

            localStorage.currentTaskListId = newList.id;
            localStorage.storeObject('taskLists', updatedList);
            return updatedList;
        });
    }

    function deleteTaskList(list)
    {
        setTaskLists(p =>
        {
            const newList = p.filter(l => l.id !== list.id);
            setArchiveSelected(newList.length === 0);
            if (newList.length > 0) {
                newList[0].selected = true;
                
            }
            localStorage.currentTaskListId = newList[0]?.id || '';
            localStorage.storeObject('taskLists', newList);
            return newList;
        });
    }

    function editTaskList(editedList)
    {
        setTaskLists(p =>
        {
            const newList = p.map(list => list.id === editedList.id ? editedList : list);
            localStorage.storeObject('taskLists', newList);
            return newList;
        });
    }

    function getCurrentPageTitle()
    {
        try {
            if (archiveSelected)
            {
                return "Archive • Task List App";
            }
            if (localStorage.currentTaskListId.length > 0)
            {
                const taskList = taskLists.find(p => p.id === localStorage.currentTaskListId);
                return `${taskList.title} • Task List App`;
            }
        } catch {
            return 'Task List App';
        }
        return 'Task List App';
    }

    return (
        <div className="App">
            <Helmet>
                <title>{ getCurrentPageTitle() }</title>
            </Helmet>
            <HeaderBar />
            <main className='page-container'>
                <SideBar
                    taskLists={taskLists}
                    setSelected={setSelectedTaskList}
                    isArchiveSelected={archiveSelected}
                    addTaskList={addTaskList}
                    deleteTaskList={deleteTaskList}
                    editTaskList={editTaskList} />
            </main>
        </div>
    );
}