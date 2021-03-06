import React, {PropTypes} from 'react';
import withStyles from 'universal/styles/withStyles';
import {css} from 'aphrodite-local-styles/no-important';
import appTheme from 'universal/styles/theme/appTheme';
import ui from 'universal/styles/ui';
import labels from 'universal/styles/theme/labels';
import {ACTIVE, STUCK, DONE, FUTURE} from 'universal/utils/constants';
import {cardBorderTop} from 'universal/styles/helpers';
import {trimString} from 'universal/utils';

const SummaryCard = (props) => {
  const {
    content,
    status,
    styles,
  } = props;

  const rootStyles = css(
    styles.root,
    status ? styles[status] : styles.isAction
  );

  const trimmedContent = trimString(content, 40);

  return (
    <div className={rootStyles}>
      <div className={css(styles.content)}>
        {trimmedContent}
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  content: PropTypes.string,
  status: PropTypes.oneOf(labels.projectStatus.slugs),
  styles: PropTypes.object
};

const styleThunk = () => ({
  root: {
    backgroundColor: '#fff',
    border: `1px solid ${ui.cardBorderColor}`,
    borderRadius: ui.cardBorderRadius,
    maxWidth: '20rem',
    minHeight: '5rem',
    paddingTop: '.1875rem',
    position: 'relative',
    width: '100%',

    '::after': {
      ...cardBorderTop
    }
  },

  content: {
    padding: '.5rem'
  },

  [ACTIVE]: {
    '::after': {
      color: labels.projectStatus[ACTIVE].color
    }
  },

  [STUCK]: {
    '::after': {
      color: labels.projectStatus[STUCK].color
    }
  },

  [DONE]: {
    '::after': {
      color: labels.projectStatus[DONE].color
    }
  },

  [FUTURE]: {
    '::after': {
      color: labels.projectStatus[FUTURE].color
    }
  },

  isAction: {
    backgroundColor: appTheme.palette.light50l,

    '::after': {
      color: labels.action.color
    }
  }
});

export default withStyles(styleThunk)(SummaryCard);
