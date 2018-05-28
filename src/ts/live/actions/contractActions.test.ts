import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
//import * as CST from '../common/constants';
import contractUtil from '../common/contractUtil';
import * as contractActions from './contractActions';

const mockStore = configureMockStore([thunk]);

describe('actions', () => {
	test('custodianStatesUpdate', () => {
		expect(contractActions.custodianStatesUpdate({test: 'test'} as any)).toMatchSnapshot();
	});

	test('getCustodianStates', () => {
		const store = mockStore({});
		contractUtil.getSystemStates = jest.fn(() => Promise.resolve({
			test: 'test'
		}));
		store.dispatch(contractActions.getCustodianStates() as any);
		return new Promise(resolve =>
			setTimeout(() => {
				expect(store.getActions()).toMatchSnapshot();
				resolve();
			}, 1000)
		);
	});
});
