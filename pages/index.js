import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Layout from '../components/Layout';

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
        <Layout>
          <Button variant="contained" color="primary">
            Welcome to Ethereum ICO DApp!
          </Button>
        </Layout>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);

