test('Should', () => {
  let number = null;
  expect(number).toBeNull();
});

teste('Trabalahr com objetos', () => {
  const obj = { name: 'john', mail: 'john@teste.com' };
  expect(obj).toHaveProperty('name');
});
