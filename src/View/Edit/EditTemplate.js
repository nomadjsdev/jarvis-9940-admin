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
	const [isEditingButton, setIsEditingButton] = useState(false)
	const [editButton, setEditButton] = useState(null)

	const resetTemplate = () => {
		return encounterTemplates[selectedEncounter] ?? []
	}
	const [template, setTemplate] = useState(resetTemplate())

	// This is a quick-and-dirty deep clone of the template nested array
	// FIXME: There's got to be a better way of doing this!
	const deepCopyArray = array => JSON.parse(JSON.stringify(array))

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
				{isEditing && (
					<Button
						type="button"
						variant="add"
						onClick={() => {
							saveTemplate()
						}}
					>
						Save
					</Button>
				)}
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
									let newTemplate = deepCopyArray(template)
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
									let newTemplate = deepCopyArray(template)
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
			{isEditingButton && (
				<ModalContainer>
					<ModalContents>
						<h2>Edit button text</h2>
						{(values.buttonText || values?.buttonText === '') && (
							<>
								<p>
									Update button label:
									<input
										type="text"
										value={values.buttonText || ''}
										onChange={e => {
											setValues({ buttonText: e.target.value })
										}}
									/>
								</p>
								<Button
									type="button"
									variant="add"
									onClick={() => {
										let newTemplate = deepCopyArray(template)
										newTemplate[addRow][addCol][editButton].text = values.buttonText
										setTemplate(newTemplate)
										setAddRow(null)
										setAddCol(null)
										setEditButton(null)
										setIsEditingButton(false)
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
								<p>
									Update direction:
									<label htmlFor="editVert">Vertical</label>
									<input
										type="radio"
										name="direction"
										id="editVert"
										value="vertical"
										checked={values.direction === 'vertical'}
										onChange={e => {
											const { value } = e.target
											setValues(prevState => {
												return { ...prevState, direction: value }
											})
										}}
									/>
									<label htmlFor="editHori">Horizontal</label>
									<input
										type="radio"
										name="direction"
										id="editHori"
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
										let newTemplate = deepCopyArray(template)
										newTemplate[addRow][addCol][editButton].buttons = values.buttons
										newTemplate[addRow][addCol][editButton].direction = values.direction
										setTemplate(newTemplate)
										setAddRow(null)
										setAddCol(null)
										setEditButton(null)
										setIsEditingButton(false)
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
								setIsEditingButton(false)
								setValues({})
							}}
						>
							Cancel
						</Button>
						<Button
							variant="delete"
							onClick={() => {
								// TODO: Delete button from template
								let newTemplate = deepCopyArray(template)
								newTemplate[addRow][addCol].splice(editButton, 1)
								setTemplate(newTemplate)
								setAddRow(null)
								setAddCol(null)
								setEditButton(null)
								setIsEditingButton(false)
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
									<div key={colIndex} style={{ flexBasis: `${(1 / row.length) * 100}%`, textAlign: 'center' }}>
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
								<div key={rowIndex} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
									<Row style={{ display: 'flex', flexFlow: 'row nowrap' }}>
										{row &&
											row.map((col, colIndex) => {
												return (
													<div key={colIndex} style={{ flexBasis: `${(1 / row.length) * 100}%`, textAlign: 'center' }}>
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
																						setIsEditingButton(true)
																						setAddRow(rowIndex)
																						setAddCol(colIndex)
																						setEditButton(buttonIndex)
																						setValues({ buttonText: button.text || '' })
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
																						setIsEditingButton(true)
																						setAddRow(rowIndex)
																						setAddCol(colIndex)
																						setEditButton(buttonIndex)
																						setValues({ buttons: button.buttons, direction: button.direction })
																					}}
																				>
																					e
																				</button>
																			</div>
																		)
																	}

																	return false
																})}

															<button
																type="button"
																style={{
																	width: '100%',
																	margin: '20px 0',
																	padding: '10px',
																	backgroundColor: 'white',
																	color: 'green',
																	border: '1px solid green',
																	borderRadius: '5px',
																}}
																onClick={() => {
																	setAddRow(rowIndex)
																	setAddCol(colIndex)
																	setIsAdding(true)
																}}
															>
																Add item
															</button>
														</div>
														<button
															type="button"
															style={{
																width: '100%',
																margin: '20px 0',
																padding: '10px',
																backgroundColor: 'white',
																color: 'red',
																border: '1px solid red',
																borderRadius: '5px',
															}}
															onClick={() => {
																// FIXME: There's got to be a better way of doing this!
																let newTemplate = deepCopyArray(template)
																newTemplate[rowIndex].splice(colIndex, 1)
																setTemplate(newTemplate)
															}}
														>
															Delete column
														</button>
													</div>
												)
											})}
										<div style={{ textAlign: 'center' }}>
											<button
												type="button"
												style={{
													height: '100%',
													margin: '0 20px',
													padding: '10px',
													backgroundColor: 'white',
													color: 'green',
													border: '1px solid green',
													borderRadius: '5px',
												}}
												onClick={() => {
													// FIXME: There's got to be a better way of doing this!
													let newTemplate = deepCopyArray(template)
													newTemplate[rowIndex].push([])
													setTemplate(newTemplate)
												}}
											>
												Add column
											</button>
										</div>
									</Row>
									<button
										type="button"
										style={{
											margin: '0 0 0 20px',
											padding: '10px',
											backgroundColor: 'white',
											color: 'red',
											border: '1px solid red',
											borderRadius: '5px',
										}}
										onClick={() => {
											// FIXME: There's got to be a better way of doing this!
											let newTemplate = deepCopyArray(template)
											newTemplate.splice(rowIndex, 1)
											setTemplate(newTemplate)
										}}
									>
										Delete row
									</button>
								</div>
							)
						})}
					<>
						<div>
							<button
								type="button"
								style={{
									width: '100%',
									margin: '20px 0',
									padding: '10px',
									backgroundColor: 'white',
									color: 'green',
									border: '1px solid green',
									borderRadius: '5px',
								}}
								onClick={() => {
									// FIXME: There's got to be a better way of doing this!
									let newTemplate = deepCopyArray(template)
									newTemplate.push([])
									setTemplate(newTemplate)
								}}
							>
								Add row
							</button>
						</div>
					</>
				</>
			)}
		</div>
	)
}

export default EditTemplate
