import styled, { css } from 'styled-components'

const Button = styled.button`
	background: transparent;
	border-radius: 3px;
	margin: 0.5em 1em;
	padding: 0.25em 1em;

	${props => {
		if (props.variant === 'info') {
			return css`
				border: 2px solid blue;
				background: blue;
				color: white;
			`
		}
		if (props.variant === 'danger') {
			return css`
				border: 2px solid palevioletred;
				background: palevioletred;
				color: white;
			`
		}
		if (props.variant === 'message') {
			return css`
				border: 2px solid yellow;
				background: yellow;
				color: white;
			`
		}
	}}
`

export default Button
