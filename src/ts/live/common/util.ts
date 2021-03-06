import * as d3 from 'd3';
import moment, { DurationInputArg2 } from 'moment';

class Util {
	public convertUpdateTime(timestamp: number): string {
		const diff = this.getNowTimestamp() - timestamp;
		if (diff < 60000) return 'Just Now';
		else if (diff < 3600000) return Math.floor(diff / 60000) + ' Minutes Ago';
		else if (diff < 86400000) return Math.floor(diff / 3600000) + ' Hours Ago';
		else if (diff < 2592000000) return Math.floor(diff / 86400000) + ' Days Ago';
		else return 'Long Time Ago';
	}

	public getNowTimestamp() {
		return moment().valueOf();
	}

	public calculateNav(
		price: number,
		time: number,
		resetPrice: number,
		resetTime: number,
		alpha: number,
		beta: number,
		period: number,
		coupon: number
	) {
		const navParent = (price / resetPrice / beta) * (1 + alpha);

		const navA = 1 + Math.floor((time - resetTime) / 1000 / period) * coupon;
		const navAAdj = navA * alpha;
		if (navParent <= navAAdj) return [navParent / alpha, 0];
		else return [navA, navParent - navAAdj];
	}

	public getDates(length: number, step: number, stepSize: DurationInputArg2, format: string) {
		const dates: string[] = [];
		const date = moment.utc();
		for (let i = 0; i < length; i++) {
			dates.push(date.format(format));
			date.subtract(step, stepSize);
		}
		dates.sort((a, b) => a.localeCompare(b));

		return dates;
	}

	public round(num: number) {
		return +(Math.floor((num + 'e+8') as any) + 'e-8');
	}

	public formatBalance(num: number) {
		if (Math.abs(num) < 1e-8)
			return '0.000';
		return d3
			.format(Math.abs(num) > 1 ? ',.4s' : ',.4n')(num)
			.toUpperCase()
			.replace(/G/g, 'B')
	}
}

const util = new Util();
export default util;
