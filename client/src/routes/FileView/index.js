module.exports = {
    path: '/home/*',
    getComponent(location, callback) {
        require.ensure([], (require) => {
            callback(null, require('./containers/FileView'))
        })
    }
}