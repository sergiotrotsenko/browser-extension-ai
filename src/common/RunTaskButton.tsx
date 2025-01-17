import { Button, HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import { useAppState } from '../state/store';
import { BsPlayFill, BsStopFill } from 'react-icons/bs';

export default function RunTaskButton(props: { runTask: () => void }) {
  const state = useAppState((state) => ({
    taskState: state.currentTask.status,
    instructions: state.ui.instructions,
    interruptTask: state.currentTask.actions.interrupt,
  }));

  let button = (
    <Button
      borderRadius="20px"
      onClick={props.runTask}
      colorScheme="blue"
      disabled={state.taskState === 'running' || !state.instructions}
    >
      <Icon as={BsPlayFill} boxSize={6} />
    </Button>
  );

  if (state.taskState === 'running') {
    button = (
      <Button
        borderRadius="20px"
        onClick={state.interruptTask}
        colorScheme="red"
      >
        <Icon as={BsStopFill} boxSize={6} />
      </Button>
    );
  }

  return <HStack alignItems="center">{button}</HStack>;
}
