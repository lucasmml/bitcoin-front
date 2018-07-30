import React, {Component} from 'react'
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import _ from 'lodash';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';


const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
   progress: {
    margin: theme.spacing.unit * 2,
  }
});

class PaperClass extends Component {

  state = {
    bitcoinInfo: [],
    transfers: [],
    sell: [],
    purchase: []
  }

  componentDidMount() {
    //fixme criar uma api para este get
    axios.get(`http://localhost/bitcoin-api/exercicie1/json`)
    .then(res => {
      const bitcoinInfo = res.data;
      this.setState({ bitcoinInfo });
    })
    
    //fixme criar uma api para este get
    axios.get(`http://localhost/bitcoin-api/extra/transfers`)
    .then(res => {
      const transfers = res.data;
      this.setState({ transfers });
      this.getSellTransfer();
    });
  }

  getSellTransfer() {
    const sell = [];
    const purchase = [];
    this.state.transfers.forEach(element => {
      if("sell" === element.type){
        sell.push({date : new Date(element.date), price: element.price});
      } else if("buy" === element.type){
        purchase.push({date : new Date(element.date), price: element.price});
      }
    });
    this.setState({ sell });
    this.setState({ purchase });
  }

  render() {
    const {classes} = this.props;

    if(_.isEmpty(this.state.bitcoinInfo)){
      return <div><CircularProgress className={classes.progress} /></div>
    }

    return <div>
      <Typography variant="headline" component="h2">Data from bitcoin API</Typography>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">Top 5 purchase</Typography>
         { this.state.bitcoinInfo.top_5_purchase.map(purchase => 
         <Typography component="p">
          {purchase}
        </Typography>)}
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">Top 5 sales</Typography>
         { this.state.bitcoinInfo.top_5_sales.map(sale => 
         <Typography component="p">
          {sale}
        </Typography>)}
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">Purchase average</Typography>
        <Typography component="p">
        {this.state.bitcoinInfo.purchase_average}
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">Sales average</Typography>
        <Typography component="p">
        {this.state.bitcoinInfo.sales_average}
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">Purchase median</Typography>
        <Typography component="p">
        {this.state.bitcoinInfo.purchase_median}
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">Sales median</Typography>
        <Typography component="p">
        {this.state.bitcoinInfo.sales_median}
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">Purchase standard deviation</Typography>
        <Typography component="p">
        {this.state.bitcoinInfo.purchase_deviation}
        </Typography>
      </Paper>

      <Paper className={classes.root} elevation={1}>
        <Typography variant="headline" component="h3">Sales standard deviation</Typography>
        <Typography component="p">
        {this.state.bitcoinInfo.sales_deviation}
        </Typography>
      </Paper>

      <br/>
      <br/>
      <Typography variant="headline" component="h2">Sell Graphic</Typography>
      <br/>
      <div>
        <LineChart width={1200} height={500} data={this.state.sell}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="price" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#CC6666" />
        </LineChart>
      </div>

      <br/>
      <br/>
      <Typography variant="headline" component="h2">Purchase Graphic</Typography>
      <br/>
      <div>
        <LineChart width={1200} height={500} data={this.state.purchase}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="price" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#33CC66" />
        </LineChart>
      </div>

    </div>
  }
}

export default withStyles(styles)(PaperClass);