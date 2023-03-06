module.exports = {
  'pre-commit': 'npx lint-staged',
  'commit-msg': 'npx --no-install commitlint -e '
}
