
const {useState, useMemo, useEffect} = React;
const {render} = ReactDOM;

const firstDayOfMonth = (date) => {
	return moment(date).startOf('month').format('d');
};

export const Calendar = () => {
	const [date, setDate] = useState(moment());
	const [monthOffset, setMonthOffset] = useState(0);
	const [numberOfDays, setNumberOfDays] = useState(date.daysInMonth());

	const weekDayShort = useMemo(() => moment.weekdaysShort(), []);
	const today = useMemo(() => date.format('D'), []);
	const days = useMemo(() => {
		let days = [];
		for (let i = 1; i < firstDayOfMonth(date); i++) {
			days = [...days, 0];
		}

		for (let i = 0; i <= numberOfDays; i++) {
			days = [...days, i];
		}

		return [...days];
	});

	useEffect(() => {
		if (!monthOffset) {
			setDate(moment());
		} else {
			setDate(date.add(monthOffset, 'M'));
		}
		setNumberOfDays(date.daysInMonth());
	}, [monthOffset]);

	return (
		<div className="calendar">
			<div className="calendar__title">
				<button
					className="calendar__next"
					onClick={() => setMonthOffset(monthOffset - 1)}
				>
					{'<'}
				</button>
				<div className="month">{date.format('MMMM, YYYY')}</div>
				<button
					className="calendar__prev"
					onClick={() => setMonthOffset(monthOffset + 1)}
				>
					{'>'}
				</button>
			</div>
			<div className="days">
				{weekDayShort.map((day) => {
					return (
						<p key={day} className="day day--name">
							{day}
						</p>
					);
				})}
				{days.map((day, i) => {
					return (
						<p
							key={i}
							className={`day ${!day && 'day--no-visible'} ${
								today == day && 'today'
							}`}
						>
							{day}
						</p>
					);
				})}
			</div>
		</div>
	);
};

const app = document.getElementById('app');
render(<Calendar />, app);
