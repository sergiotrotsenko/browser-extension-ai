import { Box, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { useAppState } from '../state/store';
import TaskUI from './TaskUI';

const App = () => {
  const openAIKey = useAppState((state) => state.settings.openAIKey);

  return (
    <ChakraProvider>
      <Box p="2" fontSize="lg" w="full">
        <TaskUI />
      </Box>
    </ChakraProvider>
  );
};

export default App;
