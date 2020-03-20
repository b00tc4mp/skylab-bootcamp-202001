import authenticateUser from './authenticate-user'

// registrare un usuario y luego comprobare que me deja logear. y ahora lo estoy probando con usuario que ya existee
// tengo que usar metodo beforeach

test('should fail on none username', async () => {
  try {
    await authenticateUser()
  } catch (e) {
    expect(e.message).toMatch('username should be defined');
  }
});

test('should fail on none password', async () => {
  try {
    await authenticateUser('lorem')
  } catch (e) {
    expect(e.message).toMatch('password should be defined');
  }
});


test('should return ok on correct data', async () => {
    const result = await authenticateUser('a', 'a')
    expect(result).toBe('ok')

});
