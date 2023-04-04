
import { Stack } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import TaskCard from '~/components/cards/TaskCard';

export default function TaskListDisplayPanel()
{
    const [selectedTaskList, _] = useLocalStorage("selectedTaskList", { tasks:[] });

    return (
        <Stack gap={2}>
            {selectedTaskList.tasks.map((id, key) =>
            {
                return <TaskCard key={key} id={id} />;
            })}
        </Stack>
    );
}