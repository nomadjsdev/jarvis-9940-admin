import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToggleButton, ButtonGroup } from 'jarvis9940-components'

import safeNanoid from 'Function/safeNanoid'
import { writeData } from 'Store/Feature/data'

import Button from 'Component/Global/Button'
import { ModalContainer, ModalContents } from 'Component/Global/Modal'
import Row from 'Component/Session/Row'

const EditTemplate = props => {
	const dispatch = useDispatch()
	const { encounterTemplates, selectedEncounter } = props

	const [isAdding, setIsAdding] = useState(false)
	const [addRow, setAddRow] = useState(null)
	const [addCol, setAddCol] = useState(null)
	const [values, setValues] = useState({})

	const [isEditing, setIsEditing] = useState(false)
	const [isEditingText, setIsEditingText] = useState(false)
	const [editButton, setEditButton] = useState(null)

	const resetTemplate = () => {
		return encounterTemplates[selectedEncounter] ?? []
	}
	const [template, setTemplate] = useState(resetTemplate())

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
						if (isEditing) {
							setTemplate(resetTemplate())
						}
						setIsEditing(!isEditing)
					}}
				>
					{isEditing ? 'Cancel' : 'Edit template'}
				</Button>
			</div>
			{isAdding && (
				<ModalContainer>
					<ModalContents>
						<div style={{ border: '1px solid green' }}>
							<p>Add single toggle button</p>
							<Button
								type="button"
								variant="add"
								onClick={() => {
									// This is a quick-and-dirty deep clone of the template nested array
									// FIXME: There's got to be a better way of doing this!
									let newTemplate = JSON.parse(JSON.stringify(template))
									newTemplate[addRow][addCol].push({
										id: safeNanoid(),
										text: '',
										type: 'toggle',
									})
									setTemplate(newTemplate)
									setAddRow(null)
									setAddCol(null)
									setIsAdding(false)
								}}
							>
								Add
							</Button>
						</div>
						<div style={{ border: '1px solid green' }}>
							<p>Add button group</p>
							<p>
								Number of buttons:
								<select
									value={values.number}
									onChange={e => {
										const { value } = e.target
										setValues(prevState => {
											return { ...prevState, number: parseInt(value) }
										})
									}}
								>
									<option value={0}>Select</option>
									<option value={2}>2</option>
									<option value={3}>3</option>
									<option value={4}>4</option>
								</select>
							</p>
							<p>
								Direction:
								<label htmlFor="vert">Vertical</label>
								<input
									type="radio"
									name="direction"
									id="vert"
									value="vertical"
									checked={values.direction === 'vertical'}
									onChange={e => {
										const { value } = e.target
										setValues(prevState => {
											return { ...prevState, direction: value }
										})
									}}
								/>
								<label htmlFor="hori">Horizontal</label>
								<input
									type="radio"
									name="direction"
									id="hori"
									value="horizontal"
									checked={values.direction === 'horizontal'}
									onChange={e => {
										const { value } = e.target
										setValues(prevState => {
											return { ...prevState, direction: value }
										})
									}}
								/>
							</p>
							<Button
								type="button"
								variant="add"
								onClick={() => {
									// Set minimum number of buttons in buttonGroup to 2
									const number = values.number === 0 || values.number === undefined ? 2 : values.number
									let buttonArray = []
									for (let i = 0; i < number; i++) {
										buttonArray.push({ id: safeNanoid(), text: '', type: 'toggle' })
									}
									// This is a quick-and-dirty deep clone of the template nested array
									// FIXME: There's got to be a better way of doing this!
									let newTemplate = JSON.parse(JSON.stringify(template))
									newTemplate[addRow][addCol].push({
										id: safeNanoid(),
										direction: values.direction,
										type: 'group',
										buttons: buttonArray,
									})

									setTemplate(newTemplate)
									setAddRow(null)
									setAddCol(null)
									setValues({})
									setIsAdding(false)
								}}
							>
								Add
							</Button>
						</div>
						<Button
							variant="cancel"
							onClick={() => {
								setAddRow(null)
								setAddCol(null)
								setValues({})
								setIsAdding(false)
							}}
						>
							Cancel
						</Button>
					</ModalContents>
				</ModalContainer>
			)}
			{isEditingText && (
				<ModalContainer>
					<ModalContents>
						<h2>Edit button text</h2>
						{values.buttonText && (
							<>
								<p>
									Update button label:
									<input
										type="text"
										value={values.buttonText}
										onChange={e => {
											setValues({ buttonText: e.target.value })
										}}
									/>
								</p>
								<Button
									type="button"
									variant="add"
									onClick={() => {
										// This is a quick-and-dirty deep clone of the template nested array
										// FIXME: There's got to be a better way of doing this!
										let newTemplate = JSON.parse(JSON.stringify(template))
										newTemplate[addRow][addCol][editButton].text = values.buttonText
										setTemplate(newTemplate)
										setAddRow(null)
										setAddCol(null)
										setEditButton(null)
										setIsEditingText(false)
										setValues({})
									}}
								>
									Save
								</Button>
							</>
						)}
						{values.buttons && (
							<>
								{values.buttons.map((button, index) => (
									<p key={button.id}>
										Update button label:
										<input
											type="text"
											value={values.buttons[index].text}
											onChange={e => {
												let newValues = JSON.parse(JSON.stringify(values))
												newValues.buttons[index].text = e.target.value

												setValues(newValues)
											}}
										/>
									</p>
								))}
								<Button
									type="button"
									variant="add"
									onClick={() => {
										// This is a quick-and-dirty deep clone of the template nested array
										// FIXME: There's got to be a better way of doing this!
										let newTemplate = JSON.parse(JSON.stringify(template))
										newTemplate[addRow][addCol][editButton].buttons = values.buttons
										setTemplate(newTemplate)
										setAddRow(null)
										setAddCol(null)
										setEditButton(null)
										setIsEditingText(false)
										setValues({})
									}}
								>
									Save
								</Button>
							</>
						)}
						<Button
							variant="cancel"
							onClick={() => {
								setAddRow(null)
								setAddCol(null)
								setEditButton(null)
								setIsEditingText(false)
								setValues({})
							}}
						>
							Cancel
						</Button>
						<Button
							variant="delete"
							onClick={() => {
								// TODO: Delete button from template
								setAddRow(null)
								setAddCol(null)
								setEditButton(null)
								setIsEditingText(false)
								setValues({})
							}}
						>
							{`Delete button ${values.buttons ? 'group' : ''}`}
						</Button>
					</ModalContents>
				</ModalContainer>
			)}
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
														<ToggleButton id={button.id}>{button.text}</ToggleButton>
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
												<div key={colIndex}>
													<div
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
																			<ToggleButton id={button.id}>{button.text}</ToggleButton>
																			<button
																				onClick={() => {
																					setIsEditingText(true)
																					setAddRow(rowIndex)
																					setAddCol(colIndex)
																					setEditButton(buttonIndex)
																					setValues({ buttonText: button.text })
																				}}
																			>
																				e
																			</button>
																		</div>
																	)
																}
																if (button.type === 'group') {
																	return (
																		<div key={buttonIndex}>
																			<ButtonGroup orientation={button.direction} buttons={button.buttons} />
																			<button
																				onClick={() => {
																					setIsEditingText(true)
																					setAddRow(rowIndex)
																					setAddCol(colIndex)
																					setEditButton(buttonIndex)
																					setValues({ buttons: button.buttons })
																				}}
																			>
																				e
																			</button>
																		</div>
																	)
																}

																return false
															})}

														<Button
															type="button"
															variant="add"
															onClick={() => {
																setAddRow(rowIndex)
																setAddCol(colIndex)
																setIsAdding(true)
															}}
														>
															Add item
														</Button>
													</div>
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
