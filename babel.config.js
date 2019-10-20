module.exports = (api) => {
    api.cache(true);
    const presets = ['@babel/env', '@babel/react'];
    const plugins = ['@babel/proposal-class-properties']

    return {
        presets,
        plugins
    };
}
