var bip39 = require('bip39');
var hdkey = require('hdkey');
var createHash = require('create-hash');
var btcLib = require('bitcoinjs-lib');
var bs58check = require('bs58check');


async function generate(){
	const mnemoninc = await bip39.generateMnemonic();
	const seed = await bip39.mnemonicToSeed(mnemoninc);
	const root = await hdkey.fromMasterSeed(seed);
	const masterPrivateKey = await root.privateKey.toString('hex');
	const addrnode = await root.derive("m/44'/0'/0'/0/0");
	const step1 = await addrnode._publicKey;
	const step2 = await createHash('sha256').update(step1).digest();
	const step3 = await createHash('rmd160').update(step2).digest();
	var step4 = await Buffer.allocUnsafe(21);
	step4.writeUInt8(0x00, 0);
	step3.copy(step4, 1);
	const step9 = await bs58check.encode(step4);
	// // console.log("mnemoninc: ", mnemoninc, " seed: ", seed, " root: ", root, " masterPrivateKey: ", masterPrivateKey, " addrnode: ",
	// 		addrnode, " step1: ", step1, " step2: ", step2, " step3: ", step3, " step4: ", step4, " step9: ", step9
	// 	);
	return({
				mnemoninc: mnemoninc,
				masterPrivateKey: masterPrivateKey,
				publicKey: step9
			}
		)
}

exports.generate = generate;
// export default generate();
// bip39.generateMnemonic().then((mnemoninc)=>{
// 	console.log("mnemoninc: ", mnemoninc);
// 	bip39.mnemonicToSeed(mnemonic).then((seed)=>{
// 		hdkey.fromMasterSeed(seed).then((root)=>{
// 			root.privateKey.toString('hex').then((masterPrivateKey)=>{

// 			})
// 		})
// 	});
// });
// // const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer
// // console.log('Seed: ' + seed);
// // console.log('mnemonic: ' + mnemonic);

// const root = hdkey.fromMasterSeed(seed);
// const masterPrivateKey = root.privateKey.toString('hex');
// console.log('masterPrivateKey: ' + masterPrivateKey);

// const addrnode = root.derive("m/44'/0'/0'/0/0");
// console.log('addrnodePublicKey: '+ addrnode._publicKey)

// const step1 = addrnode._publicKey;
// const step2 = createHash('sha256').update(step1).digest();
// const step3 = createHash('rmd160').update(step2).digest();

// var step4 = Buffer.allocUnsafe(21);
// step4.writeUInt8(0x00, 0);
// step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result
// const step9 = bs58check.encode(step4);
// console.log('Base58Check: ' + step9);