type TeamResult = {
  name: string
  score: string
}

type Game = {
  team1: TeamResult
  team2: TeamResult
}

export type GameData = {
  date: string
  result: string
}

export const transformData = (gameData: GameData[]) => {
  const data = gameData.map((el) => {
    return { date: el.date, result: JSON.parse(el.result) }
  })
  const csvData = ['Date,Team 1,Score 1,Team 2,Score 2']

  data.forEach(({ date, result }) => {
    result.forEach((game: Game) => {
      const team1 = game.team1.name
      const team1Score = game.team1.score
      const team2 = game.team2.name
      const team2Score = game.team2.score
      csvData.push(`${date},${team1},${team1Score},${team2},${team2Score}`)
    })
  })

  return csvData.join('\n')
}
