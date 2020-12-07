/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './Header'
import Login from './Login'
import Signup from './Signup'
import Schedule from './Schedule'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [favorite, setFavorite] = useState('')
  const [teamNames, setTeams] = useState([])
  const [keyToNames, setKeyToNames] = useState({})
  const [loginShow, setLoginShow] = useState(false)
  const [signupShow, setSignupShow] = useState(false)
  const [weeklyGames, setGames] = useState({})
  const [week, setWeek] = useState(0)
  const [doneLoading, setDone] = useState(false)

  const getUser = async () => {
    const res = await axios.get('account/getUser')
    const { data } = res
    setUser(data)
  }

  const getFavorite = async () => {
    const res = await axios.get('account/getFavorite')
    const { data } = res
    await setFavorite(data)
  }

  const isLoggedIn = async () => {
    const res = await axios.get('/account/isloggedin')
    const { data } = res
    setLoggedIn(data)
    return loggedIn
  }

  const apiKey = '?key=aa8bf525b1a44d39b5010700c0b673fd'
  const scoresRoute = 'https://api.sportsdata.io/v3/nfl/scores/json'
  const teamsEndpoint = `${scoresRoute}/Teams${apiKey}`
  const gamesEndpoint = `${scoresRoute}/Scores/2020${apiKey}`
  const weekEndpoint = `${scoresRoute}/UpcomingWeek${apiKey}`

  const getTeams = async () => {
    const res = await axios.get(teamsEndpoint)
    const { data } = res
    const keyToName = {}
    const names = []
    let i
    for (i = 0; i < data.length; i += 1) {
      const team = data[i]
      const { Key, City, Name } = team
      const teamName = `${City} ${Name}`
      keyToName[Key] = teamName
      names.push(teamName)
    }
    await setTeams(names)
    await setKeyToNames(keyToName)
  }

  const getGames = async () => {
    const res = await axios.get(gamesEndpoint)
    const { data } = res
    const weeks = {}
    let j
    for (j = 1; j <= 17; j += 1) {
      weeks[j] = []
    }
    let i
    for (i = 0; i < data.length; i += 1) {
      const game = data[i]
      const {
        Week, DateTime, AwayTeam, HomeTeam, Channel, Status, StadiumDetails, HomeScore, AwayScore,
      } = game
      const AwayName = keyToNames[AwayTeam]
      const HomeName = keyToNames[HomeTeam]
      const currGame = {
        Week,
        DateTime,
        AwayTeam,
        HomeTeam,
        AwayName,
        HomeName,
        Channel,
        Status,
        StadiumDetails,
        HomeScore,
        AwayScore,
      }
      weeks[Week].push(currGame)
    }
    await setGames(weeks)
    setDone(true)
  }

  const getWeek = async () => {
    const res = await axios.get(weekEndpoint)
    const { data } = res
    await setWeek(data)
  }

  const getData = async () => {
    await getTeams()
    await getWeek()
  }

  useEffect(async () => {
    await getData()
    await isLoggedIn()
    await getUser()
    // await getFavorite()
    const intervalID = setInterval(async () => {
      await isLoggedIn()
      await getUser()
      // await getFavorite()
    }, 2000)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearInterval(intervalID)
  }, [])

  useEffect(async () => {
    if (Object.keys(keyToNames).length === 32) {
      await getGames()
    }
  }, [keyToNames])

  useEffect(async () => {
    await getUser()
    await getFavorite()
  }, [loggedIn])

  return (
    <div>
      {Object.keys(keyToNames).length === 32 && (
      <Header
        isLoggedIn={isLoggedIn}
        loggedIn={loggedIn}
        user={user}
        showLogin={setLoginShow}
        showSignup={setSignupShow}
        favorite={favorite}
        keys={keyToNames}
      />
      )}
      <Login
        show={loginShow}
        onHide={() => setLoginShow(false)}
        showSignup={() => setSignupShow(true)}
        isLoggedIn={isLoggedIn}
      />
      <Signup
        show={signupShow}
        onHide={() => setSignupShow(false)}
        teams={teamNames}
        showLogin={() => setLoginShow(true)}
      />
      {week > 0 && Object.keys(weeklyGames).length === 17 && favorite && doneLoading && (
        <Schedule week={week} setWeek={setWeek} games={weeklyGames} favorite={favorite} />
      )}
    </div>
  )
}

export default App
