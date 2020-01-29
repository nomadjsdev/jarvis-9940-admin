import React, { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Container from 'Component/Global/Container'

import EditGames from './EditGames'
import EditActivities from './EditActivities'
import EditEncounters from './EditEncounters'
import EditTemplate from './EditTemplate'

const Edit = () => {
	const {
		games,
		gamePveActivities,
		gamePvpActivities,
		activities,
		activityEncounters,
		encounters,
		encounterTemplates,
	} = useSelector(state => state.data)

	const prevSelectedGameRef = useRef()
	const [selectedGame, setSelectedGame] = useState(null)
	const [selectedActivity, setSelectedActivity] = useState(null)
	const [selectedEncounter, setSelectedEncounter] = useState(null)

	useEffect(() => {
		prevSelectedGameRef.current = selectedGame
	})
	const prevSelectedGame = prevSelectedGameRef.current

	useEffect(() => {
		if (selectedGame && selectedGame !== prevSelectedGame) {
			setSelectedActivity(null)
			setSelectedEncounter(null)
		}
	}, [selectedGame])

	return (
		<Container>
			<h1>Edit</h1>
			{games && <EditGames games={games} selectedGame={selectedGame} setSelectedGame={setSelectedGame} />}

			{games && selectedGame && (
				<EditActivities
					games={games}
					selectedGame={selectedGame}
					gamePveActivities={gamePveActivities}
					gamePvpActivities={gamePvpActivities}
					activities={activities}
					selectedActivity={selectedActivity}
					setSelectedActivity={setSelectedActivity}
				/>
			)}

			{activities && selectedActivity && (
				<EditEncounters
					activityEncounters={activityEncounters}
					selectedActivity={selectedActivity}
					encounters={encounters}
					selectedEncounter={selectedEncounter}
					setSelectedEncounter={setSelectedEncounter}
				/>
			)}
			{encounterTemplates && selectedEncounter && (
				<EditTemplate encounterTemplates={encounterTemplates} selectedEncounter={selectedEncounter} />
			)}
		</Container>
	)
}

export default Edit
