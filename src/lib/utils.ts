import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const switchcase = (cases: any) => (defaultCase: any) => (key: string) =>
	cases.hasOwnProperty(key) ? cases[key] : defaultCase;

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_BASE_URL}${path}`;
}

export const get = <T>(
	obj: { [key: string]: any },
	path: string | string[],
	defValue?: T,
): T | undefined => {
	// If path is not defined or it has false value
	if (!path) return undefined;

	// Check if path is string or array. Regex : ensure that we do not have '.' and brackets.
	// Regex explained: https://regexr.com/58j0k
	const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);

	if (!pathArray) return undefined;

	// Find value
	const result = pathArray.reduce(
		(prevObj, key) => prevObj && prevObj[key],
		obj,
	);

	// If found value is undefined return default value; otherwise return the value
	return result === undefined ? defValue : (result as T);
};
