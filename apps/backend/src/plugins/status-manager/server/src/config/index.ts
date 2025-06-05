
export default {
  default: ({ env }: { env: any }) => ({ optionA: true }),
  validator: (config: any) => { 
    if (typeof config.optionA !== 'boolean') {
      throw new Error('optionA has to be a boolean');
    }
  },
};