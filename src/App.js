import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { isArray, isEmpty } from 'lodash';

import HeaderBar from './components/bars/HeaderBar';
import SideBar from './components/bars/SideBar';
import MainPanel from './components/panels/MainPanel';

import './App.css';
import { useLocalStorage } from 'usehooks-ts';

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

    const [taskLists, setTaskLists] = useLocalStorage("taskLists", []);
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [isArchiveSelected, setIsArchiveSelected] = useLocalStorage("isArchiveSelected", false);
    const [documentTitle, setDocumentTitle] = useLocalStorage("documentTitle", "Task List Challenge");
    const [selectedTaskList, setSelectedTaskList] = useLocalStorage("selectedTaskList", {});

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
        //localStorage.clear(); // DEBUG RESET
        if (isEmpty(taskLists))
        {
            const defaultTaskLists = [
                {
                    id: "22de0ed3-c2fb-4415-a6c5-7670ae24e59a",
                    title: "Kanban Board",
                    description: "A Kanban style To Do list",
                    tasks: []
                },
                {
                    id: "34765de7-cff5-4016-86c5-f1150dca7ce6",
                    title: "My New List",
                    description: "A new, default list.",
                    tasks: []
                }
            ];
            setTaskLists(defaultTaskLists);
            setSelectedTaskList(defaultTaskLists[0]);
        }
    }, []);

    /**
     * This hook is used to save the archive selection to localStorage and set the document title if archive is selected.
     * It runs when isArchiveSelected value changes.
     * 
     * @function
     * @param {boolean} isArchiveSelected - The current value of archive selection.
     */
    useEffect(() =>
    {
        if (isArchiveSelected !== true) return;
        setDocumentTitle('Archive • Task List Challenge');
    }, [isArchiveSelected]);

    /**
     * This hook is used to update the document title.
     * It runs when taskLists value changes.
     * 
     * @function
     * @param {Array} taskLists - The list of tasks lists.
     * @returns {void}
     */
    useEffect(() =>
    {
        if (isArchiveSelected === true) return;

        const suffix = "Task List Challenge";
        if (isEmpty(selectedTaskList))
        {
            setDocumentTitle(suffix);
            return;
        }

        setSelectedTaskList(taskLists.find(t => t.id === selectedTaskList.id));
        setDocumentTitle(`${selectedTaskList.title} • ${suffix}`);
    }, [taskLists]);

    // =========================================================
    //  STATE CHANGE HANDLERS
    // =========================================================

    /**
     * Sets archive state, and selected task list.
     *
     * @function
     * @param {function} mutationFunction - The function used to mutate the task list.
     * @returns {void}
     */
    function setArchiveState(state)
    {
        setIsArchiveSelected(state);
        if (state) setSelectedTaskList({});
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
        setTaskLists(p => mutate(p));
    }

    // =========================================================
    //  TASK LIST CRUD FUNCTIONS
    // =========================================================

    /**
     * Sets the selected task list based on the provided list object.
     *
     * @function
     * @param {object} list - The task list object to be selected.
     * @returns {void}
     */
    function setTaskList(list)
    {
        setArchiveState(false);
        setSelectedTaskList(list);
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
                tasks: []
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
            if (updatedState.length > 0) {
                setSelectedTaskList(updatedState[0]);
            } else {
                setArchiveState(true);
            }
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
    //  TASK CRUD FUNCTIONS
    // =========================================================

    /**
     * Adds a new task with the provided title and description to the task array, and 
     * associates the task with the currently selected task list.
     *
     * @function
     * @param {String} task - The strin containing the title of the new task.
     * @param {String} task - The object containing the description of the new task.
     * @param {Object} task - The object containing details of the task list to add this new task to.
     * @returns {void}
     */
    function addTask(title, description, selectedTaskList)
    {
        // Generate a `Task` object from the `Add` form info. 
        const task =
        {
            id: crypto.randomUUID(),
            taskListId: selectedTaskList.id,
            title: title,
            description: description,
            archived: false
        };

        // Persist `Task` and `TaskList` data to `localStorage`.
        setTasks(p => isArray(p) ? [...p, task] : [task]);

        // Associate generated `Task` with it's parent `TaskList`.
        selectedTaskList.tasks.push(task.id);
        editTaskList(selectedTaskList);
        return task.id;
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
                    setSelected={setTaskList}
                    isArchiveSelected={isArchiveSelected}
                    onArchiveButtonClicked={() => setArchiveState(true)}
                    addTaskList={addTaskList}
                    deleteTaskList={deleteTaskList}
                    editTaskList={editTaskList}
                />
                <MainPanel
                    isArchiveSelected={isArchiveSelected}
                    updateTaskList={editTaskList}
                    addTask={addTask}
                />
            </main>
        </div>
    );
}