import { ref } from 'vue';

const alerts = ref([]);

export function useAlert() {
	const vAlert = (message, type = 'error') => {
		alerts.value.push({ message, type });
		// showAlert.value = true;
		// alertMessage.value = message;
		// alertType.value = type;

		setTimeout(() => {
			// showAlert.value = false;
			alerts.value.shift();
		}, 2000);
	};

	const vSuccess = message => vAlert(message, 'success');

	return {
		alerts,
		vAlert,
		vSuccess,
	};
}
