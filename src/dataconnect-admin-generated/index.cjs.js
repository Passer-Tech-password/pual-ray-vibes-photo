const { validateAdminArgs } = require('firebase-admin/data-connect');

const connectorConfig = {
  connector: 'example',
  serviceId: 'photo-portfolio',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

function createPhotographer(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreatePhotographer', undefined, inputOpts);
}
exports.createPhotographer = createPhotographer;

function getPublicGalleries(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetPublicGalleries', undefined, inputOpts);
}
exports.getPublicGalleries = getPublicGalleries;

function getMyImages(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetMyImages', undefined, inputOpts);
}
exports.getMyImages = getMyImages;

function updateImage(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateImage', inputVars, inputOpts);
}
exports.updateImage = updateImage;

