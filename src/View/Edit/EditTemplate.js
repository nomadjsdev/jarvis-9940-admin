import React, { useState } from 'react'
import Row from 'Component/Session/Row'
import SessionButton from 'Component/Session/Button'

const EditTemplate = props => {
	const { encounterTemplates, selectedEncounter } = props
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div>
			<div>
				<h2>Current template</h2>
				<button
					type="button"
					onClick={() => {
						setIsEditing(!isEditing)
					}}
				>
					Edit template
				</button>
			</div>
			{encounterTemplates[selectedEncounter].map((row, rowIndex) => {
				return (
					<Row key={rowIndex} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
						{row.map((col, colIndex) => {
							return (
								<div key={colIndex}>
									{col.map((button, buttonIndex) => {
										if (button.type === 'toggle') {
											return (
												<div key={buttonIndex}>
													<SessionButton type="button" variant="danger">
														{button.text}
													</SessionButton>
												</div>
											)
										}
										if (button.type === 'group') {
											return (
												<div
													key={buttonIndex}
													style={{
														display: 'flex',
														flexDirection: button.direction === 'horizontal' ? 'row' : 'column',
													}}
												>
													{button.buttons.map((button, buttonIndex) => {
														return (
															<SessionButton key={buttonIndex} type="button" variant="message">
																{button.text}
															</SessionButton>
														)
													})}
												</div>
											)
										}
										return false
									})}
								</div>
							)
						})}
					</Row>
				)
			})}
		</div>
	)
}

export default EditTemplate
