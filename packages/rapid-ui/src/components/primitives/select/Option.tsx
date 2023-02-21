import React from 'react';

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const Option = (props: OptionProps) => {
	return <option {...props} />;
};

export default Option;
