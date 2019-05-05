import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Layout from '../components/Layout';
import Web3 from 'web3';

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
  constructor(props){
    super(props);

    this.state = {
      accounts:[],
    };
  }

  //init we3 provider before mount
  async componentDidMount(){
    const web3 = new Web3(window.web3.currentProvider);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    this.setState({accounts});
  };

  // eslint-disable-next-line require-jsdoc
  render() {
    const {classes} = this.props;
    const {accounts} = this.state;

    return (
      <div className={classes.root}>
        <Layout>
         <ul>{accounts.map(x => <li key={x}>{x}</li>)}</ul>
        </Layout>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);

