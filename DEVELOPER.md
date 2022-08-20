# Building and Testing TypeAirtable

This document describes how to set up your development environment and run TypeAirtable test cases.

- [Building and Testing TypeAirtable](#building-and-testing-typeairtable)
  - [Prerequisite Software](#prerequisite-software)
  - [Getting the Sources](#getting-the-sources)
  - [Installing NPM Modules](#installing-npm-modules)
  - [Running Tests Locally](#running-tests-locally)
    - [Faster developer cycle for editing code and running tests](#faster-developer-cycle-for-editing-code-and-running-tests)

See the [contribution guidelines](https://github.com/thinkam/typeairtable/blob/main/CONTRIBUTING.md)
if you'd like to contribute to TypeAirtable.

## Prerequisite Software

Before you can build and test TypeAirtable, you must install and configure the
following products on your development machine:

* [Git](http://git-scm.com) and/or the **GitHub app** (for [Mac](http://mac.github.com) or
  [Windows](http://windows.github.com)); [GitHub's Guide to Installing
  Git](https://help.github.com/articles/set-up-git) is a good source of information.
* [Node.js](http://nodejs.org), (better to install latest version) which is used to run a development web server,
  run tests, and generate distributable files.
  Depending on your system, you can install Node either from source or as a pre-packaged bundle.
* [Airtable](https://airtable.com/invite/l?inviteId=inva8pcwGMWQOajKh&inviteToken=299df579ea83665c495a2543fb17e04a010528eafd7dd9d35ad4a9f5df96c504&utm_medium=email&utm_source=product_team&utm_content=transactional-alerts) is required to run tests on this platform

## Getting the Sources

Fork and clone the repository:

1. Login to your GitHub account or create one by following the instructions given [here](https://github.com/signup/free).
2. [Fork](http://help.github.com/forking) the [main TypeAirtable repository](https://github.com/thinkam/typeairtable).
3. Clone your fork of the TypeAirtable repository and define an `upstream` remote pointing back to
   the TypeAirtable repository that you forked in the first place.

```shell
# Clone your GitHub repository:
git clone git@github.com:<github username>/typeairtable.git

# Go to the TypeAirtable directory:
cd typeairtable

# Add the main TyepAirtable repository as an upstream remote to your repository:
git remote add upstream https://github.com/thinkam/typeairtable.git
```
## Installing NPM Modules

Install all TypeORM dependencies by running this command:

```shell
npm install
```

## Running Tests Locally

It would be greatly appreciated if PRs that change code come with appropriate tests.

To create a test for a specific issue opened on github, create a file: `test/github-issues/<num>/issue-<num>.ts` where
`<num>` is the corresponding github issue. For example, if you were creating a PR to fix github issue #363, you'd
create `test/github-issues/363/issue-363.ts`.

Most tests will benefit from using this template as a starting point:

```ts
import { UrlGenerator } from '../../../src/data/services/url-generator';
import { ConfigModel, Field, TableModel } from '../../../src/domain/contracts';

const makeSut = () => {
  const config: ConfigModel = {
    baseUrl: 'https://api.airtable.com/v0/any',
    apiKey: 'any_key',
  };
  const table: TableModel = {
    tableName: 'MyTable',
    columns: {
      name: 'singleText',
      email: 'singleText',
      password: 'singleText',
    },
  };
  const sut = new UrlGenerator(config, table);
  const initialUrl = `${config.baseUrl}/${table.tableName}?api_key=${config.apiKey}`;
  return { sut, initialUrl };
};

describe('UrlGenerator', () => {
  it('Should return url correct if dataInstance is empty', () => {
    const { sut, initialUrl } = makeSut();
    expect(sut.getUrl({})).toBe(initialUrl);
  });

  it('Should return url correct if exists select', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&fields[]=name&fields[]=email`;
    expect(sut.getUrl({ select: ['name', 'email'] })).toBe(url);
  });

  it('Should return url correct if exists orderBy', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&sort[0][field]=name&sort[0][direction]=asc&sort[1][field]=email&sort[1][direction]=desc`;
    expect(
      sut.getUrl({
        orderBy: { name: 'asc', email: 'desc' },
      })
    ).toBe(url);
  });

  it('Should return url correct if exists where = AND operator', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&filterByFormula=AND({name}='any_name',{email}='any_email')`;
    expect(
      sut.getUrl({
        where: { name: 'any_name', email: 'any_email' },
      })
    ).toBe(url);
  });

  it('Should return url correct if exists where = OR operator', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&filterByFormula=OR(AND({name}='any_name',{email}='any_email'),AND({name}='any_name2'))`;
    expect(
      sut.getUrl({
        where: [
          { name: 'any_name', email: 'any_email' },
          { name: 'any_name2' },
        ],
      })
    ).toBe(url);
  });

  it('Should return url correct if where exists boolean with value equal true', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&filterByFormula=AND(isActived)`;
    expect(
      sut.getUrl({
        where: { isActived: true },
      })
    ).toBe(url);
  });

  it('Should return url correct if where exists boolean with value equal false', () => {
    const { sut, initialUrl } = makeSut();
    const url = `${initialUrl}&filterByFormula=AND(NOT(isActived))`;
    expect(
      sut.getUrl({
        where: { isActived: false },
      })
    ).toBe(url);
  });
});
```

Then run tests:

```shell
npm test
```

You should execute test suites before submitting a PR to github.
All the tests are executed on our Continuous Integration infrastructure and a PR could only be merged once the tests pass.

**Executing only some tests**: When you are creating tests to some specific code, you may want only execute the tests that you're creating, so you waste less time to verify your code. To do this, you can temporarily modify your tests definitions adding `.only` *mocha* commands **(describe, it)**. Example:

```
describe.only('your describe test', ....)
```

>**Hint:** you can use the `--grep` flag to pass a Regex to `gulp-mocha`. Only the tests have have `describe`/`it`
>statements that match the Regex will be run. For example:
>
>```shell
>npm test -- --grep="github issues > #363"
>```
>
>This is useful when trying to get a specific test or subset of tests to pass.

### Faster developer cycle for editing code and running tests

The `npm test` script works by deleting built TypeScript code, rebuilding the codebase, and then running tests. This can take a long time.

Instead, for a quicker feedback cycle, you can run `npm run compile -- --watch` to make a fresh build and instruct TypeScript to watch for changes and only compile what code you've changed.

Once TypeScript finishes compiling your changes, you can run `npm run test-fast` (instead of `test`), to trigger a test without causing a full recompile, which allows you to edit and check your changes much faster.
