import Tick from '@pqina/flip';
import '@pqina/flip/dist/flip.min.css';

export default defineNuxtPlugin(() => {
	return {
		provide: {
			Tick: Tick,
		},
	};
});
