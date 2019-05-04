import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
import {Button} from '@material-ui/core';

const styles = (theme) =>({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.uint*20,
  },
});
/**
 * The Index page render
 */
class Index extends React.Component {
  // eslint-disable-next-line require-jsdoc
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Button variant="contained" color="primary">
                    Welcome to Ethereum ICO DApp!
        </Button>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);

