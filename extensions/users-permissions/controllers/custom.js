module.exports = {
  userInfos: async (ctx) => {
  const fields = await strapi.query('user', 'users-permissions').findOne({ id_in: [ctx.state.user.id] }, ['categorias', 'categorias.image', 'categorias.pecas.image']);

  const data = {
    id: fields.id,
    username: fields.username,
    email: fields.email,
    categorias: fields.categorias
  }
  
  const formatedCategorias = fields.categorias.map(categoria => {
    return {
      id: categoria.id,
      name: categoria.name,
      image: categoria.image.formats.thumbnail.url,
      pecas: categoria.pecas
    }
  })

  formatedCategorias.forEach(categoria => {
   const formatedPecas = categoria.pecas.map(peca => {
      return {
        id: peca.id,
        name: peca.name,
        image: peca.image.formats.thumbnail.url
      }
    })
    categoria.pecas = formatedPecas
  })

  data.categorias = formatedCategorias
  
  ctx.send(data);
  }
};