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
    return snap.ref.child("moduleCount").set(0);
  });

exports.orderOfNewModule = functions.database.ref("/stories/{storyId}/modules/{moduleId}")
  .onCreate((snap, context) => {
    let storyRef = snap
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
            snap.ref.child("order").set(count),
            storyRef.ref.child("moduleCount").set(count + 1),
            snap.ref.child("id").set(context.params.moduleId)
          ]).then((x) => resolve(x))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  });

exports.orderAfterDeleteModule = functions.database.ref("/stories/{storyId}/modules/{moduleId}")
  .onDelete((snap, index) => {
// TODO
  });

