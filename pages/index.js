import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Layout from '../components/Layout';
import web3 from '../libs/web3';

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
    const accounts = await web3.eth.getAccounts();
    const balances = await Promise.all(accounts.map(x=>web3.eth.getBalance(x)));
    console.log(accounts);

    this.setState({ accounts: accounts.map((x, i) => ({ account: x, balance: balances[i] })) });
  };

  // eslint-disable-next-line require-jsdoc
  render() {
    const {classes} = this.props;
    const {accounts} = this.state;

    return (
      <div className={classes.root}>
        <Layout>
        <ul>
           {accounts.map(x => (
             <li key={x.account}>
+              {x.account} => {web3.utils.fromWei(x.balance, 'ether')} ETH
             </li>
           ))}
         </ul>
        </Layout>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);

