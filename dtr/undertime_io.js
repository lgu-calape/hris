function undertime_io(hours, schedule) {
	let work_io = schedule.length, ms = 0;

	if (hours.filter(i=>i).length !== work_io) {
		return null;
	}

	if (work_io == 2) {
		let whr = Math.abs(new Date(parseInt(schedule[0]))-new Date(parseInt(schedule[1])));

		for (let n = 0; n < work_io; n++) {
			if (hours[n]) {				   
				let pHour = new Date(hours[n]);

				pHour.setHours(schedule[n], 0);

				if (n == 0 && hours[n] > pHour) {
					ms += hours[n] - pHour;
				}

				if (n == 1 && hours[n] < pHour) {
					ms += pHour - hours[n];
				}
			}
		}

		ms = Math.min(whr*36e5, ms);
	}

	if (work_io == 4) {
		for (let n = 0; n < work_io; n++) {
			if (hours[n]) {
				let pHour = new Date(hours[n]);

				pHour.setHours(schedule[n], 0);

				if ((n == 0 || n == 2) && hours[n] > pHour) {
					ms += Math.min(144e5, hours[n] - pHour);
				}

				if ((n == 1 || n == 3) && hours[n] < pHour) {
					ms += Math.min(144e5, pHour - hours[n]);
				}
			}
		}

		ms = Math.min(288e5, ms);
	}

	let d = new Date(0);

	d.setMilliseconds(ms);

	return d.toISOString().substr(11, 5);
}

//console.log(undertime_io([1668472200686, 1668484800686, 1668488400686, 1668502800686], [8, 12, 13, 17]));
