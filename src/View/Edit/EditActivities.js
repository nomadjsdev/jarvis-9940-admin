import React from 'react'
import Button from 'Component/Global/Button'

const EditActivities = props => {
	const {
		games,
		selectedGame,
		gamePveActivities,
		gamePvpActivities,
		activities,
		selectedActivity,
		setSelectedActivity,
	} = props

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
						<Button type="button" variant="add">
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
						<Button type="button" variant="add">
							Add PvP Activity
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}

export default EditActivities
