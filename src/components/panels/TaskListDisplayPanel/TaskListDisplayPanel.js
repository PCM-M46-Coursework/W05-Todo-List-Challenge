
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import TaskCard from '~/components/cards/TaskCard';
import AddEditDialogue from '~/components/dialogues/AddEditDialogue';
import ConfirmDialogue from '~/components/dialogues/ConfirmDialogue';

export default function TaskListDisplayPanel()
{
    const [selectedTaskList, _] = useLocalStorage("selectedTaskList", { tasks: [] });
    const [tasks, setTasks] = useLocalStorage("tasks", []);
    const [dlgEdit, toggleEditDialogue] = useState({ open: false });
    const [dlgArchive, toggleArchiveDialogue] = useState({ open: false });

    /**
     * Archive the selected task.
     */
    function onArchive()
    {

        toggleArchiveDialogue({ open: false });        
    }

    /**
     * Archive the selected task.
     */
    function onArchiveClick(task)
    {
        toggleArchiveDialogue({
            open: true,
            title: task.title,
            task: task
        });
    }

    /**
     * Edits the selected task.
     */
    function onEdit(task) {
        setTasks(p => p.map(t => t.id === task.id ? task : t));
        toggleEditDialogue({ open: false });
    }

    /**
     * Edits the selected task.
     */
    function onEditClick(task) {
        toggleEditDialogue({
            open: true,
            title: task.title,
            initial: task
        });
    }

    return (
        <Stack gap={2}>
            {selectedTaskList.tasks.map((id, key) =>
            {
                return <TaskCard key={key} id={id} onArchiveClick={onArchiveClick} onEditClick={onEditClick} />;
            })}

            {/* Dialogue Forms */}

            {dlgArchive.open &&
                <ConfirmDialogue
                    open={dlgArchive.open}
                    title={dlgArchive.title}
                    message='Are you sure you wish to archive this Task?'
                    onOk={() => onArchive(dlgArchive.task)}
                    onCancel={() => toggleArchiveDialogue({ open: false })}
                />}

            {dlgEdit.open &&
                <AddEditDialogue
                    open={dlgEdit.open}
                    initial={dlgEdit.initial}
                    type="Edit"
                    dialogueTitle="Task"
                    onConfirm={onEdit}
                    onClose={() => toggleEditDialogue({ open: false })}
                />}
        </Stack>
    );
}