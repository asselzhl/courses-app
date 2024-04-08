import React from 'react';

const style = {
	pageButton: `uppercase bg-[#007298] text-white rounded py-[13px] px-9 hover:opacity-80 duration-300`,
};

const Button = ({ text, onClick }) => {
	return (
		<div>
			<button className={style.pageButton} onClick={onClick}>
				{text}
			</button>
		</div>
	);
};

export default Button;
