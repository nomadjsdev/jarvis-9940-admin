import React, { useState } from 'react'
import Button from 'Component/Global/Button'
import Row from 'Component/Session/Row'
import SessionButton from 'Component/Session/Button'

import { ToggleButton } from 'jarvis9940-components'

const EditTemplate = props => {
	const { encounterTemplates, selectedEncounter } = props
	const [isEditing, setIsEditing] = useState(false)
	const [template, setTemplate] = useState(encounterTemplates[selectedEncounter] || [])

	const saveTemplate = () => {
		console.log('SAVING')
	}

	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<h2>Current template</h2>
				<Button
					type="button"
					variant={isEditing ? 'cancel' : 'add'}
					onClick={() => {
						setIsEditing(!isEditing)
					}}
				>
					{isEditing ? 'Cancel' : 'Edit template'}
				</Button>
			</div>
			{!isEditing &&
				encounterTemplates[selectedEncounter] &&
				encounterTemplates[selectedEncounter].map((row, rowIndex) => {
					return (
						<Row key={rowIndex} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
							{row.map((col, colIndex) => {
								return (
									<div key={colIndex}>
										{col.map((button, buttonIndex) => {
											if (button.type === 'toggle') {
												return (
													<div key={buttonIndex}>
														<ToggleButton active="true" type="button">
															{button.text}
														</ToggleButton>
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
			{isEditing && (
				<>
					{template &&
						template.map((row, rowIndex) => {
							return (
								<Row key={rowIndex} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
									{row &&
										row.map((col, colIndex) => {
											return (
												<div
													key={colIndex}
													style={{
														width: '100%',
														display: 'flex',
														flexDirection: 'row',
														flexBasis: `100 / ${row.length}%`,
														border: '1px solid red',
													}}
												>
													{col &&
														col.map((button, buttonIndex) => {
															if (button.type === 'toggle') {
																return (
																	<div key={buttonIndex}>
																		<ToggleButton active="true" type="button">
																			{button.text}
																		</ToggleButton>
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
									<Button
										type="button"
										variant="add"
										onClick={() => {
											const newTemplate = [...template]
											newTemplate[rowIndex].push([])
											setTemplate(newTemplate)
										}}
									>
										Add column
									</Button>
								</Row>
							)
						})}
					<>
						<div>
							<Button
								type="button"
								variant="add"
								onClick={() => {
									const newTemplate = [...template, []]
									setTemplate(newTemplate)
								}}
							>
								Add row
							</Button>
						</div>
						<div>
							<Button
								type="button"
								variant="add"
								onClick={() => {
									saveTemplate()
								}}
							>
								Save
							</Button>
						</div>
					</>
				</>
			)}
		</div>
	)
}

export default EditTemplate
