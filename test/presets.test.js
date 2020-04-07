import { getCompiler, compile, readAsset, normalizeErrors } from './helpers';

describe('presets', () => {
  it('should pass on the code from the presets/modernizr fixture', async () => {
    const compiler = getCompiler('presets/modernizr.js', {
      minify: false,
      options: ['setClasses'],
      'feature-detects': [
        'test/css/flexbox',
        'test/es6/promises',
        'test/serviceworker',
      ],
    });
    const stats = await compile(compiler);

    expect(readAsset('val-loader.js', compiler, stats)).toMatchSnapshot(
      'result'
    );
    expect(normalizeErrors(stats.compilation.warnings)).toMatchSnapshot(
      'warnings'
    );
    expect(normalizeErrors(stats.compilation.errors)).toMatchSnapshot('errors');
  });
});
