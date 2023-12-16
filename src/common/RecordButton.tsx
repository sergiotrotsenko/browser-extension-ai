import { Button, HStack, Icon } from '@chakra-ui/react';
import React from 'react';
import { useAppState } from '../state/store';
import { BsStopFill, BsRecordFill } from 'react-icons/bs';

export default function RecordButton(props: { runTask: () => void }) {
  const state = useAppState((state) => ({
    taskState: state.currentTask.status,
    recording: state.ui.recording,
    interruptTask: state.currentTask.actions.interrupt,
    updateRecording: state.ui.actions.setRecording,
  }));

  let button = (
    <Button
      borderRadius="20px"
      onClick={(e) => state.updateRecording('running')}
      colorScheme="gray"
    >
      <Icon as={BsRecordFill} boxSize={6} />
    </Button>
  );

  if (state.recording === 'running') {
    button = (
      <Button
        borderRadius="20px"
        onClick={(e) => state.updateRecording('stopped')}
        colorScheme="red"
      >
        <Icon as={BsStopFill} boxSize={6} />
      </Button>
    );
  }

  return <HStack alignItems="center">{button}</HStack>;
}
