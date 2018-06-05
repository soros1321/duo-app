import moment from 'moment';
import * as React from 'react';
import contractUtil from '../common/contractUtil';
import { IBalances, ICustodianPrices, ICustodianStates, IPriceBars } from '../common/types';

interface IProps {
	refresh: number;
	states: ICustodianStates;
	prices: ICustodianPrices;
	balances: IBalances;
	hourly: IPriceBars;
	minutely: IPriceBars;
}

export default class Duo extends React.PureComponent<IProps> {
	public render() {
		const { refresh, states, prices, balances, hourly, minutely } = this.props;
		return (
			<div>
				<button onClick={() => contractUtil.create(0.1)}>Create 0.1 eth</button>
				<button onClick={() => contractUtil.redeem(balances.tokenA, balances.tokenB)}>Redeem all balance</button>
				<div>{'Updated at ' + moment(refresh).format()}</div>
				<pre>{JSON.stringify(states, null, 4)}</pre>
				<pre>{JSON.stringify(prices, null, 4)}</pre>
				<pre>{JSON.stringify(balances, null, 4)}</pre>
				<pre>{JSON.stringify(hourly, null, 4)}</pre>
				<pre>{JSON.stringify(minutely, null, 4)}</pre>
			</div>
		);
	}
}
