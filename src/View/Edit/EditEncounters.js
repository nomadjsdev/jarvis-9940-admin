import React from 'react'
import Button from 'Component/Global/Button'

const EditEncounters = props => {
	const { activityEncounters, selectedActivity, encounters, selectedEncounter, setSelectedEncounter } = props

	return (
		<div>
			<h2>Encounters</h2>
			<div>
				{activityEncounters[selectedActivity].map((value, index) => {
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
				<Button type="button" variant="add">
					Add encounter
				</Button>
			</div>
		</div>
	)
}

export default EditEncounters
