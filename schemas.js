// schemas.js
import mongoose from "mongoose";

// Define schemas
const volumeByTokenSchema = new mongoose.Schema({
    token: String,
    chain: String,
    volume: Number,
    supply: String,
    numberofbuys: Number,
    pair: String,
    name: String,
    isexcludedfromchecks: Boolean,
    symbol: String,
    lasthoneypotcheck: Number,
    uniqueaddresschain: { type: String, unique: true }
}, { autoIndex: true });

const chainInfoSchema = new mongoose.Schema({
    chain: String,
    lastBuyProcessed: Number,
    buyvolume: Number,
    buyscount: Number,
    gwei: Number,
    lastBlock: Number,
    coinPrice: Number
});

const userinfoSchema = new mongoose.Schema({
    tgid: { type: String, unique: true },
    privatekeys: [String],
    solanaprivatekeys: [String],
    defaultnumberofwallets: { type: Number, default: 1 },
    buygwei: { type: Number, default: 5 },
    sellgwei: { type: Number, default: 10 },
    approvegwei: { type: Number, default: 5 },
    buyslippage: { type: Number, default: 10 },
    sellslippage: { type: Number, default: 10 },
    maxbuytax: { type: Number, default: 30 },
    maxselltax: { type: Number, default: 30 },
    defaultwallet: String,
    menuchain: { type: String, default: 'eth' }
});

const openMonitorsSchema = new mongoose.Schema({
    tokenaddress: String,
    chain: String,
    chatid: String,
    messageid: String,
    openedat: Number,
    userid: String,
    issellbuttons: Boolean
});

const infoByAmmIdSchema = new mongoose.Schema({
    ammId: String,
    quoteVault: String,
    baseVault: String,
    quoteToken: String,
    baseToken: String,
    quoteDecimals: String,
    baseDecimals: String
});

// Define models
const VolumeByToken = mongoose.model('VolumeByToken', volumeByTokenSchema);
const ChainInfo = mongoose.model('ChainInfo', chainInfoSchema);
const UserInfo = mongoose.model('UserInfo', userinfoSchema);
const OpenMonitors = mongoose.model('OpenMonitors', openMonitorsSchema);
const InfoByAmmId = mongoose.model('InfoByAmmId', infoByAmmIdSchema);

// Function to create a new user
async function createUser(tgid, defaultwallet, menuchain) {
    try {
        // Create a new user document using the userinfoSchema model
        await UserInfo.create({ tgid, defaultwallet, menuchain });
        console.log('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

// Function to delete a user
async function deleteUser(tgid) {
    try {
        // Delete the user document using the userinfoSchema model
        await UserInfo.deleteOne({ tgid });
        console.log('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Function to get user information by Telegram user ID
async function getUserInfoByTgid(tgid) {
    try {
        // Find the user document by Telegram user ID using the userinfoSchema model
        const user = await this.findOne({ tgid });
        if (user) {
            console.log('User found:', user);
            return user;
        } else {
            console.log('User not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching user information:', error);
        return null;
    }
}

// Function to check if a user exists by Telegram user ID
async function doesUserExist(tgid) {
    try {
        // Check if the user exists using the userinfoSchema model
        const count = await this.countDocuments({ tgid });
        return count > 0;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        return false;
    }
}

// Add the static methods to the userinfoSchema
userinfoSchema.statics.getUserInfoByTgid = getUserInfoByTgid;
userinfoSchema.statics.doesUserExist = doesUserExist;

export {
    VolumeByToken,
    ChainInfo,
    UserInfo,
    OpenMonitors,
    InfoByAmmId,
    volumeByTokenSchema,
    chainInfoSchema,
    userinfoSchema,
    openMonitorsSchema,
    infoByAmmIdSchema,
    createUser,
    deleteUser,
    getUserInfoByTgid,
    doesUserExist
};
