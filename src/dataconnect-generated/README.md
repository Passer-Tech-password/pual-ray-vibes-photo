# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetPublicGalleries*](#getpublicgalleries)
  - [*GetMyImages*](#getmyimages)
- [**Mutations**](#mutations)
  - [*CreatePhotographer*](#createphotographer)
  - [*UpdateImage*](#updateimage)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetPublicGalleries
You can execute the `GetPublicGalleries` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getPublicGalleries(): QueryPromise<GetPublicGalleriesData, undefined>;

interface GetPublicGalleriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetPublicGalleriesData, undefined>;
}
export const getPublicGalleriesRef: GetPublicGalleriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPublicGalleries(dc: DataConnect): QueryPromise<GetPublicGalleriesData, undefined>;

interface GetPublicGalleriesRef {
  ...
  (dc: DataConnect): QueryRef<GetPublicGalleriesData, undefined>;
}
export const getPublicGalleriesRef: GetPublicGalleriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPublicGalleriesRef:
```typescript
const name = getPublicGalleriesRef.operationName;
console.log(name);
```

### Variables
The `GetPublicGalleries` query has no variables.
### Return Type
Recall that executing the `GetPublicGalleries` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPublicGalleriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPublicGalleriesData {
  galleries: ({
    id: UUIDString;
    name: string;
    description?: string | null;
  } & Gallery_Key)[];
}
```
### Using `GetPublicGalleries`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPublicGalleries } from '@dataconnect/generated';


// Call the `getPublicGalleries()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPublicGalleries();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPublicGalleries(dataConnect);

console.log(data.galleries);

// Or, you can use the `Promise` API.
getPublicGalleries().then((response) => {
  const data = response.data;
  console.log(data.galleries);
});
```

### Using `GetPublicGalleries`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPublicGalleriesRef } from '@dataconnect/generated';


// Call the `getPublicGalleriesRef()` function to get a reference to the query.
const ref = getPublicGalleriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPublicGalleriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.galleries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.galleries);
});
```

## GetMyImages
You can execute the `GetMyImages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyImages(): QueryPromise<GetMyImagesData, undefined>;

interface GetMyImagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyImagesData, undefined>;
}
export const getMyImagesRef: GetMyImagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyImages(dc: DataConnect): QueryPromise<GetMyImagesData, undefined>;

interface GetMyImagesRef {
  ...
  (dc: DataConnect): QueryRef<GetMyImagesData, undefined>;
}
export const getMyImagesRef: GetMyImagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyImagesRef:
```typescript
const name = getMyImagesRef.operationName;
console.log(name);
```

### Variables
The `GetMyImages` query has no variables.
### Return Type
Recall that executing the `GetMyImages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyImagesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyImagesData {
  images: ({
    id: UUIDString;
    title?: string | null;
    imageUrl: string;
    thumbnailUrl: string;
  } & Image_Key)[];
}
```
### Using `GetMyImages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyImages } from '@dataconnect/generated';


// Call the `getMyImages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyImages();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyImages(dataConnect);

console.log(data.images);

// Or, you can use the `Promise` API.
getMyImages().then((response) => {
  const data = response.data;
  console.log(data.images);
});
```

### Using `GetMyImages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyImagesRef } from '@dataconnect/generated';


// Call the `getMyImagesRef()` function to get a reference to the query.
const ref = getMyImagesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyImagesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.images);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.images);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreatePhotographer
You can execute the `CreatePhotographer` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createPhotographer(): MutationPromise<CreatePhotographerData, undefined>;

interface CreatePhotographerRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreatePhotographerData, undefined>;
}
export const createPhotographerRef: CreatePhotographerRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPhotographer(dc: DataConnect): MutationPromise<CreatePhotographerData, undefined>;

interface CreatePhotographerRef {
  ...
  (dc: DataConnect): MutationRef<CreatePhotographerData, undefined>;
}
export const createPhotographerRef: CreatePhotographerRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPhotographerRef:
```typescript
const name = createPhotographerRef.operationName;
console.log(name);
```

### Variables
The `CreatePhotographer` mutation has no variables.
### Return Type
Recall that executing the `CreatePhotographer` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePhotographerData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePhotographerData {
  photographer_insert: Photographer_Key;
}
```
### Using `CreatePhotographer`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPhotographer } from '@dataconnect/generated';


// Call the `createPhotographer()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPhotographer();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPhotographer(dataConnect);

console.log(data.photographer_insert);

// Or, you can use the `Promise` API.
createPhotographer().then((response) => {
  const data = response.data;
  console.log(data.photographer_insert);
});
```

### Using `CreatePhotographer`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPhotographerRef } from '@dataconnect/generated';


// Call the `createPhotographerRef()` function to get a reference to the mutation.
const ref = createPhotographerRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPhotographerRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.photographer_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.photographer_insert);
});
```

## UpdateImage
You can execute the `UpdateImage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateImage(vars: UpdateImageVariables): MutationPromise<UpdateImageData, UpdateImageVariables>;

interface UpdateImageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateImageVariables): MutationRef<UpdateImageData, UpdateImageVariables>;
}
export const updateImageRef: UpdateImageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateImage(dc: DataConnect, vars: UpdateImageVariables): MutationPromise<UpdateImageData, UpdateImageVariables>;

interface UpdateImageRef {
  ...
  (dc: DataConnect, vars: UpdateImageVariables): MutationRef<UpdateImageData, UpdateImageVariables>;
}
export const updateImageRef: UpdateImageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateImageRef:
```typescript
const name = updateImageRef.operationName;
console.log(name);
```

### Variables
The `UpdateImage` mutation requires an argument of type `UpdateImageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateImageVariables {
  id: UUIDString;
  title?: string | null;
}
```
### Return Type
Recall that executing the `UpdateImage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateImageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateImageData {
  image_update?: Image_Key | null;
}
```
### Using `UpdateImage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateImage, UpdateImageVariables } from '@dataconnect/generated';

// The `UpdateImage` mutation requires an argument of type `UpdateImageVariables`:
const updateImageVars: UpdateImageVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateImage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateImage(updateImageVars);
// Variables can be defined inline as well.
const { data } = await updateImage({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateImage(dataConnect, updateImageVars);

console.log(data.image_update);

// Or, you can use the `Promise` API.
updateImage(updateImageVars).then((response) => {
  const data = response.data;
  console.log(data.image_update);
});
```

### Using `UpdateImage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateImageRef, UpdateImageVariables } from '@dataconnect/generated';

// The `UpdateImage` mutation requires an argument of type `UpdateImageVariables`:
const updateImageVars: UpdateImageVariables = {
  id: ..., 
  title: ..., // optional
};

// Call the `updateImageRef()` function to get a reference to the mutation.
const ref = updateImageRef(updateImageVars);
// Variables can be defined inline as well.
const ref = updateImageRef({ id: ..., title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateImageRef(dataConnect, updateImageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.image_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.image_update);
});
```

