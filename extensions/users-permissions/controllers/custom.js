module.exports = {
  userInfos: async (ctx) => {
    const fields = await strapi
      .query("user", "users-permissions")
      .findOne({ id_in: [ctx.state.user.id] }, [
        "categorias",
        "categorias.image",
        "pecas.image",
        "pecas.comandos",
        "pecas.categoria",
      ]);

    const data = {
      id: fields.id,
      username: fields.username,
      email: fields.email,
      categorias: fields.categorias,
      pecas: fields.pecas,
    };

    const formatedCategorias = fields.categorias.map((categoria) => {
      return {
        id: categoria.id,
        name: categoria.name,
        image: categoria.image.formats.thumbnail.url,
        pecas: categoria.pecas,
      };
    });

    data.categorias = formatedCategorias;

    const formatedPecas = data.pecas.map((peca) => {
      return {
        id: peca.id,
        category_id: peca.categoria.id,
        name: peca.name,
        image: peca.image.formats.thumbnail.url,
        is_sensor: peca.is_sensor,
        cable_advice: peca.cable_advice,
        comandos: peca.comandos,
      };
    });

    data.pecas = formatedPecas;

    data.pecas.forEach((peca) => {
      const formatedComandos = peca.comandos.map((comando) => {
        return {
          id: comando.id,
          name: comando.name,
          message_on: comando.message_on,
          message_off: comando.message_off,
          type: comando.type,
        };
      });

      peca.comandos = formatedComandos;
    });

    ctx.send(data);
  },
};
