import { FC, AnchorHTMLAttributes } from 'react';
import cn from 'classnames';

import { tidyUrlString } from '../utils';

import ExternalLinkIcon from '../svg/external-link.svg';

import '../styles/components/external-link.scss';

type Props = {
  /**
   * The location that is visted when clicked
   */
  url: string;
  /**
   * Decides if a new browser tab should be opened or not, defaults to true
   */
  newTab?: boolean;
  tidyUrl?: boolean;
  noIcon?: boolean;
};

const ExternalLink: FC<
  Props & Exclude<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
> = ({
  children,
  url,
  tidyUrl = false,
  newTab = true,
  className,
  rel,
  noIcon = false,
  ...props
}) => (
  <a
    {...props}
    className={cn('external-link', className)}
    rel={cn('noopener', rel)}
    href={url}
    {...(newTab ? { target: '_blank' } : {})}
  >
    {children || (tidyUrl ? tidyUrlString(url) : url)}
    {!noIcon && (
      <ExternalLinkIcon data-testid="external-link-icon" width={12.5} />
    )}
  </a>
);

export default ExternalLink;
