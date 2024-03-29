import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

const serviceAccount: admin.ServiceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://firestore-grafic.firebaseio.com"
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.json({
//      mensaje: "Hola mundo desde funciones de firebase!"
//     });
// });

// export const prueba = functions.https.onRequest((request: functions.https.Request, response: functions.Response) => {

//     const nombre: string = request.query['nombre'] || 'Sin nombre';
//     const segundonombre: string = request.body['segundoNombre'] || 'Sin segundo nombre';
//     console.log('segundonombre :', segundonombre);
//     response.json({
//         nombre: nombre,
//         segundoNombre: segundonombre
//     });
// });


// export const getGOTY = functions.https.onRequest( async (request: functions.https.Request, response: functions.Response) => {

//     const gotyRef = db.collection( 'goty' );
//     const docsSnap = await gotyRef.get();
//     const juegos = docsSnap.docs.map( doc => doc.data() );
//     response.json( juegos );
// });

const app = express();
app.use( cors( { origin: true } ) );

app.get('/goty', async ( req: express.Request, res: express.Response ) => {
    const gotyRef = db.collection( 'goty' );
    const docsSnap = await gotyRef.get();
    const juegos = docsSnap.docs.map( doc => doc.data() );
    res.json( juegos );
});

app.post('/goty/:id', async ( req: express.Request, res: express.Response ) => {
    const id: string = req.params['id'];
    const gameRef = db.collection( 'goty' ).doc( id );
    const gameSnap = await gameRef.get();

    if ( !gameSnap.exists ) {
        res.status(404).json({
            ok: false,
            mensaje: 'No existe un juego con ese ID ' + id
        })
    } else {
        const antes = gameSnap.data() || { votos: 0 };
        await gameRef.update({
            votos: antes.votos + 1
        });
        
        res.json({
            ok: true,
            mensaje: `Gracias por tu voto a ${ antes.name }`
        });
    }
});

export const api = functions.https.onRequest( app );