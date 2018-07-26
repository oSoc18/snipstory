const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.confirmFalse = functions.database.ref('/users/{userId}')
  .onCreate((snap, context) => {
    return snap.ref.child("confirmed").set(false);
  });

exports.moduleCount = functions.database.ref('/stories/{storyId}')
  .onCreate((snap, context) => {
    return Promise.all([
      snap.ref.child("moduleCount").set(0),
      snap.ref.child("id", context.params.storyId)
    ]);
  });

exports.orderOfNewModule = functions.database.ref("/stories/{storyId}/modules/{moduleId}")
  .onCreate((moduleSnap, context) => {
    let storyRef = moduleSnap
      .ref
      .parent // module
      .parent; // storyId;

    return new Promise((resolve, reject) => {
      storyRef
        .child("moduleCount")
        .once("value")
        .then(snap => {
          return parseInt(snap.val());
        })
        .catch(err => reject(err))
        .then(count => {
          Promise.all([
            moduleSnap.ref.child("order").set(count),
            storyRef.ref.child("moduleCount").set(count + 1),
            moduleSnap.ref.child("id").set(context.params.moduleId)
          ]).then(resolve)
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  });

exports.onNewLocation = functions.database.ref("/stories/{storyId}/locations/{locationId}")
  .onCreate((snap, context) => snap.ref.child("id").set(context.params.locationId));

exports.orderAfterDeleteModule = functions.database.ref("/stories/{storyId}/modules/{moduleId}")
  .onDelete(snap => {
    let storyRef = snap
      .ref
      .parent
      .parent;

    return new Promise((resolve, reject) => {
      snap.ref.child("order")
        .once("value")
        .then(moduleOrderSnap => {
          const deletedModuleOrder = moduleOrderSnap.val();
          storyRef
            .child("moduleCount")
            .once("value")
            .then(snap => {
              return parseInt(snap.val());
            }).catch(reject)
            .then(count => {
              storyRef
                .child("modules")
                .orderByChild("order")
                .startAt(deletedModuleOrder - 1)
                .once("value")
                .then(snap => {
                  let val = snap.val();
                  // TODO fix orderByChild so dont
                  // need to call filter and then add .indexOn: order
                  return Object.keys(val)
                    .map(k => val[k])
                    .filter(module => module.order > deletedModuleOrder);
                })
                .catch(reject)
                .then(modules => {
                  Promise.all([
                    storyRef.ref.child("moduleCount").set(count - 1),
                    ...modules.map(module => {
                      return storyRef
                        .child("modules")
                        .child(module.id)
                        .child("order")
                        .set(module.order - 1)
                    })
                  ]).then(resolve).catch(reject);
                }).catch(reject)
            }).catch(reject);
        }).catch(reject);
    });
  });

