const crypto = require('crypto');


const room_key = (alice,bob) => {
    const alice_keys = crypto.createECDH('secp256k1');
    alice_keys.generateKeys();

    const bob_keys = crypto.createECDH('secp256k1');
    bob_keys.generateKeys();

    const alicePublicKeyInBase64 = alice_keys.getPublicKey.toString('base64');
    const bobPublicKeyInBase64 = bob_keys.getPublicKey.toString('base64');

    const aliceSharedKey = alice_keys.computeSecret(bobPublicKeyInBase64,'base64','hex');
    const bobSharedKey = bob_keys.computeSecret(alicePublicKeyInBase64,'base64','hex');

    return aliceSharedKey;
}


const user_public_key = (user) => {
    const alice_keys = crypto.createECDH('secp256k1');
    alice_keys.generateKeys();
    const alicePublicKeyInBase64 = alice_keys.getPublicKey.toString('base64');
    return alicePublicKeyInBase64;
}




const encrypt_the_message = (message,sender_shared_key) => {

    const IV = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm',Buffer.from(sender_shared_key,'hex'),IV);
    let encrypt = cipher.update(message,'utf8','hex');
    encrypt+= cipher.final('hex');
    const auth_tag = cypher.getAuthTag().toString('hex');
    const payload = IV.toString('hex') + encrypt + auth_tag;
    const payloadBase64 = Buffer.from(payload,'hex').toString('base64');
    return payloadBase64;
}

const decrypt_the_message = (payloadBase64,reciever_sharedkey) => {
    
    const Bobpayload = Buffer.from(payloadBase64,'base64').toString('base64');
    const bob_iv = Bobpayload.substr(0,32)
    const bobencrypted = bob_payload.substr(32,bobpayload.length - 32 - 32);
    const bobauthtag = bob_payload.substr(Bobpayload.length - 32,32);

try {
    const decipher = crypto.createDecipheriv('aes-256-gcm',Buffer.from(reciever_sharedkey,'hex'), 
    Buffer.from(bob_iv,'hex'));
    decipher.setAuthTag(Buffer.from(bobauthtag,'hex'));

    
    let decrypted_message = decipher.update(bobencrypted,'hex','utf8');
    
    // This is the final message.
    decrypted_message+= decipher.final('utf8');

    return decrypted_message;

    }   catch (error) {
        console.log(error.message);
    }
    return null;
}

module.exports = { room_key, encrypt_the_message ,decrypt_the_message};


// const Crypto = (alice,bob) => {
//     const alice_keys = crypto.createECDH('secp256k1');
//     alice_keys.generateKeys();

//     const bob_keys = crypto.createECDH('secp256k1');
//     bob_keys.generateKeys();

//     const alicePublicKeyInBase64 = alice_keys.getPublicKey.toString('base64');
//     const bobPublicKeyInBase64 = bob_keys.getPublicKey.toString('base64');

//     const aliceSharedKey = alice_keys.computeSecret(bobPublicKeyInBase64,'base64','hex');
//     const bobSharedKey = bob_keys.computeSecret(alicePublicKeyInBase64,'base64','hex');

// }

// export default Crypto;


// const message = "This is some random message.";

// const IV = crypto.randomBytes(16);

// const cipher = crypto.createCipheriv('aes-256-gcm',Buffer.from(aliceSharedKey,'hex'),IV);

// let encrypt = cipher.update(message,'utf8','hex');

// encrypt+= cipher.final('hex');

// const auth_tag = cypher.getAuthTag().toString('hex');

// const payload = IV.toString('hex') + encrypt + auth_tag;

// // This will go to bob.
// const payloadBase64 = Buffer.from(payload,'hex').toString('base64');



// // Bob will do in his machine.

// const Bobpayload = Buffer.from(payloadBase64,'base64').toString('base64');

// const bob_iv = Bobpayload.substr(0,32)
// const bobencrypted = bob_payload.substr(32,bobpayload.length - 32 - 32);
// const bobauthtag = bob_payload.substr(Bobpayload.length - 32,32);

// try {
//     const decipher = crypto.createDecipheriv('aes-256-gcm',Buffer.from(bobSharedKey,'hex'), 
//     Buffer.from(bob_iv,'hex'));
//     decipher.setAuthTag(Buffer.from(bobauthtag,'hex'));

    
//     let decrypted_message = decipher.update(bobencrypted,'hex','utf8');
    
//     // This is the final message.
//     decrypted_message+= decipher.final('utf8');


// } catch (error) {
//     console.log(error.message);
// }


