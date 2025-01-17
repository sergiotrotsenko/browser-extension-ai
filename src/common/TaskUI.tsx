import { HStack, Spacer, useToast } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useAppState } from '../state/store';
import RunTaskButton from './RunTaskButton';
import RecordButton from './RecordButton';
import ShareButton from './ShareButton';
import Options from './Options';
// import { BsOptions } from 'react-icons/bs';

const TaskUI = () => {
  const state = useAppState((state) => ({
    taskHistory: state.currentTask.history,
    taskStatus: state.currentTask.status,
    runTask: state.currentTask.actions.runTask,
    addDebugger: state.currentTask.actions.addDebugger,
    instructions: state.ui.instructions,
    setInstructions: state.ui.actions.setInstructions,
  }));

  // state.addDebugger();

  const taskInProgress = state.taskStatus === 'running';

  const toast = useToast();

  const toastError = useCallback(
    (message: string) => {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
    [toast]
  );

  const runTask = () => {
    state.instructions && state.runTask(toastError);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      runTask();
    }
  };
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <>
      <HStack>
        <RecordButton runTask={runTask} />
        <RunTaskButton runTask={runTask} />
        <ShareButton />
        <input
          type="checkbox"
          checked={showSettings}
          onChange={() => setShowSettings(!showSettings)}
        ></input>
        {showSettings}
        <Spacer />
      </HStack>
      {showSettings && <Options></Options>}
    </>
  );
};

export default TaskUI;
