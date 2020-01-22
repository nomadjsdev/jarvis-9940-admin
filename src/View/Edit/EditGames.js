import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import safeNanoid from 'Function/safeNanoid'
import { writeData } from 'Store/Feature/data'

import Button from 'Component/Global/Button'

const EditGames = props => {
	const dispatch = useDispatch()

	const { games, selectedGame, setSelectedGame } = props
	const [isAdding, setIsAdding] = useState(false)

	const [name, setName] = useState('')
	const [isActive, setIsActive] = useState(false)
	const [hasPve, setHasPve] = useState(false)
	const [hasPvp, setHasPvp] = useState(false)

	// TODO: Edit selected game (isActive, hasPve/pvp, etc)

	const submit = () => {
		if (name && name !== '') {
			dispatch(writeData({ type: 'games', id: safeNanoid(), contents: { name, isActive, hasPve, hasPvp } }))

			setIsAdding(false)
			setName('')
			setIsActive(false)
			setHasPve(false)
			setHasPvp(false)
		}
	}

	return (
		<div>
			<h2>Games</h2>
			<div>
				{Object.keys(games).map(id => (
					<Button
						key={id}
						type="button"
						style={{ borderColor: id === selectedGame ? 'red' : '' }}
						disabled={!games[id].isActive}
						onClick={() => {
							if (games[id].isActive) {
								setSelectedGame(id)
							}
						}}
					>
						{games[id].name}
					</Button>
				))}
				<Button
					type="button"
					variant="add"
					disabled={isAdding}
					onClick={() => {
						setIsAdding(true)
					}}
				>
					Add game
				</Button>
			</div>
			{isAdding && (
				<div>
					<h3>Add game</h3>
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
							Has PvE:{' '}
							<input
								type="checkbox"
								checked={hasPve}
								onChange={() => {
									setHasPve(!hasPve)
								}}
							/>{' '}
						</p>
						<p>
							Has PvP:{' '}
							<input
								type="checkbox"
								checked={hasPvp}
								onChange={() => {
									setHasPvp(!hasPvp)
								}}
							/>{' '}
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

export default EditGames
