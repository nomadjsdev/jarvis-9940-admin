import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
	// const dispatch = useDispatch()
	const {
		games,
		gamePveActivities,
		gamePvpActivities,
		activities,
		activityEncounters,
		encounters,
		encounterTemplates,
	} = useSelector(state => state.data)
	const [selectedGame, setSelectedGame] = useState(null)
	const [selectedActivity, setSelectedActivity] = useState(null)
	const [selectedEncounter, setSelectedEncounter] = useState(null)

	return (
		<>
			<h1>Home</h1>
			{games && (
				<div>
					<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
						<h2>Games</h2>
						<button type="button">Add game</button>
					</div>
					<div>
						{Object.keys(games).map(id => (
							<button
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
							</button>
						))}
					</div>
				</div>
			)}
			<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
				{games && selectedGame && games[selectedGame].hasPve && (
					<div>
						<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
							<h2>PvE Activities</h2>
							<button type="button">Add PvE Activity</button>
						</div>
						<div>
							{gamePveActivities[selectedGame].map((value, index) => {
								if (activities[value]?.isActive) {
									return (
										<button
											key={index}
											style={{ borderColor: value === selectedActivity ? 'red' : '' }}
											disabled={!activities[value].isActive}
											onClick={() => {
												setSelectedActivity(value)
											}}
										>
											{activities[value].name}
										</button>
									)
								}
								return false
							})}
						</div>
					</div>
				)}
				{games && selectedGame && games[selectedGame].hasPvp && (
					<div>
						<div style={{ display: 'flex', flexFlow: 'row nowrap' }}>
							<h2>PvP Activities</h2>
							<button type="button">Add PvP Activity</button>
						</div>
						<div>
							{gamePvpActivities[selectedGame].map((value, index) => {
								if (activities[value]?.isActive) {
									return (
										<button
											key={index}
											style={{ borderColor: value === selectedActivity ? 'red' : '' }}
											disabled={!activities[value].isActive}
											onClick={() => {
												setSelectedActivity(value)
											}}
										>
											{activities[value].name}
										</button>
									)
								}
								return false
							})}
						</div>
					</div>
				)}
			</div>
			{activities && selectedActivity && (
				<div>
					<h2>Encounters</h2>
					{activityEncounters[selectedActivity].map((value, index) => {
						if (encounters[value]?.isActive) {
							return (
								<button
									key={index}
									style={{ borderColor: value === selectedEncounter ? 'red' : '' }}
									disabled={!encounters[value].isActive}
									onClick={() => {
										setSelectedEncounter(value)
									}}
								>
									{encounters[value].name}
								</button>
							)
						}
						return false
					})}
				</div>
			)}
			{encounterTemplates && selectedEncounter && (
				<div>
					<h2>Current template</h2>
					{encounterTemplates[selectedEncounter].map((row, rowIndex) => {
						return (
							<div key={rowIndex} style={{ display: 'flex', flexFlow: 'row nowrap' }}>
								{row.map((col, colIndex) => {
									return (
										<div key={colIndex}>
											{col.map((button, buttonIndex) => {
												if (button.type === 'toggle') {
													return (
														<div key={buttonIndex}>
															<button type="button">{button.text}</button>
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
																	<button key={buttonIndex} type="button">
																		{button.text}
																	</button>
																)
															})}
														</div>
													)
												}
											})}
										</div>
									)
								})}
							</div>
						)
					})}
				</div>
			)}
		</>
	)
}

export default Home
