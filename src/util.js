const getIconUrlByCardId = cardId => {
  return `https://s.llsif.org/en/icons/${cardId}.png?${Date.now()}`
}

export default {
  getIconUrlByCardId,
}