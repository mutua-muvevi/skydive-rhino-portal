// utils/format-select-options.js

/**
 * Transforms an array of items into a format suitable for the SelectField options prop.
 * @param {Array} items - The array of items to transform.
 * @param {String} valueKey - The key to use for the value field (optional).
 * @param {String} labelKey - The key to use for the label field (optional).
 * @returns {Array} An array of objects with 'value' and 'label' properties.
 */
const formatSelectOptions = (items, valueKey = "", labelKey = "") => {
	return items.map((item) => {
		if (typeof item === "object" && item !== null) {
			// For objects, use the provided keys to extract value and label
			return {
				value: valueKey && item[valueKey] ? item[valueKey] : item,
				label: labelKey && item[labelKey] ? item[labelKey] : item,
			};
		}
		// For primitive types, use the item itself for both value and label
		return {
			value: item,
			label: item,
		};
	});
};

export default formatSelectOptions;
