
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import ArchivedTaskCard from '~/components/cards/ArchivedTaskCard';
import ConfirmDialogue from '~/components/dialogues/ConfirmDialogue';

export default function ArchivePanel()
{
    const [selectedTaskList, setSelectedTaskList] = useLocalStorage("selectedTaskList", { tasks: [] });
    const [taskLists, setTaskLists] = useLocalStorage("taskLists", []);
    const [tasks, setTasks] = useLocalStorage("tasks", []);

    const [dlgConfirm, toggleConfirmDialogue] = useState({ open: false });

    /**
     * Restore the selected task.
     */
    function onRestore(task)
    {
        toggleConfirmDialogue({ open: false });
    
        // Set Archived flag to false.
        task.archived = false;
        setTasks(p => p.map(t => t.id === task.id ? task : t));

        // Add to task list.
        const list = taskLists.find(l => l.id === task.taskListId);
        list.tasks.push(task.id);

        // Update taskLists.
        setTaskLists(p => p.map(t => t.id === selectedTaskList.id ? selectedTaskList : t));
    }

    /**
     * Restore the selected task.
     */
    function onRestoreClick(task)
    {
        toggleConfirmDialogue({
            open: true,
            title: task.title,
            task: task,
            message: 'Are you sure you wish to restore this Task?',
            onOk: () => onRestore(task),
        });
    }

    /**
     * Destroy the selected task.
     */
    function onDestroy(task)
    {
        toggleConfirmDialogue({ open: false });

        // Remove from tasks.
        setTasks(tasks.filter(t => t.id !== task.id));
    }

    /**
     * Destroy the selected task.
     */
    function onDestroyClick(task)
    {
        toggleConfirmDialogue({
            open: true,
            message: 'Are you sure you wish to destroy this Task?',
            title: task.title,
            task: task,
            onOk: () => onDestroy(task),
        });
    }

    return (
        <Stack gap={2}>
            {tasks.filter(p => p.archived == true).map((task, key) =>
            {
                return <ArchivedTaskCard key={key} task={task} onRestoreClick={onRestoreClick} onDestroyClick={onDestroyClick} />;
            })}

            {/* Dialogue Forms */}

            {dlgConfirm.open &&
                <ConfirmDialogue
                    open={dlgConfirm.open}
                    title={dlgConfirm.title}
                    message={dlgConfirm.message}
                    onOk={dlgConfirm.onOk}
                    onCancel={() => toggleConfirmDialogue({ open: false })}
                />}
        </Stack>
    );
}