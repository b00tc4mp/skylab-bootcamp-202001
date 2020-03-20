import register from './register'


test('should fail on none name', async () => {
    try {
      await register()
    } catch (e) {
      expect(e.message).toMatch('name should be defined');
    }
});

test('should fail on none surname', async () => {
    try {
      await register('victor')
    } catch (e) {
      expect(e.message).toBe('surname should be defined');
    }
});

test('should fail on none username', async () => {
    try {
      await register('lorem', 'ipsum')
    } catch (e) {
      expect(e.message).toMatch('username should be defined');
    }
});

test('should fail on none password', async () => {
    try {
      await register('a', 'b', 'c', 'd')
    } catch (e) {
      expect(e.message).toMatch('password should be defined');
    }
});

test('should register user', async () => {
    var name = 'name-' + Math.random()
    var surname = 'surname-' + Math.random()
    var username = 'username-' + Math.random()

    const result = await register(name, surname, username, 'abcd')
    expect(result).toMatch('ok')

});