import { HStack, Textarea, useToast } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { debugMode } from '../constants';
import { useAppState } from '../state/store';
import TaskHistory from './TaskHistory';
import TaskStatus from './TaskStatus';
import ModelDropdown from './ModelDropdown';
import OptionsDropdown from './OptionsDropdown';
import SetAPIKey from './SetAPIKey';
// import { BsOptions } from 'react-icons/bs';

const TaskUI = () => {
  const state = useAppState((state) => ({
    taskHistory: state.currentTask.history,
    taskStatus: state.currentTask.status,
    runTask: state.currentTask.actions.runTask,
    instructions: state.ui.instructions,
    setInstructions: state.ui.actions.setInstructions,
  }));

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
      {/* <HStack w="full"> */}
      <HStack mt="2" w="full">
        <Textarea
          autoFocus
          placeholder="Taxy uses OpenAI's GPT-4 API to perform actions on the current page. Try telling it to sign up for a newsletter, or to add an item to your cart."
          value={state.instructions || ''}
          disabled={taskInProgress}
          onChange={(e) => state.setInstructions(e.target.value)}
          mb={2}
          onKeyDown={onKeyDown}
        />
      </HStack>
      <HStack mt="2" w="full">
        {debugMode && <TaskStatus />}
        <ModelDropdown />
      </HStack>
      <HStack mt="2" w="full">
        <OptionsDropdown />
        <SetAPIKey />
      </HStack>
      <HStack mt="2" w="full">
        <TaskHistory />
      </HStack>
      {/* </HStack> */}
    </>
  );
};

export default TaskUI;
