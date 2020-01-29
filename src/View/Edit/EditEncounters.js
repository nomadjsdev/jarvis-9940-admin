import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import safeNanoid from 'Function/safeNanoid'
import { writeData } from 'Store/Feature/data'

import Button from 'Component/Global/Button'
import { ModalContainer, ModalContents } from 'Component/Global/Modal'

const EditEncounters = props => {
	const dispatch = useDispatch()

	const { activityEncounters, selectedActivity, encounters, selectedEncounter, setSelectedEncounter } = props
	const [isAdding, setIsAdding] = useState(false)

	const [name, setName] = useState('')
	const [isActive, setIsActive] = useState(false)

	// TODO: Edit selected encounter

	const submit = () => {
		if (name && name !== '') {
			const activityId = safeNanoid()
			dispatch(writeData({ type: 'encounters', id: activityId, contents: { name, isActive } }))

			const contents = activityEncounters[selectedActivity]
				? [...activityEncounters[selectedActivity], activityId]
				: [activityId]
			dispatch(
				writeData({
					type: 'activityEncounters',
					id: selectedActivity,
					contents,
				}),
			)

			setIsAdding(false)
			setName('')
			setIsActive(false)
		}
	}

	return (
		<div>
			<h2>Encounters</h2>
			<div>
				{activityEncounters[selectedActivity] &&
					activityEncounters[selectedActivity].map((value, index) => {
						if (encounters[value]?.isActive) {
							return (
								<Button
									key={index}
									style={{ borderColor: value === selectedEncounter ? 'red' : '' }}
									disabled={!encounters[value].isActive}
									onClick={() => {
										setSelectedEncounter(value)
									}}
								>
									{encounters[value].name}
								</Button>
							)
						}
						return false
					})}
				<Button
					type="button"
					variant="add"
					onClick={() => {
						setIsAdding(true)
					}}
				>
					Add encounter
				</Button>
			</div>
			{isAdding && (
				<ModalContainer>
					<ModalContents>
						<h3>Add encounter</h3>
						<div>
							<p>
								Name:{' '}
								<input
									type="text"
									value={name}
									onChange={e => {
										setName(e.target.value)
									}}
								/>
							</p>
							<p>
								Is active:{' '}
								<input
									type="checkbox"
									checked={isActive}
									onChange={() => {
										setIsActive(!isActive)
									}}
								/>
							</p>
						</div>
						<div>
							<Button
								type="button"
								variant="cancel"
								onClick={() => {
									setIsAdding(false)
								}}
							>
								Cancel
							</Button>
							<Button
								type="button"
								variant="add"
								onClick={() => {
									submit()
								}}
							>
								Add
							</Button>
						</div>
					</ModalContents>
				</ModalContainer>
			)}
		</div>
	)
}

export default EditEncounters
