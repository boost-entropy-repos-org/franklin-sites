import React from 'react';
import {
  SwissProtIcon,
  TremblIcon,
  ObsoleteIcon,
  TagIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ExternalLinkIcon,
  DownloadIcon,
  BasketIcon,
  StatisticsIcon,
} from '../components';

const size = 30;

const iconDefinition = [
  {
    name: 'swissprot.svg',
    description: 'SwissProt reviewed',
    icon: <SwissProtIcon width={size} height={size} />,
  },
  {
    name: 'trembl.svg',
    description: 'Trembl unreviewed',
    icon: <TremblIcon width={size} height={size} />,
  },
  {
    name: 'obsolete.svg',
    description: 'Obsolete entry',
    icon: <ObsoleteIcon width={size} height={size} />,
  },
  {
    name: 'tag.svg',
    description: 'Tag',
    icon: <TagIcon width={size} height={size} />,
  },
  {
    name: 'chevron-up.svg',
    description: 'Chevron Up',
    icon: <ChevronUpIcon width={size} height={size} />,
  },
  {
    name: 'chevron-down.svg',
    description: 'Chevron Down',
    icon: <ChevronDownIcon width={size} height={size} />,
  },
  {
    name: 'external-link.svg',
    description: 'External Link',
    icon: <ExternalLinkIcon width={size} height={size} />,
  },
  {
    name: 'download.svg',
    description: 'Download',
    icon: <DownloadIcon width={size} height={size} />,
  },
  {
    name: 'basket.svg',
    description: 'Basket',
    icon: <BasketIcon width={size} height={size} />,
  },
  {
    name: 'statistics.svg',
    description: 'Statistics',
    icon: <StatisticsIcon width={size} height={size} />,
  },
];

const Icons = () => (
  <div className="atoms-section" id="icons">
    <h1>Icons</h1>
    <div className="icon-list">
      {iconDefinition.map(d => (
        <div className="icon-container" key={d.name}>
          {d.icon}
          <div>
            <small>{d.description}</small>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Icons;