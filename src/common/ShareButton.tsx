import { Button, HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import { useAppState } from '../state/store';
import { BsShareFill } from 'react-icons/bs';

export default function ShareButton() {
  const state = useAppState((state) => ({
    taskState: state.currentTask.status,
    instructions: state.ui.instructions,
    interruptTask: state.currentTask.actions.interrupt,
  }));

  const button = (
      <Button
      borderRadius="20px"
      colorScheme="gray"
      disabled={state.taskState === 'running' || !state.instructions}
    >
        <Icon as={BsShareFill} boxSize={6} />
      </Button>
  );

  return <HStack alignItems="center">{button}</HStack>;
}
