import { MyStateCreator } from './store';

export type UiSlice = {
  instructions: string | null;
  recording: string | 'running' | 'stopped';
  actions: {
    setInstructions: (instructions: string) => void;
    setRecording: (instructions: string) => void;
  };
};
export const createUiSlice: MyStateCreator<UiSlice> = (set) => ({
  instructions: null,
  recording: 'stopped',
  actions: {
    setInstructions: (instructions) => {
      set((state) => {
        state.ui.instructions = instructions;
      });
    },
    setRecording: (recording) => {
      set((state) => {
        state.ui.recording = recording;
      });
    },
  },
});
