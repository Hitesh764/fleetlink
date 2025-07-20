function estimateDuration(from, to) {
  return Math.abs(parseInt(to) - parseInt(from)) % 24;
}

module.exports = estimateDuration;
