const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'photo-portfolio',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createPhotographerRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePhotographer');
}
createPhotographerRef.operationName = 'CreatePhotographer';
exports.createPhotographerRef = createPhotographerRef;

exports.createPhotographer = function createPhotographer(dc) {
  return executeMutation(createPhotographerRef(dc));
};

const getPublicGalleriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPublicGalleries');
}
getPublicGalleriesRef.operationName = 'GetPublicGalleries';
exports.getPublicGalleriesRef = getPublicGalleriesRef;

exports.getPublicGalleries = function getPublicGalleries(dc) {
  return executeQuery(getPublicGalleriesRef(dc));
};

const getMyImagesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyImages');
}
getMyImagesRef.operationName = 'GetMyImages';
exports.getMyImagesRef = getMyImagesRef;

exports.getMyImages = function getMyImages(dc) {
  return executeQuery(getMyImagesRef(dc));
};

const updateImageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateImage', inputVars);
}
updateImageRef.operationName = 'UpdateImage';
exports.updateImageRef = updateImageRef;

exports.updateImage = function updateImage(dcOrVars, vars) {
  return executeMutation(updateImageRef(dcOrVars, vars));
};
