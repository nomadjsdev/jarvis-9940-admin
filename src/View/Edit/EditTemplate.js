import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToggleButton, ButtonGroup } from 'jarvis9940-components'

import safeNanoid from 'Function/safeNanoid'
import { writeData } from 'Store/Feature/data'

import Button from 'Component/Global/Button'
import Row from 'Component/Session/Row'

const EditTemplate = props => {
	const dispatch = useDispatch()
	const { encounterTemplates, selectedEncounter } = props

	const [isEditing, setIsEditing] = useState(false)
	const [template, setTemplate] = useState(encounterTemplates[selectedEncounter] || [])

	const saveTemplate = () => {
		// TODO: Prevent writing empty arrays
		// Each row must have at least one column
		// Each column must have at least one button or buttonGroup
		dispatch(writeData({ type: 'encounterTemplates', id: selectedEncounter, contents: template }))
		setIsEditing(false)
	}

	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'row' }}>
				<h2>Current template</h2>
				<Button
					type="button"
					variant={isEditing ? 'cancel' : 'add'}
					onClick={() => {
						// TODO: setTemplate = template from localStorage when cancelling edit
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
														<ToggleButton>{button.text}</ToggleButton>
													</div>
												)
											}
											if (button.type === 'group') {
												return <ButtonGroup key={buttonIndex} orientation={button.direction} buttons={button.buttons} />
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
														flexDirection: 'column',
														flexBasis: `100 / ${row.length}%`,
														border: '1px solid red',
													}}
												>
													{col &&
														col.map((button, buttonIndex) => {
															if (button.type === 'toggle') {
																return (
																	<div key={buttonIndex}>
																		<ToggleButton>{button.text}</ToggleButton>
																	</div>
																)
															}
															if (button.type === 'group') {
																return (
																	<ButtonGroup
																		key={buttonIndex}
																		orientation={button.direction}
																		buttons={button.buttons}
																	/>
																)
															}

															return false
														})}
													<Button
														type="button"
														variant="add"
														onClick={() => {
															// This is a quick-and-dirty deep clone of the template nested array
															// FIXME: There's got to be a better way of doing this!
															let newTemplate = JSON.parse(JSON.stringify(template))
															newTemplate[rowIndex][colIndex].push({
																id: safeNanoid(),
																text: 'New test',
																type: 'toggle',
															})
															setTemplate(newTemplate)
														}}
													>
														Add button
													</Button>
													<Button
														type="button"
														variant="delete"
														onClick={() => {
															// FIXME: There's got to be a better way of doing this!
															let newTemplate = JSON.parse(JSON.stringify(template))
															newTemplate[rowIndex].splice(colIndex, 1)
															setTemplate(newTemplate)
														}}
													>
														Delete column
													</Button>
												</div>
											)
										})}
									<Button
										type="button"
										variant="add"
										onClick={() => {
											// FIXME: There's got to be a better way of doing this!
											let newTemplate = JSON.parse(JSON.stringify(template))
											newTemplate[rowIndex].push([])
											setTemplate(newTemplate)
										}}
									>
										Add column
									</Button>
									<Button
										type="button"
										variant="delete"
										onClick={() => {
											// FIXME: There's got to be a better way of doing this!
											let newTemplate = JSON.parse(JSON.stringify(template))
											newTemplate.splice(rowIndex, 1)
											setTemplate(newTemplate)
										}}
									>
										Delete row
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
									// FIXME: There's got to be a better way of doing this!
									let newTemplate = JSON.parse(JSON.stringify(template))
									newTemplate.push([])
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
