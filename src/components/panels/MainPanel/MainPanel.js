import { Typography, Stack, Box } from '@mui/material';
import { isEmpty } from 'lodash';

import NoTasksCard from '~/components/cards/NoTasksCard';
import AddTaskPanel from '../AddTaskPanel';

import './MainPanel.css';
import { useReadLocalStorage, useLocalStorage } from 'usehooks-ts';
import { useState } from 'react';
import TaskListDisplayPanel from '../TaskListDisplayPanel';

/**
 * A component for displaying a list of tasks.
 * 
 * @param {Object} props - The component props.
 * @param {boolean} props.isArchiveSelected - A boolean indicating whether the archive is selected.
 * @param {Array} props.currentTaskListFilter - An array of task list filters.
 * @returns {JSX.Element} - The rendered component.
 */
export default function MainPanel({ addTask })
{
    const isArchiveSelected = useReadLocalStorage("isArchiveSelected");
    const [selectedTaskList, _] = useLocalStorage("selectedTaskList", { tasks:[] });

    const title = selectedTaskList?.title || "Archived Tasks";
    const description = selectedTaskList?.description || "";

    /**
     * Adds a new task to the current list.
     * 
     * @param {string} title - The title of the new task to add to the current list.
     * @param {string} description - The the description of the new task to add to the current list.
     */
    function addTaskToList(title, description)
    {
        addTask(title, description, selectedTaskList);
    }

    return (
        <Box className="main-panel">
            <Stack sx={{ mb: 3, pl: 3 }} direction={"row"} alignItems={"center"} gap={3}>
                <Typography className="title">{title}</Typography>
                <Typography className="description">{description}</Typography>
            </Stack>
            {isArchiveSelected
                ? <>
                    {/* ARCHIVE PANEL */}
                </>
                : <Stack gap={4}>
                    <AddTaskPanel addTaskToList={addTaskToList} />
                    {isEmpty(selectedTaskList.tasks) || selectedTaskList.tasks.length === 0
                        ? <NoTasksCard />
                        : <TaskListDisplayPanel />
                    }
                </Stack>
            }
        </Box>
    );
}