import cogoToast from 'cogo-toast';

/**
 * @description notification
 * @function notify
 * @param {string} type - notification type (error | success | info | warn | loading)
 * @param {string} message - notification message
 * @returns {void}
 */
const notify = (type, message) => cogoToast[type](message, { position: 'top-center' });

export default notify;
