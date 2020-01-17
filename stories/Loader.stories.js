import React from 'react';
import { Loader } from '../src/components';

export default {
  title: 'Data view/Loader',
  parameters: {
    purposeFunction: {
      purpose: '',
      function: '',
    },
  },
};

export const loader = () => <Loader />;
