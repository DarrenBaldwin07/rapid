const WELCOME_TEMPLATE =
	"<style> body { background-color: #1D2125; color: #fff; overflow: hidden; } .welcome-container { position: absolute; width: 100%; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 11; } .grad-container1 { position: absolute; bottom: -300px; right: -250px; z-index: 10; } .grad-container2 { position: absolute; top: 0; left: -250px; width: 100%; height: 100%; z-index: 5; } .grad-container3 { position: absolute; top: -250px; left: 50%; transform: translateX(-25%); width: 100%; height: 100%; z-index: 5; } .documentation { display: flex; } .docs-link { position: absolute; bottom: 40px; text-decoration: none; color: #fff; display: flex; align-items: center; font-size: 1rem; font-weight: bold; margin: 4 0rem; font-family: Arial, Helvetica, sans-serif; } .docs-link:hover { text-decoration: underline; } .logo { display: flex; flex-direction: column; align-items: center; } .version { font-size: 0.7rem; padding: 0; font-weight: bold; font-family: Arial, Helvetica, sans-serif; } .version-pill { background-color: #fff; color: #000; padding: 0; } </style><div class='grad-container1'> <svg width='1000' height='1000' viewBox='0 0 796 762' fill='none' xmlns='http://www.w3.org/2000/svg'> <g filter='url(#filter0_f_201_5)'> <path fill-rule='evenodd' clip-rule='evenodd' d='M543.221 320.362C539.68 283.983 563.397 238.628 538.518 212.946C512.523 186.112 477.718 222.202 445.868 219.865C425.877 218.398 404.746 195.258 386.548 201.796C367.28 208.717 369.184 249.405 349.316 254.551C322.369 261.53 289.494 223.008 263.821 233.582C241.725 242.682 238.984 278.488 229.758 303.792C219.044 333.173 190.344 363.192 204.908 395.148C221.825 432.267 266.959 432.912 298.001 453.526C315.688 465.271 331.765 479.221 349.402 491.102C365.759 502.122 382.081 511.37 398.776 521.417C420.108 534.253 444.125 571.465 462.231 558.999C483.899 544.079 452.321 480.545 475.515 468.579C508.473 451.574 561.585 518.933 589.577 493.295C610.538 474.097 565.266 428.464 556.208 394.673C549.572 369.919 545.66 345.411 543.221 320.362Z' fill='url(#paint0_linear_201_5)' fill-opacity='0.6'/> </g> <defs> <filter id='filter0_f_201_5' x='0.869385' y='0.634644' width='794.189' height='760.882' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'> <feFlood flood-opacity='0' result='BackgroundImageFix'/> <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/> <feGaussianBlur stdDeviation='100' result='effect1_foregroundBlur_201_5'/> </filter> <linearGradient id='paint0_linear_201_5' x1='294.128' y1='624.802' x2='302.037' y2='170.896' gradientUnits='userSpaceOnUse'> <stop offset='0.979167' stop-color='#0EC5FF' stop-opacity='0.55'/> <stop offset='1' stop-color='#092AD0' stop-opacity='0.08'/> </linearGradient> </defs> </svg></div><div class='grad-container2'> <svg width='1944' height='1682' viewBox'0 0 1944 1682' fill='none' xmlns='http://www.w3.org/2000/svg'> <g filter='url(#filter0_f_201_4)'> <path fill-rule='evenodd' clip-rule='evenodd' d='M400.068 935.537C341.008 832.02 167.933 753.464 205.345 640.206C244.436 521.862 438.48 555.76 546.468 492.333C614.247 452.523 643.415 352.779 720.607 337.566C802.336 321.459 875.661 433.547 956.019 411.618C1065 381.877 1105.42 219.965 1216.97 202.111C1312.99 186.744 1393.13 277.454 1475.53 328.469C1571.21 387.707 1731.73 416.353 1743.12 527.852C1756.35 657.363 1598.08 740.121 1528.91 850.911C1489.5 914.038 1460.11 980.162 1421.15 1043.56C1385.01 1102.36 1345.51 1156.37 1306.26 1213.17C1256.11 1285.76 1244.43 1428.27 1155.9 1427.48C1049.95 1426.54 1036.56 1200.15 931.034 1209.84C781.072 1223.59 725.86 1498.86 576.463 1480.64C464.596 1467 534.844 1263.84 500.376 1157.33C475.126 1079.3 440.736 1006.82 400.068 935.537Z' fill='url(#paint0_linear_201_4)' fill-opacity='0.6'/> </g> <defs> <filter id='filter0_f_201_4' x='0.102417' y='0.380981' width='1943.8' height='1681.13' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'> <feFlood flood-opacity='0' result='BackgroundImageFix'/> <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/> <feGaussianBlur stdDeviation='100' result='effect1_foregroundBlur_201_4'/> </filter> <linearGradient id='paint0_linear_201_4' x1='1879.6' y1='1301.41' x2='1186.15' y2='-16.459' gradientUnits='userSpaceOnUse'> <stop stop-color='#0EC5FF' stop-opacity='0.55'/> <stop offset='0.411458' stop-color='#092AD0'/> <stop offset='0.9999' stop-color='#092AD0' stop-opacity='0.08'/> </linearGradient> </defs> </svg> </div><div class='grad-container3'> <svg width='796' height='762' viewBox='0 0 796 762' fill='none' xmlns='http://www.w3.org/2000/svg'> <g filter='url(#filter0_f_201_2)'> <path fill-rule='evenodd' clip-rule='evenodd' d='M543.221 320.362C539.68 283.983 563.397 238.628 538.519 212.946C512.523 186.112 477.718 222.202 445.868 219.865C425.877 218.398 404.746 195.258 386.548 201.796C367.28 208.717 369.184 249.405 349.316 254.551C322.369 261.53 289.494 223.008 263.821 233.582C241.725 242.682 238.984 278.488 229.758 303.792C219.044 333.173 190.344 363.192 204.908 395.148C221.825 432.267 266.959 432.912 298.001 453.526C315.688 465.271 331.765 479.221 349.402 491.102C365.759 502.122 382.081 511.37 398.776 521.417C420.108 534.253 444.125 571.465 462.231 558.999C483.899 544.079 452.321 480.545 475.515 468.579C508.473 451.574 561.585 518.933 589.578 493.295C610.538 474.097 565.266 428.464 556.208 394.673C549.572 369.919 545.66 345.411 543.221 320.362Z' fill='url(#paint0_linear_201_2)' fill-opacity='0.6'/> </g> <defs> <filter id='filter0_f_201_2' x='0.869385' y='0.634583' width='794.19' height='760.882' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'> <feFlood flood-opacity='0' result='BackgroundImageFix'/> <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape'/> <feGaussianBlur stdDeviation='100' result='effect1_foregroundBlur_201_2'/> </filter> <linearGradient id='paint0_linear_201_2' x1='294.128' y1='624.802' x2='302.037' y2='170.896' gradientUnits='userSpaceOnUse'> <stop stop-color='#0EC5FF' stop-opacity='0.55'/> <stop offset='0.0001' stop-color='#356DEE'/> </linearGradient> </defs> </svg></div>";

const ArrowIcon = () => {
	return (
		<svg
			width='15'
			height='12.86'
			viewBox='0 0 60 53'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M58.7411 29.3125C60.4152 27.6384 60.4152 24.9196 58.7411 23.2455L37.3125 1.81695C35.6384 0.142844 32.9196 0.142844 31.2455 1.81695C29.5714 3.49106 29.5714 6.20981 31.2455 7.88391L45.375 22H4.28571C1.91518 22 0 23.9152 0 26.2857C0 28.6562 1.91518 30.5714 4.28571 30.5714H45.3616L31.2589 44.6875C29.5848 46.3616 29.5848 49.0803 31.2589 50.7545C32.933 52.4286 35.6518 52.4286 37.3259 50.7545L58.7545 29.3259L58.7411 29.3125Z'
				fill='white'
			/>
		</svg>
	);
};

interface WelcomeProps {
	children: React.ReactNode;
}

/**
 * Welcome to RAPID!
 *
 * Check out the documentation at https://rapid.cincinnati.ventures
 */
function Welcome({ children }: WelcomeProps) {
	return (
		<div>
			<div dangerouslySetInnerHTML={{ __html: WELCOME_TEMPLATE }} />
			<div className='welcome-container'>
				<div className='logo'>
					<svg
						width='173'
						height='43'
						viewBox='0 0 173 43'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M40.625 33V8.955H54.59C56.3633 8.955 57.845 9.29333 59.035 9.97C60.225 10.6233 61.1117 11.5333 61.695 12.7C62.3017 13.8433 62.605 15.1267 62.605 16.55C62.605 18.09 62.2433 19.4667 61.52 20.68C60.82 21.87 59.8283 22.8033 58.545 23.48L63.375 33H56.375L52.385 24.53H46.89V33H40.625ZM46.89 19.875H53.365C54.2283 19.875 54.9167 19.595 55.43 19.035C55.9667 18.4517 56.235 17.6817 56.235 16.725C56.235 16.095 56.1183 15.5583 55.885 15.115C55.6517 14.6717 55.325 14.3333 54.905 14.1C54.485 13.8433 53.9717 13.715 53.365 13.715H46.89V19.875ZM69.43 33L78.46 8.955H85.985L95.015 33H88.33L86.895 28.835H77.305L75.87 33H69.43ZM78.81 24.145H85.355L83.64 19.07C83.5467 18.8133 83.43 18.4983 83.29 18.125C83.1733 17.7283 83.045 17.32 82.905 16.9C82.7883 16.4567 82.6717 16.0133 82.555 15.57C82.4383 15.1267 82.3217 14.7417 82.205 14.415H81.96C81.8667 14.8583 81.7267 15.36 81.54 15.92C81.3767 16.48 81.2017 17.04 81.015 17.6C80.8517 18.16 80.7 18.65 80.56 19.07L78.81 24.145ZM102.788 33V8.955H116.018C117.652 8.955 119.04 9.29333 120.183 9.97C121.35 10.6233 122.237 11.545 122.843 12.735C123.473 13.9017 123.788 15.2783 123.788 16.865C123.788 18.4983 123.462 19.91 122.808 21.1C122.178 22.29 121.268 23.2233 120.078 23.9C118.912 24.5533 117.512 24.88 115.878 24.88H109.053V33H102.788ZM109.053 20.05H114.408C115.388 20.05 116.135 19.7817 116.648 19.245C117.162 18.685 117.418 17.915 117.418 16.935C117.418 16.235 117.302 15.6633 117.068 15.22C116.858 14.7767 116.532 14.4383 116.088 14.205C115.645 13.9483 115.085 13.82 114.408 13.82H109.053V20.05ZM132.127 33V8.955H138.392V33H132.127ZM148.545 33V8.955H158.59C161.204 8.955 163.409 9.38667 165.205 10.25C167.025 11.1133 168.402 12.4317 169.335 14.205C170.292 15.955 170.77 18.2067 170.77 20.96C170.77 23.69 170.292 25.9533 169.335 27.75C168.402 29.5233 167.025 30.8417 165.205 31.705C163.409 32.5683 161.204 33 158.59 33H148.545ZM154.81 28.1H158.52C159.5 28.1 160.352 27.96 161.075 27.68C161.799 27.4 162.405 26.9917 162.895 26.455C163.385 25.9183 163.747 25.2533 163.98 24.46C164.214 23.6667 164.33 22.7567 164.33 21.73V20.26C164.33 19.21 164.214 18.2883 163.98 17.495C163.747 16.7017 163.385 16.0367 162.895 15.5C162.405 14.9633 161.799 14.555 161.075 14.275C160.352 13.995 159.5 13.855 158.52 13.855H154.81V28.1Z'
							fill='white'
						/>
						<rect
							width='11'
							height='25'
							rx='5.5'
							transform='matrix(-0.892596 -0.450858 0.533643 -0.84571 9.81854 26.1022)'
							fill='white'
						/>
						<rect
							width='10.8379'
							height='25.5856'
							rx='5.41894'
							transform='matrix(-0.892596 -0.450858 0.533643 -0.84571 14.4911 42.986)'
							fill='white'
						/>
					</svg>
				</div>
				{children}
				<a
					rel='noreferrer'
					target='_blank'
					className='docs-link'
					href='https://rapid.cincinnati.ventures'
				>
					<div style={{ marginRight: '4px' }}>Documentation</div>
					<ArrowIcon />
				</a>
			</div>
		</div>
	);
}

export default Welcome;
