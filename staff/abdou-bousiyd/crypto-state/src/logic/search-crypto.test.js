import searchCrypto from './search-crypto'

test('should return cryptos by query', async () => {

    const crypto = await searchCrypto('tron')
    expect(crypto.symbol).toEqual('TRX')
});

test('should return undefined on none result', async () => {

    const crypto = await searchCrypto('lorem')
    expect(crypto).toBeUndefined()
});

