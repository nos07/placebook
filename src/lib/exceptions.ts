/**
 * example: throw new RequiresProPlanError()
 */
export class SendEmailError extends Error {
	constructor(message = 'Failed to sent verify email') {
		super(message);
		this.name = 'SendEmailError';
	}
}

export class PasswordValidationError extends Error {
	constructor(message = 'Password is invalid') {
		super(message);
		this.name = 'PasswordValidationError';
	}
}
