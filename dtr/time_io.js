function time_io(logged_hours, working_hours = [8, 12, 13, 17]) {
	var hours = logged_hours.split(';'), punches = hours.length;

	if (punches > 1) {
		hours.sort(function (a, b) { return a - b });
	}

	/* tungod kay daghan reklamo aning dapita, check duplicate punches @ noon */
	if (punches > 4) {
		var dose = hours.filter(n => {
			let d = new Date(Number(n));	
		 
			if ( d.getHours() === 12 ) {
				return n;
			}
		});

		if (dose.length > 2) {
			dose.pop(); dose.shift();

			hours = hours.filter(n => !dose.includes(n));

			punches = hours.length;

			console.log(new Date(Number(hours[0])));
		}
	}

	let records = [], work_io = working_hours.length;

	if (work_io == 2) {
		for (let i = 0; i < 4; i++) records[i] = null;

		for (let n = 0; n < work_io; n++) {
			let tPunch = null, wHour = working_hours[n];

			if (hours[n]) {
				let pHour = parseInt(hours[n]),
					pTime = new Date(pHour);

				tPunch = pTime;//.toLocaleString('en-PH',{hour:'numeric',minute:'numeric',hour12:true});
			}

			if (wHour < 13) {
				records[n] = tPunch;
			}
			else {
				records[n + 2] = tPunch;
			}
		}
	}

	if (work_io == 4) {
		for (let n = 0; n < work_io; n++) {
			let pTime = null, wHour = working_hours[n];

			records[n] = pTime;

			if (hours[n]) {
				pTime = new Date(parseInt(hours[n]));

				if (punches == 1) {
					if (n == 0) {
						if (pTime.getHours() > 14) {
							hours[3] = hours[0];
							continue;
						}

						if (pTime.getHours() > 11) {
							hours[2] = hours[0];
							continue;
						}
					}
				}

				if (punches == 2) {
					let msdiff = hours[1] - hours[0];

					if (n == 0) {
						if (pTime.getHours() > 11) {
							if (msdiff < 3e6) {
								hours[2] = hours[1];
								hours[1] = hours[0];
								continue;
							}

							hours[2] = hours[0];
							hours[3] = hours[1];
							continue;
						}
					}

					if (n == 1) {
						if (hours[3]) continue;

						if (msdiff > 252e5) {
							hours[3] = hours[1];
							continue;
						}

						if (pTime.getHours() > 12 && msdiff > 21e5) {
							hours[3] = hours[1];
							continue;
						}
					}
				}

				if (punches == 3) {
					let msdiff = hours[1] - hours[0];

					if (n == 0) {
						if (pTime.getHours() > 11) {
							if (msdiff < 354e4) {
								hours[3] = hours[2];
								hours[2] = hours[1];
								hours[1] = hours[0];
								continue;
							}
						}
					}

					if (n == 1) {
						if (pTime.getHours() > 12 && msdiff > 18e6) {
							hours[3] = hours[2];
							hours[2] = hours[1];
							continue;
						}
					}

					if (n == 2) {
						msdiff = hours[2] - hours[1];

						if (msdiff > 1368e4) {
							hours[3] = hours[2];
							continue;
						}
					}
				}

				if (punches == 31) {
					let wTime = new Date(parseInt(hours[n])), wt = wTime.setHours(wHour, 0, 0, 0);

					if (n == 0 && pTime - wt > 108e5) {
						hours[3] = hours[2];
						hours[2] = hours[1];
						hours[1] = hours[0];
						continue;
					}

					if (n == 1) {
						let w7 = wTime.setHours(12, 30, 0, 0);
						if (pTime - w7 > 0 && hours[2] - w7 > 54e5) {
							hours[3] = hours[2];
							hours[2] = hours[1];
							continue;
						}
					}

					if (n == 2 && hours[2] - hours[1] > 126e5 && pTime.getHours() > 13) {
						hours[3] = hours[2];
						continue;
					}
				}

				records[n] = pTime;//.toLocaleString('en-PH',{hour:'numeric',minute:'numeric',hour12:true});
			}
		}
	}

	return { ...records };
}

//console.log(time_io("1668472200686;1668484800686;1668488400686;1668502800686"));
