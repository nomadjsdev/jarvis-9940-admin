import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import safeNanoid from 'Function/safeNanoid'
import { writeData } from 'Store/Feature/data'

import Button from 'Component/Global/Button'

const EditActivities = props => {
	const dispatch = useDispatch()

	const {
		games,
		selectedGame,
		gamePveActivities,
		gamePvpActivities,
		activities,
		selectedActivity,
		setSelectedActivity,
	} = props
	const [isAdding, setIsAdding] = useState(false)

	const [name, setName] = useState('')
	const [isActive, setIsActive] = useState(false)
	const [activityType, setActivityType] = useState('')

	// TODO: Edit selected activity

	const submit = () => {
		if (name && name !== '') {
			const activityId = safeNanoid()
			dispatch(writeData({ type: 'activities', id: activityId, contents: { name, isActive } }))
			if (activityType === 'pve') {
				const contents = gamePveActivities[selectedGame]
					? [...gamePveActivities[selectedGame], activityId]
					: [activityId]
				dispatch(
					writeData({
						type: 'gamePveActivities',
						id: selectedGame,
						contents,
					}),
				)
			} else if (activityType === 'pvp') {
				const contents = gamePvpActivities[selectedGame]
					? [...gamePvpActivities[selectedGame], activityId]
					: [activityId]
				dispatch(
					writeData({
						type: 'gamePvpActivities',
						id: selectedGame,
						contents,
					}),
				)
			}

			setIsAdding(false)
			setName('')
			setIsActive(false)
			setActivityType('')
		}
	}

	return (
		<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
			{games[selectedGame]?.hasPve && (
				<div>
					<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
						<h2>PvE Activities</h2>
					</div>
					<div>
						{gamePveActivities[selectedGame] &&
							gamePveActivities[selectedGame].map((value, index) => {
								if (activities[value]) {
									return (
										<Button
											key={index}
											style={{ borderColor: value === selectedActivity ? 'red' : '' }}
											disabled={!activities[value].isActive}
											onClick={() => {
												setSelectedActivity(value)
											}}
										>
											{activities[value].name}
										</Button>
									)
								}
								return false
							})}
						<Button
							type="button"
							variant="add"
							onClick={() => {
								setActivityType('pve')
								setIsAdding(true)
							}}
						>
							Add PvE Activity
						</Button>
					</div>
				</div>
			)}
			{games[selectedGame]?.hasPvp && (
				<div>
					<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
						<h2>PvP Activities</h2>
					</div>
					<div>
						{gamePvpActivities[selectedGame] &&
							gamePvpActivities[selectedGame].map((value, index) => {
								if (activities[value]?.isActive) {
									return (
										<Button
											key={index}
											style={{ borderColor: value === selectedActivity ? 'red' : '' }}
											disabled={!activities[value].isActive}
											onClick={() => {
												setSelectedActivity(value)
											}}
										>
											{activities[value].name}
										</Button>
									)
								}
								return false
							})}
						<Button
							type="button"
							variant="add"
							onClick={() => {
								setActivityType('pvp')
								setIsAdding(true)
							}}
						>
							Add PvP Activity
						</Button>
					</div>
				</div>
			)}
			{isAdding && (
				<div>
					<h3>Add {activityType === 'pve' ? 'PvE' : 'PvP'} activity</h3>
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
							/>{' '}
						</p>
					</div>
					<div>
						<Button
							type="button"
							variant="cancel"
							onClick={() => {
								setActivityType('')
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
				</div>
			)}
		</div>
	)
}

export default EditActivities
