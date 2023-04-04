import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { isEmpty } from 'lodash';

import HeaderBar from './components/bars/HeaderBar';
import SideBar from './components/bars/SideBar';
import MainPanel from './components/panels/MainPanel';

import './App.css';

/**
 * The main application page for the task list app.
 * 
 * @returns {JSX.Element} - The rendered component.
 */
export default function App()
{
    // =========================================================
    //  DEFAULT STATE
    // =========================================================

    //localStorage.removeItem('currentTaskListId'); // DEBUG RESET
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
        localStorage.isArchiveSelected = false;
        localStorage.documentTitle = 'Task List Challenge';
    }

    const [taskLists, setTaskLists] = useState(localStorage.getObject('taskLists', []));
    const [archiveSelected, setArchiveState] = useState(localStorage.isArchiveSelected === true);
    const [documentTitle, setDocumentTitle] = useState(localStorage.documentTitle);

    // =========================================================
    //  PERSISTANCE
    // =========================================================

    /**
     * This hook is used to set the intial conditions for the app, based on values within the local storage. 
     * It runs only once on initial mount.
     * 
     * @function
     * @param {void}
     * @returns {void}
     */
    useEffect(() =>
    {
        if (localStorage.isArchiveSelected === true)
        {
            onArchiveButtonClicked();
            return;
        }

        const selectedList = taskLists.filter(p => p.selected);
        if (isEmpty(selectedList))
        {
            onArchiveButtonClicked();
            return;
        }
        setSelectedTaskList(selectedList[0]);
    }, []);

    /**
     * This hook is used to save the archive selection to localStorage and set the document title if archive is selected.
     * It runs when archiveSelected value changes.
     * 
     * @function
     * @param {boolean} archiveSelected - The current value of archive selection.
     * @returns {void}
     */
    useEffect(() =>
    {
        localStorage.isArchiveSelected = archiveSelected;
        console.log(localStorage.isArchiveSelected);
        if (archiveSelected !== true) return;
        setDocumentTitle('Archive • Task List Challenge');
    }, [archiveSelected]);

    /**
     * This hook is used to save the selected task list to localStorage and update the document title.
     * It runs when taskLists value changes.
     * 
     * @function
     * @param {Array} taskLists - The list of tasks lists.
     * @returns {void}
     */
    useEffect(() =>
    {
        const selectedList = taskLists.filter(p => p.selected);
        localStorage.currentTaskListId = selectedList[0]?.id || "";
        localStorage.storeObject('taskLists', taskLists);

        if (archiveSelected === true) return;
        if (isEmpty(taskLists))
        {
            onArchiveButtonClicked();
            return;
        }

        const suffix = "Task List Challenge";
        if (isEmpty(selectedList))
        {
            setDocumentTitle(suffix);
            return;
        }
        setDocumentTitle(`${selectedList[0].title} • ${suffix}`);
    }, [taskLists]);

    /**
     * This hook is used to save the document title to localStorage.
     * It runs when documentTitle value changes.
     * 
     * @function
     * @param {string} documentTitle - The current value of document title.
     * @returns {void}
     */
    useEffect(() =>
    {
        localStorage.documentTitle = documentTitle;
    }, [documentTitle]);

    // =========================================================
    //  STATE CHANGE HANDLERS
    // =========================================================
    
    /**
     * Sets archive state to true and clears the selected task list.
     *
     * @function
     * @param {void}
     * @returns {void}
     */
    function onArchiveButtonClicked()
    {
        setArchiveState(true);
        setTaskListState();
    }

    /**
     * Sets archive state to false and mutates the task list based on the provided function.
     *
     * @function
     * @param {function} mutationFunction - The function used to mutate the task list.
     * @returns {void}
     */
    function onAnyTaskListAction(mutationFunction)
    {
        setArchiveState(false);
        setTaskListState(mutationFunction);
    }

    /**
     * Sets the task list state based on the provided mutation function or the default no-op function.
     *
     * @function
     * @param {function} [mutate = _ => _] - The function used to mutate the task list.
     * @returns {void}
     */
    function setTaskListState(mutate = _ => _)
    {
        setTaskLists(p =>
            mutate(p.map(item => ({ ...item, selected: false }))));
    }

    // =========================================================
    //  MUTATION FUNCTIONS
    // =========================================================

    /**
     * Sets the selected task list based on the provided list object.
     *
     * @function
     * @param {object} list - The task list object to be selected.
     * @returns {void}
     */
    function setSelectedTaskList(list)
    {
        onAnyTaskListAction(p =>
            p.map(item => ({ ...item, selected: item.id === list.id })));
    }

    /**
     * Adds a new task list with the provided title and description to the task list array.
     *
     * @function
     * @param {object} item - The object containing title and description of the new task list.
     * @returns {void}
     */
    function addTaskList(item)
    {
        onAnyTaskListAction(p =>
        {
            p.push({
                id: crypto.randomUUID(),
                title: item.title,
                description: item.description,
                selected: true
            });
            return p;
        });
    }

    /**
     * Deletes the specified task list from the task list array and selects the next available task list.
     *
     * @function
     * @param {object} item - The task list object to be deleted.
     * @returns {void}
     */
    function deleteTaskList(item)
    {
        onAnyTaskListAction(p =>
        {
            const updatedState = p.filter(l => l.id !== item.id);
            if (updatedState.length > 0) updatedState[0].selected = true;
            return updatedState;
        });
    }

    /**
     * Updates the task list with the provided editedList object.
     *
     * @function
     * @param {object} editedList - The task list object to be updated.
     * @returns {void}
     */
    function editTaskList(editedList)
    {
        onAnyTaskListAction(p =>
        {
            return p.map(list => list.id === editedList.id ? editedList : list);
        });
    }

    // =========================================================
    //  RETURN
    // =========================================================

    return (
        <div className="App">
            <Helmet>
                <title>{documentTitle}</title>
            </Helmet>
            <HeaderBar />
            <main className='page-container'>
                <SideBar
                    taskLists={taskLists}
                    setSelected={setSelectedTaskList}
                    isArchiveSelected={archiveSelected}
                    onArchiveButtonClicked={onArchiveButtonClicked}
                    addTaskList={addTaskList}
                    deleteTaskList={deleteTaskList}
                    editTaskList={editTaskList}
                />
                <MainPanel
                    isArchiveSelected={archiveSelected}
                    currentTaskListFilter={taskLists.filter(p => p.id === localStorage.currentTaskListId)}
                />
            </main>
        </div>
    );
}