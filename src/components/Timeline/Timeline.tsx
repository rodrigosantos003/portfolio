"use client"

import React, { MouseEventHandler } from 'react';
import './Timeline.css';

const Timeline: React.FC = () => {
	const handleClick: MouseEventHandler<HTMLElement> = (ev) => {
		// Access the clicked element using ev.currentTarget
		const clickedElement = ev.currentTarget;
		document.getElementsByClassName("active-tl").length > 0 ? document.getElementsByClassName("active-tl")[0].className = "" : "";
		clickedElement.className = "active-tl";
	};

	return (
		<div className="container">
			<ul className="timeline">
				<li onClick={handleClick}>RightCo</li>
				<li onClick={handleClick}>Wyntegrate</li>
				<li onClick={handleClick}>Secretaria-Geral do Ambiente</li>
			</ul>
		</div>
	);
};

export default Timeline;
