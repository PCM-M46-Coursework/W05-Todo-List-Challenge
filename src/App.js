import HeaderBar from './components/HeaderBar';
import SideBar from './components/SideBar';

import './App.css';
import { useState } from 'react';

export default function App()
{
    localStorage.removeItem('currentTaskListId');
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
            localStorage.storeObject('taskLists', newList);
            return newList;
        });
    }

    function addTaskList(data) {
        setTaskLists(p =>
        {
            const newList = p.map(item =>
            {
                return ({
                    ...item,
                    selected: false
                });
            });

            newList.push({
                id: crypto.randomUUID(),
                title: data.title,
                description: data.description,
                selected: true
            });

            localStorage.storeObject('taskLists', newList);
            return newList;
        });
    }

    function deleteTaskList(list) {
        setTaskLists(p =>
        {
            const newList = p.filter(l => l.id !== list.id);
            setArchiveSelected(newList.length === 0);
            if (newList.length > 0) newList[0].selected = true;
            localStorage.storeObject('taskLists', newList);
            return newList;
        });
    }

    function editTaskList(editedList) {
        setTaskLists(p => {
          const newList = p.map(list => list.id === editedList.id ? editedList : list);
          localStorage.storeObject('taskLists', newList);
          return newList;
        });
      }

    return (
        <div className="App">
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