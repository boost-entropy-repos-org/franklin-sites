import React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';

import { Message } from '../src/components';

import { getLipsumSentences } from '../src/mock-data/lipsum';

export default {
  title: 'Layout/Message',
  decorators: [withKnobs()],
  parameters: {
    purposeFunction: {
      function:
        'Give the user some feedback about something happening (tool running, error) or time-boxed information about the website (downtime, etc.)',
      purpose:
        'They are noticeable but do not disrup the user experience. Some can be dismissed.',
    },
  },
};

const subtitle = (
  <>
    Try using <a href="#">BLAST</a>, <a href="#">Align</a>,{' '}
    <a href="#">ID Mapping/Retrieve</a> or{' '}
    <a href="#">Peptide Search to begin</a>
  </>
);

export const message = () => {
  const forFullPage = boolean('forFullPage', false, 'Props');
  const noIcon = boolean('noIcon', false, 'Props');
  const noShadow = boolean('noShadow', false, 'Props');
  const dismissible = boolean('dismissible', true, 'Not direct props');
  const withSubtitle = boolean('with subtitle', false, 'Not direct props');
  const numberOfParagraphs = number(
    'number of paragraphs',
    1,
    undefined,
    'Not direct props'
  );
  return (
    <Message
      onDismiss={dismissible ? action('Dismiss') : undefined}
      level={select(
        'level',
        ['warning', 'failure', 'success', 'info'],
        'info',
        'Props'
      )}
      subtitle={withSubtitle ? subtitle : undefined}
      forFullPage={forFullPage}
      noIcon={noIcon}
      noShadow={noShadow}
    >
      {Array.from({ length: numberOfParagraphs }, (_, i) => (
        <div key={i}>{getLipsumSentences()}</div>
      ))}
    </Message>
  );
};
