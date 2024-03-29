interface ConditionalClassName {
	condition: boolean;
	classNames: string;
}

/**
 * `styles` is a Rapid helper for easily adding conditional TailwindCSS styles to your components (very similar to Clsx: https://github.com/lukeed/clsx)
 */
// Simple helper function for adding conditional styles with tailwindCSS
function styles(...classNames: Array<string | ConditionalClassName | boolean>) {
	return classNames
		.reduce<Array<string | ConditionalClassName | boolean>>(
			(
				result: (string | ConditionalClassName | boolean)[],
				className: string | ConditionalClassName | boolean,
			) => {
				// Check if we got a boolean in the array
				if (typeof className === 'boolean') {
					// If we did, move on to the next iteration
					return result;
				}
				// Force-cast our className
				const typedCondition = className as ConditionalClassName;
				// Check to see if we got a conditional object in the array
				if (typedCondition?.condition != undefined) {
					// if we did, lets check if the condition was true
					if (typedCondition?.condition) {
						// if the condition was true, add it to the array
						result.push(typedCondition.classNames);
					}
					// Move on to next iteration
					return result;
				}
				// If we got a normal className, just push it to the result array and move on
				result.push(className);
				return result;
			},
			[],
		)
		.join(' '); // sanitize all the classNames by adding a space between each one
}

export default styles;
