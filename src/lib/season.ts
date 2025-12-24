type Season = "Spring" | "Summer" | "Autumn" | "Winter"

type SeasonColors = {
	primary: string
	secondary: string
	tertiary: string
}

const COLOURS: Record<Season, [string, string, string]> = {
	Spring: ["#69893e", "#92b573", "#a482a3"],
	Summer: ["#BF70B3", "#EBB3DF", "#568A36"],
	Autumn: ["#d62828", "#fcbf49", "#f77f00"],
	Winter: ["#3394b7", "#acccd8", "#d04763"],
}

function getSeason(date: Date = new Date()): Season {
	const year = date.getFullYear()
	const current = date.getTime()
	const seasons = {
		Spring: Date.UTC(year, 2, 20),
		Summer: Date.UTC(year, 5, 21),
		Autumn: Date.UTC(year, 8, 23),
		Winter: Date.UTC(year, 11, 21),
	}

	if (current >= seasons.Spring && current < seasons.Summer) return "Spring"
	if (current >= seasons.Summer && current < seasons.Autumn) return "Summer"
	if (current >= seasons.Autumn && current < seasons.Winter) return "Autumn"
	return "Winter"
}

export function getSeasonColors(date: Date = new Date()): SeasonColors {
	const season = getSeason(date)
	const [primary, secondary, tertiary] = COLOURS[season]
	return { primary, secondary, tertiary }
}
