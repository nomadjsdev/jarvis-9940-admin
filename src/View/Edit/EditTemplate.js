// TODO: Refactor this to a more readable size!
// TODO: Add alignment to buttons (top bottom)
// TODO: Allow symbols on buttons, instead of text?
// TODO: Allow both symbols and text on buttons?

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToggleButton, MessageButton, TimerButton, ButtonGroup } from 'jarvis9940-components'

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

	const prevSelectedEncounterRef = useRef()
	useEffect(() => {
		prevSelectedEncounterRef.current = selectedEncounter
	})
	const prevSelectedEncounter = prevSelectedEncounterRef.current

	useEffect(() => {
		if (selectedEncounter && selectedEncounter !== prevSelectedEncounter) {
			setTemplate(resetTemplate())
			setIsEditing(false)
			setAddRow(null)
			setAddCol(null)
			setEditButton(null)
			setIsEditingButton(false)
			setValues({})
		}
	}, [selectedEncounter])

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
							<p>Add single message button</p>
							<Button
								type="button"
								variant="add"
								onClick={() => {
									let newTemplate = deepCopyArray(template)
									newTemplate[addRow][addCol].push({
										id: safeNanoid(),
										text: '',
										message: '',
										type: 'message',
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
							<p>Add single timer button</p>
							<Button
								type="button"
								variant="add"
								onClick={() => {
									let newTemplate = deepCopyArray(template)
									newTemplate[addRow][addCol].push({
										id: safeNanoid(),
										text: '',
										message: '',
										time: 0,
										type: 'timer',
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
						<h2>Edit button</h2>
						{isEditingButton === 'toggle' && (
							<React.Fragment>
								<p>
									Update button label:
									<input
										type="text"
										value={values.text}
										onChange={e => {
											setValues(prevState => {
												return { ...prevState, text: e.target.value }
											})
										}}
									/>
								</p>
								<p>
									Update button alignment:
									<label htmlFor="toggle-alignment-left">Left</label>
									<input
										id="toggle-alignment-left"
										type="radio"
										name="toggle-alignment"
										checked={values.alignment === 'left'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'left' }
											})
										}}
									/>
									<label htmlFor="toggle-alignment-center">Center</label>
									<input
										id="toggle-alignment-center"
										type="radio"
										name="toggle-alignment"
										checked={values.alignment === 'center'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'center' }
											})
										}}
									/>
									<label htmlFor="toggle-alignment-right">Right</label>
									<input
										id="toggle-alignment-right"
										type="radio"
										name="toggle-alignment"
										checked={values.alignment === 'right'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'right' }
											})
										}}
									/>
								</p>
								<Button
									type="button"
									variant="add"
									onClick={() => {
										let newTemplate = deepCopyArray(template)
										newTemplate[addRow][addCol][editButton].text = values.text
										newTemplate[addRow][addCol][editButton].alignment = values.alignment
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
							</React.Fragment>
						)}
						{isEditingButton === 'message' && (
							<React.Fragment>
								<p>
									Update button label:
									<input
										type="text"
										value={values.text}
										onChange={e => {
											const { value } = e.target
											setValues(prevState => {
												return { ...prevState, text: value }
											})
										}}
									/>
								</p>
								<p>
									Update button message:
									<input
										type="text"
										value={values.message || ''}
										onChange={e => {
											const { value } = e.target
											setValues(prevState => {
												return { ...prevState, message: value }
											})
										}}
									/>
								</p>
								<p>
									Update button alignment:
									<label htmlFor="message-alignment-left">Left</label>
									<input
										id="message-alignment-left"
										type="radio"
										name="message-alignment"
										checked={values.alignment === 'left'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'left' }
											})
										}}
									/>
									<label htmlFor="message-alignment-center">Center</label>
									<input
										id="message-alignment-center"
										type="radio"
										name="message-alignment"
										checked={values.alignment === 'center'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'center' }
											})
										}}
									/>
									<label htmlFor="message-alignment-right">Right</label>
									<input
										id="message-alignment-right"
										type="radio"
										name="message-alignment"
										checked={values.alignment === 'right'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'right' }
											})
										}}
									/>
								</p>
								<Button
									type="button"
									variant="add"
									onClick={() => {
										let newTemplate = deepCopyArray(template)
										newTemplate[addRow][addCol][editButton].text = values.text
										newTemplate[addRow][addCol][editButton].message = values.message
										newTemplate[addRow][addCol][editButton].alignment = values.alignment
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
							</React.Fragment>
						)}
						{isEditingButton === 'timer' && (
							<React.Fragment>
								<p>
									Update button label:
									<input
										type="text"
										value={values.text}
										onChange={e => {
											const { value } = e.target
											setValues(prevState => {
												return { ...prevState, text: value }
											})
										}}
									/>
								</p>
								{values.messages.map((content, index) => {
									return (
										<div key={index} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
											<p>
												Update button message:
												<input
													type="text"
													value={content.message || ''}
													onChange={e => {
														const { value } = e.target
														let messages = deepCopyArray(values.messages)
														messages[index].message = value
														setValues(prevState => {
															return { ...prevState, messages: messages }
														})
													}}
												/>
											</p>
											<p>
												Update button time:
												<input
													type="text"
													value={content.time}
													onChange={e => {
														const { value } = e.target
														let messages = deepCopyArray(values.messages)
														messages[index].time = parseInt(value || 0)
														setValues(prevState => {
															return { ...prevState, messages: messages }
														})
													}}
												/>
											</p>
											<p>
												Show timer:
												<input
													type="checkbox"
													checked={content.showTime === true}
													onChange={() => {
														let messages = deepCopyArray(values.messages)
														messages[index].showTime = !messages[index].showTime
														setValues(prevState => {
															return { ...prevState, messages: messages }
														})
													}}
												/>
											</p>
											<button
												type="button"
												onClick={() => {
													let messages = deepCopyArray(values.messages)
													messages.splice(index, 1)
													setValues(prevState => {
														return { ...prevState, messages: messages }
													})
												}}
											>
												Delete
											</button>
										</div>
									)
								})}
								<button
									type="button"
									onClick={() => {
										let messages = deepCopyArray(values.messages)
										messages.push({ message: '', time: 0, showTime: false })
										setValues(prevState => {
											return { ...prevState, messages: messages }
										})
									}}
								>
									Add message
								</button>
								<p>
									Update button alignment:
									<label htmlFor="timer-alignment-left">Left</label>
									<input
										id="timer-alignment-left"
										type="radio"
										name="timer-alignment"
										checked={values.alignment === 'left'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'left' }
											})
										}}
									/>
									<label htmlFor="timer-alignment-center">Center</label>
									<input
										id="timer-alignment-center"
										type="radio"
										name="timer-alignment"
										checked={values.alignment === 'center'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'center' }
											})
										}}
									/>
									<label htmlFor="timer-alignment-right">Right</label>
									<input
										id="timer-alignment-right"
										type="radio"
										name="timer-alignment"
										checked={values.alignment === 'right'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'right' }
											})
										}}
									/>
								</p>
								<Button
									type="button"
									variant="add"
									onClick={() => {
										let newTemplate = deepCopyArray(template)
										newTemplate[addRow][addCol][editButton].text = values.text
										newTemplate[addRow][addCol][editButton].messages = values.messages
										newTemplate[addRow][addCol][editButton].alignment = values.alignment
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
							</React.Fragment>
						)}
						{isEditingButton === 'group' && (
							<React.Fragment>
								<p>
									Update group title:
									<input
										type="text"
										value={values.title}
										onChange={e => {
											const { value } = e.target
											setValues(prevState => ({ ...prevState, title: value }))
										}}
									/>
								</p>
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
									<label htmlFor="group-direction-vertical">Vertical</label>
									<input
										type="radio"
										name="direction"
										id="group-direction-vertical"
										checked={values.direction === 'vertical'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, direction: 'vertical' }
											})
										}}
									/>
									<label htmlFor="group-direction-horizontal">Horizontal</label>
									<input
										type="radio"
										name="direction"
										id="group-direction-horizontal"
										checked={values.direction === 'horizontal'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, direction: 'horizontal' }
											})
										}}
									/>
								</p>
								<p>
									Update button alignment:
									<label htmlFor="group-alignment-left">Left</label>
									<input
										id="group-alignment-left"
										type="radio"
										name="group-alignment"
										checked={values.alignment === 'left'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'left' }
											})
										}}
									/>
									<label htmlFor="group-alignment-center">Center</label>
									<input
										id="group-alignment-center"
										type="radio"
										name="group-alignment"
										checked={values.alignment === 'center'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'center' }
											})
										}}
									/>
									<label htmlFor="group-alignment-right">Right</label>
									<input
										id="group-alignment-right"
										type="radio"
										name="group-alignment"
										checked={values.alignment === 'right'}
										onChange={() => {
											setValues(prevState => {
												return { ...prevState, alignment: 'right' }
											})
										}}
									/>
								</p>
								<Button
									type="button"
									variant="add"
									onClick={() => {
										let newTemplate = deepCopyArray(template)
										newTemplate[addRow][addCol][editButton].title = values.title
										newTemplate[addRow][addCol][editButton].buttons = values.buttons
										newTemplate[addRow][addCol][editButton].direction = values.direction
										newTemplate[addRow][addCol][editButton].alignment = values.alignment
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
							</React.Fragment>
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
			{!isEditing && (
				<React.Fragment>
					{encounterTemplates[selectedEncounter] &&
						encounterTemplates[selectedEncounter].map((row, rowIndex) => {
							return (
								<Row key={rowIndex} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
									{row.map((col, colIndex) => {
										return (
											<React.Fragment key={colIndex}>
												{col.map((button, buttonIndex) => {
													return (
														<div
															key={buttonIndex}
															style={{
																display: 'flex',
																flexBasis: `${(1 / row.length) * 100}%`,
																justifyContent:
																	button.alignment === 'right'
																		? 'flex-end'
																		: button.alignment === 'center'
																		? 'center'
																		: 'flex-start',
															}}
														>
															{button.type === 'toggle' && (
																<div>
																	<ToggleButton id={button.id} alignment={button.alignment}>
																		{button.text}
																	</ToggleButton>
																</div>
															)}
															{button.type === 'message' && (
																<div>
																	<MessageButton id={button.id} alignment={button.alignment}>
																		{button.text}
																	</MessageButton>
																</div>
															)}
															{button.type === 'timer' && (
																<div>
																	<TimerButton id={button.id} alignment={button.alignment}>
																		{button.text}
																	</TimerButton>
																</div>
															)}
															{button.type === 'group' && (
																<ButtonGroup
																	title={button.title}
																	orientation={button.direction}
																	alignment={button.alignment}
																	buttons={button.buttons}
																/>
															)}
														</div>
													)
												})}
											</React.Fragment>
										)
									})}
								</Row>
							)
						})}
				</React.Fragment>
			)}
			{isEditing && (
				<React.Fragment>
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
																				<ToggleButton id={button.id} alignment={button.alignment}>
																					{button.text}
																				</ToggleButton>
																				<button
																					onClick={() => {
																						setIsEditingButton('toggle')
																						setAddRow(rowIndex)
																						setAddCol(colIndex)
																						setEditButton(buttonIndex)
																						setValues({
																							text: button.text || '',
																							alignment: button.alignment || 'center',
																						})
																					}}
																				>
																					e
																				</button>
																			</div>
																		)
																	}
																	if (button.type === 'message') {
																		return (
																			<div key={buttonIndex}>
																				<MessageButton id={button.id} alignment={button.alignment}>
																					{button.text}
																				</MessageButton>
																				<button
																					onClick={() => {
																						setIsEditingButton('message')
																						setAddRow(rowIndex)
																						setAddCol(colIndex)
																						setEditButton(buttonIndex)
																						setValues({
																							text: button.text || '',
																							message: button.message || '',
																							alignment: button.alignment || 'center',
																						})
																					}}
																				>
																					e
																				</button>
																			</div>
																		)
																	}
																	if (button.type === 'timer') {
																		return (
																			<div key={buttonIndex}>
																				<TimerButton id={button.id} alignment={button.alignment}>
																					{button.text}
																				</TimerButton>
																				<button
																					onClick={() => {
																						setIsEditingButton('timer')
																						setAddRow(rowIndex)
																						setAddCol(colIndex)
																						setEditButton(buttonIndex)
																						setValues({
																							text: button.text || '',
																							messages: button.messages || [{ message: '', time: 0, showTime: true }],
																							alignment: button.alignment || 'center',
																						})
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
																				<ButtonGroup
																					title={button.title}
																					orientation={button.direction}
																					alignment={button.alignment}
																					buttons={button.buttons}
																				/>
																				<button
																					onClick={() => {
																						setIsEditingButton('group')
																						setAddRow(rowIndex)
																						setAddCol(colIndex)
																						setEditButton(buttonIndex)
																						setValues({
																							title: button.title || '',
																							buttons: button.buttons,
																							direction: button.direction,
																							alignment: button.alignment || 'center',
																						})
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
					<React.Fragment>
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
									let newTemplate = deepCopyArray(template)
									newTemplate.push([])
									setTemplate(newTemplate)
								}}
							>
								Add row
							</button>
						</div>
					</React.Fragment>
				</React.Fragment>
			)}
		</div>
	)
}

export default EditTemplate
