import db from '../db.server';

export async function getAccessTokenForShop(shop) {
    console.log("SHO{LDLD --> ", shop);
    const shopRecord = await db.Session.findUnique({ where: { shop } });
    if (shopRecord) {
      return shopRecord.accessToken;
    }
    throw new Error('Access token not found for shop');
};