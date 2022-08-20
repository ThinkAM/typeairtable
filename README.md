<div align="center">
  <a href="http://typeorm.io/">
    <img src="https://github.com/thinkam/typeairtable/raw/main/resources/logo_big.png" width="492" height="228">
  </a>
  <br>
  <br>
	<a href="https://discord.gg/swaQNf9">
		<img src="https://img.shields.io/discord/542463140646879272">
	</a>
  <br>
  <br>
</div>

TypeAirtable is an [ORM](https://en.wikipedia.org/wiki/Object-relational_mapping)
that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms
and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
Its goal is to always support the latest JavaScript features and provide additional features
that help you to develop any kind of application that uses airtable database - from
small applications with a few tables to large scale enterprise applications
with multiple airtable databases.

TypeAirtable is highly influenced by other ORMs, such as [TypeORM](https://typeorm.io/) and [Entity Framework](https://www.asp.net/entity-framework).

## Features

-   Entities and columns.
-   Database-specific column types.
-   Repositories and custom repositories.
-   Using multiple database instances.
-   Elegant-syntax and flexible.
-   Supports Airtable.
-   Works in NodeJS / Browser / Ionic / Cordova / React Native / NativeScript / Expo / Electron platforms / ReactJS / Angular / VueJS.
-   TypeScript and JavaScript support.
-   ESM and CommonJS support.
-   Produced code is performant, flexible, clean and maintainable.
-   Follows all possible best practices.

And more...

With TypeAirtable your find look like this:

```typescript
    const config = new AirTableConfig();
    const instance = config.configure({
      baseUrl: 'https://api.airtable.com/v0/your_url',
      apiKey: 'your_api_key',
    });

    const repository = instance.getRepository({
      tableName: 'your_table',
      columns: {
        name: 'singleText',
        isActived: 'checkBox',
      },
    });

    const result = await repository.find({
      select: ['name'],
      where: { name: 'blah' },
    });
```

And your create looks like this:

```typescript
    await repository.create({
      name: 'your_name',
      isActived: true,
    });
```

If you prefer update, you can use it as well:

```typescript
    await repository.update('your_id', {
      name: 'other_name',
      isActived: false
    });
```

And your delete will look this way:

```typescript
    await repository.destroy('your_id');
```

## Installation

1. Install the npm package:

    `npm install @thinkam/typeairtable --save`

##### TypeScript configuration

Also, make sure you are using TypeScript version **4.5** or higher,
and you have enabled the following settings in `tsconfig.json`:

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

You may also need to enable `es6` in the `lib` section of compiler options, or install `es6-shim` from `@types`.

## Contributing

Learn about contribution [here](https://github.com/thinkam/typeairtable/blob/main/CONTRIBUTING.md) and how to setup your development environment [here](https://github.com/thinkam/typeairtable/blob/main/DEVELOPER.md).
