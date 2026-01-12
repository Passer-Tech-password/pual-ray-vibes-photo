import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'photo-portfolio',
  location: 'us-east4'
};

export const createPhotographerRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePhotographer');
}
createPhotographerRef.operationName = 'CreatePhotographer';

export function createPhotographer(dc) {
  return executeMutation(createPhotographerRef(dc));
}

export const getPublicGalleriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicGalleries');
}
getPublicGalleriesRef.operationName = 'GetPublicGalleries';

export function getPublicGalleries(dc) {
  return executeQuery(getPublicGalleriesRef(dc));
}

export const getMyImagesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyImages');
}
getMyImagesRef.operationName = 'GetMyImages';

export function getMyImages(dc) {
  return executeQuery(getMyImagesRef(dc));
}

export const updateImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateImage', inputVars);
}
updateImageRef.operationName = 'UpdateImage';

export function updateImage(dcOrVars, vars) {
  return executeMutation(updateImageRef(dcOrVars, vars));
}

