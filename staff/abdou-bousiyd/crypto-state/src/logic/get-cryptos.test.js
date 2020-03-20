import getCryptos from './get-cryptos'


test('should return limit of 5 cryptos', async () => {

    const cryptos = await getCryptos()
    expect(cryptos.length).toEqual(5)
});