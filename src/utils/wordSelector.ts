import { words } from '../data/words'

export function pickRandomWord(category?: string) {
  const cats = Object.keys(words)
  const cat = category && words[category] ? category : cats[Math.floor(Math.random() * cats.length)]
  const list = words[cat]
  return { category: cat, word: list[Math.floor(Math.random() * list.length)] }
}
