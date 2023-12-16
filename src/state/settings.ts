import { MyStateCreator } from './store';

export type SettingsSlice = {
  openAIKey: string | null;
  selectedModel: string;
  actions: {
    update: (values: Partial<SettingsSlice>) => void;
  };
};
export const createSettingsSlice: MyStateCreator<SettingsSlice> = (set) => ({
  openAIKey: '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',
  selectedModel: 'gpt-3.5-turbo',
  actions: {
    update: (values) => {
      set((state) => {
        state.settings = { ...state.settings, ...values };
      });
    },
  },
});
