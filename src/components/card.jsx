import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/card.scss';

const CardLink = ({ name, link, color }) => (
  <div className="card__link" style={color ? { borderColor: color } : {}}>
    <a href={link}>{name}</a>
  </div>
);

CardLink.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  color: PropTypes.string,
};

CardLink.defaultProps = {
  color: '',
};

const Card = ({
  title, subtitle, children, color, links,
}) => (
  <div className="card">
    <div className="card__header" style={color ? { borderColor: color } : {}}>
      <h3 className="card__title">{title}</h3>
      {subtitle ? <div className="card__subtitle">{subtitle}</div> : null}
    </div>
    <div className="card__content">{children}</div>
    {links.length === 0 ? null : (
      <div className="card__actions">
        {links.map(l => (
          <CardLink key={l.name} {...l} />
        ))}
      </div>
    )}
  </div>
);

Card.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.element.isRequired,
  color: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      color: PropTypes.string,
    }),
  ),
};

Card.defaultProps = {
  color: '',
  subtitle: '',
  links: [],
};

export default Card;
